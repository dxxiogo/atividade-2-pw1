import express from "express";


export const server = express();

server.get('/', () => console.log('Servidor ativo!'))