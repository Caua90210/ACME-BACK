/****************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados MySQL,
 * aqui realizamos o CRUD utilizando a linguagem sql
 * Data: 01/02/2024
 * Autor: Cauã
 * Versão: 1.0
 ****************************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const selectAllNacionalidades = async function(){

    try {
        let sql = 'select * from tbl_nacionalidade order by id_nacionalidade desc'; 

    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
    
    if(rsNacionalidade.length > 0 )
    return rsNacionalidade
    } catch (error) {
        return false 
    };    
}

const selectNacionalidaeById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_nacionalidade where id_nacionalidade = ${id}`;

        // Executa no banco de dados o script sql
        let rsNacionalidade = await prisma.$queryRawUnsafe(sql);

            return rsNacionalidade;
    
        } catch (error) {
            return false;
            
        }
    }


module.exports = {
    selectAllNacionalidades,
    selectNacionalidaeById
    

}