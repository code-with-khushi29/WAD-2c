import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { user } from './db.js';

const app = express();
const PORT = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes to serve HTML files
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Register API
app.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;
  if (await user.findOne({ username })) {
    return res.status(400).json({ message: "User already exists" });
  }
  await user.create({ username, name, password });
  res.json({ message: "Registered successfully" });
});

// Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await user.findOne({ username, password });
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ message: `Welcome ${existingUser.name}` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
