require('dotenv').config();

import express from "express";
import mongoose from "mongoose";
import { bodyParser } from "json-server";

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, ()=>console.log("connected to calendar"));

app.listen(3000, console.log("memulai server"));