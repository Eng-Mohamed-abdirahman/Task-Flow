import { Db , MongoClient , Collection} from "mongodb"

const uri = process.env.DATABASE_URL;

if(!uri){
    throw new Error("DATABASE_URL is not defined");
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
