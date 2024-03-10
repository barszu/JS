// dalem x2 const dla canvas i ctx , skrypt laduje sie po renderingu elementow

"use strict";                                   // Nie wyłączaj trybu ścisłego
const canvas = document.getElementById('canvas'); // Tutaj jest użyty standard W3C DOM — będzie on tematem następnych ćwiczeń;
const ctx = canvas.getContext('2d');                  // Utworzenie obiektu 'CanvasRenderingContext2D'
// ctx.fillText("Hello World", 10, 50);            // Wykreślenie podanego tekstu na płótnie
// ctx.fillRect(50, 50, 100, 100);                 // Narysowanie prostokąta

const setCanvasSize = () => {
    const scale_const = 0.9;
    canvas.width = scale_const * window.innerWidth;
    canvas.height = scale_const * window.innerHeight;
    draw();
}

window.onload = () => {
    setCanvasSize();
}

window.onresize = () => {
    setCanvasSize();
}



const draw = () => {
  // ctx.fillStyle = 'red';
  // ctx.fillRect(50, 50, 100, 100);
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(140, 50, 100, 100);
  // ctx.fillStyle = 'green';
  // ctx.fillRect(50, 150, 100, 100);

  // ctx.scale(0.1, 0.1);

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