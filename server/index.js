import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import DBRoutes from './routes/dbRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import CountryRoutes from './routes/CountryRoutes.js';

dotenv.config();
const port=process.env.PORT || 3001 ;
const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', DBRoutes);
app.use('/api', AuthRoutes);
app.use('/api/country', CountryRoutes);

app.listen(port,()=>{
    console.log("Server is runing on port :",port);
})