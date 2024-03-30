const canvas = document.getElementById('canvas-icon'); // Tutaj jest użyty standard W3C DOM — będzie on tematem następnych ćwiczeń;
const ctx = canvas.getContext('2d');

const draw = () => {
  ctx.scale(0.15, 0.15);

  ctx.fillStyle = 'red'; // Ustawienie koloru wypełnienia na czerwony
  ctx.fillRect(50, 50, 100, 80); // Rysowanie prostokąta: x, y, width, height


  // Rysowanie koła
  ctx.beginPath(); // Rozpoczęcie ścieżki
  ctx.arc(130, 150, 50, 0, Math.PI * 2); // Rysowanie koła: x, y, promień, startAngle, endAngle
  ctx.strokeStyle = 'black';
  ctx.stroke(); // Narysowanie obwódki koła
  ctx.fillStyle = 'green'; // Ustawienie koloru wypełnienia na zielony
  ctx.fill(); // Wypełnienie koła

  // Rysowanie trójkąta
  ctx.beginPath(); // Rozpoczęcie ścieżki
  ctx.moveTo(100, 50); // Ustawienie punktu początkowego
  ctx.lineTo(100, 150); // Rysowanie linii do punktu
  ctx.lineTo(200, 150); // Rysowanie linii do punktu
  ctx.closePath(); // Zamknięcie ścieżki
  ctx.strokeStyle = 'blue'; // Ustawienie koloru obramowania na niebieski
  ctx.stroke(); // Narysowanie linii
  ctx.fillStyle = 'yellow'; // Ustawienie koloru wypełnienia na żółty
  ctx.fill(); // Wypełnienie trójkąta
}

window.onload = () => {
  draw();
}