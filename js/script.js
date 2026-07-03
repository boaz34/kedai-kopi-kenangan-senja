// Interaksi UI: keyboard & klik backdrop

// Tekan Esc buat tutup semua panel & modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    // Cek dulu Alpine udah ready belum
    if (typeof Alpine !== "undefined") {
      Alpine.store("ui").closeAll();
      Alpine.store("ui").closeModal();
    }
  }
});

// Auto-focus search udah diatur via x-effect di HTML ya

// Klik area gelap di luar modal buat nutup modalnya
document.addEventListener("click", (e) => {
  const modal = document.getElementById("item-detail-modal-overlay");
  if (e.target === modal && typeof Alpine !== "undefined") {
    Alpine.store("ui").closeModal();
  }
});
