const countdown = document.querySelector('.countdown');

// Date de lancement
const launchDate = new Date('june 23, 2018 10:00:00').getTime();

// Mise à jour du temps + date d'aujourd'hui
const interval = setInterval(() => {
  const timeNow = new Date().getTime();

  // Temps entre maintenant et lancement
  const distance = launchDate - timeNow;

  // Calcul du temps
  const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
  const heures = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  // Afficher le résultat sur la page HTML
  countdown.innerHTML = `
    <div class="days">${jours}<span class="textNotCountdown">Jours</span></div> 
    <div class="hours">${heures}<span class="textNotCountdown">Heures</span></div>
    <div class="mins">${mins}<span class="textNotCountdown">Minutes</span></div>    
  `;
}, 1000);
