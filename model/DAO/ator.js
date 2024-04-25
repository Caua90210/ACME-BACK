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
        if (dadosAtor.data_falecimento && dadosAtor.data_falecimento !== '') {
            sql = `
                INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, foto, id_sexo)
                VALUES (
                    "${dadosAtor.nome}",
                    "${dadosAtor.nome_artistico}",
                    "${dadosAtor.data_nascimento}",
                    "${dadosAtor.data_falecimento}",
                    "${dadosAtor.biografia}",
                    "${dadosAtor.foto}",
                    "${dadosAtor.id_sexo}"
                )
            `;
        } else {
            sql = `
                INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, foto, id_sexo)
                VALUES (
                    "${dadosAtor.nome}",
                    "${dadosAtor.nome_artistico}",
                    "${dadosAtor.data_nascimento}",
                    NULL,
                    "${dadosAtor.biografia}",
                    "${dadosAtor.foto}",
                    "${dadosAtor.id_sexo}"
                )
            `;
        }

        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql);

        return !!result; // Convertendo para booleano

    } catch (error) {
        console.error(error);
        return false;
    }
}

// Função para atualizar um filme no banco de dados;
const updateAtor = async function(dadoAtualizado, idAtor) {
    try{
        let sql
        if(dadoAtualizado.data_falecimento != '' &&
        dadoAtualizado.data_falecimento   != null &&
        dadoAtualizado.data_falecimento   != undefined){
            sql = `update tbl_ator SET 
            nome = '${dadoAtualizado.nome}',
            nome_artistico = '${dadoAtualizado.nome_artistico}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            data_falecimento = '${dadoAtualizado.data_falecimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            WHERE
           tbl_ator.id_ator = ${idAtor}`
        }else{
            sql = `update tbl_ator SET 
            nome = '${dadoAtualizado.nome}',
            nome_artistico = '${dadoAtualizado.nome_artistico}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            WHERE
            tbl_ator.id_ator = ${idAtor}`
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
        const sql = `
        DELETE FROM tbl_ator WHERE id_ator = ${id};
        `
        let rsAtor = await prisma.$executeRawUnsafe(sql)
        return rsAtor

    } catch (error) {
        return false
    }
}
const deleteAtorNacionalidade = async function(id){
    try {
        const sql = `
        DELETE FROM tbl_ator_nacionalidade WHERE id_ator = ${id}
        `
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
        const sql = `select * from tbl_ator where id_ator = ${id}`
    
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
    deleteAtorNacionalidade,
    IDAtor
}