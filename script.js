// ========================================
// FUNCIONALIDAD DEL MENÚ MÓVIL
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navLinks.classList.remove('active');
    });
  });
});

// ========================================
// VALIDACIÓN DE FORMULARIOS
// ========================================

function validarFormulario(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll('input, textarea');
  let esValido = true;

  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.style.borderColor = '#e74c3c';
      esValido = false;
    } else {
      input.style.borderColor = '#e0e0e0';
    }
  });

  if (esValido) {
    console.log('Formulario válido, enviando...');
    // Aquí puedes agregar lógica para enviar el formulario
    alert('¡Formulario enviado correctamente!');
    form.reset();
  } else {
    alert('Por favor, rellena todos los campos');
  }
}

// Asignar validación a formularios si existen
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', validarFormulario);
});

// ========================================
// SCROLL SUAVE Y ANIMACIONES
// ========================================

// Animar elementos cuando entran en vista
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// ========================================
// EFECTO DE CONTADOR
// ========================================

function animarContador(elemento, objetivo, duracion = 1000) {
  let inicio = 0;
  const incremento = objetivo / (duracion / 16);

  function actualizar() {
    inicio += incremento;
    if (inicio < objetivo) {
      elemento.textContent = Math.floor(inicio);
      requestAnimationFrame(actualizar);
    } else {
      elemento.textContent = objetivo;
    }
  }

  actualizar();
}

// Uso: Descomentar si hay elementos con clase 'contador'
// const contadores = document.querySelectorAll('.contador');
// contadores.forEach(contador => {
//   const objetivo = parseInt(contador.getAttribute('data-objetivo'));
//   const observer = new IntersectionObserver(entries => {
//     if (entries[0].isIntersecting) {
//       animarContador(contador, objetivo);
//       observer.unobserve(contador);
//     }
//   });
//   observer.observe(contador);
// });

// ========================================
// MANEJO DE TEMAS (MODO OSCURO/CLARO)
// ========================================

function toggleTema() {
  const htmlElement = document.documentElement;
  const temaActual = htmlElement.getAttribute('data-tema');
  const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';

  htmlElement.setAttribute('data-tema', nuevoTema);
  localStorage.setItem('tema', nuevoTema);
}

// Cargar tema guardado
window.addEventListener('load', function () {
  const temaSavedado = localStorage.getItem('tema') || 'claro';
  document.documentElement.setAttribute('data-tema', temaSavedado);
});

// ========================================
// DESPLAZAMIENTO SUAVE A SECCIONES
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href').substring(1);
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// MOSTRAR ALERTA DE CARGA
// ========================================

window.addEventListener('load', function () {
  console.log('Página cargada correctamente');
});

window.addEventListener('beforeunload', function () {
  console.log('Saliendo de la página...');
});

// ========================================
// FUNCIONES ÚTILES
// ========================================

// Función para obtener parámetros de URL
function obtenerParametroURL(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
}

// Función para formatear fecha
function formatearFecha(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// Función para copiar texto al portapapeles
function copiarAlPortapapeles(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    console.log('Texto copiado al portapapeles');
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}

// ========================================
// MANEJO DE EVENTOS
// ========================================

// Detectar conexión a internet
window.addEventListener('online', function () {
  console.log('Conexión establecida');
  mostrarNotificacion('Conectado a internet', 'success');
});

window.addEventListener('offline', function () {
  console.log('Conexión perdida');
  mostrarNotificacion('Sin conexión a internet', 'error');
});

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion notificacion-${tipo}`;
  notificacion.textContent = mensaje;
  notificacion.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideInDown 0.3s ease;
  `;

  document.body.appendChild(notificacion);

  setTimeout(() => {
    notificacion.style.animation = 'slideInUp 0.3s ease';
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}

// ========================================
// INICIALIZACIÓN
// ========================================

console.log('Script.js cargado correctamente');
