const express = require('express');
const app = express();
const port = 3000;
const path = require("path")

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ayden:idtVHp069SguGV8z@liamscluster.cmwhtwb.mongodb.net/";

const dbName = "cien_anos_de_soledad";

const client = new MongoClient(uri);
let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
  }
}

async function getPersonajes() {
  try {
    await connectDB();
    return await client.db(dbName).collection("personajes").find().toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCapitulos() {
  try {
    await connectDB();
    return await client.db(dbName).collection("capitulos").find().toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getLugares() {
  try {
    await connectDB();
    return await client.db(dbName).collection("lugares").find().toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getObjetos() {
  try {
    await connectDB();
    return await client.db(dbName).collection("objetos").find().toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getPersonajesbyName(character) {
  try {
    await connectDB();
    return await client.db(dbName).collection("personajes").find({ nombre: character }).toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCapitulosbyName(NameChapter) {
  try {
    await connectDB();
    return await client.db(dbName).collection("capitulos").find({ nombre: NameChapter }).toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getObjetobyName(objectName) {
  try {
    await connectDB();
    return await client.db(dbName).collection("objetos").find({ nombre: objectName }).toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getLugaresbyName(placeName) {
  try {
    await connectDB();
    return await client.db(dbName).collection("lugares").find({ nombre: placeName }).toArray();
  } catch (error) {
    console.error(error);
    return [];
  }
}
app.use(express.static(path.join(__dirname,'public')))

app.get('/search/personajes', async (req, res) => {
  const { q } = req.query;
  const results = await getPersonajesbyName(q);
  res.json(results);
});

app.get('/search/capitulos', async (req, res) => {
  const { q } = req.query;
  const results = await getCapitulosbyName(q);
  res.json(results);
});

app.get('/search/lugares', async (req, res) => {
  const { q } = req.query;
  const results = await getLugaresbyName(q);
  res.json(results);
});

app.get('/search/objetos', async (req, res) => {
  const { q } = req.query;
  const results = await getObjetobyName(q);
  res.json(results);
});
app.get('/', (req, res) => {
  res.sendFile("/home/offline/Documents/Progra/Proyectos/100años/index.html")
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
