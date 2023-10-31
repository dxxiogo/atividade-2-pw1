import { RequestHandler } from "express";
import { Technology} from "../../../@types/types";
import { users } from "../database";
import { v4 as uuidv4 } from 'uuid';


export const createTechnology: RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    console.log('Passou pelo controller')
    if(user){
        const {title, deadline} = req.body as Technology;
        const newTechnology: Technology = {
            id: uuidv4(),
            title,
            studied: false,
            deadline: new Date(deadline),
            created_at: new Date(),
        }
        user.technologies.push(newTechnology);
        return res.status(201).json(newTechnology);
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}

export const getTechnologies: RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    if(user){
        return res.status(200).json(user.technologies);
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}


export const getTechnology:RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    if(user){
        const technology = user.technologies.find(tech => tech.id === req.params.id)
        if(technology)
            return res.status(200).json(technology);
        return res.status(404).send({error: 'Tecnologia não encontrada'});
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}

export const deleteTechnology:RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    if(user){
        const technologyFound = user.technologies.find(tech => tech.id === req.params.id);
        if(!technologyFound){
            return res.status(404).json({erro:"Tecnologia não encontrada"})
        }
        user.technologies.filter(tech => tech.id !== technologyFound?.id)
        return res.status(200).json({message: "Tecnologia excluída com sucesso"})
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}

export const updateTechnology:RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    if(user){
        const {title, deadline} = req.body as Technology;
        const technologyFound = user.technologies.find(tech => tech.id === req.params.id);
        if(!technologyFound){
            return res.status(404).json({erro:"Tecnologia não encontrada"})
        }
        technologyFound.title = title;
        technologyFound.deadline = new Date(deadline);
        return res.status(201).json(technologyFound);
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}

export const updateStudiedStatus: RequestHandler = (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    if(user){
        const technologyFound = user.technologies.find(tech => tech.id === req.params.id);
        if(!technologyFound){
            return res.status(404).json({erro:"Tecnologia não encontrada"})
        }
        technologyFound.studied = technologyFound.studied ? false : true;
        return res.status(201).json(technologyFound);
    } 
    return res.status(404).send({error: 'Usuário não encontrado!'})
}