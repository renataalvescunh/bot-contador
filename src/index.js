// =====================================
// 🤖 Bot-Contador para WhatsApp - Servidor Web
// =====================================

// --- Módulos do Servidor Web ---
const express = require('express');
const http = require('http');
const {
    Server
} = require('socket.io');
const path = require('path');

// --- Módulos do Bot ---
const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');
const cron = require('node-cron');

// =====================================
// 🥅 REDE DE SEGURANÇA (CATCH-ALL)
// =====================================
process.on('uncaughtException', (err, origin) => {
    // Usamos a função de log para enviar o erro para a UI, se possível
    sendLog(`❌ ERRO GRAVE NÃO TRATADO: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
});

// --- Configuração do Servidor ---
// NOVO: Configurações para a aplicação web
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = 3000;

// Serve os arquivos estáticos da pasta 'public' (seu HTML, CSS, JS do frontend)
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// --- Variáveis Globais ---
let socketClient = null;
const config = require('../config/config.json');

// --- Funções de Comunicação com a UI ---
function sendLog(message) {
    console.log(message); 
    if (socketClient) {
        socketClient.emit('log', message); 
    }
}

// NOVO: Função para enviar atualizações de status para a UI
function sendStatus(status) {
    if (socketClient) {
        socketClient.emit('status_update', status);
    }
}

// --- Configuração do Cliente WhatsApp ---
const client = new Client({
    authStrategy: new LocalAuth()
});

// --- Lógica de Conexão com a UI ---
io.on('connection', (socket) => {
    sendLog("🔌 Painel de controle conectado!");
    socketClient = socket;

    // Quando o painel se desconecta
    socket.on('disconnect', () => {
        sendLog("🔌 Painel de controle desconectado.");
        socketClient = null;
    });

    if (!client.info) { // Garante que o bot só seja inicializado uma vez
        client.initialize();
    }
});


// --- Eventos do Cliente WhatsApp (Adaptados para a UI) ---

client.on('qr', qr => {
    sendLog('📱 QR Code recebido, enviando para o painel...');
    if (socketClient) {
        socketClient.emit('qr_code', qr);
    }
    sendStatus({
        type: 'qr_sent',
        message: '🟡 Aguardando escaneamento do QR Code',
        color: '#f39c12'
    });
});

client.on('ready', () => {
    sendLog('✅ Bot-Contador conectado e funcionando com segurança!');
    sendStatus({
        type: 'connected',
        message: '🟢 Conectado',
        color: '#2ecc71'
    });

    agendarRelatorios();
    agendarHealthCheck();
});

client.on('disconnected', (reason) => {
    sendLog(`❌ Bot foi desconectado! Motivo: ${reason}`);
    sendStatus({
        type: 'disconnected',
        message: '🔴 Desconectado',
        color: '#e74c3c'
    });
    enviarAlertaWpp('🔴 ATENÇÃO: O Bot-Contador foi desconectado e precisa ser reiniciado!');
});


// --- Funções do Bot (Lógica Principal, com Logs Adaptados) ---

async function enviarAlertaWpp(mensagem) {
    try {
        const numeroAlerta = `${config.numero_alerta}@c.us`;
        await client.sendMessage(numeroAlerta, mensagem);
        sendLog('📲 Alerta enviado por WhatsApp com sucesso!');
    } catch (error) {
        sendLog(`❌ Erro ao enviar alerta no WhatsApp: ${error.message}`);
    }
}

async function verificarLimite(chat) {
    const grupoConfig = config.grupos_monitorados.find(g => g.nome_grupo === chat.name);
    if (!grupoConfig) return;

    const memberCount = chat.participants.length;
    sendLog(`📢 O grupo "${chat.name}" agora tem ${memberCount} membros.`);

    if (memberCount >= grupoConfig.limite_membros) {
        const alerta = `⚠️ O grupo *${chat.name}* atingiu o limite de ${grupoConfig.limite_membros} membros! Atualmente com ${memberCount}.`;
        await enviarAlertaWpp(alerta);
    }
}

async function enviarRelatorioPeriodico() {
    sendLog('🗓️ Gerando relatório periódico...');
    let relatorio = '📊 *Relatório Periódico de Membros*\n\n';
    const chats = await client.getChats();
    for (const grupoConfig of config.grupos_monitorados) {
        const chat = chats.find(c => c.isGroup && c.name === grupoConfig.nome_grupo);
        if (chat) {
            relatorio += `*${chat.name}*: ${chat.participants.length} de ${grupoConfig.limite_membros} membros.\n`;
        } else {
            relatorio += `*${grupoConfig.nome_grupo}*: Não encontrado.\n`;
        }
    }
    await enviarAlertaWpp(relatorio);
}

function agendarRelatorios() {
    if (cron.validate(config.relatorio_periodico_cron)) {
        cron.schedule(config.relatorio_periodico_cron, enviarRelatorioPeriodico);
        sendLog(`🕰️ Relatórios periódicos agendados para a expressão cron: "${config.relatorio_periodico_cron}"`);
    } else {
        sendLog('❌ Expressão cron para relatório periódico é inválida.');
    }
}

function agendarHealthCheck() {
    cron.schedule('*/30 * * * *', () => {
        const healthMessage = "💚 *Bot-Contador Health Check:* continuo online e monitorando.";
        sendLog("Enviando health check...");
        enviarAlertaWpp(healthMessage);
    });
    sendLog('💓 Health checks agendados para rodar a cada 30 minutos.');
}

client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    verificarLimite(chat);
});

client.on('group_leave', async (notification) => {
    const chat = await notification.getChat();
    sendLog(`📉 Alguém saiu do grupo "${chat.name}".`);
});


// --- Inicialização do Servidor ---
httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor do painel iniciado! Acesse em http://localhost:${PORT}`);
});