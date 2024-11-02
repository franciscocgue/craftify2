import express from 'express';

const router = express.Router();

router.get('/build', (req, res, next) => {
    res.send(req.baseUrl + req.url + ' accessed !!')
})

export default router;