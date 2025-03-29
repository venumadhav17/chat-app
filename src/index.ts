import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//headers, body, query paramters are not present in websockets
// structure the application better in express we use "/signup"

//let userCount = 0;
let allSockets: WebSocket[] = []; // global array

wss.on("connection", (socket) => {
  allSockets.push(socket);

  //userCount = userCount + 1;
  //console.log("user connected #" + userCount); // different user comes into server

  socket.on("message", (message) => {
    //console.log("message received" + message.toString());
    //socket.send(message.toString() + ": sent from the server");
    /*allSockets.forEach((s) =>
      s.send(message.toString() + ": sent from the server")
    );*/
    for (let i = 0; i < allSockets.length; i++) {
      const s = allSockets[i];
      s.send(message.toString() + ": sent from the server");
    }
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });
});

// documented client, server side messages - Gather Town
// Dead, Alive Connection =

/*app.all("/*", (req, res) => {

})*/

// use redis to install pubsub
// gather town video
