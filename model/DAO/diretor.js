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
const insertDiretor = async function(dadosDiretor){

    let sql

    try {
        if (dadosDiretor.data_falecimento && dadosDiretor.data_falecimento !== '') {
            sql = `
            insert into tbl_diretor(nome, data_nascimento , data_falecimento, biografia, foto, id_sexo ) values(
                '${dadosDiretor.nome}',
                '${dadosDiretor.data_nascimento}',
                '${dadosDiretor.data_falecimento}',
                '${dadosDiretor.biografia}',
                '${dadosDiretor.foto}',
                '${dadosDiretor.id_sexo}'
         )
            `;
        } else {
            sql = `
                INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, biografia, foto, id_sexo)
                VALUES (
                    '${dadosDiretor.nome}',
                    '${dadosDiretor.data_nascimento}',
                    NULL,
                    '${dadosDiretor.biografia}',
                    '${dadosDiretor.foto}',
                    '${dadosDiretor.id_sexo}'
                )
            `;
        }

        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql);
        if(result){
            let idDiretor=await IdDiretor()
            
            for(let nacionaliadade of dadosDiretor.id_nacionalidade){
                sql=`insert into tbl_diretor_nacionalidade(
                        id_diretor,
                        id_nacionalidade
                    ) values(
                        ${idDiretor[0].id_diretor},
                        ${nacionaliadade}
                    )`
                let result = await prisma.$executeRawUnsafe(sql)
                
                if(result)
                    return true
                else
                    return false
            }
            return true
        }

        return !!result; 

    } catch (error) {
        console.error(error);
        return false;
    }
}

// Função para atualizar um filme no banco de dados;
const updateDiretor = async function(id, dadoDiretorAtualizado) {

let sql
try{
    if(dadoDiretorAtualizado.data_falecimento != '' &&
    dadoDiretorAtualizado.data_falecimento   != null &&
    dadoDiretorAtualizado.data_falecimento   != undefined){
        sql = `update tbl_diretor set 
        nome = '${dadoDiretorAtualizado.nome}',
        data_nascimento = '${dadoDiretorAtualizado.data_nascimento}',
        data_falecimento = '${dadoDiretorAtualizado.data_falecimento}',
        biografia = '${dadoDiretorAtualizado.biografia}',
        foto = '${dadoDiretorAtualizado.foto}',
        id_sexo = '${dadoDiretorAtualizado.id_sexo}'
        where
        tbl_diretor.id_diretor = ${id}`
    }else{
        sql = `update tbl_diretor set 
        nome = '${dadoDiretorAtualizado.nome}',
        data_nascimento = '${dadoDiretorAtualizado.data_nascimento}',
        biografia = '${dadoDiretorAtualizado.biografia}',
        foto = '${dadoDiretorAtualizado.foto}',
        id_sexo = '${dadoDiretorAtualizado.id_sexo}'
        where
        tbl_diretor.id_diretor = ${id}`
    }
    console.log(sql)
    let result = await prisma.$executeRawUnsafe(sql)
    console.log(result);
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
        let sql = `SELECT id_diretor FROM tbl_diretor ORDER BY id_diretor DESC LIMIT 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}


module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectNameDiretor,
    deleteDiretorNacionalidade,
    IdDiretor
}