const express = require('express')
const dontenv = require('dotenv')
const cors =require('cors')
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
dontenv.config()
const uri = process.env.MONGO_URI;
const app = express()


app.use(cors())
app.use(express.json())
const port = process.env.PORT;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    descriptionErrors: true
  }
});


const JWKS = createRemoteJWKSet(new URL(`${process.env.AUTH_URL}/api/auth/jwks`));

const verifyToken = async (req, res, next) => {
  const authHeaders = req?.headers?.authorization;
  
  
  if (!authHeaders) {
    return res.status(401).json({ message: 'unauthorized' })
  }
  const token = authHeaders.split(" ")[1];
 
  if (!token) { return res.status(401).json({ message: 'unauthorized' }) }

  try {
    const { payload } = await jwtVerify(token, JWKS)
    console.log(payload, 'OK');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' })
  }
}
 




const run = async () => {
  try {

    // client.connect();
    const db = client.db('wanderland');
    const addCollection = db.collection('destination');
    const bookingCollection = db.collection('bookings');
app.get('/destination', (req, res) => {
  res.send('Destination data here');
});
    app.get('/destination', async (req, res) => {
      const result =await addCollection.find().toArray();
      res.send(result)
    })

    app.post('/destination', async (req, res) => {
      const db = req.body;

      const result = await addCollection.insertOne(db)
      res.send(result)
    });
    app.get('/destination/:id',verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = {
        _id:new ObjectId(id)
      }
      const result = await addCollection.findOne(query);
      res.send(result)
    })
    app.patch('/destination/:id',verifyToken, async (req, res) => {
      const { id } = req.params;
      const modify = req.body;
      const result = await addCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: modify })
      res.send(result)
    });
    app.delete('/destination/:id',verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await addCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result)
    });
    app.post('/booking',verifyToken, async (req, res) => {
      const bookings = req.body;
      const result = await bookingCollection.insertOne(bookings);
      res.send(result)
    });
    app.get('/bookings/:userId',verifyToken, async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId: userId }).toArray();
      res.send(result)
    });
    app.delete('/bookings/:bookingsId',verifyToken, async (req, res) => {
      const { bookingsId } = req.params;
      const result = await bookingCollection.deleteOne({ _id: new ObjectId(bookingsId) });
      res.send(result)
    })
  

  

   
    
    // await client.db('admin').command({ ping: 1 });
    console.log('ping is connect succesfully')

  } finally {
    
  }
  
}
run().catch(console.dir)


app.listen(port, () => {
  console.log(`sever running on port ${port}`)
})