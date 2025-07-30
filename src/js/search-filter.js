document.addEventListener('DOMContentLoaded', () => {
  // ===== MODO ESCURO =====
  const toggleButton = document.getElementById('darkModeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ===== FILTRO DE SERVIÇOS =====
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  const serviceCards = document.querySelectorAll('.service-card');

  function filterCards() {
    const searchText = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    serviceCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const category = card.getAttribute('data-category').toLowerCase();

      const matchesSearch = title.includes(searchText);
      const matchesFilter = filterValue === 'all' || category === filterValue;

      if (matchesSearch && matchesFilter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterCards);
  filterSelect.addEventListener('change', filterCards);

  filterCards();

  // ===== INTERAÇÕES SIMPLES (opcional) =====
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3').textContent;
      showNotification(`Em breve: categoria ${serviceName}`, 'info');
    });
  });

  // ===== FUNÇÃO DE NOTIFICAÇÃO =====
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 4000);

    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          color: white;
          z-index: 3000;
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 250px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideInRight 0.3s ease;
          font-family: Arial, sans-serif;
        }
        .notification-info { background: #3b82f6; }
        .notification-success { background: #10b981; }
        .notification-error { background: #ef4444; }
        .notification button {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
  }
});
