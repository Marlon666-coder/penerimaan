// Smooth scroll untuk link anchor
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Validasi & handling form pendaftaran (demo, tersimpan di localStorage)
const form = document.getElementById('pendaftaran-form');
const msg = document.getElementById('form-msg');

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = 'form-msg ' + type;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    nama: form.nama.value.trim(),
    email: form.email.value.trim(),
    telepon: form.telepon.value.trim(),
    asalSekolah: form.asalSekolah.value.trim(),
    prodi: form.prodi.value,
    alamat: form.alamat.value.trim(),
    waktu: new Date().toISOString(),
  };

  // Validasi sederhana
  if (!data.nama || !data.email || !data.telepon || !data.asalSekolah || !data.prodi) {
    showMessage('Mohon lengkapi semua field yang wajib diisi.', 'error');
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!emailOk) {
    showMessage('Format email tidak valid.', 'error');
    return;
  }

  // Simpan ke localStorage (demo tanpa backend)
  try {
    const list = JSON.parse(localStorage.getItem('pendaftar') || '[]');
    list.push(data);
    localStorage.setItem('pendaftar', JSON.stringify(list));
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage', err);
  }

  showMessage('✅ Terima kasih, ' + data.nama + '! Pendaftaran kamu berhasil dikirim.', 'success');
  form.reset();
});
