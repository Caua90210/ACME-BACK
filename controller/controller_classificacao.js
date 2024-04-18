/****************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistências de dados de classificacao
 * Data: 03/04/2024
 * Autor: Cauã da Silva
 * Versão: 2.0
 ****************************************************************/

// Import do arquivo responsavel pela interação com DB(model)
const classificacaoDAO = require('../model/DAO/classificacao.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const getListarClassificacao = async function(){

    try {

    // Cri o objeto JSON
    let classificacaoJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacao();

    // Validação para verificar s existem dados 
    if (dadosClassificacao){

        if(dadosClassificacao.length > 0){
            // Cria o JSON para devolver para o APP
            classificacaoJSON.classificacao = dadosClassificacao;
            classificacaoJSON.quantidade = dadosClassificacao.length;
            classificacaoJSON.status_code = 200;
        return classificacaoJSON;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    }else{
        return message.ERROR_INTERNAL_SERVER_DB; 
    }

} catch (error) {
    return message.ERROR_INTERNAL_SERVER;
}
}

//função para validar e inserir um novo genero
const setInserirNovaClassificacao = async function (dadosClassificacao, contentType ){

    try{

    
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let novaClassificacaoJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosClassificacao.faixa_etaria == ''    || dadosClassificacao.faixa_etaria == undefined                  ||  dadosClassificacao.faixa_etaria == null                        || dadosClassificacao.faixa_etaria.length > 2       ||
    dadosClassificacao.classificacao == ''      || dadosClassificacao.classificacao == undefined         ||  dadosClassificacao.classificacao == null               || dadosClassificacao.classificacao.length > 45     ||
    dadosClassificacao.caracteristicas == ''    || dadosClassificacao.caracteristicas == undefined       ||  dadosClassificacao.caracteristicas == null             || dadosClassificacao.caracteristicas.length > 150  
    ){

    
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        

        // Encaminha os dados do filme para o DAO inserir dados
        let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao);

    // console.log(novaClassificacao);

       

        // validação para verificar se o DAO inseriu os dados do BD
        if (novaClassificacao)
        {

            let lastId = await classificacaoDAO.InsertByIdClassificacao()
            dadosClassificacao.id = lastId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            novaClassificacaoJSON.classificacao  = dadosClassificacao
            novaClassificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
            novaClassificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            novaClassificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message 

            return novaClassificacaoJSON; // 201
        }else{
         
            return message.ERROR_INTERNAL_SERVER_DB // 500
            }
         
      }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
} catch(error){
    return message.ERROR_INTERNAL_SERVER // 500
}

}

//função para validar e atualizar um genero
const setAtualizarClassficacao = async function(id, dadosClassificacao, contentType){
    
    try{
        let idClassificacao = id;

        if(idClassificacao == '' || idClassificacao == undefined || isNaN (idClassificacao)|| idClassificacao == null){

            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){

            let updateClassificacaoJSON = {};
            
            if(dadosClassificacao.faixa_etaria == ''    || dadosClassificacao.faixa_etaria == undefined                  ||  dadosClassificacao.faixa_etaria == null                        || dadosClassificacao.faixa_etaria.length > 2       ||
            dadosClassificacao.classificacao == ''      || dadosClassificacao.classificacao == undefined         ||  dadosClassificacao.classificacao == null               || dadosClassificacao.classificacao.length > 45     ||
            dadosClassificacao.caracteristicas == ''    || dadosClassificacao.caracteristicas == undefined       ||  dadosClassificacao.caracteristicas == null             || dadosClassificacao.caracteristicas.length > 150  
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let classificacaoById = await classificacaoDAO.selectClassificacaoById(id)


            if(classificacaoById.length > 0){
                
                    let uptadeClassificacao = await classificacaoDAO.updateClassificacao(id,dadosClassificacao);
                    
                   
                    if(uptadeClassificacao){
                      
                        updateClassificacaoJSON.classificacao = dadosClassificacao
                        updateClassificacaoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        updateClassificacaoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateClassificacaoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                        
                        return updateClassificacaoJSON;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//funcção para excluir um genero
const setExcluirCLassificacao = async function(id){ 

    try {

    let idClassificacao = id;

    if(idClassificacao == ''  || idClassificacao == undefined || isNaN (id) || idClassificacao == null ){
        return message.ERROR_INVALID_ID //400
    } else {
        
        let dadosClassificacao = await classificacaoDAO.deleteClassficacao(idClassificacao)
    
        if(dadosClassificacao){
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
        
        

//função para buscar genero pelo ID
const getBuscarClassificacaoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idClassificacao = id;
    //Cria o objeto JSON
    let classificacaoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idClassificacao == '' || idClassificacao == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosClassificacao = await classificacaoDAO.selectClassificacaoById(id)

        // verifca se o DAO retornou dados 
        if(dadosClassificacao){

            // Validação para verificar a quantidade de itens retornados
            if(dadosClassificacao.length > 0){
                 // Cria o JSON para retorno 
            classificacaoJSON.classificacao = dadosClassificacao;
            classificacaoJSON.status_code = 200;

            return classificacaoJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}

module.exports = {
    getListarClassificacao,
    setInserirNovaClassificacao,
    setAtualizarClassficacao,
    setExcluirCLassificacao,
    getBuscarClassificacaoId
}