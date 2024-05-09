/****************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistências de dados de filme
 * Data: 03/04/2024
 * Autor: Cauã da Silva
 * Versão: 2.0
 ****************************************************************/

// Import do arquivo responsavel pela interação com DB(model)
const nacionalidadesDAO = require('../model/DAO/nacionalidade.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const getListarNacionalidades = async function(){

    try {

    // Cri o objeto JSON
    let nacionalidadeJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosNacionalidade = await nacionalidadesDAO.selectAllNacionalidades();

    // Validação para verificar s existem dados 
    if (dadosNacionalidade){

        if(dadosNacionalidade.length > 0){
            // Cria o JSON para devolver para o APP
            nacionalidadeJSON.nacionalidade = dadosNacionalidade;
            nacionalidadeJSON.quantidade = dadosNacionalidade.length;
            nacionalidadeJSON.status_code = 200;
        return nacionalidadeJSON;
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
const getBuscarNacionalidadeId = async function (id){

    try{
    
    // Recebe o id do genero
    let idNacionalidade = id;
    //Cria o objeto JSON
    let nacionalidadeJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idNacionalidade == '' ||idNacionalidade == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosNacionalidade = await nacionalidadesDAO.selectNacionalidaeById(id)

        // verifca se o DAO retornou dados 
        if(dadosNacionalidade){

            // Validação para verificar a quantidade de itens retornados
            if(dadosNacionalidade.length > 0){
                 // Cria o JSON para retorno 
                 nacionalidadeJSON.nacionalidade = dadosNacionalidade;
                 nacionalidadeJSON.status_code = 200;

            return nacionalidadeJSON;
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
const setInserirNacionalidadeDiretor = async function(dadosNacionalidade, contentType){
    
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
    
        let nacionalidadeJSON = {};
        
    
        // validação de campos obrigatorios ou com digitação inválida
        if(dadosNacionalidade.id_nacionalidade == '' ||dadosNacionalidade.id_nacionalidade == undefined || isNaN(dadosNacionalidade.id_nacionalidade) || 
            dadosNacionalidade.id_diretor == '' ||dadosNacionalidade.id_diretor == undefined || isNaN(dadosNacionalidade.id_diretor)         
        ){
            // return do status code 400
            return message.ERROR_INVALID_ID
        
        } else {
    
            let validateStatus = true;
    
         // validação para verificar se podemos encaminhar os dados para o DA0
         if(validateStatus){
    
            // Encaminha os dados do filme para o DAO inserir dados
            let novaNacionalidadeDiretor = await nacionalidadesDAO.insertNacionalidadeDiretor(dadosNacionalidade);
    
            console.log(novaNacionalidadeDiretor);
    
            // validação para verificar se o DAO inseriu os dados do BD
            if (novaNacionalidadeDiretor){
                // se inseriu cria o JSON dos dados (201)
                nacionalidadeJSON.nacionalidade  = dadosNacionalidade
                nacionalidadeJSON.status = message.SUCCESS_CREATED_ITEM.status
                nacionalidadeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                nacionalidadeJSON.message = message.SUCCESS_CREATED_ITEM.message 
    
                return nacionalidadeJSON // 201
            }else{
             
                return message.ERROR_INTERNAL_SERVER_DB // 500
                }
            }   
          }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch(error){
        return message.ERROR_INTERNAL_SERVER // 500
    }
    
}
const setInserirNacionalidadeAtor = async function(dadosNacionalidade, contentType){
    
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
    
        let nacionalidadeJSON = {};
        
    
        // validação de campos obrigatorios ou com digitação inválida
        if(dadosNacionalidade.id_nacionalidade == '' ||dadosNacionalidade.id_nacionalidade == undefined || isNaN(dadosNacionalidade.id_nacionalidade) || 
            dadosNacionalidade.id_ator == '' ||dadosNacionalidade.id_ator == undefined || isNaN(dadosNacionalidade.id_ator)         
        ){
            // return do status code 400
            return message.ERROR_INVALID_ID
        
        } else {
    
            let validateStatus = true;
    
         // validação para verificar se podemos encaminhar os dados para o DA0
         if(validateStatus){
    
            // Encaminha os dados do filme para o DAO inserir dados
            let novaNacionalidadeAtor = await nacionalidadesDAO.insertNacionalidadeAtor(dadosNacionalidade);
    
            console.log(novaNacionalidadeAtor);
    
            // validação para verificar se o DAO inseriu os dados do BD
            if (novaNacionalidadeAtor){
                // se inseriu cria o JSON dos dados (201)
                nacionalidadeJSON.nacionalidade  = dadosNacionalidade
                nacionalidadeJSON.status = message.SUCCESS_CREATED_ITEM.status
                nacionalidadeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                nacionalidadeJSON.message = message.SUCCESS_CREATED_ITEM.message 
    
                return nacionalidadeJSON // 201
            }else{
             
                return message.ERROR_INTERNAL_SERVER_DB // 500
                }
            }   
          }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch(error){
        return message.ERROR_INTERNAL_SERVER // 500
    }
    
}


module.exports ={
    getListarNacionalidades,
    getBuscarNacionalidadeId,
    setInserirNacionalidadeDiretor,
    setInserirNacionalidadeAtor
}