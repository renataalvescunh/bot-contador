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

// Quando receber um QR Code do bot
socket.on('qr_code', (qrData) => { 
    console.log('Recebido QR Code:', qrData);
    qrcodeContainer.innerHTML = '';

    const qrInstance = new QRCode(qrcodeContainer, {
        text: qrData, // O dado (string) do QR Code
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
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
        // Mensagem padrão se o bot estiver esperando o QR
        if (status.type !== 'qr_sent') {
            qrcodeContainer.innerHTML = '<p>Aguardando QR Code...</p>';
        }
    }
});

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

// Mensagem inicial 
logsContainer.textContent = 'Aguardando conexão com o servidor do bot...';