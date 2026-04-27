// 1. Fungsi Smooth Scroll (Scroll Halus)
// Saat menu di klik, halaman akan bergeser dengan halus ke bagian yang dituju
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Efek Navbar saat Scroll
// Navbar akan mendapatkan bayangan (shadow) lebih tebal saat user mulai men-scroll ke bawah
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
        navbar.style.padding = '0.8rem 8%';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        navbar.style.padding = '1rem 8%';
    }
});

// 3. Logika Keranjang Belanja (Cart)
const cartButtons = document.querySelectorAll('.cart-btn');
const cartBadge = document.getElementById('cart-count');
let totalItems = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Tambah jumlah item
        totalItems++;
        cartBadge.innerText = totalItems;

        // Ambil nama produk dari kartu tersebut
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;

        // Animasi tombol saat diklik
        const originalText = button.innerText;
        button.innerText = "Berhasil Ditambah! ✨";
        button.style.backgroundColor = "#ff85c0"; // Warna pink lebih gelap
        button.disabled = true; // Nonaktifkan sebentar agar tidak double click

        // Kembalikan tombol ke keadaan semula setelah 1.5 detik
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "#ffb3d9"; // Warna pink lembut
            button.disabled = false;
        }, 1500);

        // Munculkan log di console (untuk pengecekan saja)
        console.log(`Produk "${productName}" masuk ke keranjang.`);
    });
});

// 4. Efek Muncul Saat Scroll (Scroll Reveal Simple)
// Membuat elemen muncul perlahan saat di-scroll ke bawah
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .about-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});