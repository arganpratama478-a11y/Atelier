(function(){
  'use strict';
  var nav=document.getElementById('nav');
  var burger=document.getElementById('burger');
  var navLinks=document.getElementById('navLinks');
  var ticking=false;

  function onScroll(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(function(){
      nav.classList.toggle('scrolled',window.scrollY>40);
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  function closeMenu(){
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('locked');
    burger.setAttribute('aria-expanded','false');
  }
  burger.addEventListener('click',function(){
    var open=!navLinks.classList.contains('open');
    burger.classList.toggle('open',open);
    navLinks.classList.toggle('open',open);
    document.body.classList.toggle('locked',open);
    burger.setAttribute('aria-expanded',String(open));
  });
  navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});

  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
      });
    },{threshold:0.1});
    reveals.forEach(function(el){io.observe(el);});
  }else{reveals.forEach(function(el){el.classList.add('in');});}

  var filterBtns=document.querySelectorAll('.filter-btn');
  var dishes=document.querySelectorAll('.dish');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click',function(){
      filterBtns.forEach(function(b){b.classList.remove('active');});
      this.classList.add('active');
      var filter=this.getAttribute('data-filter');
      dishes.forEach(function(dish){
        dish.classList.toggle('hide',!(filter==='all'||dish.getAttribute('data-category')===filter));
      });
    });
  });

  var lightbox=document.getElementById('lightbox');
  var lightboxImg=document.getElementById('lightboxImg');
  var closeBtn=document.getElementById('lightboxClose');
  document.querySelectorAll('.dish-img img').forEach(function(img){
    img.addEventListener('click',function(){
      lightboxImg.src=this.src;
      lightbox.classList.add('active');
    });
  });
  function closeLightbox(){
    lightbox.classList.remove('active');
    lightboxImg.removeAttribute('src');
  }
  closeBtn.addEventListener('click',closeLightbox);
  lightbox.addEventListener('click',function(e){if(e.target===lightbox)closeLightbox();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLightbox();});

  var form=document.getElementById('reserveForm');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var nama=document.getElementById('nama').value.trim();
    var tanggal=document.getElementById('tanggal').value;
    var jam=document.getElementById('jam').value;
    var jumlah=document.getElementById('jumlah').value;
    var catatan=document.getElementById('catatan').value.trim();
    var waNumber='6281234567890';
    var message='Halo ATELIER, saya ingin reservasi meja.\\n\\n'
      +'*Nama:* '+nama+'\\n'
      +'*Tanggal:* '+tanggal+'\\n'
      +'*Jam:* '+jam+'\\n'
      +'*Jumlah:* '+jumlah+'\\n'
      +'*Catatan:* '+(catatan||'-');
    window.open('https://wa.me/'+waNumber+'?text='+encodeURIComponent(message),'_blank','noopener');
  });

  var today=new Date();
  var localDate=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split('T')[0];
  document.getElementById('tanggal').setAttribute('min',localDate);
})(); 
