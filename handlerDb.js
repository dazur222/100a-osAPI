const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ayden:idtVHp069SguGV8z@liamscluster.cmwhtwb.mongodb.net/";

const dbName = "cien_anos_de_soledad";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);


async function getPersonajes() {
     try { const data = await client.db(dbName).collection("personajes").find().toArray(); return data;} 
        catch (error) { console.error(error); } 
} 

async function  getCapitulos(){
    try { const data = await client.db(dbName).collection("capitulos").find().toArray(); return data;} 
    catch (error) { console.error(error); }
}


async function getLugares(){
 try { const data = await client.db(dbName).collection("lugares").find().toArray(); return data;} 
    catch (error) { console.error(error); }
}

async function getObjetos(){
     try { const data = await client.db(dbName).collection("objetos").find().toArray(); return data;} 
    catch (error) { console.error(error); }
}
