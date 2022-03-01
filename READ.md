Projeto final mês de fevereiro
Boa Tarde, segue a solicitação o projeto solicitado aos estagiários como conclusão do mês de Fevereiro: O Projeto será divido em duas partes, Front e Back.

Obrigatório
Front
Docker
Image: nginx:latest
Html
2 Forms, 1 para login e outro para cadastro
No cadastro deve conter inputs para nome, email e senha e um link para voltar para tela de login
No login inputs para email e senha e um link para ir para a tela de cadastro
CSS
Arquivos de estilização
deixar a page responsiva
Javascript
Arquivo js para manipular a dom da page
capturar os dados dos forms
controlar o momento de abrir os forms
realizar consultas nos Endpoints do back
inserir dados do banco no front
colocar token recebido no localstorage
e se login for sucesso retornar um alert para o cliente
Back
Nodejs
Pacotes: express, jsonwebtoken, dotenv, bcrypt, moongose
Docker
imagem própria e postada no docker hub
arquivo dockerfile e docker-compose
imagem node:14-alpine
Estrutura
arquivos: src, index, server, db, controllers
rotas
criar usuário
Receber os dados no body e criar um hash da senha para salvar no banco
Retornar para o cliente 201 e uma mensagem de sucesso
login
Login recebe email e senha, válida no banco os dados e depois valida se a senha bate se bater, gerar um token e retorna na response para o cliente
listar usuários
ao listar não pode retornar a senha somente os outros dados
exibir pelo email o usuário
deletar usuario
Regras da aplicação:

Para listar, exibir e deletar um usuário o mesmo precisa estar autenticado por token
Ao cadastrar o contato pelo front a page tem que fechar o form de cadastro e abrir o de login
ao fazer o login ele retornar um alert e adiciona o token vindo da api em localstorage
Caso deseje utilizar um framework para construir o front pode utilizar mas verifique também a imagem base usada para ficar rodando o seu front
Data de Entrega: 18/03