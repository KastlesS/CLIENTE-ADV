'use strict'

//Obtengo el input para los numeros
let input = document.getElementById('pantalla');

//Obtenemos los botones
let botones = document.getElementById('botones');

for(let i of botones.children){
    if(i.textContent!='C' && i.textContent!='='){
        i.addEventListener('click', function(e){
            e.preventDefault();
            input.value += i.textContent;
        });
    }else if(i.textContent=='C'){
        i.addEventListener('click', function(e){
            e.preventDefault();
            input.value = '';
        });
    }else{
        i.addEventListener('click', resultado);
    }
}

function resultado(){
    try {
        input.value = eval(input.value);
    } catch (error) {
        input.value = "Error";
    }
}
