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

const selectAllGeneros = async function(){

    try {
        let sql = 'select * from tbl_genero order by id_genero desc'; 

    let rsGenero = await prisma.$queryRawUnsafe(sql)
console.log(rsGenero)
    if(rsGenero.length > 0 )
    return rsGenero
    } catch (error) {
        return false 
    };    
}


const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero WHERE id_genero = ${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero
    } catch (error) {
        return false
    }
}


const selectGeneroById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_genero where id_genero = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsGenero = await prisma.$queryRawUnsafe(sql);

            return rsGenero;
    
        } catch (error) {
            return false;
            
        }
}


const insertGenero = async function(dadosGenero){
    
    try {
    
        let sql;

         sql = `insert into tbl_genero ( 
            nome
    ) values (
                '${dadosGenero.nome}'
    )`;

        //$executeRawUnsafe serve para executar scripts sem retorno de dados
            //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}


const InsertByIdGenero = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id_genero from tbl_genero limit 1`;
        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;

    } catch (error) {
        return false        
    }
}


//funcao para atualizar um genero no banco de dados
const updateGenero = async function(id,dadosGenero){
    try{

        let sql;

        
            sql = `UPDATE tbl_genero SET nome = '${dadosGenero.nome}'
                where tbl_genero.id_genero = ${id};`
        

        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}

const generoFilme = async function(id){
    try {
        let sql = `SELECT tbl_genero.nome
        FROM tbl_filme_genero
        JOIN tbl_genero ON tbl_filme_genero.id_genero = tbl_genero.id_genero
        WHERE tbl_filme_genero.id_filme = ${id}`
        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
}




module.exports = {
    selectAllGeneros,
    deleteGenero,
    selectGeneroById,
    insertGenero,
    InsertByIdGenero,
    updateGenero,
    generoFilme
}