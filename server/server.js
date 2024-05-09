const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { User } = require("./models"); // Assuming you have a User model

const url = "mongodb://localhost:27017"; // MongoDB URI
const dbName = "airport_management"; // Database name
const collectionName = "clients"; // Collection name

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
    if (err) {
        console.error("Failed to connect to MongoDB:", err);
        return;
    }

    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Route to add client details
    app.post("/Client", async (req, res) => {
        try {
            const clientDetails = req.body; // Assuming the request body contains client details
            const result = await collection.insertOne(clientDetails);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            console.error("Error adding client details:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // Route to view client details
    app.get("/Client", async (req, res) => {
        try {
            const clients = await collection.find({}).toArray();
            res.json(clients);
        } catch (error) {
            console.error("Error fetching client details:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // POST route for user signup
    app.post("/signup", async (req, res) => {
        try {
            // Extract user registration details from the request body
            const { fname, mname, lname, phone, email, passport, password } = req.body;

            // Save user details to the database
            const newUser = await User.create({
                fname,
                mname,
                lname,
                phone,
                email,
                passport,
                password,
            });

            // Respond with a success message and the newly created user object
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error in Signup:", error);
            // Respond with an error message
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
