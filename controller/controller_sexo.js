/****************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistências de dados de filme
 * Data: 03/04/2024
 * Autor: Cauã da Silva
 * Versão: 2.0
 ****************************************************************/

// Import do arquivo responsavel pela interação com DB(model)
const sexoDAO = require('../model/DAO/sexo.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

const getListarSexos = async function(){

    try {

    // Cri o objeto JSON
    let sexoJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosSexo = await sexoDAO.selectAllSexos();

    // Validação para verificar s existem dados 
    if (dadosSexo){

        if(dadosSexo.length > 0){
            // Cria o JSON para devolver para o APP
            sexoJSON.nacionalidade = dadosSexo;
            sexoJSON.quantidade = dadosSexo.length;
            sexoJSON.status_code = 200;
        return sexoJSON;
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
const getBuscarSexoId = async function (id){

    try{
    
    // Recebe o id do genero
    let idSexo = id;
    //Cria o objeto JSON
    let sexoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if( idSexo == '' ||idSexo == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosSexo = await sexoDAO.selectSexoById(id)

        // verifca se o DAO retornou dados 
        if(dadosSexo){

            // Validação para verificar a quantidade de itens retornados
            if(dadosSexo.length > 0){
                 // Cria o JSON para retorno 
                 sexoJSON.nacionalidade = dadosSexo;
                 sexoJSON.status_code = 200;

            return sexoJSON;
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

module.exports ={
    getListarSexos,
    getBuscarSexoId
}