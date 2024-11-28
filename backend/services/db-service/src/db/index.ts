import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DB_CONNECTION_STRING;

console.log(uri)

let client: MongoClient | null = null;

async function dbConnect() {

    if (!client) {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        client = new MongoClient(uri as string, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        try {
            await client.connect();
            console.log("Successfully connected to MongoDB!");
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }

    } else {
        return client;
    }
};

const getClient = () => {
    if (!client) {
        throw new Error("MongoDB client is not initialized. Call connectToMongo() first.");
    }
    return client;
};

// run().catch(console.dir);

export {
    dbConnect,
    getClient,
};