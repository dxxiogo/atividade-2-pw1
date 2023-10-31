import { RequestHandler } from "express";
import { users } from "../database";

export const checkUserExist:RequestHandler = (req, res, next) => {
    const user = users.find(user => user.username === req.headers.username); 
    try {
        console.log(user)
        if(user) {
            return next();
        } else {
            return res.status(404).send({error: 'Usuário não encontrado!'})
        }
    } catch (err) {
        res.status(500).send({err});
    }
}