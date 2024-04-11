var info = require("./controller/funcao")


/**** 
Para realizar a integração com o banco de dados devemos utilizar uma das seguinte bibliotecas:
 -> SEQUELIZE - É a biblioteca mais antiga
 -> PRISMA ORM - É a biblioteca mais atual (Utilizaremos no projeto)
 -> FASTFY ORM - É a biblioteca mais atual
*****************************************
Para instalação do PRISMA ORM: 
 -> npm install prisma --save - (É responsavel pela conexão com o Banco de dados)
 -> npm install @prisma/client --save - (É responsavel por executar scripts SQL no Banco de dados)
 
Para iniciar o prisma no projeto, devemos:
 -> npx prisma init
*****/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/*********************** Import dos arquivos de controller do projeto ***********************************/
    const controllerFilmes = require('./controller/controller_filme.js')
/*******************************************************************************************************/

// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


// EndPoint: Versão 1.0 que retorna os dados de um arquivo de filmes.
// Periodo de utilização 01/2024 até 02/2024
app.get('/v1/acmeFilmes/filmes', cors(), async function(request, response, next){
    let listarFilmes = info.getListarFilmes()

    if(listarFilmes){
        response.json(listarFilmes)
        response.status(200)
    }else{
        response.status(404)
    }
    })
    
    app.get('/v1/acmeFilmes/filme/:idfilmes', cors(), async function(request, response, next){
        let id = request.params.idfilmes
        let filme = info.getFilme(id)

        if(filme){
            response.json(filme)
            response.status(200)
        }else{
            response.status(404)
        }
    })

/********************************** V2 DOS ENDPOINTS ********************************************/


    // -> EndPoint: Versão 2.0 - Retorna os dados de filme do Banco de Dados
    app.get('/v2/acmeFilmes/filme', cors(), async function(request, response){


        // -> Chama a função da controller para retornar todos os filmes
        let dadosFilmes = await controllerFilmes.getListarFilmes()

        // -> validação para verificar se existem dados a serem retornados
        response.status(dadosFilmes.status_code)
        response.json(dadosFilmes)
    })

    //EndPoint: Ele retorna os dados do filme filtrado pelo nome
    app.get('/v2/acmeFilmes/Filmes/Filtro', cors(), async function(request, response){
        let nome = request.query.nome
        let dadosFilmes = await controllerFilmes.getNomeFilme(nome)

        response.status(dadosFilmes.status_code)
        response.json(dadosFilmes)
    })

    // EndPoint: ele retorna os dados pelo id
    app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response, next){

        // Recebe o id da requisição
        let idFilme = request.params.id
        // Encaminha o ID para a controller buscar o Filme
        let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

        //
        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
    })

    //EndPoint: Ele insere dados sobre o filme
    app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){

        // Recebe o content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe todos os dados encaminhados na requisição pelo Body
        let dadosBody = request.body

        //Encaminha os dados para a controller enviar para o DAO
        let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
        
        response.status(resultDadosNovoFilme.status_code)
        response.json(resultDadosNovoFilme)
    })

    //EndPoint: Ele deleta os dados pelo id 
    app.delete('/v2/acmeFilmes/filme/:id', cors(), async function(request, response, next){
        let idFilme = request.params.id

        let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
    })

    app.put('/v2/acmeFilmes/filme/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let idFilme = request.params.id

        let dadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
    })


// ************************************************************************************************************************************* //
// ****************************  CRUD DO GENERO  ************************************************************
// **************************************************************************************************************************************//


const controllerGeneros = require('./controller/controller_genero.js')
//EndPoint : Versão 2.0 - retorna todos os GENEROS do Banco de Dados 
app.get('/v2/filmesAcme/generos', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosGenero = await controllerGeneros.getListarGeneros();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosGenero){
        response.json(dadosGenero);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});


// endPoint: retorna o genero filtrando pelo ID
app.get('/v2/filmesAcme/generos/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idGenero = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosGenero = await controllerGeneros.getBuscarGeneroId(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);
})


// primeiro end point usando POST 
app.post('/v2/filmesAcme/genero', cors(), bodyParserJSON, async function (request, response,next ){

    // recebe o ContentType com os tipos de dados encaminhados na requisição
    let contentType = request.headers['content-type'];

    // vou receber o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody,contentType);


    console.log(resultDadosNovoGenero)
    response.status(200);
    response.json(resultDadosNovoGenero);

})


app.delete('/v1/filmesAcme/deleteGenero/:id', cors (), async function (request,response,next){

    let idGenero = request.params.id

    let dadosGenero = await controllerGeneros.setExcluirGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero)
})


app.put('/v1/filmesAcme/uptadeGenero/:id', cors(), bodyParserJSON, async function(request,response,next){

    let idGenero = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeGenero = await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType);

    console.log();
    response.status(200)
    response.json(resultUptadeGenero)

} )





    app.listen('8080', function(){
        console.log('API funcionando!!')
    })
