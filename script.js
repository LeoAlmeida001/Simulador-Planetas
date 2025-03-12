const canvas = document.getElementById('solarSystem');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let speed = 5;
const scaleFactor = Math.min(canvas.width, canvas.height) / 3.5; // Reduz tamanho para caber melhor

const planets = [
  { name: 'Mercúrio', distance: scaleFactor * 0.15, size: 3, angle: 0, speed: 0.02, color: 'gray' },
  { name: 'Vênus', distance: scaleFactor * 0.25, size: 6, angle: 0, speed: 0.015, color: 'orange' },
  { name: 'Terra', distance: scaleFactor * 0.35, size: 7, angle: 0, speed: 0.01, color: 'blue' },
  { name: 'Marte', distance: scaleFactor * 0.45, size: 5, angle: 0, speed: 0.008, color: 'red' },
  { name: 'Júpiter', distance: scaleFactor * 0.65, size: 12, angle: 0, speed: 0.005, color: 'brown' },
  { name: 'Saturno', distance: scaleFactor * 0.80, size: 10, angle: 0, speed: 0.004, color: 'goldenrod', rings: true },
  { name: 'Urano', distance: scaleFactor * 0.95, size: 8, angle: 0, speed: 0.003, color: 'lightblue' },
  { name: 'Netuno', distance: scaleFactor * 1.1, size: 8, angle: 0, speed: 0.002, color: 'darkblue' }
];

const moon = { distance: 12, size: 2, angle: 0, speed: 0.03 }; // Lua orbitando a Terra

document.getElementById('speed').addEventListener('input', (e) => {
  speed = e.target.value;
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Desenhar o Sol
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
  ctx.fill();

  // Desenhar planetas e órbitas
  planets.forEach((planet) => {
    planet.angle += planet.speed * (speed / 5);
    const x = centerX + planet.distance * Math.cos(planet.angle);
    const y = centerY + planet.distance * Math.sin(planet.angle);

    // Trajetória
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
    ctx.stroke();

    // Anéis de Saturno
    if (planet.rings) {
      ctx.strokeStyle = 'rgba(200, 200, 150, 0.5)';
      ctx.beginPath();
      ctx.ellipse(x, y, planet.size * 2, planet.size, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Planeta
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fill();

    // Lua orbitando a Terra
    if (planet.name === 'Terra') {
      moon.angle += moon.speed * (speed / 5);
      const moonX = x + moon.distance * Math.cos(moon.angle);
      const moonY = y + moon.distance * Math.sin(moon.angle);

      ctx.fillStyle = 'lightgray';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  requestAnimationFrame(render);
}

render();
