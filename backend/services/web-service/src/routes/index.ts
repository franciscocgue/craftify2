import express from "express";
import {
    builder, clientMessenger, serverEvents,
    getProjects, addProject, deleteProject,
    getProjectObject, validateAppId
} from "../controllers";

const router = express.Router();

router.post('/build', builder);

// create server-side events connection
router.get('/events/:clientId', serverEvents);

// message client
router.post('/broadcast', clientMessenger)

// projects
router.get('/projects', getProjects);
router.get('/projects/:appId', getProjects);
router.post('/create-project', addProject);
router.post('/delete-project', deleteProject);
router.post('/get-project-object', getProjectObject);
router.post('/validate-appid', validateAppId);

export default router;