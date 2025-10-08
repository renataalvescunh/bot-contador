<h1 align="center" id="project_name">
  <br />
  <img src="assets/logo3.png" alt="Logo" width="74px">
  <br />
Bot Contador
  <br />

</h1>

O **Bot Contador** é uma aplicação Node.js que automatiza a contagem e o monitoramento de membros em grupos do WhatsApp. O bot foi projetado para ser simples de configurar e executar, integrando-se diretamente ao seu grupo para fornecer relatórios e alertas em tempo real.


  ## 📚 Sumário
  
  - [Funcionalidades](#-funcionalidades)
  - [Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [Pré-requisitos](#-pré-requisitos)
  - [Instalação e Configuração](#-instalação-e-configuração)
  - [Uso](#-uso)
  - [Estrutura do Projeto](#-estrutura-do-projeto)
  - [Contribuição](#-contribuição)
  - [Licença](#-licença)


## 📝 Funcionalidades

- Contagem automática de membros do grupo;
- Geração de relatórios em tempo real;
- Configuração flexível de critérios de contagem;
- Alertas automáticos quando o número de integrantes muda.


## 🛠️ Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/)
-   [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
-   [node-cron](https://github.com/node-cron/node-cron)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) (versão 16 ou superior) instalado em sua máquina.


## 🚀 Instalação e Configuração

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

📌 IMPORTANTE: modifique o nome do arquivo para config.json, para que ele possa funcionar corretamente.

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

Execute o bot com:

```bash
node index.js
```
O bot irá iniciar e começar a monitorar o grupo conforme as configurações definidas. 

Na primeira vez que executar, um QR Code aparecerá no terminal. Escaneie-o com o WhatsApp do número que será o bot. Nas próximas vezes, ele se conectará automaticamente.

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

## 💡 Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request para sugerir melhorias.

## 📄 Licença

Este projeto está sob a [MIT License](LICENSE).

