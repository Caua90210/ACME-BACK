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


const selectAllSexos = async function(){

    try {
        let sql = 'select * from tbl_sexo order by id_sexo desc'; 

    let rsSexo = await prisma.$queryRawUnsafe(sql)
    
    if(rsSexo.length > 0 )
    return rsSexo
    } catch (error) {
        return false 
    };    
}

const selectSexoById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_sexo where id_sexo = ${id}`;

        // Executa no banco de dados o script sql
        let rsSexo = await prisma.$queryRawUnsafe(sql);

            return rsSexo;
    
        } catch (error) {
            return false;
            
        }
    }


module.exports = {
    selectAllSexos,
    selectSexoById

}