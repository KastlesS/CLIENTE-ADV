'use strict'

const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
let orbita = null;
let planet = null;
let hue = 0;

const mouse = {
    x: null,
    y: null
};

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    orbita = new Orbita();
    planet = new Planet(orbita);
    console.log(orbita);
});

class Orbita {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.r = Math.floor(Math.random() * 300) + 50;
    }

    draw(){
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.stroke();
    }
}

class Planet {
    constructor(orbita){
        this.orbita = orbita;

        this.angle = Math.random() * Math.PI * 2; // posición inicial
        this.speed = 0.02;
        this.size = 20;
    }

    update(){
        this.angle += this.speed;

        this.x = this.orbita.x + Math.cos(this.angle) * this.orbita.r;
        this.y = this.orbita.y + Math.sin(this.angle) * this.orbita.r;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function animate(){
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if (orbita && planet) {
        orbita.draw();
        planet.update();
        planet.draw();
    }

    hue++;
    requestAnimationFrame(animate);
}

animate();