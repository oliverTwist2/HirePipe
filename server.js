import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

app.post("/webhook", (req, res) => {
  const payload = req.body;

  for (const client of clients) {
    client.send(JSON.stringify(payload));
  }

  res.json({ received: true });
});

server.listen(3001, () => {
  console.log("Webhook server running on port 3001");
});
