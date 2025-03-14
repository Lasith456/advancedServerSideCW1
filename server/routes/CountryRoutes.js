import express from "express";
import {getAllCountry} from "../controllers/countryController.js"
import { IsUser } from "../middleware/verifyUser.js";
import { apiKeyValidation } from "../middleware/apiKeyValidation.js";

const CountryRoutes = express.Router();

CountryRoutes.post("/",IsUser,apiKeyValidation,getAllCountry);

export default CountryRoutes;