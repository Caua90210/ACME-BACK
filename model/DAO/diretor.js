/****************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados MySQL,
 * aqui realizamos o CRUD utilizando a linguagem sql
 * Data: 01/02/2024
 * Autor: Cauã
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
            
            sql = `insert into tbl_ator (
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
            console.log(dadosAtor)
            console.log(sql)
             let result = await prisma.$executeRawUnsafe(sql)
            console.log(result)
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
const deleteDiretor = async function(id){
    try {
        const sql = `
        DELETE FROM tbl_diretor WHERE id_diretor = ${id};
        `
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        return rsDiretor

    } catch (error) {
        return false
    }
}
const deleteDiretorNacionalidade = async function(id){
    try {
        const sql = `
        DELETE FROM tbl_diretor_nacionalidade WHERE id_diretor = ${id}
        `
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        return rsDiretor

    } catch (error) {
        return false
    }
}

// Função para listar todos os filmes do banco de dados;
const selectAllDiretores = async function(){
    try {
        let sql = 'select * from tbl_diretor'
    
        // $queryRawUnsafe(sql)
        // $queryRawUnsafe('select * from tbl_filme')
        let rsDiretor = await prisma.$queryRawUnsafe(sql) 
        return rsDiretor
    } catch (error) {
        return false
    }



}

// Função para buscar um filme do banco de dados pelo ID;
const selectByIdDiretor = async function(id){

    try {
        // Script sql para buscar o filme pelo id
        const sql = `select * from tbl_diretor where id_diretor = ${id}`
    
        // Caminha o script sql para o banco de dados

        let rsDiretor= await prisma.$queryRawUnsafe(sql)
       
        return rsDiretor
    } catch (error) {
        return false
    }

}

const selectNameDiretor = async function(nome){
    try {
        let sql = `select * from tbl_diretor where nome like"%${nome}%"`
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }



}

const IdDiretor = async function(){
    try {
        let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_diretor limit 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}


module.exports = {
    insertAtor,
    updateAtor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectNameDiretor,
    deleteDiretorNacionalidade,
    IdDiretor
}