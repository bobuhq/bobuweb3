const intro=document.getElementById('intro');
const enter=document.getElementById('enterBtn');
enter.addEventListener('click',()=>{
  intro.classList.add('hidden');
  document.body.classList.remove('locked');
  setTimeout(()=>intro.remove(),850);
});

const menu=document.querySelector('.menu');
const nav=document.querySelector('.header nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const canvas=document.getElementById('stars');
const ctx=canvas.getContext('2d');
let stars=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars=Array.from({length:Math.min(190,Math.floor(innerWidth/6))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.2,s:Math.random()*.16+.035
  }));
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle='rgba(255,255,255,.76)';
  stars.forEach(star=>{
    star.y+=star.s;
    if(star.y>innerHeight){star.y=0;star.x=Math.random()*innerWidth}
    ctx.beginPath();ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(animate);
}
addEventListener('resize',resize);resize();animate();

const roadmap=document.querySelector('.galaxy-road');
const ship=document.getElementById('ship');
function moveShip(){
  if(!roadmap||!ship)return;
  const rect=roadmap.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
  ship.style.left=`calc(${progress*100}% - 18px)`;
}
addEventListener('scroll',moveShip,{passive:true});moveShip();
