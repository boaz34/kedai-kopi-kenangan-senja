// Logika utama: katalog, state, & checkout

document.addEventListener("alpine:init", () => {
  // Data katalog produk & menu
  const CATALOG = [
    {
      id: 1,
      name: "Robusta Brazil",
      img: "1.jpg",
      price: 50000,
      category: "coffee",
      description:
        "Biji kopi pilihan kualitas premium dengan cita rasa autentik yang mendalam, aroma khas yang kuat, serta tingkat keasaman yang rendah.",
    },
    {
      id: 2,
      name: "Arabica Blend",
      img: "2.jpg",
      price: 250000,
      category: "coffee",
      description:
        "Perpaduan biji Arabica terbaik dari berbagai dataran tinggi, menghadirkan rasa yang lembut, manis alami, dan aroma bunga yang khas.",
    },
    {
      id: 3,
      name: "Flunch Espresso",
      img: "3.jpg",
      price: 250000,
      category: "coffee",
      description:
        "Espresso pekat dengan crema sempurna. Cocok untuk pecinta kopi yang menginginkan sajian kuat dan berenergi di setiap tegukan.",
    },
    {
      id: 4,
      name: "Hard Black",
      img: "4.jpg",
      price: 50000,
      category: "coffee",
      description:
        "Kopi hitam murni tanpa campuran. Rasa pahit yang elegan dengan aftertaste yang panjang dan memuaskan.",
    },
    {
      id: 5,
      name: "Kopi Susu Houseblend",
      img: "5.jpg",
      price: 200000,
      category: "milk",
      description:
        "Racikan andalan toko kami. Perpaduan espresso segar dengan susu segar pilihan, menghasilkan rasa yang creamy dan menyegarkan.",
    },
    {
      id: 6,
      name: "Cappuccino",
      img: "1.jpg",
      price: 35000,
      category: "milk",
      description:
        "Cappuccino klasik Italia dengan lapisan foam susu yang tebal dan aroma espresso yang harum di setiap cangkir.",
    },
    {
      id: 7,
      name: "Mocha Latte",
      img: "2.jpg",
      price: 38000,
      category: "milk",
      description:
        "Perpaduan lembut antara espresso, cokelat premium, dan susu segar. Pilihan sempurna untuk Anda yang suka manis.",
    },
    {
      id: 8,
      name: "Chocolate Milk",
      img: "3.jpg",
      price: 28000,
      category: "non-coffee",
      description:
        "Minuman cokelat susu premium, dibuat dari bahan cokelat berkualitas tinggi dengan tekstur yang kaya dan creamy.",
    },
  ];

  // Filter produk & modal detail
  Alpine.data("products", () => ({
    get items() {
      const query = (Alpine.store("ui").searchQuery || "").toLowerCase().trim();
      if (!query) return CATALOG;
      return CATALOG.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    },
    selectedItem: null,

    openDetail(item) {
      this.selectedItem = item;
      // Buka modal detail
      Alpine.store("ui").openModal(item);
    },
  }));

  // List menu & filter pencarian
  Alpine.data("menuSection", () => ({
    get items() {
      const query = (Alpine.store("ui").searchQuery || "").toLowerCase().trim();
      if (!query) return CATALOG;
      return CATALOG.filter((item) => item.name.toLowerCase().includes(query));
    },
  }));

  // Store UI: search, cart, & toast
  Alpine.store("ui", {
    isNavOpen: false,
    isSearchOpen: false,
    searchQuery: "",
    isCartOpen: false,
    isModalOpen: false,
    modalItem: null,
    toastMessage: "",
    toastVisible: false,
    _toastTimer: null,

    get searchResults() {
      const query = (this.searchQuery || "").toLowerCase().trim();
      if (!query) return [];
      return CATALOG.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      );
    },

    highlightMatch(text, query) {
      if (!text) return "";
      const q = (query || "").trim();
      if (!q) return text;
      const regex = new RegExp(
        `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      return text.replace(regex, `<span class="search-highlight">$1</span>`);
    },

    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
      if (this.isNavOpen) {
        this.isSearchOpen = false;
        this.isCartOpen = false;
      }
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
      if (this.isSearchOpen) {
        this.isNavOpen = false;
        this.isCartOpen = false;
      } else {
        this.searchQuery = "";
      }
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
      if (this.isCartOpen) {
        this.isNavOpen = false;
        this.isSearchOpen = false;
      }
    },
    closeAll() {
      this.isNavOpen = false;
      this.isSearchOpen = false;
      this.searchQuery = "";
      this.isCartOpen = false;
    },
    closeIfOutside(event, panelName) {
      if (
        document.body.classList.contains("swal2-shown") ||
        (event && event.target && event.target.closest(".swal2-container"))
      ) {
        return;
      }
      if (panelName === "cart") this.isCartOpen = false;
      if (panelName === "nav") this.isNavOpen = false;
      if (panelName === "search") {
        this.isSearchOpen = false;
        this.searchQuery = "";
      }
    },
    openModal(item) {
      this.modalItem = item;
      this.isModalOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.isModalOpen = false;
      this.modalItem = null;
      document.body.style.overflow = "";
    },

    // Munculin notif toast
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      if (this._toastTimer) clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 2800);
    },
  });

  // Store cart: tambah/hapus & localStorage
  let initialCart = { items: [], total: 0, quantity: 0 };
  try {
    const savedCart = localStorage.getItem("kenangan_senja_cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Cek struktur data localStorage biar gak error
      if (parsed && Array.isArray(parsed.items)) {
        initialCart = parsed;
      }
    }
  } catch (err) {
    console.error("Gagal memuat keranjang dari localStorage:", err);
  }

  Alpine.store("cart", {
    items: initialCart.items,
    total: initialCart.total,
    quantity: initialCart.quantity,

    save() {
      try {
        localStorage.setItem(
          "kenangan_senja_cart",
          JSON.stringify({
            items: this.items,
            total: this.total,
            quantity: this.quantity,
          }),
        );
      } catch (err) {
        console.error("Gagal menyimpan keranjang ke localStorage:", err);
      }
    },

    add(newItem) {
      // Cek validitas item & harga asli dari katalog
      const validItem = CATALOG.find(
        (c) => c.id === newItem.id && c.price === newItem.price,
      );
      if (!validItem) {
        console.warn(
          "Percobaan penambahan item tidak valid atau harga telah dimodifikasi:",
          newItem,
        );
        return;
      }

      const cartItem = this.items.find((item) => item.id === validItem.id);
      if (!cartItem) {
        this.items.push({ ...validItem, quantity: 1, total: validItem.price });
        this.quantity++;
        this.total += validItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== validItem.id) return item;
          item.quantity++;
          item.total = validItem.price * item.quantity;
          this.quantity++;
          this.total += validItem.price;
          return item;
        });
      }
      this.save();
      // Munculin toast notif
      if (window.Swal) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          icon: "success",
          iconColor: "#d4af37",
          title: validItem.name,
          text: "Berhasil ditambahkan ke keranjang",
          background: "#121216",
          color: "#fff",
          customClass: {
            popup: "swal-toast-glass",
            title: "swal-toast-title",
          },
        });
      } else {
        Alpine.store("ui").showToast(
          `✓ ${validItem.name} ditambahkan ke keranjang`,
        );
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;
          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
      this.save();
    },

    // Kosongin keranjang
    clear() {
      this.items = [];
      this.total = 0;
      this.quantity = 0;
      this.save();
    },

    clearWithConfirm() {
      if (window.Swal) {
        Swal.fire({
          title: "Kosongkan Keranjang?",
          text: "Semua produk pilihan Anda akan dihapus dari keranjang.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d4af37",
          cancelButtonColor: "#ef4444",
          confirmButtonText: "Ya, Kosongkan!",
          cancelButtonText: "Batal",
          background: "#121216",
          color: "#fff",
          customClass: {
            popup: "swal-glass",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.clear();
          }
        });
      } else {
        if (window.confirm("Kosongkan seluruh keranjang?")) {
          this.clear();
        }
      }
    },
  });

  // Form checkout: validasi & kirim ke WA
  Alpine.data("checkoutForm", () => ({
    name: "",
    email: "",
    phone: "",
    isCooldown: false,
    cooldownTime: 0,

    get isValid() {
      const nameValid = this.name.trim().length >= 2;
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
      // Validasi nomor HP Indo
      const cleanPhone = this.phone.trim();
      const phoneValid = /^(62|08)[0-9]{8,12}$/.test(cleanPhone);
      return nameValid && emailValid && phoneValid;
    },

    submitCheckout() {
      if (!this.isValid || this.isCooldown) return;

      this.isCooldown = true;
      this.cooldownTime = 5;

      const timer = setInterval(() => {
        this.cooldownTime--;
        if (this.cooldownTime <= 0) {
          clearInterval(timer);
          this.isCooldown = false;
        }
      }, 1000);

      // Hitung ulang total dari harga asli katalog
      let verifiedTotal = 0;
      const cartItems = Alpine.store("cart").items || [];

      const verifiedItems = cartItems
        .map((item) => {
          if (!item) return null;
          const catalogItem = CATALOG.find(
            (c) => Number(c.id) === Number(item.id),
          );
          const correctPrice = catalogItem
            ? catalogItem.price
            : Number(item.price) || 0;
          const name = catalogItem ? catalogItem.name : item.name || "Produk";
          const quantity = Number(item.quantity) || 1;

          const itemTotal = correctPrice * quantity;
          verifiedTotal += itemTotal;

          return {
            name: name,
            quantity: quantity,
            total: itemTotal,
          };
        })
        .filter(Boolean);

      const itemsList = verifiedItems
        .map(
          (item) => `- ${item.name} × ${item.quantity} = ${rupiah(item.total)}`,
        )
        .join("\n");

      const message =
        `*PESANAN KENANGAN SENJA*\n\n` +
        `Nama   : ${this.name.trim()}\n` +
        `Email  : ${this.email.trim()}\n` +
        `No. HP : ${this.phone.trim()}\n\n` +
        `Detail Pesanan:\n` +
        itemsList +
        `\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `TOTAL: ${rupiah(verifiedTotal)}\n\n` +
        `Terima kasih! Pesanan akan segera kami proses.`;

      window.open(
        "https://wa.me/6289506899697?text=" + encodeURIComponent(message),
        "_blank",
      );
    },
  }));
});

// Format angka ke Rp
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(number));
};
window.rupiah = rupiah; // Biar bisa dipake di HTML/Alpine

// Toast cadangan diluar Alpine
const showAppToast = (message, type = "info") => {
  const toast = document.getElementById("app-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = `app-toast app-toast--${type} app-toast--visible`;
  setTimeout(() => {
    toast.className = "app-toast";
  }, 3000);
};
