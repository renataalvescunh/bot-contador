<h1 align="center" id="project_name">
  <br />
  <img src="public/assets/icon-wppbot.png" alt="Logo" width="114px">
  <br />
Bot Contador
  <br />
</h1>

<p align="center">
O <strong>Bot Contador</strong> é uma aplicação Node.js que automatiza o monitoramento de membros em grupos do WhatsApp, com um painel de controle web para visualização em tempo real.
</p>

## 📜 Sumário
  
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📋 Pré-requisitos](#-pré-requisitos)
- [🚀 Instalação e Configuração](#-instalação-e-configuração)
- [▶️ Executando o Bot](#️-executando-o-bot)
  - [Modo Simples (via NPM)](#modo-simples-via-npm)
  - [Modo Fácil (Windows)](#modo-fácil-windows)
  - [Modo 24/7 (via PM2)](#modo-247-via-pm2)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [💌 Contribuição](#-contribuição)
- [📄 Licença](#-licença)


## ✨ Funcionalidades

-   **Painel de Controle Web**: Interface gráfica para visualizar o status do bot, QR Code de conexão e logs em tempo real.
-   **Monitoramento de Múltiplos Grupos**: Configure quantos grupos quiser, cada um com seu próprio limite de membros.
-   **Alertas de Limite Atingido**: Envia uma notificação imediata via WhatsApp quando um grupo alcança o número de membros estipulado.
-   **Relatórios Periódicos**: Receba resumos automáticos com a contagem de membros de todos os grupos monitorados.
-   **Monitoramento de Atividade (Health Check)**: Envia uma mensagem periódica de "estou vivo" para confirmar que o bot continua online.
-   **Autenticação Persistente**: A sessão é salva, permitindo que o bot se reconecte automaticamente sem precisar de um novo QR Code.
- **Desafio de Performance**: O sistema foi arquitetado para gerenciar picos de alta demanda, suportando a entrada massiva de membros (estimado em 3-5 RPS) com o uso de lógica de processamento assíncrono em Node.js para garantir a estabilidade do serviço.

## 🛠️ Tecnologias Utilizadas

-   **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/pt-br/), [Socket.IO](https://socket.io/), [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js), [node-cron](https://github.com/node-cron/node-cron)
-   **Frontend**: HTML5, CSS3, JavaScript (Vanilla)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (versão 16 ou superior) instalado em sua máquina.

## 📐 Instalação e Configuração

Siga os passos abaixo para colocar o bot em funcionamento.

1. Clone o repositório:

    ```
    git clone https://github.com/renataalvescunh/bot-contador.git
    ```
    
    ```
    cd bot-contador
    ```
2. Instale as dependências:

    ```
    npm install
    ```

3. Configure os grupos e alertas:

Abra o arquivo config/config.example.json e edite as informações necessárias. 

🚨IMPORTANTE:🚨 modifique o nome do arquivo para config.json, para que ele possa funcionar corretamente.

```
{
  "numero_alerta": "55119XXXXXXXX",
  "grupos_monitorados": [
    {
      "nome_grupo": "Nome Exato do Grupo 1",
      "limite_membros": 250
    },
    {
      "nome_grupo": "Grupo de Testes",
      "limite_membros": 100
    }
  ],
  "relatorio_periodico_cron": "0 9 * * *"
}
```

## 📌 Uso

Após a configuração, você pode iniciar a aplicação de três formas:

### Modo Simples (via-npm)

    npm start

ou

    node src/index.js
    

O bot irá iniciar e começar a monitorar o grupo conforme as configurações definidas. 

Na primeira vez que executar, um QR Code aparecerá no terminal. Escaneie-o com o WhatsApp do número que será o bot. Nas próximas vezes, ele se conectará automaticamente.

### Modo Fácil (Windows)

A forma mais simples para usuários não-técnicos.

1. Inicie: Dê um duplo-clique no arquivo LIGAR_BOT.bat (no Windows) ou execute o comando npm start no terminal.

2. Aguarde: O bot irá iniciar e você verá mensagens de log no terminal. Isso leva em média 30s.

3. Acesse o painel de controle: Abra o navegador e vá para http://localhost:3000 para acessar o painel do bot.

4. Conecte ao WhatsApp: No painel de controle ou no terminal, escaneie o QR Code exibido para conectar o bot à sua conta do WhatsApp.

5. Monitore a atividade: Acompanhe os logs e os alertas sobre a contagem de membros diretamente no painel.

### Modo 24/7 (via PM2)

O comando "PM2" mantém o bot rodando em segundo plano e o reinicia automaticamente em caso de falhas.

1. Instale o PM2 (apenas uma vez):

    ```
    npm install pm2 -g
    ```

2. Inicie o bot com o PM2:

    ```
    pm2 start src/index.js --name bot-contador
    ```

### Comandos úteis do PM2:

```pm2 logs bot-contador```: Ver os logs do bot em tempo real.

```pm2 list```: Listar todos os processos gerenciados pelo PM2.

```pm2 restart bot-contador```: Reiniciar o bot.

```pm2 stop bot-contador```: Parar o bot.

## 📁 Estrutura do Projeto

```
BOT-CONTADOR/
├── config/             # Arquivos de configuração do bot
├── node_modules/       # Dependências do projeto
├── public/             # Arquivos do Frontend (acessíveis pelo navegador)
│   ├── assets/         # Imagens e ícones
│   ├── client.js       # Lógica do frontend (Socket.IO)
│   ├── index.html      # Estrutura da página
│   ├── about.html      # Estrutura da página
│   ├── contact.html    # Estrutura da página
│   └── styles.css      # Estilos da página
├── src/
│   └── index.js        # Lógica do Backend (Servidor e Bot)
├── .gitignore          # Arquivos ignorados pelo Git
├── LIGAR_BOT.bat       # Atalho para iniciar no Windows
├── package.json        # Dependências e scripts
└── README.md
```

## 💌 Contribuição

Contribuições são extremamente bem-vindas! Se tiver interesse, por favor, abra uma issue ou envie um pull request para sugerir melhorias. Será uma honra recebê-lás! 

## 📄 Licença

Este projeto está sob a [MIT License](LICENSE).

