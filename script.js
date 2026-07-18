const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
reveals.forEach(el=>observer.observe(el));

const video=document.querySelector('.hero-video');
const soundButton=document.querySelector('.sound-toggle');
soundButton.addEventListener('click',()=>{
  video.muted=!video.muted;
  soundButton.textContent=video.muted?'Sound off':'Sound on';
});

const canvas=document.getElementById('stars');
const ctx=canvas.getContext('2d');
let stars=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars=Array.from({length:Math.min(170,Math.floor(innerWidth/7))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.4+.2,s:Math.random()*.15+.03
  }));
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle='rgba(255,255,255,.75)';
  for(const star of stars){
    star.y+=star.s;if(star.y>innerHeight){star.y=0;star.x=Math.random()*innerWidth}
    ctx.beginPath();ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill();
  }
  requestAnimationFrame(animate);
}
addEventListener('resize',resize);resize();animate();
