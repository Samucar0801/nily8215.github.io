document.addEventListener("DOMContentLoaded", function () {
  const storyContainer = document.querySelector(".interactive-story");
  if (!storyContainer) return;

  const nextBtn = document.getElementById("next-story-btn");
  const storyParts = storyContainer.querySelectorAll(".story-part");
  const nilyImage = document.getElementById("nilyImage");
  let currentPartIndex = 0;

  // Função para limpar todas as animações especiais
  function clearAllEffects() {
    storyParts.forEach((part) => {
      part.classList.remove(
        "shake-effect",
        "heartbeat-effect",
        "aurora-effect",
        "jitter-effect"
      );
    });
  }

  // Função para a explosão de confetti
  function createConfettiBurst(element) {
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement("div");
      spark.className = "confetti-spark";
      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 50;
      const x = Math.cos(angle * (Math.PI / 180)) * distance;
      const y = Math.sin(angle * (Math.PI / 180)) * distance;
      spark.style.setProperty("--x", `${x}px`);
      spark.style.setProperty("--y", `${y}px`);
      element.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  }

  nextBtn.addEventListener("click", function () {
    clearAllEffects();
    storyParts[currentPartIndex].classList.remove("active");
    currentPartIndex++;

    if (currentPartIndex < storyParts.length) {
      const nextPart = storyParts[currentPartIndex];
      nextPart.classList.add("active");

      // Efeitos especiais para cada parte
      switch (nextPart.id) {
        case "part-2": // O caos
          nextPart.classList.add("shake-effect");
          nilyImage.src = "nily_triste.jpg";
          break;
        case "part-3": // A DM
          nextPart.classList.add("heartbeat-effect");
          nilyImage.src = "nily_piscando.jpg";
          break;
        case "part-4": // A conversa
          nextPart.classList.add("aurora-effect");
          nilyImage.src = "nily_pose.jpg";
          break;
        case "part-5": // O nervosismo
          nextPart.classList.add("jitter-effect");
          break;
        case "part-6": // O encontro mágico
          createConfettiBurst(nextPart);
          nilyImage.src = "nily_sapeca.jpg";
          break;
      }
    }

    if (currentPartIndex >= storyParts.length - 1) {
      nextBtn.innerHTML = 'Fim da Missão <i class="fas fa-heart"></i>';
      nextBtn.disabled = true;
      nilyImage.src = "nily_cupido.jpg";
    }
  });
});
