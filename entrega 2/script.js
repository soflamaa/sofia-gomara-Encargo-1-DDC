document.addEventListener("DOMContentLoaded", function () {

  /* MENÚ */

  const menuToggle = document.getElementById("menuToggle");
  const menuPanel = document.getElementById("menuPanel");

  if (menuToggle && menuPanel) {

    menuToggle.addEventListener("click", function () {

      menuPanel.classList.toggle("abierto");

    });


    const linksMenu = menuPanel.querySelectorAll("a");

    linksMenu.forEach(function (link) {

      link.addEventListener("click", function () {

        menuPanel.classList.remove("abierto");

      });

    });


    document.addEventListener("click", function (event) {

      const clickDentroMenu =
        menuPanel.contains(event.target) ||
        menuToggle.contains(event.target);

      if (!clickDentroMenu) {

        menuPanel.classList.remove("abierto");

      }

    });

  }


  /* SCROLL SUAVE */

  const enlacesInternos =
    document.querySelectorAll('a[href^="#"]');

  enlacesInternos.forEach(function (enlace) {

    enlace.addEventListener("click", function (event) {

      const id = enlace.getAttribute("href");

      if (id === "#") {
        return;
      }

      const destino = document.querySelector(id);

      if (destino) {

        event.preventDefault();

        destino.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* ANIMACIÓN AL HACER SCROLL */

  const elementos = document.querySelectorAll(
    ".seccion, .proyecto-detalle"
  );

  elementos.forEach(function (elemento) {

    elemento.classList.add("reveal");

  });


  const observer = new IntersectionObserver(

    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  elementos.forEach(function (elemento) {

    observer.observe(elemento);

  });

});
