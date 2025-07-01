import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

client = new MongoClient(MONGODB_URI, options);
clientPromise = client.connect();

export default clientPromise;