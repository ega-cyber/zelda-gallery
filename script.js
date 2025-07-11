const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Вкладки
tabButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.remove('active'));
    const target = button.dataset.tab;
    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Модалка
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const prevImgBtn = document.getElementById('prevImg');
const nextImgBtn = document.getElementById('nextImg');

let currentGallery = [];
let currentIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
  // Клик по картинке
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      // Находим текущую галерею (родительскую секцию)
      const gallerySection = img.closest('.gallery');
      currentGallery = Array.from(gallerySection.querySelectorAll('img'));
      currentIndex = currentGallery.indexOf(img);

      openModal(currentGallery[currentIndex]);
    });
  });

  // Закрыть по крестику
  modalClose.addEventListener('click', () => modal.style.display = 'none');

  // Закрыть по клику вне картинки
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Стрелки
  prevImgBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    openModal(currentGallery[currentIndex]);
  });

  nextImgBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    openModal(currentGallery[currentIndex]);
  });
});

// Функция показа модалки
function openModal(imgElement) {
  modal.style.display = 'flex';
  modalImg.src = imgElement.src;
  modalCaption.textContent = imgElement.dataset.caption || 'Без подписи';
}
