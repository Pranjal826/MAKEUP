const cursor = document.querySelector('.custom-cursor');

  document.addEventListener('mousemove', function (e) {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  });

  const links = document.querySelectorAll('a, button');

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('active');
    });
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
    const iconBar = document.querySelector('.icon-bar');
    const nav = document.querySelector('nav');
  
    iconBar.addEventListener('click', function () {
      iconBar.classList.toggle('active');
  
      nav.classList.toggle('active');
 
  });
  
  