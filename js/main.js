/**
 * ==========================================================================
 * PORTAFOLIO ALEX RIVERA - JAVASCRIPT VANILLA
 * Cero dependencias externas. Todas las funcionalidades reales e interactivas.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. DATOS DE PROYECTOS PARA MODAL INTERACTIVO
  // --------------------------------------------------------------------------
  const PROJECTS_DATA = {
    'nexus-dashboard': {
      title: 'Nexus Dashboard',
      subtitle: 'Plataforma Analítica SaaS de Telemetría en Tiempo Real',
      image: 'assets/nexus-dashboard.jpg',
      tags: ['React 18', 'TypeScript', 'Tailwind', 'WebSockets', 'D3.js'],
      problem: 'Las plataformas tradicionales de analítica empresarial presentan retardos de actualización superiores a 4 segundos y saturan más del 70% de CPU del cliente al renderizar miles de eventos y métricas concurrentes.',
      solution: 'Se implementó una arquitectura reactiva con React 18 y Server-Sent Events/WebSockets con serialización de buffers binarios. La capa de gráficos se renderiza con aceleración por hardware WebGL/Pixi.js, manteniendo 60 FPS estables y latencias menores a 100ms.',
      metrics: [
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'Time to Interactive', value: '1.1s' },
        { label: 'Eventos Concurrente', value: '25,000 evt/s' }
      ],
      githubUrl: 'https://github.com/alexrivera-dev/nexus-dashboard',
      demoUrl: 'https://nexus-dashboard-demo.dev'
    },
    'aura-studio': {
      title: 'Aura Studio',
      subtitle: 'Laboratorio de Experimentación 3D y Shaders Procedurales',
      image: 'assets/aura-studio.jpg',
      tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Vite', 'Audio Reactivo'],
      problem: 'La creación de experiencias 3D fluidas e interactivas en dispositivos móviles suele verse penalizada por un alto consumo de memoria GPU y problemas de sobrecalentamiento.',
      solution: 'Desarrollo de shaders GLSL personalizados ejecutados en GPU con técnicas de Raymarching y partículas computadas por frame. Incorporación de análisis Fast Fourier Transform (FFT) para reactividad sonora en tiempo real y fallback elegante a 2D canvas para dispositivos de baja gama.',
      metrics: [
        { label: 'FPS Promedio', value: '60 FPS' },
        { label: 'Partículas en GPU', value: '150,000+' },
        { label: 'Tiempo de Carga Inicial', value: '0.8s' }
      ],
      githubUrl: 'https://github.com/alexrivera-dev/aura-studio',
      demoUrl: 'https://aura-studio-webgl.dev'
    },
    'chronos-flow': {
      title: 'Chronos Flow',
      subtitle: 'Suite Empresarial de Productividad y Flujos de Trabajo Offline-First',
      image: 'assets/chronos-flow.jpg',
      tags: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Full-Stack', 'IndexedDB'],
      problem: 'Los equipos distribuidos experimentan pérdida de sincronización y lentitud en aplicaciones de gestión de tareas cuando enfrentan conexiones inestables o intermitentes.',
      solution: 'Arquitectura Offline-first sustentada en IndexedDB local con CRDTs (Conflict-free Replicated Data Types) para reconciliación automática de cambios al recuperar conectividad. Backend serverless con Next.js 14 y PostgreSQL sobre Prisma ORM.',
      metrics: [
        { label: 'Disponibilidad Offline', value: '100%' },
        { label: 'Resolución de Conflictos', value: 'Automática' },
        { label: 'Tiempo de Sincronización', value: '< 200ms' }
      ],
      githubUrl: 'https://github.com/alexrivera-dev/chronos-flow',
      demoUrl: 'https://chronos-flow-app.dev'
    }
  };

  // --------------------------------------------------------------------------
  // 02. TOGGLE DE TEMA CLARO / OSCURO (CON PERSISTENCIA EN LOCALSTORAGE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('span.theme-icon') : null;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('ar-portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ar-portfolio-theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema oscuro');
        themeToggleBtn.title = 'Cambiar a tema oscuro';
      } else {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema claro');
        themeToggleBtn.title = 'Cambiar a tema claro';
      }
    }
  }

  // Inicializar tema
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 03. MENÚ RESPONSIVE MÓVIL (HAMBURGUESA)
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu(forceClose = false) {
    if (!navMenu || !navToggle) return;
    const isOpen = forceClose ? false : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => toggleMobileMenu());
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('is-open')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMobileMenu(true);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 04. RESALTADO ACTIVO DE ENLACES SEGÚN SCROLL (ACTIVE NAV LINK)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --------------------------------------------------------------------------
  // 05. FILTRO DE PROYECTOS POR CATEGORÍA
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.split(' ').includes(filterValue)) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 06. MODAL INTERACTIVO DE PROYECTO
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalImage = document.getElementById('modal-project-image');
  const modalSubtitle = document.getElementById('modal-project-subtitle');
  const modalTags = document.getElementById('modal-project-tags');
  const modalProblem = document.getElementById('modal-project-problem');
  const modalSolution = document.getElementById('modal-project-solution');
  const modalMetrics = document.getElementById('modal-project-metrics');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalDemoLink = document.getElementById('modal-demo-link');

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalImage.src = data.image;
    modalImage.alt = `Captura detallada de ${data.title}`;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalGithubLink.href = data.githubUrl;
    modalDemoLink.href = data.demoUrl;

    // Render tags
    modalTags.innerHTML = data.tags
      .map(tag => `<span class="badge badge-tech">${tag}</span>`)
      .join('');

    // Render metrics
    modalMetrics.innerHTML = data.metrics
      .map(m => `
        <div class="case-metric-box">
          <div class="case-metric-number">${m.value}</div>
          <div class="case-metric-label">${m.label}</div>
        </div>
      `)
      .join('');

    modalOverlay.classList.add('is-active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegación de eventos para botones "Ver más"
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Soporte de tecla Escape para cerrar modal y menú
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('is-active')) {
        closeProjectModal();
      }
      if (navMenu && navMenu.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 07. VALIDACIÓN REAL DEL FORMULARIO DE CONTACTO
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');
  const successBanner = document.getElementById('form-success-banner');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(inputElement, errorId, message) {
    inputElement.classList.add('is-invalid');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  function clearError(inputElement, errorId) {
    inputElement.classList.remove('is-invalid');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
  }

  // Validación interactiva en tiempo real con clases is-valid / is-invalid
  if (nombreInput) {
    nombreInput.addEventListener('input', () => {
      const val = nombreInput.value.trim();
      if (val.length >= 2) {
        clearError(nombreInput, 'error-nombre');
        nombreInput.classList.add('is-valid');
      } else {
        nombreInput.classList.remove('is-valid');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (validateEmail(emailInput.value.trim())) {
        clearError(emailInput, 'error-email');
        emailInput.classList.add('is-valid');
      } else {
        emailInput.classList.remove('is-valid');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 07b. CONTADOR DE CARACTERES DEL TEXTAREA
  // --------------------------------------------------------------------------
  const charCounter = document.getElementById('char-counter');
  const CHAR_LIMIT = 500;

  if (mensajeInput && charCounter) {
    mensajeInput.addEventListener('input', () => {
      const len = mensajeInput.value.length;
      charCounter.textContent = `${len} / ${CHAR_LIMIT}`;
      charCounter.classList.remove('is-near-limit', 'is-at-limit');
      if (len >= CHAR_LIMIT) {
        charCounter.classList.add('is-at-limit');
      } else if (len >= CHAR_LIMIT * 0.8) {
        charCounter.classList.add('is-near-limit');
      }
      if (mensajeInput.value.trim().length >= 10) {
        clearError(mensajeInput, 'error-mensaje');
        mensajeInput.classList.add('is-valid');
      } else {
        mensajeInput.classList.remove('is-valid');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 07c. CHIPS DE TEMÁTICA
  // --------------------------------------------------------------------------
  const topicChips = document.querySelectorAll('.topic-chip');
  const topicAsuntoInput = document.getElementById('topic-asunto');

  topicChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const isAlreadyActive = chip.classList.contains('is-active');
      topicChips.forEach(c => c.classList.remove('is-active'));
      if (!isAlreadyActive) {
        chip.classList.add('is-active');
        if (topicAsuntoInput) topicAsuntoInput.value = chip.getAttribute('data-topic') || '';
      } else {
        if (topicAsuntoInput) topicAsuntoInput.value = '';
      }
    });
  });


  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validar Nombre
      const nombreVal = nombreInput.value.trim();
      if (!nombreVal) {
        setError(nombreInput, 'error-nombre', 'Por favor ingresa tu nombre completo.');
        isValid = false;
      } else if (nombreVal.length < 2) {
        setError(nombreInput, 'error-nombre', 'El nombre debe tener al menos 2 caracteres.');
        isValid = false;
      } else {
        clearError(nombreInput, 'error-nombre');
        nombreInput.classList.add('is-valid');
      }

      // Validar Email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        setError(emailInput, 'error-email', 'Por favor ingresa tu correo electrónico.');
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        setError(emailInput, 'error-email', 'Ingresa un formato de correo válido (ej. usuario@dominio.com).');
        isValid = false;
      } else {
        clearError(emailInput, 'error-email');
        emailInput.classList.add('is-valid');
      }

      // Validar Mensaje
      const mensajeVal = mensajeInput.value.trim();
      if (!mensajeVal) {
        setError(mensajeInput, 'error-mensaje', 'Por favor escribe un mensaje describiendo tu proyecto.');
        isValid = false;
      } else if (mensajeVal.length < 10) {
        setError(mensajeInput, 'error-mensaje', 'El mensaje debe contener al menos 10 caracteres explicativos.');
        isValid = false;
      } else {
        clearError(mensajeInput, 'error-mensaje');
        mensajeInput.classList.add('is-valid');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submit-btn') || contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg>
            Enviando...
          `;
        }

        // Simulación de envío con confirmación visual
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
          }

          if (successBanner) {
            successBanner.innerHTML = `
              <strong>¡Mensaje enviado con éxito!</strong><br>
              Gracias por tu interés, ${nombreVal}. He recibido tu propuesta y me pondré en contacto contigo en menos de 24 horas.
            `;
            successBanner.classList.add('is-visible');
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          // Resetear formulario y estados visuales
          contactForm.reset();
          if (charCounter) {
            charCounter.textContent = `0 / ${CHAR_LIMIT}`;
            charCounter.classList.remove('is-near-limit', 'is-at-limit');
          }
          [nombreInput, emailInput, mensajeInput].forEach(el => {
            if (el) el.classList.remove('is-valid', 'is-invalid');
          });
          topicChips.forEach(c => c.classList.remove('is-active'));
          if (topicAsuntoInput) topicAsuntoInput.value = '';

          setTimeout(() => {
            successBanner?.classList.remove('is-visible');
          }, 8000);
        }, 800);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 08. BOTÓN "VOLVER ARRIBA" (BACK TO TOP)
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
