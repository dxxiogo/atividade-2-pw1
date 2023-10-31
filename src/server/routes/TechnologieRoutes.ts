import { Router } from "express";
import { getTechnologies, getTechnology, createTechnology, updateTechnology, deleteTechnology, updateStudiedStatus } from "../controllers/TechnologieControllers";
import { checkUserExist } from "../middlewares/CheckExistsUser";

const technologieRouter = Router();

technologieRouter.use('/technologie', checkUserExist);

technologieRouter.get('/technologie', getTechnology);

technologieRouter.get('/technologie/:id', getTechnology);

technologieRouter.post('/technologie', createTechnology);

technologieRouter.put('/technologie/:id',updateTechnology);

technologieRouter.delete('/technologie/:id', deleteTechnology);

technologieRouter.patch('/technologie/:id/studied', updateStudiedStatus )

export {technologieRouter};