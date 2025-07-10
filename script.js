// Criar padrão de caveiras
function createSkull() {
  const skull = document.createElement("div");
  skull.className = "skull";
  skull.style.left = Math.random() * 100 + "vw";
  skull.style.animationDelay = Math.random() * 15 + "s";
  skull.style.animationDuration = Math.random() * 10 + 10 + "s";
  document.getElementById("skullPattern").appendChild(skull);

  setTimeout(() => {
    skull.remove();
  }, 25000);
}

// Criar partículas
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDelay = Math.random() * 3 + "s";
  particle.style.animationName = "particleFloat";
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 3000);
}

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Função para mudança de cores aleatórias
function randomColorShift() {
  const colors = ["#ff69b4", "#ff1493", "#da70d6", "#ff4500", "#ff6347"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.documentElement.style.setProperty("--accent-color", randomColor);
}

// Efeito de chuva de corações para o botão mágico
function createMagicHeart(e) {
  const heart = document.createElement("div");
  heart.className = "magic-heart";
  heart.innerHTML = "♥";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1500);
}

// Inicializar efeitos
document.addEventListener("DOMContentLoaded", function () {
  const mainTitle = document.getElementById("mainTitle");
  const magicBtn = document.getElementById("magicBtn");
  const nilyImage = document.getElementById("nilyImage");

  // Efeito de digitação no título
  if (mainTitle) {
    setTimeout(() => {
      typeWriter(mainTitle, "Bem vindo ao Mundo da Nily");
    }, 500);
  }

  // Troca de imagem da Nily
  const nilyImageSources = [
    "nily_cupido.jpg",
    "nily_piscando.jpg",
    "nily_sapeca.jpg",
  ];
  let currentImageIndex = 0;

  if (nilyImage) {
    // A troca de imagem agora é controlada pelo historia.js, então esta parte pode ser desativada ou removida para não conflitar.
    // setInterval(() => {
    //   currentImageIndex = (currentImageIndex + 1) % nilyImageSources.length;
    //   nilyImage.style.opacity = "0";
    //   setTimeout(() => {
    //     nilyImage.src = nilyImageSources[currentImageIndex];
    //     nilyImage.style.opacity = "1";
    //   }, 500);
    // }, 5000);
  }

  // Criar caveiras e partículas periodicamente
  setInterval(createSkull, 2000);
  setInterval(createParticle, 500);

  // Mudar cores a cada 10 segundos
  setInterval(randomColorShift, 10000);

  // Efeito no botão mágico
  if (magicBtn) {
    magicBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Animação do botão
      this.style.transform = "scale(0.95)";
      setTimeout(() => (this.style.transform = "scale(1.1)"), 150);
      setTimeout(() => (this.style.transform = "scale(1)"), 300);

      // Criar explosão de corações
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const randomX = Math.random() * window.innerWidth;
          const randomY = Math.random() * window.innerHeight;
          createMagicHeart({ clientX: randomX, clientY: randomY });
        }, i * 50);
      }

      // Mostrar mensagem
      setTimeout(() => {
        alert("✨ Nily está preparando algo especial para você! ✨");
      }, 500);
    });
  }

  // Efeito de movimento do mouse
  document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.95) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = e.clientX + "px";
      p.style.top = e.clientY + "px";
      p.style.position = "fixed";
      p.style.animation = "none"; // Remove a animação principal
      p.style.width = "5px";
      p.style.height = "5px";
      document.body.appendChild(p);

      setTimeout(() => p.remove(), 1000);
    }
  });

  // Navegação suave
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Animação de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar animação de entrada aos elementos
  document
    .querySelectorAll(
      ".feature-card, .nily-gallery-section, .contact-section"
    )
    .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
});
