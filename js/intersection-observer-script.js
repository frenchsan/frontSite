// Fonction de préchargement d'image
function preloadImage(img) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');
    if(!src) {
      return;
    }
    img.src = src;
    
    if(!srcset) {
      return;
    }
    img.srcset = srcset;
  }
  
  // Configuration de l'observer (optionnel)
  const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
  };
  
  // Instanciation de l'intersectionObserver pour le lazy loading
  let observer = new IntersectionObserver(function(entries, self) {
    // Pour chaque entrée ciblée (les images ici)
    entries.forEach(entry => {
      // L'API Javascript vérifie que l'entrée existe...
      if(entry.isIntersecting) {
        // Modifie la data-src en src avec une fonction preloadImage()
        preloadImage(entry.target);
        
        // L'image est chargée, l'API peut s'arrêter jusqu'à la prochaine, etc.
        self.unobserve(entry.target);
      }
    });
  }, config);
  
  // Sélectionne les images et lance l'observer asynchrone
  const images = document.querySelectorAll('[data-src]');
  images.forEach(img => {
    // Observation des images à charger au fur et à mesure
    observer.observe(img);
  });
  
  // Instanciation de l'intersectionObserver pour le lazy loading
  let backgroundObserver = new IntersectionObserver(function(entries, self) {
    // Pour chaque entrée ciblée (les images ici)
    entries.forEach(entry => {
      // L'API Javascript vérifie que l'entrée existe...
      if(entry.isIntersecting) {
        // Ajoute une classe visible pour afficher la bonne image
        entry.target.classList.add("visible");
        
        // L'image est chargée, l'API peut s'arrêter jusqu'à la prochaine, etc.
        self.unobserve(entry.target);
      }
    });
  }, config);
  
  // Même travail pour les images en background
  const bckgImages = document.querySelectorAll('.bckg-img');
  bckgImages.forEach(img => {
    // Observation des images à charger au fur et à mesure
    backgroundObserver.observe(img);
  });