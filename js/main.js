//Dichiaro le variabili
//const;


document.getElementById("play-music").addEventListener("click", function () {
  let audio = document.getElementById("background-music");

  if (audio.paused) {
    audio.play();
    this.textContent = "🔇";
  } else {
    audio.pause();
    this.textContent = "🔊";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.overflow = "hidden";
  container.style.pointerEvents = "none"; // Evita che interferisca con i click
  document.body.appendChild(container);

  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    const size = Math.random() * 6 + 4; // Dimensione casuale tra 4px e 10px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Posizione randomica
    particle.style.position = "absolute";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    // Animazione
    particle.style.animation = `floatingParticles ${Math.random() * 3 + 2}s linear infinite`;
    
    container.appendChild(particle);
    
    // Rimuove la particella dopo un po'
    setTimeout(() => {
      particle.remove();
    }, 5000);
  }

  // Genera continuamente particelle
  setInterval(createParticle, 500);
});

//APPARIZIONE PERGAMENA
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        // Rimuove il bagliore
        document.getElementById("intro-overlay").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("intro-overlay").style.display = "none";
            // Mostra la pergamena con effetto fade-in e zoom
            const parchment = document.getElementById("parchment-container");
            parchment.classList.remove("hidden");
            parchment.style.opacity = "1";
            parchment.style.transform = "scale(1)";
        }, 1000); // Ritardo dopo il fade-out del bagliore
    }, 3000); // Aspetta 3 secondi prima di far sparire il bagliore
});

//CODICE PER LA PERGAMENA
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("story-text");
    const button = document.getElementById("continue-button");

    // Testo da visualizzare
    const storyText = 
    "Before you looms Hogwarts Castle, shrouded in mist and mystery. " +
    "The main door is ajar, as if is inviting you in. But beware: once you" +
    "cross the threshold, the doors will close behind you, and the only way out" +
    "will be to solve the puzzles hidden within its ancient walls. Are you ready for the challenge?";
    
    let index = 0;

    function typeText() {
        if (index < storyText.length) {
            textElement.textContent += storyText[index];
            index++;
            setTimeout(typeText, 40); // Velocità della digitazione (puoi modificarla)
        } else {
            button.classList.remove("hidden"); // Mostra il pulsante una volta terminata la scrittura
        }
    }

    typeText(); // Avvia l'animazione
});

//SPARISCE PERGAMENA E APPARE FORM
document.getElementById("continue-button").addEventListener("click", function () {
    // Effetto dissolvenza della pergamena
    const parchment = document.getElementById("parchment-container");
    parchment.classList.add("fade-out");

    //cambio immagine di sfondo
    setTimeout(() => {
        document.body.style.backgroundImage = "url('../assets/images/HP_DiningRoom.png')"; 
       // document.body.style.backgroundColor = ".,"; 
       
    }, 1000);

    // Mostra il form dopo la dissolvenza
    setTimeout(() => {
        parchment.style.display = "none";
        const form = document.getElementById("form-container");
        form.classList.add("show");
    }, 1000); // Aspetta che l'animazione di dissolvenza finisca
});