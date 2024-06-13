import express from "express";
import Index from "./src/Index.js";
const app = express();

const PORT = process.env.PORT || 8000;

app.use(Index.connectRedis);
app.get("/get-string", async (req, res) => {
  await Index.getRedisString("mobile");
  res.status(200).send({ message: "Get api called." });
});
app.post("/post-string", async (req, res) => {
  try {
    await Index.saveRedisString("mobile", "12345660000");
    res.status(200).send({ message: "Post api called." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
app.post("/delete-string", async (req, res) => {
  try {
    await Index.deleteRedisString("mobile");
    res.status(200).send({ message: "Delete api called." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post("/post-hash", async (req, res) => {
  try {
    await Index.saveRedisHash("user:1234");
    res.status(200).send({ message: "Post api called." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})
app.get("/get-all-hash", async (req, res) => {
  try {
    await Index.getAllRedisHash("user:1234");
    res.status(200).send({ message: "Get all api called." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
