const button = document.querySelector('.escape-button');
const grid = document.querySelector('.grid');

button.addEventListener('click', () => {
    const gridRect = grid.getBoundingClientRect();
    
    // Считываем размеры сетки
    const gridWidth = gridRect.width;
    const gridHeight = gridRect.height;

    // Считываем размеры кнопки
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Генерируем случайные координаты внутри сетки
    const maxX = gridWidth - buttonWidth;
    const maxY = gridHeight - buttonHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Применяем новые координаты к кнопке
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
});

const eyes = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (e) => {
    eyes.forEach((eye, index) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const distance = Math.min(eyeRect.width / 4, Math.sqrt(deltaX * deltaX + deltaY * deltaY));

        const offsetX = distance * Math.cos(angle);
        const offsetY = distance * Math.sin(angle);

        pupils[index].style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

const currentHour = new Date().getHours();
const body = document.querySelector('body');
body.style.transition ='background 1s ease-in-out';
if (currentHour >= 6 && currentHour <= 18) {
    body.classList.add('daytime')
    body.classList.remove('nighttime');
} else {
    body.classList.add('nighttime')
    body.classList.remove('daytime')
}
