/****************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados MySQL,
 * aqui realizamos o CRUD utilizando a linguagem sql
 * Data: 01/02/2024
 * Autor: Vinicius
 * Versão: 1.0
 ****************************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserir um novo filme no banco de dados;
const insertAtor = async function(dadosAtor){
    let sql

     try {
        if(dadosAtor.data_falecimento != '' &&
         dadosAtor.data_falecimento  != null &&
         dadosAtor.data_falecimento   != undefined){
             sql = `insert into tbl_ator (  nome, 
                                            nome_artistico,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            foto,
                                            id_sexo       
                )values(
                                           '${dadosAtor.nome}',
                                           '${dadosAtor.nome_artistico}',
                                           '${dadosAtor.data_nascimento}',
                                           '${dadosAtor.data_falecimento}',
                                           '${dadosAtor.biografia}',
                                           '${dadosAtor.foto}',
                                           '${dadosAtor.id_sexo}'
                )`

        }else{
            
            sql = `insert into tbl_filme (
                nome, 
                nome_artistico,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                id_sexo      
)values(
    '${dadosAtor.nome}',
    '${dadosAtor.nome_artistico}',
    '${dadosAtor.data_nascimento}',
    null,
    '${dadosAtor.biografia}',
    '${dadosAtor.foto}',
    '${dadosAtor.id_sexo}'
)`
        }

             //$executeRawUnsafe() -> serve para executar scripts sem retorno de dados 
               // (insert, update e delete)
            //$queryRawUnsafe() -> serve para executar scripts com retorno de dados (select)

            console.log(sql)
             let result = await prisma.$executeRawUnsafe(sql)
    
             if(result){
                return true
             }else{
                return false
             }
        
     } catch (error) {
        
        return false
     }
}

// Função para atualizar um filme no banco de dados;
const updateAtor = async function(id, dadoAtorAtualizado) {
let sql
try{
    if(dadoAtorAtualizado.data_falecimento != '' &&
    dadoAtorAtualizado.data_falecimento   != null &&
    dadoAtorAtualizado.data_falecimento   != undefined){
        sql = `update tbl_ator set 
        nome = "${dadoAtorAtualizado.nome}",
        nome_artistico = "${dadoAtorAtualizado.nome_artistico}",
        data_nascimento = '${dadoAtorAtualizado.data_nascimento}',
        data_falecimento = '${dadoAtorAtualizado.data_falecimento}',
        biografia = '${dadoAtorAtualizado.biografia}',
        foto = '${dadoAtorAtualizado.foto}',
        id_sexo = '${dadoAtorAtualizado.id_sexo}'
        where
        id = ${id}`
    }else{
        sql = `update tbl_filme set 
        nome = "${dadoAtorAtualizado.nome}",
        nome_artistico = "${dadoAtorAtualizado.nome_artistico}",
        data_nascimento = '${dadoAtorAtualizado.data_nascimento}',
        biografia = '${dadoAtorAtualizado.biografia}',
        foto = '${dadoAtorAtualizado.foto}',
        id_sexo = '${dadoAtorAtualizado.id_sexo}'
        where
        id = ${id}`
    }
    console.log(sql)
    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result){
       return true
    }else{
       return false
    }
}catch(error){
    return false
}
}

// Função para excluir um filme no banco de dados;
const deleteAtor = async function(id){
    try {
        const sql = `delete from tbl_ator where id = ${id}`
        let rsAtor = await prisma.$executeRawUnsafe(sql)
        return rsAtor

    } catch (error) {
        return false
    }
}

// Função para listar todos os filmes do banco de dados;
const selectAllAtores = async function(){
    try {
        let sql = 'select * from tbl_ator'
    
        // $queryRawUnsafe(sql)
        // $queryRawUnsafe('select * from tbl_filme')
        let rsAtor = await prisma.$queryRawUnsafe(sql) 
        return rsAtor
    } catch (error) {
        return false
    }



}

// Função para buscar um filme do banco de dados pelo ID;
const selectByIdAtor = async function(id){

    try {
        // Script sql para buscar o filme pelo id
        const sql = `select * from tbl_Ator where id = ${id}`
    
        // Caminha o script sql para o banco de dados
        let rsAtor = await prisma.$queryRawUnsafe(sql)
    
        return rsAtor
    } catch (error) {
        return false
    }

}

const selectNameAtores = async function(nome){
    try {
        let sql = `select * from tbl_ator where nome like"%${nome}%"`
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }



}

const IDAtor = async function(){
    try {
        let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_ator limit 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}


module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor,
    selectNameAtores,
    IDAtor
}