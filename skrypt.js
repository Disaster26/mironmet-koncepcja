(function(){
  var rok=document.getElementById('rok'); if(rok) rok.textContent=new Date().getFullYear();
  // menu mobilne
  var b=document.getElementById('burger'), n=document.getElementById('nav');
  if(b&&n){
    b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':'';});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.setAttribute('aria-expanded','false');document.body.style.overflow='';});});
  }
  // aktywna pozycja menu wg sekcji
  var linki=[].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sekcje=linki.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
  if('IntersectionObserver' in window&&sekcje.length){
    var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.classList.toggle('is-active',a.getAttribute('href')==='#'+x.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    sekcje.forEach(function(s){io.observe(s);});
  }
  // tor kart: przeciąganie myszą + strzałki
  var t=document.getElementById('tor');
  if(t){
    var down=false,sx=0,sl=0,moved=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!down)return;var d=e.clientX-sx;if(Math.abs(d)>4){moved=true;t.classList.add('drag');}t.scrollLeft=sl-d;});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var k=t.querySelector('.karta');var w=k?k.offsetWidth+20:320;var cel=Math.round(t.scrollLeft/w)*w;t.classList.remove('drag');t.scrollTo({left:cel,behavior:'smooth'});}});
    document.querySelectorAll('.strz').forEach(function(s){s.addEventListener('click',function(){var k=t.querySelector('.karta');var w=k?k.offsetWidth+20:320;t.scrollBy({left:w*parseInt(s.dataset.dir,10),behavior:'smooth'});});});
  }
  // formularz pokazowy
  var f=document.getElementById('form');
  if(f) f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('formInfo').hidden=false;});
  // baner cookies
  var c=document.getElementById('cookies'),K='mm-cookies';
  function get(){try{return localStorage.getItem(K);}catch(e){return null;}}
  function set(v){try{localStorage.setItem(K,v);}catch(e){}}
  if(c){
    if(!get()) c.hidden=false;
    c.querySelectorAll('[data-ck]').forEach(function(x){x.addEventListener('click',function(){set(x.dataset.ck);c.hidden=true;});});
    var o=document.getElementById('cookieOpen'); if(o) o.addEventListener('click',function(){c.hidden=false;});
  }
})();
