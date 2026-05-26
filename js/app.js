// Importación de módulos
// (clase y datos en juego.html)

// Declaración de variables
let tamagotchi;
let temporizador;

const botones = ['alimentar', 'jugar', 'duchar', 'acariciar', 'dormir', 'reprender'];
const manejadores = {};
const refsBotones = {};

let iconosFelicidad;
let iconosSalud;
let iconosLimpieza;
let iconosEnergia;
let mensajeJuego;
let videoTayo;
let fotoTayo;

// Declaración de funciones
const enlazarIds = () => {
  iconosFelicidad = document.getElementById('iconos-felicidad');
  iconosSalud = document.getElementById('iconos-salud');
  iconosLimpieza = document.getElementById('iconos-limpieza');
  iconosEnergia = document.getElementById('iconos-energia');
  mensajeJuego = document.getElementById('mensaje-juego');
  videoTayo = document.getElementById('videoTayo');
  fotoTayo = document.getElementById('fotoTayo');

  botones.forEach((nombre) => {
    refsBotones[nombre] = document.getElementById(`btn-${nombre}`);
  });
};

const pintarIconos = (contenedor, icono, cantidad) => {
  contenedor.replaceChildren();
  for (let i = 0; i < 10; i++) {
    const pieza = document.createElement('span');
    pieza.textContent = icono;
    pieza.className = i < cantidad ? '' : 'opacity-30 grayscale';
    contenedor.append(pieza);
  }
};

const actualizarPantalla = () => {
  pintarIconos(iconosFelicidad, ICONOS.felicidad, tamagotchi.felicidad);
  pintarIconos(iconosSalud, ICONOS.salud, tamagotchi.salud);
  pintarIconos(iconosLimpieza, ICONOS.limpieza, tamagotchi.limpieza);
  pintarIconos(iconosEnergia, ICONOS.energia, tamagotchi.energia);
};

const finDePartida = () => {
  clearInterval(temporizador);
  mensajeJuego.textContent = '¡Game over! Los cuatro indicadores están en cero.';
  mensajeJuego.classList.remove('hidden');

  videoTayo.pause();
  videoTayo.src = VIDEO_GAME_OVER;
  videoTayo.load();
  videoTayo.play();

  fotoTayo.classList.add('grayscale', 'opacity-60');

  botones.forEach((nombre) => {
    refsBotones[nombre].removeEventListener('click', manejadores[nombre]);
    refsBotones[nombre].disabled = true;
  });
};

const comprobarFin = () => {
  if (tamagotchi.estaMuerto()) finDePartida();
};

const aplicarAccion = (nombre) => {
  ACCIONES[nombre].forEach(({ stat, cantidad }) => {
    tamagotchi.cambiarStat(stat, cantidad);
  });
  actualizarPantalla();
  comprobarFin();
};

const pasarTiempo = () => {
  if (tamagotchi.estaMuerto()) {
    comprobarFin();
    return;
  }
  tamagotchi.bajarTodasLasStats();
  actualizarPantalla();
  comprobarFin();
};

const crearManejador = (nombre) => (evento) => {
  if (tamagotchi.estaMuerto()) return;

  const src = evento.currentTarget.dataset.videoSrc;
  if (src) {
    videoTayo.src = src;
    videoTayo.play();
  }

  aplicarAccion(nombre);
};

const iniciarJuego = () => {
  tamagotchi = new Tamagotchi(NOMBRE_MASCOTA);
  tamagotchi.valoresAleatorios();
  actualizarPantalla();
};

const activarAcciones = () => {
  temporizador = setInterval(pasarTiempo, 5000);

  botones.forEach((nombre) => {
    manejadores[nombre] = crearManejador(nombre);
    refsBotones[nombre].addEventListener('click', manejadores[nombre]);
  });
};

// Ejecución de código
document.addEventListener('DOMContentLoaded', () => {
  enlazarIds();
  iniciarJuego();
  activarAcciones();
});
