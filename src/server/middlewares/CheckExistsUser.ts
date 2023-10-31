import { RequestHandler } from "express";
import { users } from "../database";

export const checkUserExist:RequestHandler = async (req, res, next) => {
    const username = users.find(user => user.username === req.headers.username); 
    try {
        if(username) {
            return next();
        } else {
            return res.status(404).send({error: 'Usuário não encontrado!'})
        }
    } catch (err) {
        res.status(500).send({err});
    }
}