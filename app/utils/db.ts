import { Db , MongoClient , Collection} from "mongodb"

const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("MONGO_URI is not defined");
}

let client : MongoClient;
let db : Db;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(uri as string);
        await client.connect();
        db = client.db();
    }
    return { client, db };
};

export const getCollection = async  () : Promise<Collection> => {
    if (!db) {
       const { db : database } = await connectToDatabase();
       return database.collection("taskflow");
    }
    return db.collection("taskflow");
};
