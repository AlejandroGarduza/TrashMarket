const notificationBtn = document.querySelector('.notification-btn');
const notificationContainer = document.querySelector('.notification-container');

notificationBtn.addEventListener('click', () => {
  notificationContainer.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!notificationContainer.contains(e.target) && !notificationBtn.contains(e.target)) {
    notificationContainer.classList.remove('show');
  }
});

const notifications = [
    { id: 1, text: 'Nueva solicitud de amistad', time: 'Hace 5 minutos' },
    { id: 2, text: 'Nueva publicación en tu muro', time: 'Hace 10 minutos' },
    { id: 3, text: 'Tienes un mensaje nuevo', time: 'Hace 20 minutos' },
  ];
  
  const notificationList = document.querySelector('.notification-list');
  const notificationBadge = document.querySelector('.notification-btn .badge');
  
  notificationBadge.textContent = notifications.length;
  
  notifications.forEach((notification) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="#">
        <span>${notification.text}</span>
        <span class="time">${notification.time}</span>
      </a>
    `;
    notificationList.appendChild(li);
  });