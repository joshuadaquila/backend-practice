const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://joshuadaq:Scribbles24.@cluster0.59wsybx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

client.connect()
  .then(()=>{
    console.log("Connected to the database.");
  })
  .catch((err)=>{
    console.log(err);
  });

const database = client.db("sample");
const usersCollection = database.collection("users");

module.exports = usersCollection;
