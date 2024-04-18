/****************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados MySQL,
 * aqui realizamos o CRUD utilizando a linguagem sql
 * Data: 01/02/2024
 * Autor: Cauã
 * Versão: 1.0
 ****************************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');
const { selectAllFilmes } = require('./filme');

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllClassificacao = async function(){

    try {
        let sql = 'select * from tbl_classificacao order by id_classificacao desc'; 

    let rsClassificacao = await prisma.$queryRawUnsafe(sql)
console.log(rsClassificacao)
    if(rsClassificacao.length > 0 )
    return rsClassificacao
    } catch (error) {
        return false 
    };    
}


const deleteClassficacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao WHERE id_classificacao = ${id}`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao
    } catch (error) {
        return false
    }
}


const selectClassificacaoById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_classificacao where id_classificacao = ${id}`;

        // Executa no banco de dados o script sql
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

            return rsClassificacao;
    
        } catch (error) {
            return false;
            
        }
        
}


const insertClassificacao = async function(dadosClassificacao){
    
    try {
    
        let sql;

         sql = `  insert into tbl_classificacao(faixa_etaria, classificacao, caracteristicas, icone )values
         (
             '${dadosClassificacao.faixa_etaria}',
             '${dadosClassificacao.classificacao}',
              '${dadosClassificacao.caracteristicas}',
              '${dadosClassificacao.icone}'
         )`;

        let result = await prisma.$executeRawUnsafe(sql);
        
     
        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}


const InsertByIdClassificacao = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id_classificacao from tbl_classificacao limit 1`;
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao;

    } catch (error) {
        return false        
    }
}


//funcao para atualizar um genero no banco de dados
const updateClassificacao = async function(id,dadosClassificacao){
    try{

        let sql;

        
            sql = `UPDATE tbl_classificacao SET

                faixa_etaria = '${dadosClassificacao.faixa_etaria}',
                classificacao  = '${dadosClassificacao.classificacao}',
                caracteristicas = '${dadosClassificacao.caracteristicas}',
                icone =  '${dadosClassificacao.icone}'
                where tbl_classificacao.id_classificacao = ${id};`
        

        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}




module.exports = {
    selectAllClassificacao,
    deleteClassficacao,
    selectClassificacaoById,
    insertClassificacao,
    InsertByIdClassificacao,
    updateClassificacao
}