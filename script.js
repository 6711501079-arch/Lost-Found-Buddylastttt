// Data storage
let allPosts = [];
let activeCategory = 'all';

// Initialize Data SDK
const dataHandler = {
  onDataChanged(data) {
    allPosts = data || [];
    const searchTerm = document.getElementById('searchInput').value;
    renderCards(activeCategory, searchTerm);
  }
};

(async () => {
  if (window.dataSdk) {
    await window.dataSdk.init(dataHandler);
  }
})();

function renderCards(filter = 'all', searchTerm = '') {
  const container = document.getElementById('cardsContainer');
  let filtered = [...allPosts];

  if (filter !== 'all') {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center p-10 opacity-30"><p>ไม่พบรายการที่ค้นหา</p></div>`;
    return;
  }

  container.innerHTML = filtered.map((post, i) => `
    <article class="item-card" data-id="${post.__backendId}">
      <div class="d-flex gap-3">
        <div class="card-img-wrap" style="width:70px; height:70px; background:rgba(255,255,255,0.05); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:30px;">
          ${post.emoji}
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <h5 class="mb-1" style="font-size:16px;">${post.name}</h5>
            <span class="status-badge ${post.status === 'lost' ? 'badge-lost' : 'badge-found'}">
              ${post.status === 'lost' ? 'หาย' : 'พบแล้ว'}
            </span>
          </div>
          <div class="opacity-50" style="font-size:12px;">
            <i class="bi bi-geo-alt"></i> ${post.location}
          </div>
          <div class="opacity-30" style="font-size:11px;">${post.date}</div>
        </div>
      </div>
    </article>
  `).join('');
}

// Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
  renderCards(activeCategory, e.target.value);
});

// Category Filter
document.getElementById('chipsContainer').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.category;
  renderCards(activeCategory, document.getElementById('searchInput').value);
});

// Toast Helper
function showToast(message, icon = '✅') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Event Listeners for buttons
document.getElementById('btnLost').onclick = () => alert('ฟังก์ชันแจ้งของหาย (เปิด Modal)');
document.getElementById('btnFound').onclick = () => alert('ฟังก์ชันแจ้งพบของ (เปิด Modal)');
document.getElementById('navAdd').onclick = () => alert('เพิ่มโพสต์ใหม่');
