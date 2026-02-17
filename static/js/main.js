// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2200);
}

// Profile popup
function toggleProfile(show) {
  const popup = document.getElementById('profile-popup');
  if (!popup) return;
  if (show) popup.classList.remove('hidden');
  else popup.classList.add('hidden');
}
const profileBtn = document.getElementById('profile-btn');
if (profileBtn) {
  profileBtn.addEventListener('click', () => toggleProfile(true));
}

// Cart popup
function toggleCart(show) {
  const popup = document.getElementById('cart-popup');
  if (!popup) return;
  if (show) {
    popup.classList.remove('hidden');
    loadCart();
  } else {
    popup.classList.add('hidden');
  }
}
const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', () => toggleCart(true));
}

// Close profile/cart when clicking outside
document.addEventListener('click', (e) => {
  const profilePopup = document.getElementById('profile-popup');
  const cartPopup = document.getElementById('cart-popup');

  if (profilePopup && !profilePopup.classList.contains('hidden') &&
      !profilePopup.contains(e.target) && e.target !== profileBtn) {
    toggleProfile(false);
  }
  if (cartPopup && !cartPopup.classList.contains('hidden') &&
      !cartPopup.contains(e.target) && e.target !== cartBtn) {
    toggleCart(false);
  }
});

// Add to cart with animation
async function addToCart(id) {
  try {
    const res = await fetch('/api/cart/add', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id})
    });
    const data = await res.json();
    if (data.success) {
      const cc = document.getElementById('cart-count');
      if (cc) cc.textContent = data.cartCount;
      if (cartBtn) {
        cartBtn.classList.add('cart-bounce');
        setTimeout(()=>cartBtn.classList.remove('cart-bounce'), 400);
      }
      showToast('Added to cart');
    }
  } catch (err) {
    console.error(err);
    showToast('Something went wrong');
  }
}
window.addToCart = addToCart;

// Load cart items
async function loadCart() {
  try {
    const res = await fetch('/api/cart');
    const data = await res.json();
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!list || !totalEl) return;

    list.innerHTML = '';
    if (!data.items.length) {
      list.innerHTML = '<p class="muted">Your cart is empty.</p>';
    } else {
      data.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <span class="title">${item.title}</span>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
          <span>₹${item.price.toFixed(2)}</span>
        `;
        list.appendChild(row);
      });
    }
    totalEl.textContent = '₹' + data.total.toFixed(2);
  } catch (e) {
    console.error(e);
  }
}

// Update quantity
async function updateCartQty(id, delta) {
  try {
    const res = await fetch('/api/cart/update', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id, delta})
    });
    const data = await res.json();
    if (data.success) {
      const cc = document.getElementById('cart-count');
      if (cc) cc.textContent = data.cartCount;
      await loadCart();
    }
  } catch (e) {
    console.error(e);
  }
}
window.updateCartQty = updateCartQty;

// Checkout & COD animation
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(checkoutForm);
    const res = await fetch('/api/checkout', {
      method:'POST',
      body:new URLSearchParams(data)
    });
    const j = await res.json();
    if (j.success) {
      const overlay = document.getElementById('order-overlay');
      if (j.payment === 'cod' && overlay) {
        overlay.classList.remove('hidden');
        setTimeout(() => {
          overlay.classList.add('hidden');
          toggleCart(false);
        }, 2600);
      } else {
        showToast('Order placed with ' + j.payment.toUpperCase());
        toggleCart(false);
      }
      const cc = document.getElementById('cart-count');
      if (cc) cc.textContent = '0';
      loadCart();
    }
  });
}

// Search & sort

function filterAndSortProducts(gridId, sortSelectId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  const searchInput = document.getElementById('search-input');
  const query = (searchInput?.value || '').toLowerCase();
  const sortSelect = document.getElementById(sortSelectId);
  const sortVal = sortSelect ? sortSelect.value : '';

  cards.forEach(card => {
    const title = card.dataset.title || '';
    card.style.display = title.includes(query) ? 'flex' : 'none';
  });

  let visibleCards = cards.filter(c => c.style.display !== 'none');
  if (sortSelect && sortVal) {
    visibleCards.sort((a,b)=>{
      const pa = parseFloat(a.dataset.price);
      const pb = parseFloat(b.dataset.price);
      if (sortVal === 'low-high') return pa - pb;
      if (sortVal === 'high-low') return pb - pa;
      return 0;
    });
    visibleCards.forEach(c => grid.appendChild(c));
  }
}

// Hook search button
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    // On products page, sort select exists
    if (document.getElementById('products-grid')) {
      filterAndSortProducts('products-grid', 'products-sort');
    } else if (document.getElementById('arrival-grid')) {
      // home page: search only, no sort select
      filterAndSortProducts('arrival-grid', null);
    }
  });
}
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') {
      if (document.getElementById('products-grid')) {
        filterAndSortProducts('products-grid', 'products-sort');
      } else if (document.getElementById('arrival-grid')) {
        filterAndSortProducts('arrival-grid', null);
      }
    }
  });
}

// Products page sort select
const productsSort = document.getElementById('products-sort');
if (productsSort) {
  productsSort.addEventListener('change', () => {
    filterAndSortProducts('products-grid', 'products-sort');
  });
}

// Voice search
const voiceBtn = document.getElementById('voice-btn');
if (voiceBtn && 'webkitSpeechRecognition' in window) {
  const rec = new webkitSpeechRecognition();
  rec.lang = 'en-US';
  rec.onresult = function(e){
    const text = e.results[0][0].transcript;
    if (searchInput) {
      searchInput.value = text;
      if (document.getElementById('products-grid')) {
        filterAndSortProducts('products-grid', 'products-sort');
      } else if (document.getElementById('arrival-grid')) {
        filterAndSortProducts('arrival-grid', null);
      }
    }
  };
  voiceBtn.addEventListener('click', () => rec.start());
} else if (voiceBtn) {
  voiceBtn.title = 'Voice search not supported in this browser';
}

// Unique mood feature
const moodButtons = document.querySelectorAll('[data-mood]');
const moodPreview = document.getElementById('mood-preview');
const moodStyles = {
  chill: {
    gradient:'linear-gradient(135deg,#a8edea,#fed6e3)',
    text:'Chill mode: soft hoodies, oversized tees, pastel colors.'
  },
  party: {
    gradient:'linear-gradient(135deg,#f093fb,#f5576c)',
    text:'Party mode: sparkly tops, leather jackets, bold prints.'
  },
  street: {
    gradient:'linear-gradient(135deg,#4e54c8,#8f94fb)',
    text:'Street mode: oversized hoodies, cargo pants, chunky sneakers.'
  }
};
moodButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const mood = btn.dataset.mood;
    const style = moodStyles[mood];
    if (moodPreview && style) {
      moodPreview.style.background = style.gradient;
      moodPreview.innerHTML = '<p class="mood-label">'+style.text+'</p>';
    }
  });
});
