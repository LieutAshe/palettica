import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("palettica");

    if (req.method === "GET") {
      const { ObjectId } = require("mongodb");
      const count = await db.collection("button").findOne({ _id: new ObjectId('686409700d5c456358f97af0') });
      if (count) {
        res.status(200).json({
          schemaVersion: 1,
          label: "button count",
          message: String(count.count),
          color: "blue"
        });
      } else {
        res.status(404).json({
          schemaVersion: 1,
          label: "button count",
          message: "not found",
          color: "red"
        });
      }
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({
      schemaVersion: 1,
      label: "button count",
      message: "error",
      color: "red"
    });
  }
}