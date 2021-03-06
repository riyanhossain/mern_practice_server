const express = require('express')
const app=express()
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mehrabriyan:Cr6J4QfXRe3rBPn@cluster0.f6ym0.mongodb.net/mernFormData?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("mernFormData").collection("formData");
  // perform actions on the collection object
  app.post('/userInfo', (req, res) => {
    const userInfo= req.body;
    collection.insertOne(userInfo)
    .then(result =>{
      console.log(result);
    })
  })


  app.get('/userData', (req, res) => {
    const userInfo= req.body;
    collection.find({})
    .toArray((err, documents)=> {
      res.send(documents)
    })
  })
  app.delete('/delete/:id',(req, res) =>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
  })
  app.get('/userData/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents)=> {
      res.send(documents[0])
    })
  })

  app.patch('/update/:id', (req, res) => {
    collection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {name: req.body.name, email: req.body.email, salary: req.body.salary, gender: req.body.gender}
    })
    .then(result =>{
      console.log(result);
    })
  })


});

app.get("/", (req, res)=>{
    res.send('im working')
})

app.listen(5000)