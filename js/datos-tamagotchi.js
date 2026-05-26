const NOMBRE_MASCOTA = 'Tayo Tayo';
const VIDEO_GAME_OVER = 'assets/videos/juego-terminado.webm';

const ICONOS = {
  felicidad: '⭐',
  salud: '❤️',
  limpieza: '💧',
  energia: '⚡',
};

const ACCIONES = {
  alimentar: [
    { stat: 'energia', cantidad: 3 },
    { stat: 'felicidad', cantidad: 2 },
    { stat: 'limpieza', cantidad: -1 },
  ],
  jugar: [
    { stat: 'felicidad', cantidad: 2 },
    { stat: 'energia', cantidad: -2 },
    { stat: 'limpieza', cantidad: -2 },
  ],
  dormir: [
    { stat: 'energia', cantidad: 5 },
    { stat: 'salud', cantidad: 2 },
  ],
  duchar: [
    { stat: 'salud', cantidad: 3 },
    { stat: 'limpieza', cantidad: 10 },
  ],
  reprender: [{ stat: 'felicidad', cantidad: -3 }],
  acariciar: [{ stat: 'felicidad', cantidad: 4 }],
};
