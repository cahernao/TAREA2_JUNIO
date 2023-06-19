const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Crear una instancia de la aplicación Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const mysql = require("mysql");
const db = mysql.createConnection({
    host: '35.224.195.13',
    user: 'toor',
    password: 'toor',
    database: 'tarea'
});

db.connect(err=>{
    if(err) console.log("erro de conexion ", err);
})

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname, + "public/index.html")
})

// Manejar la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  db.query(`SELECT mensaje FROM mensajes ORDER BY id DESC`, (er, res)=>{
    if (er) console.log("er select", er);
    
    socket.emit('mensaje', res)
});

  // Manejar el evento de recibir un mensaje
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);

    // Enviar el mensaje a todos los clientes conectados
    //io.emit('mensaje', [{text: 'Mensaje recibido'}]);
    
    db.query("INSERT INTO mensajes(mensaje, usuario) VALUES (?,'socket')", data.text);
    db.query(`SELECT mensaje FROM mensajes ORDER BY id DESC`, (er, res)=>{
        if (er) console.log("er select", er);
        
        socket.emit('mensaje', res)
    });
  });

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
