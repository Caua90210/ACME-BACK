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

const selectAtorNacionalidade = async function(id){
    
    try {
        let sql = `
        SELECT n.nome 
        FROM tbl_ator_nacionalidade AS i
        JOIN tbl_nacionalidade AS n ON i.id_nacionalidade = n.id_nacionalidade
        JOIN tbl_ator AS a ON i.id_ator = a.id_ator
        WHERE a.id_ator = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql);
        return rsNacionalidade;
        
    } catch (error) {
        return false;
    }
}

const selectDiretorNacionalidade = async function(id){
    try {
        let sql = `
        SELECT n.nome 
        FROM tbl_diretor_nacionalidade AS i
        JOIN tbl_nacionalidade AS n ON i.id_nacionalidade = n.id_nacionalidade
        JOIN tbl_diretor AS a ON i.id_diretor = a.id_diretor
        WHERE a.id_diretor = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql);
        return rsNacionalidade;
        
    } catch (error) {
        return false;
    }
}

const insertNacionalidadeDiretor = async function(dadosNacionalidade) {
    try {
        let sql = `insert into tbl_diretor_nacionalidade(
            id_diretor, id_nacionalidade
            )values
            (${dadosNacionalidade.id_diretor},
            ${dadosNacionalidade.id_nacionalidade})`
        let nacionalidade = await prisma.$queryRawUnsafe(sql)
       if(nacionalidade){
        return true
       }
    } catch (error) {
        return false
    }
}
const insertNacionalidadeAtor = async function(dadosNacionalidade) {
    try {
        let sql = `insert into tbl_ator_nacionalidade(
            id_ator, id_nacionalidade
            )values
            (${dadosNacionalidade.id_ator},
            ${dadosNacionalidade.id_nacionalidade})`
        let nacionalidade = await prisma.$executeRawUnsafe(sql)
        return nacionalidade;
    } catch (error) {
        return false
    }
}


module.exports = {
    selectAllNacionalidades,
    selectNacionalidaeById,
    selectAtorNacionalidade,
    selectDiretorNacionalidade,
    insertNacionalidadeDiretor,
    insertNacionalidadeAtor

}