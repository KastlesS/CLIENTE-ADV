'use strict'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particleArray = [];
ctx.fillStyle = 'white';
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    particleArray.push(new Particle());
})

const mouse = {
    x: null,
    y: null,
};

canvas.addEventListener('mousemove', function(e){
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    for(let i=0;i<3;i++){
        particleArray.push(new Particle());
    }
})

function animate(){
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);
}


class Particle  {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
  
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
};

// function init(){
//     for(let i=0;i<100;i++){
//         particleArray.push(new Particle());
//     }
// }

function handleParticles(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();

        for(let j=i; j<particleArray.length;j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx*dx+dy*dy);
            if(distance<100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = particleArray[i].size/10;
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
            }
        }
    } 
}

animate();
// init();
console.log(particleArray);