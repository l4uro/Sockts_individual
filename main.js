var socket = io.connect('192.168.43.2:9905', { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);
})

expresionvocal= / [aeiou|áéíóú]/ig;
expresionmayuscula = /(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]/g;
expresionconsonante = /[a-záéíóúA-ZÁÉÍÓÚ]+([^aeiouáéíóú\?])\b/g;

function render(data) {
    var html = data.map(function(elem, index) {
        return (`<div>
            <em>Palabras enviadas: <strong>${elem.textos}</strong></em><br>
            <em>Vocales enviadas: <strong>${elem.vocal}</strong></em><br>
            <em>Mayusculas enviadas: <strong>${elem.mayus}</strong></em><br>
            <em>Sin vocal enviados: <strong>${elem.final}</strong></em><br>
            <em>Numeros enviados: <strong>${elem.num}</strong></em>
              <li><strong>${elem.author}</strong>:
              <em>${elem.text}</em></li>
              <hr>
              
            </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {

    var mensaje = document.getElementById('texto').value;


    var pruebanumeros = mensaje.match(/[\d]/g);
    try {
        pruebanumeros = pruebanumeros.length;
    } catch (error) {
        console.log("El mensaje no tiene ningún número. Colocando el valor de cero");
        
    }
 
    var message = {

        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        textos: document.getElementById('texto').value.replace(/\r?\n/g," ").replace (/[ ]+/g," ").replace (/^ /,"").replace (/ $/,"").split (" ").length,
        vocal: document.getElementById('texto').value.match(/[aeiouAEIOUÁ-ÿ]/gm).length,
        mayus: document.getElementById('texto').value.match(/(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g).length,
        final: document.getElementById('texto').value.match(/[a-záéíóúA-ZÁÉÍÓÚ]+([^aeiouáéíóú\?])\b/g).length,
        num: document.getElementById('texto').value.match(/[0-9]/gm).length
    };

    socket.emit('new-message', message);
    return false;
} 