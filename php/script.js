// script.js

// Fungsi untuk menampilkan alert dengan animasi
function showAlert(message, type = 'info') {
    // Cek jika alert sudah ada, hapus dulu
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Buat elemen alert baru
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Tambahkan ke body
    document.body.appendChild(alertDiv);
    
    // Tampilkan dengan animasi
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10);
    
    // Sembunyikan setelah 5 detik
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 300);
    }, 5000);
}

// Fungsi untuk validasi form sebelum submit
function validateForm() {
    const form = document.querySelector('form');
    const idInput = document.getElementById('id');
    const namaBarangInput = document.getElementById('nama_barang');
    const jenisBarangInput = document.getElementById('jenis_barang');
    const jumlahBarangInput = document.getElementById('jumlah_barang');
    const lokasiBarangInput = document.getElementById('lokasi_barang');
    
    // Reset error state
    const errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => {
        input.classList.remove('error-input');
    });
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.remove();
    });
    
    let isValid = true;
    
    // Validasi ID (harus angka positif)
    if (idInput && !idInput.readOnly) {
        const idValue = idInput.value.trim();
        if (!idValue || isNaN(idValue) || parseInt(idValue) <= 0) {
            showError(idInput, 'ID harus berupa angka positif');
            isValid = false;
        }
    }
    
    // Validasi Nama Barang (minimal 3 karakter)
    if (namaBarangInput) {
        const namaValue = namaBarangInput.value.trim();
        if (!namaValue || namaValue.length < 3) {
            showError(namaBarangInput, 'Nama barang minimal 3 karakter');
            isValid = false;
        }
    }
    
    // Validasi Jenis Barang (tidak boleh kosong)
    if (jenisBarangInput) {
        const jenisValue = jenisBarangInput.value.trim();
        if (!jenisValue) {
            showError(jenisBarangInput, 'Jenis barang tidak boleh kosong');
            isValid = false;
        }
    }
    
    // Validasi Jumlah Barang (harus angka positif)
    if (jumlahBarangInput) {
        const jumlahValue = jumlahBarangInput.value.trim();
        if (!jumlahValue || isNaN(jumlahValue) || parseInt(jumlahValue) <= 0) {
            showError(jumlahBarangInput, 'Jumlah barang harus angka positif');
            isValid = false;
        }
    }
    
    // Validasi Lokasi Barang (tidak boleh kosong)
    if (lokasiBarangInput) {
        const lokasiValue = lokasiBarangInput.value.trim();
        if (!lokasiValue) {
            showError(lokasiBarangInput, 'Lokasi barang tidak boleh kosong');
            isValid = false;
        }
    }
    
    return isValid;
}

// Fungsi untuk menampilkan pesan error di input
function showError(inputElement, message) {
    inputElement.classList.add('error-input');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    inputElement.parentNode.appendChild(errorDiv);
}

// Fungsi untuk menambahkan efek pada baris tabel saat dihover
function addTableRowEffects() {
    const tableRows = document.querySelectorAll('table tr');
    
    tableRows.forEach(row => {
        // Lewati header
        if (row.querySelector('th')) return;
        
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Fungsi untuk menambahkan efek konfirmasi sebelum hapus
function enhanceDeleteConfirmation() {
    const deleteLinks = document.querySelectorAll('a[href*="delete"]');
    
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Tambahkan efek visual sebelum konfirmasi
            const row = this.closest('tr');
            if (row) {
                row.style.backgroundColor = '#ffebee';
                row.style.transition = 'background-color 0.3s';
                
                // Kembalikan warna setelah 500ms jika user membatalkan
                setTimeout(() => {
                    if (!row.isDeleted) {
                        row.style.backgroundColor = '';
                    }
                }, 500);
            }
        });
    });
}

// Fungsi untuk menambahkan filter/search pada tabel
function addTableFilter() {
    // Cek jika tabel ada
    const table = document.querySelector('table');
    if (!table) return;
    
    // Buat input filter
    const filterDiv = document.createElement('div');
    filterDiv.style.marginBottom = '15px';
    filterDiv.style.display = 'flex';
    filterDiv.style.justifyContent = 'flex-end';
    
    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = 'Cari data...';
    filterInput.style.padding = '10px';
    filterInput.style.border = '2px solid #ddd';
    filterInput.style.borderRadius = '6px';
    filterInput.style.width = '250px';
    
    filterDiv.appendChild(filterInput);
    table.parentNode.insertBefore(filterDiv, table);
    
    // Fungsi filter
    filterInput.addEventListener('keyup', function() {
        const filterValue = this.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let rowText = '';
            
            cells.forEach(cell => {
                rowText += cell.textContent.toLowerCase() + ' ';
            });
            
            if (rowText.includes(filterValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Fungsi untuk menambahkan style dinamis pada alert
function addAlertStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: opacity 0.3s, transform 0.3s;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .custom-alert.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .alert-info {
            background: linear-gradient(to right, #3498db, #2980b9);
        }
        
        .alert-success {
            background: linear-gradient(to right, #2ecc71, #27ae60);
        }
        
        .alert-error {
            background: linear-gradient(to right, #e74c3c, #c0392b);
        }
        
        .error-input {
            border-color: #e74c3c !important;
            background-color: #ffebee;
        }
    `;
    
    document.head.appendChild(style);
}

// Fungsi untuk menambahkan animasi loading
function showLoading() {
    const submitButtons = document.querySelectorAll('button[type="submit"], button[name="submit"], button[name="update"]');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateForm()) {
                // Simpan teks asli
                const originalText = this.textContent;
                
                // Ganti dengan animasi loading
                this.innerHTML = '<span class="loading-spinner"></span> Memproses...';
                this.disabled = true;
                
                // Kembalikan setelah 2 detik (untuk simulasi)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Inisialisasi semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan style untuk alert
    addAlertStyles();
    
    // Tambahkan efek pada tabel
    addTableRowEffects();
    
    // Tambahkan konfirmasi hapus yang lebih baik
    enhanceDeleteConfirmation();
    
    // Tambahkan filter tabel
    addTableFilter();
    
    // Tambahkan animasi loading
    showLoading();
    
    // Tambahkan event listener untuk form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showAlert('Harap perbaiki kesalahan pada form sebelum submit', 'error');
            }
        });
    }
    
    // Tambahkan event listener untuk input agar error hilang saat diketik
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error-input');
            
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
    
    // Tampilkan pesan selamat datang
    setTimeout(() => {
        showAlert('Selamat datang di Sistem Manajemen Aset', 'success');
    }, 1000);
});

// Tambahkan spinner loading ke CSS
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);