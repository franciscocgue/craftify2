import express from "express";
import { builder, clientMessenger, serverEvents, getProjects } from "../controllers";

const router = express.Router();

router.post('/build', builder);

// create server-side events connection
router.get('/events/:clientId', serverEvents);

// message client
router.post('/broadcast', clientMessenger)

// get projects
router.get('/projects', getProjects);



export default router;