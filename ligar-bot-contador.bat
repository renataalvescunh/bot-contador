@echo off
chcp 65001 > nul
title Servidor do Bot-Contador

echo ================================================================
echo ^|           SERVIDOR DO BOT-CONTADOR INICIADO                  ^|
echo ^|  ^|!^|  Por favor, acesse o ^<Painel do Bot-Contador.url^>   ^|
echo ^|               Não pule essa etapa!                           ^|
echo =================================================================
echo ^| Olá! Seja bem-vindo ao Bot-Contador. Espero que hoje seja    ^|
echo ^| um dia interessante para você!                               ^|
echo =================================================================
echo ^|  Não deixe as situações difíceis te desanimarem. Dias ruins  ^|
echo ^| podem acontecer, mas eles também passam.                     ^|
echo ^|                                                              ^|
echo ^|      Esse bot bobinho está aqui para ajudar você             ^|
echo ^|           a contar mensagens no WhatsApp!                    ^|
echo ^|                   e facilitar sua vida. Vamos começar!       ^|
echo ^|                                                              ^|
echo =================================================================
echo ^|                                                              ^|
echo         ^| ♥ ^|  Este é o servidor do seu bot.                  ^|
echo  Mantenha esta janela aberta para que ele continue funcionando.
echo ^|                                                              ^|
echo =================================================================
echo ^|               [Atenção:] você precisa aguardar alguns        ^|
echo ^|             instantes enquanto o bot inicia...               ^|
echo ^|                                                              ^|
echo ^|  Aguarde até ver a mensagem "Servidor iniciado com sucesso!".^|
echo ^|             Depois, abra o Painel do Bot-Contador            ^|
echo ^|                   para começar a usar o bot.                 ^|
echo ^|                                                              ^|
echo ^|      Utilizando o link: ^<Painel do Bot-Contador.url^>       ^|
echo ^|           Quando abrir o painel, siga as instruções          ^|
echo ^|             para conectar o bot ao seu WhatsApp, escaneando  ^|
echo ^|                    o código QR com o aplicativo.             ^|
echo =================================================================
echo ^|                                                              ^|
echo ^|            Lembre-se de que o número de WhatsApp             ^|
echo ^|                 usado deve estar ativo                       ^|
echo ^|            no seu celular e você PRECISA ter                 ^|
echo ^|               uma conexão de internet estável,               ^|
echo ^|              além de necessariamente, o número-bot           ^|
echo ^|                  deve estar nos grupos que                   ^|
echo ^|                   você deseja monitorar.                     ^|
echo ^|                                                              ^|
echo =================================================================
echo ^|                                                              ^|
echo ^|          ^| ! ^| Caso tenha dúvidas, consulte o arquivo      ^|
echo ^|              README.md ou visite a página do projeto no      ^|
echo ^|                      GitHub para mais informações.           ^|
echo =================================================================
echo ^|                                                              ^|
echo ^| ^| ! ^|Para desligar o bot, basta fechar esta janela.        ^|
echo ^|        Ou, de maneira mais segura, pressione Ctrl + C        ^|
echo ^|                      e depois confirme                       ^|
echo ^|                       com 'S' para desligar.                 ^|
echo ^|                                                              ^|
echo =================================================================
echo.

rem Garante que o script rode a partir da pasta onde ele esta.
cd /d "%~dp0"

rem Inicia o servidor do bot.
npm start