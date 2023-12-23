// index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mobileRoutes  from "./routes/mobileRoutes.js"
import connection from './db.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));



// Use mobile routes
app.use('/', mobileRoutes);


// Connect to the database
const username=process.env.DB_Username;
const password=process.env.DB_Password;

const URL=process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@crud-app.uqoyrsf.mongodb.net/?retryWrites=true&w=majority`;

connection(URL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
