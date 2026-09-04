document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NOMBRE SOFÍA GOMARA
  ========================= */

  const heroName = document.getElementById("heroName");

  if (heroName) {

    heroName.innerHTML = "";

    const nameHTML = [
      { text: "Sofía", accent: false },
      { text: "Gomara", accent: true }
    ];

    nameHTML.forEach((word, wi) => {

      const wordSpan = document.createElement("span");

      if (word.accent) {
        wordSpan.classList.add("accent-word");
      }

      [...word.text].forEach(ch => {

        const letter = document.createElement("span");

        letter.className = "letter";
        letter.textContent = ch;

        wordSpan.appendChild(letter);

      });

      heroName.appendChild(wordSpan);

      if (wi === 0) {
        heroName.appendChild(document.createElement("br"));
      }

    });

  }


  /* =========================
     CURSOR PERSONALIZADO
  ========================= */

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  if (dot && ring) {

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    window.addEventListener("mousemove", e => {

      mx = e.clientX;
      my = e.clientY;

      dot.style.left = mx + "px";
      dot.style.top = my + "px";

    });

    function cursorLoop() {

      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      ring.style.left = rx + "px";
      ring.style.top = ry + "px";

      requestAnimationFrame(cursorLoop);

    }

    cursorLoop();

  }


  document
    .querySelectorAll("a, button, .work-card, .stat")
    .forEach(el => {

      el.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
      });

      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("hovering");
      });

    });


  /* =========================
     BOTÓN MAGNÉTICO
  ========================= */

  const magBtn = document.getElementById("magneticBtn");

  if (magBtn) {

    magBtn.addEventListener("mousemove", e => {

      const r = magBtn.getBoundingClientRect();

      const px =
        (e.clientX - r.left - r.width / 2) * 0.35;

      const py =
        (e.clientY - r.top - r.height / 2) * 0.6;

      magBtn.style.transform =
        `translate(${px}px, ${py}px)`;

    });

    magBtn.addEventListener("mouseleave", () => {

      magBtn.style.transform = "translate(0,0)";

    });

  }


  /* =========================
     MENÚ
  ========================= */

  const menuToggle = document.getElementById("menuToggle");

  if (menuToggle) {

    menuToggle.addEventListener("click", () => {

      const open =
        document.body.classList.toggle("menu-open");

      menuToggle.setAttribute(
        "aria-expanded",
        open
      );

    });

  }


  document
    .querySelectorAll("#overlay .nav-link")
    .forEach(link => {

      link.addEventListener("click", () => {

        document.body.classList.remove("menu-open");

        if (menuToggle) {
          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

    });


  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

      document.body.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }

  });


  /* =========================
     MOVIMIENTO 3D PORTADA
  ========================= */

  const heroSection =
    document.getElementById("inicio");

  if (heroSection && heroName) {

    heroSection.addEventListener("mousemove", e => {

      const r =
        heroSection.getBoundingClientRect();

      const px =
        (e.clientX - r.left) / r.width - 0.5;

      const py =
        (e.clientY - r.top) / r.height - 0.5;

      heroName.style.transform =
        `rotateY(${px * 10}deg)
         rotateX(${-py * 10}deg)
         translate(${px * 10}px, ${py * 8}px)`;

    });

    heroSection.addEventListener("mouseleave", () => {

      heroName.style.transform =
        "rotateY(0) rotateX(0) translate(0,0)";

    });

  }


  /* =========================
     LETRAS DE LOS TÍTULOS
  ========================= */

  document
    .querySelectorAll(".block-head h2")
    .forEach(h2 => {

      const text = h2.textContent;

      h2.textContent = "";

      [...text].forEach((ch, i) => {

        const letter =
          document.createElement("span");

        letter.className = "kletter";

        letter.style.setProperty(
          "--i",
          i
        );

        letter.textContent =
          ch === " "
            ? "\u00A0"
            : ch;

        h2.appendChild(letter);

      });

    });


  /* =========================
     REVEAL AL HACER SCROLL
  ========================= */

  const revealEls =
    document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {

    const io =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              io.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealEls.forEach(el => {
      io.observe(el);
    });

  } else {

    revealEls.forEach(el => {
      el.classList.add("is-visible");
    });

  }

});
