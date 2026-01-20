'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particleArray = [];
ctx.fillStyle = 'white';

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

const mouse = {
    x: null,
    y: null,
};

canvas.addEventListener('mousemove', function(e){
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
})

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}


class Particle  {
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
  
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
};

function init(){
    for(let i=0;i<100;i++){
        particleArray.push(new Particle());
    }
}

function handleParticles(){
    for(let i of particleArray){
        i.update();
        i.draw();
    }
}

animate();
init();
console.log(particleArray);