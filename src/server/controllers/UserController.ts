import { RequestHandler } from "express";
import { users } from "../database";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../../@types/types";

export const createUser: RequestHandler<User> = (req, res) => {
    const {name, username} = req.body   
    const userExists = users.find((user) => user.username === username );
    if(userExists) {
        return res.status(400).send('Usuário já existe!');
    }
    const newUser:User =  {id: uuidv4(),
                           name, 
                           username, 
                           technologies: []}
    users.push(newUser)
    res.status(201).json(newUser);
}

export const getUsers: RequestHandler = (req, res) => {
    res.status(200).send(users);
}