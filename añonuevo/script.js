/* Confetti */
function confettiEffect(){
    for(let i = 0; i < 25; i++){
        let c = document.createElement("div");
        c.classList.add("confetti");
        c.style.left = Math.random()*100+"vw";
        c.style.animationDuration = (Math.random()*3+2)+"s";
        c.style.opacity = Math.random();
        document.body.appendChild(c);
        setTimeout(()=> c.remove(),4000);
    }
}
confettiEffect();
setInterval(confettiEffect,3000);


/* Fuegos Artificiales */
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let fireworks=[];

class Firework{
    constructor(){
        this.x=Math.random()*canvas.width;
        this.y=canvas.height;
        this.targetY=Math.random()*canvas.height/2;
        this.color=`hsl(${Math.random()*360},100%,60%)`;
        this.particles=[];
    }
    update(){
        this.y-=3;
        if(this.y<=this.targetY){ this.explode(); return true;}
        return false;
    }
    explode(){
        for(let i=0;i<45;i++){
            this.particles.push(new Particle(this.x,this.y,this.color));
        }
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,3,3);
    }
}

class Particle{
    constructor(x,y,color){
        this.x=x; this.y=y;
        this.angle=Math.random()*2*Math.PI;
        this.speed=Math.random()*4;
        this.color=color;
        this.life=80;
    }
    update(){
        this.x+=Math.cos(this.angle)*this.speed;
        this.y+=Math.sin(this.angle)*this.speed;
        this.speed*=0.96;
        this.life--;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,3,3);
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle="rgba(0,0,0,.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(Math.random()<0.04) fireworks.push(new Firework());

    fireworks=fireworks.filter(f=>!f.update());
    fireworks.forEach(f=>f.draw());
    fireworks.forEach(f=>f.particles.forEach(p=>{p.update(); p.draw()}));
}
animate();
