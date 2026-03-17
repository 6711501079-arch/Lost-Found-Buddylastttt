// ข้อมูลจำลอง
const samplePosts = [
    { id: 1, name: 'iPhone 15 Pro Max', status: 'lost', category: 'electronics', emoji: '📱', location: 'สยามพารากอน ชั้น 3', date: '15 ม.ค. 2025', desc: 'สีดำ มีเคสใส' },
    { id: 2, name: 'กระเป๋าสตางค์หนังสีน้ำตาล', status: 'found', category: 'bags', emoji: '👛', location: 'BTS สีลม', date: '14 ม.ค. 2025', desc: 'พบบนที่นั่งรถไฟฟ้า' },
    { id: 3, name: 'บัตรนักศึกษา', status: 'lost', category: 'cards', emoji: '🪪', location: 'มธ. รังสิต', date: '13 ม.ค. 2025', desc: 'ชื่อ สมชาย ใจดี' },
    { id: 4, name: 'แหวนทองคำ', status: 'found', category: 'jewelry', emoji: '💍', location: 'สวนลุมพินี', date: '12 ม.ค. 2025', desc: 'มีอักษรสลักด้านใน' }
];

let activeCategory = 'all';

// ฟังก์ชันแสดงการ์ดรายการ
function renderCards(filter = 'all', searchTerm = '') {
    const container = document.getElementById('cardsContainer');
    let filtered = samplePosts;

    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
    }

    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.location.toLowerCase().includes(term)
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center p-10 opacity-50"><p>🔍 ไม่พบรายการ</p></div>`;
        return;
    }

    container.innerHTML = filtered.map(post => `
        <article class="item-card">
            <div class="d-flex gap-3">
                <div class="card-img-wrap ${post.status === 'lost' ? 'lost-bg' : 'found-bg'} d-flex align-items-center justify-content-center fs-1">
                    ${post.emoji}
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fs-6">${post.name}</h5>
                        <span class="badge ${post.status === 'lost' ? 'bg-danger' : 'bg-success'} font-monospace" style="font-size: 10px;">
                            ${post.status === 'lost' ? 'LOST' : 'FOUND'}
                        </span>
                    </div>
                    <p class="small opacity-50 mb-1"><i class="bi bi-geo-alt"></i> ${post.location}</p>
                    <p class="small opacity-50 mb-0">${post.date} · ${post.desc}</p>
                </div>
            </div>
        </article>
    `).join('');
}

// ระบบ Toast Notification
function showToast(message, icon = '✅') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast-msg p-3 mb-2 rounded shadow-lg d-flex align-items-center gap-2';
    toast.style.background = '#1a1932';
    toast.style.border = '1px solid #7f5af0';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Event Listeners สำหรับหมวดหมู่
document.getElementById('chipsContainer').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCategory = chip.dataset.category;
    renderCards(activeCategory, document.getElementById('searchInput').value);
});

// Event Listener สำหรับการค้นหา
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderCards(activeCategory, e.target.value);
});

// ปุ่มต่าง ๆ
document.getElementById('btnLost').onclick = () => showToast('เปิดฟอร์มแจ้งของหาย...', '🔍');
document.getElementById('btnFound').onclick = () => showToast('เปิดฟอร์มแจ้งของที่พบ...', '📦');

// เริ่มต้นแสดงผล
renderCards();
