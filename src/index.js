// Importação de módulos
const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

// Carrega as configurações do arquivo JSON
const config = require('../config/config.json');

// ⚙️ Configuração do cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// 🔐 Gera QR code para login
client.on('qr', qr => {
    console.log('📱 Escaneie este QR code para conectar o bot:');
    qrcode.generate(qr, {
        small: true
    });
});

// 🚀 Quando o bot estiver pronto
client.on('ready', () => {
    console.log('✅ Bot-Contador conectado e funcionando com segurança!');
    // Agenda o envio de relatórios periódicos
    agendarRelatorios();
});

// -------------------------------------------------
// 📲 FUNÇÃO DE ALERTA WHATSAPP
// -------------------------------------------------

async function enviarAlertaWpp(mensagem) {
    try {
        const numeroAlerta = `${config.numero_alerta}@c.us`;
        await client.sendMessage(numeroAlerta, mensagem);
        console.log('📲 Alerta enviado por WhatsApp com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao enviar alerta no WhatsApp:', error);
    }
}


// -------------------------------------------------
// 📊 FUNÇÕES DO BOT
// -------------------------------------------------

async function verificarLimite(chat) {
    const grupoConfig = config.grupos_monitorados.find(g => g.nome_grupo === chat.name);
    if (!grupoConfig) {
        return;
    }

    const memberCount = chat.participants.length;
    console.log(`📢 O grupo "${chat.name}" agora tem ${memberCount} membros.`);

    if (memberCount >= grupoConfig.limite_membros) {
        const alerta = `⚠️ O grupo *${chat.name}* atingiu o limite de ${grupoConfig.limite_membros} membros! Atualmente com ${memberCount}.`;
        await enviarAlertaWpp(alerta);
    }
}

async function enviarRelatorioPeriodico() {
    console.log('🗓️ Gerando relatório periódico...');
    let relatorio = '📊 *Relatório Periódico de Membros*\n\n';
    const chats = await client.getChats();

    for (const grupoConfig of config.grupos_monitorados) {
        const chat = chats.find(c => c.isGroup && c.name === grupoConfig.nome_grupo);
        if (chat) {
            const memberCount = chat.participants.length;
            relatorio += `*${chat.name}*: ${memberCount} de ${grupoConfig.limite_membros} membros.\n`;
        } else {
            relatorio += `*${grupoConfig.nome_grupo}*: Não encontrado ou o bot não é membro.\n`;
        }
    }

    await enviarAlertaWpp(relatorio);
}

function agendarRelatorios() {
    if (cron.validate(config.relatorio_periodico_cron)) {
        cron.schedule(config.relatorio_periodico_cron, enviarRelatorioPeriodico);
        console.log(`🕰️ Relatórios periódicos agendados para a expressão cron: "${config.relatorio_periodico_cron}"`);
    } else {
        console.error('❌ Expressão cron para relatório periódico é inválida. Verifique o config.json');
    }
}

// -------------------------------------------------
// 👂 EVENTOS DO WHATSAPP
// -------------------------------------------------

client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    verificarLimite(chat);
});

client.on('group_leave', async (notification) => {
    const chat = await notification.getChat();
    console.log(`📉 Alguém saiu do grupo "${chat.name}".`);
});


// 🚪 Inicializa o bot
client.initialize();