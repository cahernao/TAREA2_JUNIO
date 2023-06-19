var socket = io.connect(`http://localhost:3000`, {'forceNew': true});

socket.on('mensaje', function(data){
    console.log("yo envio ", data);
    render(data);
})


function render(data){
    console.log("render ", data);
    var html = data.map(function(elem, index){
        return(`<div>
        <em>${elem.mensaje}</em>            
</div>`);

    }).join(" ");
    document.getElementById("mensajes").innerHTML = html;
}

function addMessage(e){
    var payload = {
        text: document.getElementById("text").value
    }

    socket.emit("mensaje", payload);
    socket.on('mensaje', function(data){
        render(data);
    })
    return false;
}

document.addEventListener("DOMContentLoaded", function(){

    
    socket.on('mensaje', function(data){
        render(data);
    })

})