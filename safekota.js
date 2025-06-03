document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([-6.200000, 106.816666], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const facilities = [
      {lat: -6.1754, lng: 106.8272, name: 'Monas', type: 'Landmark'},
      {lat: -6.1698, lng: 106.8230, name: 'Taman Menteng', type: 'Taman'},
      {lat: -6.1809, lng: 106.8222, name: 'Sarinah', type: 'Mall'}
  ];

  facilities.forEach(facility => {
      L.marker([facility.lat, facility.lng])
          .bindPopup(`<b>${facility.name}</b><br>${facility.type}`)
          .addTo(map);
  });

  const reports = JSON.parse(localStorage.getItem('reports') || '[]');
  
  const icons = {
      'Jalan Berlubang': 'road',
      'Lampu Jalan Mati': 'light',
      'Tempat Sampah Penuh': 'trash'
  };

  reports.forEach(report => {
      const marker = L.marker([report.latitude, report.longitude]).addTo(map);

      const popupContent = `
          <div class="p-2">
              <h3 class="font-bold">${report.jenis}</h3>
              <p>${report.lokasi}</p>
              <p>Dilaporkan oleh: ${report.nama}</p>
              <p>Tanggal: ${new Date(report.timestamp).toLocaleDateString()}</p>
          </div>
      `;
      
      marker.bindPopup(popupContent);
  });

  const form = document.querySelector('#lapor form');
  const jenis = document.getElementById('jenis');
  const lokasi = document.getElementById('lokasi');
  const foto = document.getElementById('foto');

  form.addEventListener('submit', function (e) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    let valid = true;

    if (!jenis.value || jenis.value.trim() === '') {
      showError(jenis, 'Jenis kerusakan wajib dipilih');
      valid = false;
    }
    if (!lokasi.value || lokasi.value.trim() === '') {
      showError(lokasi, 'Lokasi masalah wajib diisi');
      valid = false;
    }
    if (!foto.files || foto.files.length === 0) {
      showError(foto, 'Foto wajib diupload');
      valid = false;
    }
    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(element, message) {
    const error = document.createElement('p');
    error.classList.add('error-message');
    error.style.color = 'red';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    element.parentNode.appendChild(error);
  }

  function displayReportsGallery() {
    const gallery = document.getElementById('reports-gallery');
    if (!gallery) return;

    const reports = JSON.parse(localStorage.getItem('reports') || '[]')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    gallery.innerHTML = reports.slice(0, 6).map(report => `
        <div class="report-card">
            <img src="${report.imageUrl || 'assets/placeholder.jpg'}" 
                 alt="Foto laporan" 
                 class="report-image">
            <div class="p-4">
                <span class="report-badge">${report.jenis}</span>
                <h4 class="font-semibold mt-2">${report.lokasi}</h4>
                <div class="text-sm text-gray-600 mt-2">
                    <p>Dilaporkan oleh: ${report.nama || 'Anonim'}</p>
                    <p>${new Date(report.timestamp).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `).join('');
}

  displayReportsGallery();
});
