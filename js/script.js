// js/script.js

document.addEventListener('DOMContentLoaded', function() {
  // Фильтрация новостей по дате
  const filterForm = document.getElementById('filterForm');
  if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const year = document.getElementById('year').value;
      const month = document.getElementById('month').value;
      const newsItems = document.querySelectorAll('.news-item');
      newsItems.forEach(item => {
        if (item.getAttribute('data-year') === year && item.getAttribute('data-month') === month) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Поиск статей
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = document.getElementById('searchInput').value.toLowerCase();
      const articles = document.querySelectorAll('.article-item');
      articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        if (text.includes(query)) {
          article.style.display = 'block';
        } else {
          article.style.display = 'none';
        }
      });
    });
  }

  // Обработка формы запроса рекламной кампании
  const campaignForm = document.getElementById('campaignForm');
  if (campaignForm) {
    campaignForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Здесь можно добавить AJAX-запрос
      document.getElementById('campaignResult').innerText = 'Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.';
      campaignForm.reset();
    });
  }

  // Работа с корзиной для штендеров
  let cart = [];
  const cartItemsContainer = document.getElementById('cartItems');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.parentElement;
      const title = product.querySelector('h3').innerText;
      const price = product.getAttribute('data-price');
      cart.push({ title, price });
      renderCart();
    });
  });

  function renderCart() {
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.title} — ${item.price} руб.`;
        cartItemsContainer.appendChild(li);
      });
    }
  }

  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length > 0) {
        alert('Заказ оформлен. Наш менеджер свяжется с вами для уточнения деталей заказа.');
        cart = [];
        renderCart();
      } else {
        alert('Ваша корзина пуста.');
      }
    });
  }

  // Открытие формы отклика для вакансии
  const openApplication = document.getElementById('openApplication');
  if (openApplication) {
    openApplication.addEventListener('click', function() {
      const form = document.getElementById('applicationForm');
      form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
    });
  }

  // Обработка формы отклика на вакансию
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('applicationResult').innerText = 'Ваш отклик отправлен. Спасибо!';
      applicationForm.reset();
      applicationForm.style.display = 'none';
    });
  }
});
