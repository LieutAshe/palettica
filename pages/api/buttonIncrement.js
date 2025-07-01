import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("palettica");

        if (req.method === "POST") {
            const result = await db.collection("button").findOneAndUpdate(
                {},
                { $inc: { count: 1 } },
                { upsert: true, returnDocument: "after" }
            );
            res.status(200).json({ count: result.value ? result.value.count : 1 });
        } else {
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        res.status(500).json({ error: "Failed to connect to database" });
    }
}
