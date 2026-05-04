const slides = [...document.querySelectorAll('.slide')];
  const dotsEl = document.getElementById('dots');
  const ctr    = document.getElementById('ctr');
  const N = slides.length;
  let cur = 0;

  slides.forEach((_,i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = ()=>go(i);
    dotsEl.appendChild(d);
  });

  function sync(){
    ctr.textContent = String(cur+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
    document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===cur));
  }

  function go(n){
    if(n===cur) return;
    const p=cur;
    cur=((n%N)+N)%N;
    slides[p].classList.remove('active');
    slides[p].classList.add('exit');
    setTimeout(()=>slides[p].classList.remove('exit'),520);
    slides[cur].classList.add('active');
    sync();
  }

  document.getElementById('next').onclick=()=>go(cur+1);
  document.getElementById('prev').onclick=()=>go(cur-1);
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();go(cur+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1);}
  });
  let tx=0;
  document.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
  document.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-tx;
    if(Math.abs(dx)>44) go(dx<0?cur+1:cur-1);
  });