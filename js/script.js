// js/script.js
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ГЛОБАЛЬНЫЙ ПОИСК (форма в шапке) ---------- */
  document.querySelectorAll('header .search-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input').value.trim();
      if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    });
  });

  /* ---------- ПОИСК ПО СТАТЬЯМ (articles.html) ---------- */
  const articleSearchForm = document.getElementById('articlesSearch');
  if (articleSearchForm) {
    const input = document.getElementById('articlesInput');
    articleSearchForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = input.value.toLowerCase();
      document.querySelectorAll('.article-item').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? 'block' : 'none';
      });
    });
  }

  /* ---------- ФИЛЬТР НОВОСТЕЙ (news.html) ---------- */
  const filterForm = document.getElementById('filterForm');
  if (filterForm) {
    filterForm.addEventListener('submit', e => {
      e.preventDefault();
      const yr = document.getElementById('year').value;
      const mo = document.getElementById('month').value;
      document.querySelectorAll('.news-item').forEach(item => {
        item.style.display = (item.dataset.year === yr && item.dataset.month === mo) ? 'block' : 'none';
      });
    });
  }

  /* ---------- КОРЗИНА ШТЕНДЕРОВ ---------- */
  let cart = [];
  const cartList = document.getElementById('cartItems');
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-item');
      cart.push({ title: card.querySelector('h3').innerText, price: card.dataset.price });
      renderCart();
    });
  });
  function renderCart() {
    if (!cartList) return;
    cartList.innerHTML = '';
    cart.forEach(it => {
      const li = document.createElement('li');
      li.textContent = `${it.title} — ${it.price} ₽`;
      cartList.appendChild(li);
    });
  }
  const checkout = document.getElementById('checkout');
  if (checkout) {
    checkout.addEventListener('click', () => {
      alert(cart.length ? 'Заказ оформлен! Наш менеджер свяжется с вами.' : 'Ваша корзина пуста.');
      cart = [];
      renderCart();
    });
  }

  /* ---------- ФОРМЫ (кампания, контакты, отклик) ---------- */
  const campaignForm = document.getElementById('campaignForm');
  if (campaignForm) {
    campaignForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('campaignResult').innerText =
        'Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.';
      campaignForm.reset();
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Сообщение отправлено! Мы ответим как можно скорее.');
      contactForm.reset();
    });
  }

  const openApplication = document.getElementById('openApplication');
  if (openApplication) {
    openApplication.addEventListener('click', () => {
      const f = document.getElementById('applicationForm');
      f.style.display = (f.style.display === 'none' || !f.style.display) ? 'block' : 'none';
    });
  }
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('applicationResult').innerText = 'Ваш отклик отправлен. Спасибо!';
      applicationForm.reset();
      applicationForm.style.display = 'none';
    });
  }
});
