const translations = {
    en: {
      title: "Planetary Motion Simulator",
      speed: "Speed"
    },
    pt: {
      title: "Simulador de Movimentos Planetários",
      speed: "Velocidade"
    },
    es: {
      title: "Simulador de Movimiento Planetario",
      speed: "Velocidad"
    }
  };
  
  document.getElementById('language').addEventListener('change', (e) => {
    const lang = e.target.value;
    document.getElementById('title').textContent = translations[lang].title;
    document.querySelector('label[for="speed"]').textContent = translations[lang].speed + ": ";
  });
  
  // Configuração inicial de idioma
  document.getElementById('language').value = 'pt';
  document.getElementById('language').dispatchEvent(new Event('change'));
  