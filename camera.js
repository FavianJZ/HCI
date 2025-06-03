let stream;
let facingMode = 'environment'; // Start with back camera

const cameraView = document.getElementById('camera-view');
const captureButton = document.getElementById('capture-btn');
const switchButton = document.getElementById('switch-camera');
const canvas = document.getElementById('capture-canvas');
const capturedImage = document.getElementById('captured-image');
const downloadLink = document.getElementById('download-link');

async function startCamera() {
    try {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facingMode },
            audio: false
        });
        
        cameraView.srcObject = stream;
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Error accessing camera. Please make sure you have given permission.');
    }
}

function captureImage() {
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(cameraView, 0, 0);
    
    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = 'block';
    
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.classList.remove('hidden');
}

function switchCamera() {
    facingMode = facingMode === 'user' ? 'environment' : 'user';
    startCamera();
}

captureButton.addEventListener('click', captureImage);
switchButton.addEventListener('click', switchCamera);
window.addEventListener('load', startCamera);
