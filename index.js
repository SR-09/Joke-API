import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import pg from "pg";

const app = express();
dotenv.config();
const port = 3000;
const masterKey = process.env.MASTER_KEY;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random joke
app.get("/random", async (req,res) => {
  try {
    const { rows: [{ count }] } =await db.query("SELECT count(*) FROM jokes");
    const random = Math.floor(Math.random() * count);
    const { rows } = await db.query("SELECT * FROM jokes WHERE id = $1", [random]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//2. GET a specific joke
app.get("/jokes/:id", async (req,res)=>{
  try{
    const id = parseInt(req.params.id);
    const { rows } = await db.query("SELECT * FROM jokes WHERE id = $1", [id]);
    if(rows.length == 0){
      res.status(404).json({error : `Joke with id: ${id} not found.`});
    }else{
      res.json(rows[0]);
    }
  }catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//3. GET a jokes by filtering on the joke type
app.get("/filter", async (req,res)=>{
  try {
    const jokeType = req.query.type;
    const { rows } = await db.query("SELECT * FROM jokes WHERE joketype = $1", [jokeType]);
    if(rows.length == 0){
      res.status(404).json({ error: `Joke with jokeType: ${jokeType} not found. Joke not found.` });
    }else{
      res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//4. POST a new joke
app.post("/jokes", async (req,res)=>{
  try {
    const jokeText = req.body.text;
    const jokeType = req.body.type;
    const { rows } = await db.query("INSERT INTO jokes (joketext, joketype) VALUES ($1, $2) RETURNING *", [jokeText, jokeType]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//5. PUT a joke
app.put("/jokes/:id", async (req,res)=>{
  try {
    const id = parseInt(req.params.id);
    const newJoke = req.body.text;
    const newType = req.body.type;
    const { rows } = await db.query("UPDATE jokes SET joketext = $1, joketype = $2 WHERE id = $3 RETURNING *", [newJoke, newType, id]);
    if(rows.length == 0){
      res.status(404).json({ error: `Joke with id: ${id} not found. No jokes were updated.` });
    }else{
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//6. PATCH a joke
app.patch("/jokes/:id", async (req,res)=>{
  try {
    const id = parseInt(req.params.id);
    const jokeText = req.body.text || await db.query("SELECT joketext FROM jokes WHERE id = $1", [id]);
    const jokeType = req.body.type || await db.query("SELECT joketype FROM jokes WHERE id = $1", [id]);
    const { rows } = await db.query("UPDATE jokes SET joketext = $1, joketype = $2 WHERE id = $3", [jokeText, jokeType, id]);
    if(rows.length == 0){
      res.status(404).json({ error: `Joke with id: ${id} not found. No jokes were updated.` });
    }else{
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//7. DELETE Specific joke
app.delete("/jokes/:id", async (req,res)=>{
  try {
    const id = req.params.id;
    const { rowCount } = await db.query("DELETE FROM jokes WHERE id = $1", [id]);
    if(rowCount == 0){
      res.status(404).json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
    }else{
      res.sendStatus(200);  
    }
  } catch (error) {
    console.error("Error"+error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//8. DELETE All jokes
app.delete("/jokes/all", async (req,res)=>{
  try {
    const Key = req.query.key;
    if(masterKey == Key)
    {
      await db.query("TRUNCATE TABLE jokes");
      res.sendStatus(200);
    }
    else{
      res.status(404).json({ error:`You are not Authorized to perform the action` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
