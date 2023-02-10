import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 8081;

const app = express();

// We need our frontend to be able to make requests
// to our server from a different URL (a different origins)
app.use(cors());

// We need to parse JSON received in requests' `body`
app.use(express.json());

// Build random animals
import Chance from "chance";
const chance = new Chance();
const animals = [...Array(250).keys()];

app.listen(PORT, () => console.log("🚀 Listening server on port ${}"));
