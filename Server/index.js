const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors:{
        origin: '*'
    }
});


const port = process.env.PORT || 3001;

let users = [];

app.use( '/', function(req,res){
    res.send(" 👋 Hi there ")
})

io.on('connection', (socket) => {
    const addr = socket.handshake.address+" => "+socket.request.connection.remotePort;
    console.log("ℹ New connection : ", addr)

    socket.on( 'setUsername', (username)=>{
        if( users.find( (val, index)=> val.username === username )!==undefined )
            socket.emit('usernameTaken', 1)
        else{
            users.push({ username, id:socket.id, addr})
            socket.emit("usernameRegistred")
            console.log('ℹ new user : "'+username+'" @ '+addr)
        }
    })
    socket.on('message', msg => {
      io.emit('message', msg);
    });
    socket.on( 'disconnect', async()=>{
        const disconnectingUser = users.find( (val, index)=> val.id === socket.id )
        if( disconnectingUser ){
            console.log("ℹ user disconnected : ", disconnectingUser.username, " @ ", addr)
            users = users.filter( (val)=>val.id!==disconnectingUser.id );
        }

    })
});




server.listen(port, () => {
    console.log(`🧦.IO server is running at http://localhost:${port}/`);
});