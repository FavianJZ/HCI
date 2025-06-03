const sampleReports = [
    {
        id: 1,
        nama: "Warga A",
        jenis: "Jalan Berlubang",
        lokasi: "Jl. Merdeka No. 10",
        latitude: -6.175110,
        longitude: 106.865039,
        timestamp: "2024-01-10T09:30:00",
        imageUrl: "assets/samples/pothole1.jpg"
    },
    {
        id: 2,
        nama: "Warga B",
        jenis: "Lampu Jalan Mati",
        lokasi: "Jl. Sudirman No. 25",
        latitude: -6.176392,
        longitude: 106.862847,
        timestamp: "2024-01-11T14:20:00",
        imageUrl: "assets/samples/streetlight1.jpg"
    },
    {
        id: 3,
        nama: "Warga C",
        jenis: "Tempat Sampah Penuh",
        lokasi: "Jl. Thamrin No. 15",
        latitude: -6.174567,
        longitude: 106.863956,
        timestamp: "2024-01-12T11:15:00",
        imageUrl: "assets/samples/trash1.jpg"
    }
];

function initializeSampleReports() {
    if (!localStorage.getItem('reports')) {
        localStorage.setItem('reports', JSON.stringify(sampleReports));
    }
}

initializeSampleReports();

