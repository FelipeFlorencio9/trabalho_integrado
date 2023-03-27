/***************************************************************
 * Objetivo: Criar uma API para manipilção de dados de alunos
 * Autores: Genivania / Felipe
 * Data: 27/03/2023
 * Versão: 1.0
 ****************************************************************/


const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');


// IMPORT DO ARQUIVO DE FUNÇÕES
const cursos = require('./database/cursos.js');
const { require, response, request } = require('express');


//OBJETO COM AS INFORMAÇÕES DA CLASSE EXPRESS
const app = express();


//PERMISSÕES NO HEADER DA API
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONSS')

    app.use(cors())

    next()
});

//ENDPOINTS
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {


    let siglaCurso = require.query.sigla;
    let statusCode;
    let dadosCurso = {};

    //TRATAMENTOS DE VALIDAÇÃO
    if (siglaCurso == '' || siglaCurso == undefined) {
        statusCode = 400;
        dadosCurso.message = "Não foi possivel processar a requisição pois não atende a sigla desejada"
    } else {
        let curso = cursos.getCursos(siglaCurso);

        // VALIDAÇÃO DE RETORNO
        if (curso) {
            statusCode = 200;
            dadosCurso = curso;
        } else {
            statusCode = 404;
        }
    }
    response.status(statusCode);
    response.json(dadosCurso);
});
//