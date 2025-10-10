<h1 align="center" id="project_name">
  <br />
  <img src="assets/logo3.png" alt="Logo" width="74px">
  <br />
Bot Contador
  <br />

</h1>

<p align="center">
O <strong>Bot Contador</strong> é uma aplicação Node.js que automatiza o monitoramento de membros em grupos do WhatsApp, enviando alertas e relatórios periódicos para manter o administrador informado.
</p>

## 📜 Sumário
  
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Executando o Bot](#️-executando-o-bot)
  - [Modo Simples (via NPM)](#modo-simples-via-npm)
  - [Modo 24/7 (via PM2)](#modo-247-via-pm2)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)


## ✨ Funcionalidades

-   **Monitoramento de Múltiplos Grupos**: Configure quantos grupos quiser, cada um com seu próprio limite de membros.
-   **Alertas de Limite Atingido**: Envia uma notificação imediata via WhatsApp quando um grupo alcança o número de membros estipulado.
-   **Relatórios Periódicos**: Receba resumos automáticos com a contagem de membros de todos os grupos monitorados em uma frequência personalizável (ex: todo dia às 9h).
-   **Monitoramento de Atividade (Health Check)**: Envia uma mensagem periódica de "estou vivo" para confirmar que o bot continua online e funcionando.
-   **Alerta de Desconexão**: Avisa o administrador caso a sessão do WhatsApp seja desconectada, permitindo uma rápida reconexão.
-   **Autenticação Persistente**: Só é necessário escanear o QR Code uma vez. O bot se reconecta automaticamente nas inicializações seguintes.

## 🛠️ Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/)
-   [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
-   [node-cron](https://github.com/node-cron/node-cron)

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

Existem duas formas de rodar o bot, uma simples para testes e outra opção, para deixá-lo funcionando 24/7.

### Modo Simples (via-npm)

    node index.js

O bot irá iniciar e começar a monitorar o grupo conforme as configurações definidas. 

Na primeira vez que executar, um QR Code aparecerá no terminal. Escaneie-o com o WhatsApp do número que será o bot. Nas próximas vezes, ele se conectará automaticamente.

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
├── config/
│   └── config.json       # Arquivo de configurações
├── node_modules/         # Dependências do projeto
├── src/
│   └── index.js          # Lógica principal do bot
├── .gitignore            # Arquivos ignorados pelo Git
├── package-lock.json
├── package.json
└── README.md
```

## 💌 Contribuição

Contribuições são extremamente bem-vindas! Se tiver interesse, por favor, abra uma issue ou envie um pull request para sugerir melhorias. Será uma honra recebê-lás! 

## 📄 Licença

Este projeto está sob a [MIT License](LICENSE).

