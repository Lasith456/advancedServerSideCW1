import { createTable, dropTable } from '../config/database.js';
import express from "express";

const DBRoutes = express.Router();
DBRoutes.get('/createDB', async (req, res) => {
    await createTable();
    res.send('✅ Users table has been created.');
});

DBRoutes.get('/dropDB', async (req, res) => {
    await dropTable();
    res.send('✅ Users table has been dropped.');
});

export default DBRoutes;
