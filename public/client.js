// Estabelece a conexão com o servidor (nosso bot) assim que a página carrega
const socket = io();

// Pega as referências dos elementos do HTML que vamos manipular
const loginView = document.getElementById('login-view');
const connectedView = document.getElementById('connected-view');
const qrcodeContainer = document.getElementById('qrcode');
const statusText = document.getElementById('status-text');
const logsContainer = document.getElementById('logs');

// NOVO: Flag para controlar a primeira mensagem de log
let isFirstLog = true;

// --- OUVINTES DE EVENTOS DO BOT ---

socket.on('qr_code', (qr) => {
    console.log('QR Code recebido!');
    qrcodeContainer.innerHTML = '';
    const qrCode = qrcode(0, 'M');
    qrCode.addData(qr);
    qrCode.make();
    qrcodeContainer.innerHTML = qrCode.createImgTag(5);
});

socket.on('status_update', (status) => {
    console.log('Status atualizado:', status);
    statusText.innerHTML = status.message;
    if (status.type === 'connected') {
        loginView.style.display = 'none';
        connectedView.style.display = 'block';
    } else {
        loginView.style.display = 'block';
        connectedView.style.display = 'none';
        qrcodeContainer.innerHTML = '<p>Aguardando QR Code...</p>';
    }
});

// ALTERADO: Lógica de log aprimorada
socket.on('log', (message) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    const newLogEntry = `[${timestamp}] ${message}\n`;

    if (isFirstLog) {
        // Na primeira vez, substitui o texto "Aguardando..."
        logsContainer.textContent = newLogEntry;
        isFirstLog = false; // Desativa a flag
    } else {
        // Nas vezes seguintes, adiciona no início
        logsContainer.textContent = newLogEntry + logsContainer.textContent;
    }
});

// Mensagem inicial para confirmar que o frontend está pronto
logsContainer.textContent = 'Aguardando conexão com o servidor do bot...';