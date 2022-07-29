import { People } from "./controller";

const express = require('express');
const Router = express.Router();

Router.get('/', async (req: any, res: any) => {
    try {
        const username = req.query.username;
        const peopleService = new People();
        const { data, status } = await peopleService.getPersonByUsername(username);
        res.status(status).send(data);
    } catch(error) {
        throw error;
    }
});

Router.post('/compare', async (req: any, res: any) => {
    try {
        const userOne = req.body.userOne;
        const userTwo = req.body.userTwo;
        const skills = req.body.skills;
        const peopleService = new People();
        const response = await peopleService.compareUsersForOpportunityFit(userOne, userTwo, skills);
        res.status(200).send(response);
    } catch(error) {
        throw error;
    }
});

export default Router;