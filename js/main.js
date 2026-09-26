

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const PROJECTS_DATA = {
    'nexus-dashboard': {
      title: 'GUIOSAD — Evaluación SWOT & FLOSS',
      subtitle: 'Sistema Inteligente Transaccional para Auditoría y Adopción de Software Libre',
      image: 'assets/Evaluacion_SOFT.jpeg',
      tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Google Gemini IA', 'REST API', 'JWT'],
      problem: 'Las evaluaciones de adopción de software libre se ejecutaban de forma empírica o mediante hojas de cálculo dispersas, careciendo de persistencia de datos centralizada, trazabilidad histórica, soporte multiusuario y catálogos dinámicos.', 
      solution: 'Desarrollo de una arquitectura en capas (Routes, Controllers, Services, Repositories) con PostgreSQL y transacciones ACID. Automatiza el cálculo de Importancia Relativa (IR), Ponderación Media (PM) y clasificación FODA en 6 pasos, integrando Gemini IA para sugerir factores académicos respaldados.',
      metrics: [
        { label: 'Tablas Relacionales', value: '13' },
        { label: 'Historias de Usuario', value: '23' },
        { label: 'Automatización FODA', value: '100%' }
      ],
      githubUrl: 'https://github.com/JavicSoftCode-01/swot_software_evaluation.git', 
      demoUrl: '#contacto'
    },
    'agrobio-analytics': {
      title: 'Agrobio Analytics — Dashboard Agroclimático',
      subtitle: 'Monitoreo de Cultivos, Telemetría Agrícola y Visualización de Datos con Streamlit & PostgreSQL',
      image: 'assets/Dashboard_Agroclimático.jpeg',
      tags: ['Python', 'Streamlit', 'PostgreSQL', 'Pandas', 'Plotly', 'Data Analytics'],
      problem: 'La falta de centralización y monitoreo estructurado de variables agroclimáticas (humedad, temperatura, radiación) genera pérdidas en el rendimiento de cultivos y dificulta la toma de decisiones preventivas ante eventos meteorológicos críticos.',
      solution: 'Desarrollo de una arquitectura analítica modular en Python con persistencia en PostgreSQL (agrobio_db). Se implementaron módulos de consultas optimizadas, agregaciones temporales con Pandas, tarjetas de KPI agroclimáticos y gráficos interactivos multivariables en Plotly integrados en un dashboard responsivo con Streamlit.',
      metrics: [
        { label: 'Variables Agroclimáticas', value: '8+ Métricas' },
        { label: 'Visualizaciones', value: 'Plotly Dinámico' },
        { label: 'Persistencia', value: 'PostgreSQL Relacional' }
      ],
      githubUrl: 'https://github.com/JLP2323/AGROMATICA-TRABAJO-EXPERIMENTAL',
      demoUrl: '#contacto'
    },
    'bike-rental': {
      title: 'Bike Rental Prediction — Demanda con Deep Learning',
      subtitle: 'Red Neuronal Artificial (ANN), API REST en Flask y Dashboard Interactivo',
      image: 'assets/Alquiler_Biciletas_1.jpeg', 
      tags: ['Python', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Pandas', 'Flask', 'JavaScript'],
      problem: 'La asignación ineficiente de flotas en sistemas públicos de transporte en bicicleta genera desabastecimiento en horas pico y sobrecostos operativos por falta de modelos predictivos que consideren variables meteorológicas complejas.',
      solution: 'Entrenamiento de un modelo de Red Neuronal Profunda con TensorFlow/Keras y StandardScaler sobre datasets horarios (hour.csv). Se desplegó una arquitectura desacoplada con servidor Flask, endpoints JSON para inferencia en tiempo real y cliente web con JavaScript interactivo para simular escenarios climáticos.',
      metrics: [
        { label: 'Dataset', value: '17,000+ Filas' },
        { label: 'Tiempo de Inferencia', value: '< 50ms' },
        { label: 'Parámetros Analizados', value: '12 Variables' }
      ],
      githubUrl: 'https://github.com/JLP2323/Prediccion_Alquiler_Bicicleta',
      demoUrl: '#contacto'
    }
  };

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

  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

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

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalImage.src = data.image;
    modalImage.alt = `Captura detallada de ${data.title}`;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;

    const modalImageContainer = modalOverlay.querySelector('.modal-image');
    if (modalImageContainer) {
      if (projectId === 'agrobio-analytics') {
        modalImageContainer.classList.add('is-contain');
      } else {
        modalImageContainer.classList.remove('is-contain');
      }
    }

    if (modalGithubLink) {
      if (data.githubUrl) {
        modalGithubLink.href = data.githubUrl;
        modalGithubLink.style.display = '';
      } else {
        modalGithubLink.style.display = 'none';
      }
    }

    modalTags.innerHTML = data.tags
      .map(tag => `<span class="badge badge-tech">${tag}</span>`)
      .join('');

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

  const toastContainer = document.getElementById('toast-container');

  function showToast(message, duration = 4000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <span class="toast-dot" aria-hidden="true"></span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    const hideTimer = setTimeout(() => {
      toast.classList.add('is-hiding');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);

    toast.addEventListener('click', () => {
      clearTimeout(hideTimer);
      toast.classList.add('is-hiding');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, { once: true });
  }

  const btnRequestDemo = document.getElementById('btn-request-demo');

  if (btnRequestDemo) {
    btnRequestDemo.addEventListener('click', () => {
      closeProjectModal();

      setTimeout(() => {
        showToast(
          '✓ Solicitud enviada. Te contactaré en breve con las credenciales y acceso al demo.'
        );
      }, 180);

      setTimeout(() => {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const proyectoWebChip = document.querySelector('.topic-chip[data-topic="Proyecto Web"]');
        if (proyectoWebChip) {
          const topicAsunto = document.getElementById('topic-asunto');
          document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('is-active'));
          proyectoWebChip.classList.add('is-active');
          if (topicAsunto) topicAsunto.value = 'Proyecto Web';
        }
      }, 400);
    });
  }

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
