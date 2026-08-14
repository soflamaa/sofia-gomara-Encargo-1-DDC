// Split hero name into animated letters
  const heroName = document.getElementById('heroName');
  const nameHTML = [
    {text:'Sofía', accent:false},
    {text:'Gomara', accent:true}
  ];
  nameHTML.forEach((word, wi)=>{
    const wordSpan = document.createElement('span');
    if(word.accent) wordSpan.classList.add('accent-word');
    [...word.text].forEach(ch=>{
      const l = document.createElement('span');
      l.className='letter';
      l.textContent = ch;
      wordSpan.appendChild(l);
    });
    heroName.appendChild(wordSpan);
    if(wi===0){ heroName.appendChild(document.createElement('br')); }
  });

  // Custom cursor
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;
  window.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  function loop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-card').forEach(el=>{
    el.addEventListener('mouseenter', ()=>document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', ()=>document.body.classList.remove('hovering'));
  });

  // Magnetic button
  const magBtn = document.getElementById('magneticBtn');
  magBtn.addEventListener('mousemove', e=>{
    const r = magBtn.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width/2) * 0.35;
    const py = (e.clientY - r.top - r.height/2) * 0.6;
    magBtn.style.transform = `translate(${px}px, ${py}px)`;
  });
  magBtn.addEventListener('mouseleave', ()=>{ magBtn.style.transform='translate(0,0)'; });

  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', ()=>{
    const open = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#overlay .nav-link').forEach(link=>{
    link.addEventListener('click', ()=>{
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') document.body.classList.remove('menu-open');
  });

  // Hero 3D tilt
  const heroSection = document.getElementById('inicio');
  heroSection.addEventListener('mousemove', e=>{
    const r = heroSection.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - 0.5;
    const py = (e.clientY - r.top)/r.height - 0.5;
    heroName.style.transform = `rotateY(${px*10}deg) rotateX(${-py*10}deg) translate(${px*10}px, ${py*8}px)`;
  });
  heroSection.addEventListener('mouseleave', ()=>{
    heroName.style.transform = 'rotateY(0) rotateX(0) translate(0,0)';
  });

  // Split section headings into letters for hover wave effect
  document.querySelectorAll('.block-head h2').forEach(h2=>{
    const text = h2.textContent;
    h2.textContent = '';
    [...text].forEach((ch, i)=>{
      const l = document.createElement('span');
      l.className = 'kletter';
      l.style.setProperty('--i', i);
      l.textContent = ch === ' ' ? '\u00A0' : ch;
      h2.appendChild(l);
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  revealEls.forEach(el=>io.observe(el));