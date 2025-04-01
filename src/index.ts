import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    // string convert into an object
    const parsedMessage = JSON.parse(message as unknown as string);
    console.log(parsedMessage); // object
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      });
    }

    if (parsedMessage.type === "chat") {
      //const currentUserRoom = allSockets.find((x) =>x.socket == socket).room
      let currentUserRoom = null; // {}
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].socket == socket) {
          currentUserRoom = allSockets[i].room;
        }
      }

      // check the previous user room compare with current user room, send messages to everyone present in the room
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room == currentUserRoom)
          allSockets[i].socket.send(parsedMessage.payload.message);
      }
    }
  });
  //@ts-ignore
  socket.on("disconnect", () => {
    allSockets = allSockets.filter((user) => user.socket != socket);
  });
});

/* let obj = {
       "name": "harkirat"
   } 
   let str = "{'name': 'harkirat'}" 
   */

// when sender is includes or excludes ?
