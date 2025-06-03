document.addEventListener('DOMContentLoaded', function() {
    const gpsCoords = document.getElementById('gps-coords');
    const refreshGPS = document.getElementById('refresh-gps');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const timestampInput = document.getElementById('timestamp');

    function updateTimestamp() {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }

    function getLocation() {
        if (navigator.geolocation) {
            gpsCoords.textContent = 'Mengambil lokasi...';
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    gpsCoords.textContent = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                    latitudeInput.value = lat;
                    longitudeInput.value = lon;
                },
                function(error) {
                    gpsCoords.textContent = 'Gagal mendapatkan lokasi';
                    console.error('Error getting location:', error);
                }
            );
        } else {
            gpsCoords.textContent = 'GPS tidak didukung di browser ini';
        }
    }

    refreshGPS.addEventListener('click', getLocation);

    getLocation();
    updateTimestamp();

    document.querySelector('form').addEventListener('submit', function(e) {
        updateTimestamp();
    });

    const map = L.map('location-map').setView([-6.200000, 106.816666], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker;

    function updateLocation(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        document.getElementById('gps-coords').textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        document.getElementById('map-preview').classList.remove('hidden');

        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }
        map.setView([lat, lng], 15);
    }

    const formInputs = document.querySelectorAll('form input, form select');
    formInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            updateProgress(index);
        });
    });

    function updateProgress(step) {
        const steps = document.querySelectorAll('.progress-steps > div');
        steps[Math.floor(step/2)].classList.add('completed');
    }

    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        document.getElementById('loading').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('result-modal').classList.remove('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        }, 2000);
    });
});

function closeModal() {
    document.getElementById('result-modal').classList.add('hidden');
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
}
