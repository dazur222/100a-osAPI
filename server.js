const express = require('express');
const app = express();
const port = 3000;
const path = require("path")
const fs = require('fs');
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ayden:idtVHp069SguGV8z@liamscluster.cmwhtwb.mongodb.net/";

const dbName = "kevindb";

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

async function getEventobyName(eventname){
  try{
    await connectDB();
    return await client.db(dbName).collection("eventos").find({evento: eventname}).toArray();
  }catch(error){
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

app.get('/search/eventos', async (req,res) => {
  const { q } = req.query;
  const results = await getEventobyName(q);
  res.json(results);
  });

app.put('/editar/:categoria/:id', async (req, res) => {


    const categoria = req.params.categoria; 
    const id = req.params.id; 
    const data = req.body;   

  console.log("PUT /editar llamado"); //NO IMPRIME NI MADRES
  console.log("Categoria:", categoria);
  console.log("ID:", id);
  console.log("Datos recibidos:", data);
if (!data || Object.keys(data).length === 0) {
  console.error("Body vacío o inválido:", data);
  return res.status(400).json({ error: 'Cuerpo de la solicitud vacío o inválido' });
}
  
    try {
      await connectDB();
      if (!ObjectId.isValid(id)) {
        console.error("ID inválido recibido:", id);
        return res.status(400).json({ error: 'ID inválido: no es ObjectId VALIDO' });
      }
      
      const result = await client.db(dbName).collection(categoria).updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Elemento no encontrado en MongoDB' });
      }
  
      res.json({ mensaje: 'Elemento actualizado correctamente en MongoDB' });
    } catch (error) {
      console.error('Error actualizando MongoDB:', error);
      res.status(500).json({ error: 'Error interno al actualizar en MongoDB' });
    }
});
app.post('/agregar/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  const data = req.body;

  console.log("POST /agregar llamado");
  console.log("Categoria:", categoria);
  console.log("Datos recibidos:", data);

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Datos vacíos o inválidos' });
  }

  try {
    await connectDB();

    const result = await client.db(dbName).collection(categoria).insertOne(data);

    res.status(201).json({
      mensaje: 'Elemento agregado correctamente',
      idInsertado: result.insertedId
    });
  } catch (error) {
    console.error('Error al insertar en MongoDB:', error);
    res.status(500).json({ error: 'Error interno al agregar el elemento' });
  }
});


app.get('/', (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, 'public') });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
