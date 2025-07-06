document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.arjs-loader');
    const statusMessage = document.getElementById('status-message');
    const scene = document.querySelector('a-scene');
    const chair = document.getElementById('chair');

    // 1. Only use YOUR local model
    chair.setAttribute('gltf-model', {
        src: '/models/chair.glb',
        crossorigin: 'anonymous'
    });

    // 2. Model load events
    chair.addEventListener('model-loaded', function() {
        console.log("Your chair model loaded successfully");
        loader.style.display = 'none';
    });

    chair.addEventListener('model-error', function(evt) {
        console.error("Failed to load your model:", evt.detail);
        statusMessage.innerHTML = `
            Model failed to load<br>
            <small>Check: <br>1. File exists at <code>/models/chair.glb</code><br>2. File is valid GLB</small>
        `;
    });

    // 3. AR initialization
    scene.addEventListener('arjs-video-loaded', function() {
        statusMessage.textContent = "Point camera at a flat surface";
    });
});