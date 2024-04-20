/****************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistências de dados de filme
 * Data: 03/04/2024
 * Autor: Cauã da Silva
 * Versão: 2.0
 ****************************************************************/

// Import do arquivo responsavel pela interação com DB(model)
const { application } = require('express')
const diretorDAO = require('../model/DAO/diretor.js')
const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')


const setInserirNovoAtor = async function(dadosAtor, contentType){

    try{
        // Validação de content-type (apenas aplication/json)
        if(String(contentType).toLowerCase() == 'application/json'){
    
            // Cria o objeto JSON para devolver os dados criados na requisição
                let novoAtorJSON = {}
            
                //Validação de campos obrigatórios ou com digitação inválida
                if(dadosAtor.nome == ''                         || dadosAtor.nome == undefined                              || dadosAtor.nome == null                   || dadosAtor.nome.length > 100                        || 
                dadosAtor.nome_artistico == ''                  || dadosAtor.nome_artistico == undefined                    || dadosAtor.nome_artistico == null         || dadosAtor.nome_artistico.length > 100              ||
                dadosAtor.data_nascimento == ''                 || dadosAtor.data_nascimento == undefined                   || dadosAtor.nascimento == null             || dadosAtor.data_nascimento.length  != 10            ||
                dadosAtor.biografia == ''                       || dadosAtor.biografia == undefined                         || dadosAtor.biografia == null              || 
                dadosAtor.foto == ''                            || dadosAtor.foto == undefined                              || dadosAtor.foto == null                   || dadosAtor.foto.length > 160 ||
                dadosAtor.id_sexo == '' ||   dadosAtor.id_sexo == undefined || dadosAtor.sexo == null || dadosAtor.id_sexo.length > 2
                
                ){
                    console.log(dadosAtor);
                    return message.ERROR_REQUIRED_FIELDS
            
                }
            
                else{
            
                    let validateStatus = false
            
                    // Outra validação com campos obrigatorios ou com digitação inválida
                    if(dadosAtor.data_falecimento != null &&
                        dadosAtor.data_falecimento != '' &&
                        dadosAtor.data_falecimento != undefined){
            
                        if(dadosAtor.data_falecimento.length != 10){
                            return message.ERROR_REQUIRED_FIELDS//400
                        }else{
                            validateStatus = true
                        }
                    }else{
                        validateStatus = true
                    }
            
                
                    if(validateStatus){
            
                        
                        let novoAtor = await atorDAO.insertAtor(dadosAtor)
                        
                        if(novoAtor){
                            let IdAtor = await atorDAO.IDAtor()
                            dadosAtor.id = Number(IdAtor[0].id)
                        }
                
                        
                        if(novoAtor){
                
                    
                            novoAtorJSON.ator       = dadosAtor
                            novoAtorJSON.status      = message.SUCCESS_CREATED_ITEM.status
                            novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                            novoAtorJSON.message     = message.SUCCESS_CREATED_ITEM.message
                
                            return novoAtorJSON //201
                            
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    }else{
                        validateStatus = false
                    }
            
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }

    }


// Função para atualizar um filme
const setAtualizarFilme = async function(idFilme, dadoAtualizado, contentType){
    try{

        // Validação de content-type (apenas aplication/json)
        if(String(contentType).toLowerCase() == 'application/json'){
            let dadosID = filmesDAO.selectByIdFilme()
            
            if(idFilme == '' || idFilme == undefined || idFilme == isNaN(idFilme) || idFilme == null){
                return message.ERROR_INVALID_ID
            }else if(idFilme>dadosID.length){
                return message.ERROR_NOT_FOUND
            }else{
                // Cria o objeto JSON para devolver os dados criados na requisição
                    let atualizarFilmeJSON = {}

                    //Validação de campos obrigatórios ou com digitação inválida
                    if(dadoAtualizado.nome == ''                  || dadoAtualizado.nome == undefined            || dadoAtualizado.nome == null            || dadoAtualizado.nome.length > 80             || 
                    dadoAtualizado.sinopse == ''                  || dadoAtualizado.sinopse == undefined         || dadoAtualizado.sinopse == null         || dadoAtualizado.sinopse.length > 65000       ||
                    dadoAtualizado.duracao == ''                  || dadoAtualizado.duracao == undefined         || dadoAtualizado.duracao == null         || dadoAtualizado.duracao.length > 8           ||
                    dadoAtualizado.data_lancamento == ''          || dadoAtualizado.data_lancamento == undefined || dadoAtualizado.data_lancamento == null || dadoAtualizado.data_lancamento.length != 10 ||
                    dadoAtualizado.foto_capa == ''                || dadoAtualizado.foto_capa == undefined       || dadoAtualizado.foto_capa == null       || dadoAtualizado.foto_capa.length > 200       ||
                    dadoAtualizado.id_classificacao == ''         || dadoAtualizado.id_classificacao == undefined       || dadoAtualizado.id_classificacao == null       || dadoAtualizado.id_classificacao.length > 1  ||
                    dadoAtualizado.valor_unitario.length > 6
                    ){
                        return message.ERROR_REQUIRED_FIELDS
                    }
                
                    else{
                        let validateStatus = false
                
                        // Outra validação com campos obrigatorios ou com digitação inválida
                        if(dadoAtualizado.data_relancamento != null &&
                             dadoAtualizado.data_relancamento != '' &&
                              dadoAtualizado.data_relancamento != undefined){

                            if(dadoAtualizado.data_relancamento.length != 10){
                                return message.ERROR_REQUIRED_FIELDS//400
                            }else{
                                validateStatus = true
                            }
                        }else{

                            validateStatus = true
                        }
                
                        // Validação para verificar se a variavel booleana é verdadeira
                        if(validateStatus){
                
                            // Encaminha os dados do filme para o DAO inserir no DB
                            let dadosFilme = await filmesDAO.updateFilme(idFilme, dadoAtualizado)
                            
                            // if(atualizarFilme){
                            //     let idFilmes = await filmesDAO.IDFilme()
                            //     console.log(idFilmes)
                            //     dadoAtualizado.id = Number(idFilmes[0].id)
                            // }
                    
                            // Validação para verificar se o DAO inseriu os dados do DB
                            if(dadosFilme){
                    
                                //Cria o JSON de retorno dos dados (201)
                                atualizarFilmeJSON.filme       = dadosFilme
                                atualizarFilmeJSON.status      = message.SUCCESS_UPDATED_ITEM.status
                                atualizarFilmeJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                                atualizarFilmeJSON.message     = message.SUCCESS_UPDATED_ITEM.message
                                return atualizarFilmeJSON //201
                                
                            }else{
                                return message.ERROR_INTERNAL_SERVER_DB //500
                            }
                        }else{
                            validateStatus = false
                        }
                
                    }
                    
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
        }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
            
    

        }


// Função para excluir um filme
const setExcluirDiretor = async function(id){

    try {
        let IdDiretor = id
    
        if(IdDiretor == '' || IdDiretor == undefined || IdDiretor == isNaN(IdDiretor) || IdDiretor== null){
            return message.ERROR_INVALID_ID
        }else{
            
            let dadosDiretor = await diretorDAO.deleteDiretor(IdDiretor)
            let dadosDiretorDelete = await diretorDAO.deleteDiretorNacionalidade(IdDiretor)

            if(dadosDiretor || dadosDiretorDelete){
                return message.SUCCESS_DELETED_ITEM
            }else{
              return message.ERROR_NOT_FOUND
            }
        }
    }
        
     catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

// Função para listar filmes
const getListarDiretores = async function(){

    // Cria um objeto JSON chama a função DAO que retorna os filmes do banco 
    let diretorJSON = {}

    let dadosDiretor = await diretorDAO.selectAllDiretores()

    if(dadosDiretor == '' || dadosDiretor == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{

         // Validação para verificar se o DAO retornou dados
    if(dadosDiretor){

        if(dadosDiretor.length > 0){
            // Cria o JSON para retornar para o APP

            for(let diretores of dadosDiretor){
                let sexoDiretor = await sexoDAO.selectSexoById(diretores.id_sexo)
                let nacionaliadadeDiretor = await nacionalidadeDAO.selectDiretorNacionalidade(diretores.id_diretor)
                delete diretores.id_sexo
                diretores.sexo = sexoDiretor
                diretores.nacionalidade = nacionaliadadeDiretor
            }          
            
            diretorJSON.diretor = dadosDiretor
            diretorJSON.quantidade = dadosDiretor.length
            diretorJSON.status_code = 200
    
            return diretorJSON
        }else{
            return message.ERROR_NOT_FOUND // 404
        }

    }else {
        return message.ERROR_INTERNAL_SERVER_DB // 500
    }
    }

   
}

// Função para buscar filme
const getBuscarDiretorID = async function(id){

    // Recebe o id do filme
    let IdDiretor = id

    //Cria o objeto JSON
    let diretorJSON = {}


    //Validação para verificar se o id é válido(Vazio, indefinido e não numérico)
    if(IdDiretor == '' || IdDiretor == undefined || isNaN(IdDiretor)){
        return message.ERROR_INVALID_ID // 400
    }else{

        //Encaminha para o DAO localizar o id do filme 
        let dadosDiretor = await diretorDAO.selectByIdDiretor(IdDiretor)



        // Validação para verificar se existem dados de retorno
        if(dadosDiretor){
           
            // Validação para verificar a quantidade de itens encontrados.
            if(dadosDiretor.length > 0){
                for(let diretores of dadosDiretor){
                    let sexoDiretor = await sexoDAO.selectSexoById(diretores.id_sexo)
                    let nacionaliadadeDiretor = await nacionalidadeDAO.selectDiretorNacionalidade(diretores.id_diretor)
                    delete diretores.id_sexo
                    diretores.sexo = sexoDiretor
                    diretores.nacionalidade = nacionaliadadeDiretor
                }     
                //Criar o JSON de retorno
                diretorJSON.diretor = dadosDiretor
                diretorJSON.status_code = 200
    
                return diretorJSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
}

// Função para buscar nome do filme
const getNomeAtor = async function(nome){

    let nomeAtor = nome

    let atorJSON = {}

    if(nomeAtor == '' || nomeAtor == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{
        let dadosFilmes = await atorDAO.selectNameAtores(nome)
    
        if(dadosAtor){
    
            if(dadosAtor.length > 0){
                atorJSON.nome = dadosFilmes
                atorJSON.quantidade = dadosFilmes.length
                atorJSON.status_code = 200
                
                return atorJSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }


}


module.exports = {
    setInserirNovoAtor,
    setAtualizarFilme,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretorID,
    getNomeAtor
}
