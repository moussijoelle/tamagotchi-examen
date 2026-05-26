class Tamagotchi {
  constructor(nombre) {
    this.nombre = nombre;
    this.salud = 0;
    this.felicidad = 0;
    this.limpieza = 0;
    this.energia = 0;
  }

  valoresAleatorios() {
    this.salud = Math.floor(Math.random() * 11);
    this.felicidad = Math.floor(Math.random() * 11);
    this.limpieza = Math.floor(Math.random() * 11);
    this.energia = Math.floor(Math.random() * 11);
  }

  limitar(valor) {
    if (valor < 0) return 0;
    if (valor > 10) return 10;
    return valor;
  }

  cambiarStat(stat, cantidad) {
    this[stat] = this.limitar(this[stat] + cantidad);
  }

  bajarTodasLasStats() {
    this.cambiarStat('salud', -1);
    this.cambiarStat('felicidad', -1);
    this.cambiarStat('limpieza', -1);
    this.cambiarStat('energia', -1);
  }

  obtenerSuma() {
    return this.salud + this.felicidad + this.limpieza + this.energia;
  }

  estaMuerto() {
    return this.obtenerSuma() === 0;
  }
}
