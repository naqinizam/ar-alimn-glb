// AR Initialization and Debugging
document.addEventListener('DOMContentLoaded', function() {
    // Scene elements
    const scene = document.querySelector('a-scene');
    const chair = document.querySelector('[gltf-model]');
    const loadingScreen = document.getElementById('loading');
    
    // 1. Verify WebXR/AR support
    if (!navigator.xr) {
        console.warn("WebXR not available - Falling back to AR.js");
        scene.setAttribute('arjs', 'sourceType: webcam; detectionMode: mono;');
    }

    // 2. Model Loading Handlers
    chair.addEventListener('model-loaded', function() {
        console.log("Model loaded successfully");
        if (loadingScreen) loadingScreen.style.display = 'none';
        
        // Auto-rotate for visibility testing
        chair.setAttribute('animation', {
            property: 'rotation',
            to: '0 360 0',
            loop: true,
            dur: 10000
        });
    });

    chair.addEventListener('model-error', function(evt) {
        console.error("Model error:", evt.detail);
        alert(`Model failed to load. Details in console.`);
        
        // Fallback to test model
        console.log("Attempting fallback model...");
        chair.setAttribute('gltf-model', {
            src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Chair/glTF-Binary/Chair.glb'
        });
    });

    // 3. AR Session Events
    scene.addEventListener('arjs-nft-loaded', function() {
        console.log("AR tracking initialized");
    });

    scene.addEventListener('markerFound', function() {
        console.log("Marker/plane detected");
    });

    // 4. iPhone-specific fixes
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Reduce model scale for mobile
        chair.setAttribute('scale', '0.2 0.2 0.2');
        
        // Force refresh tracking
        setTimeout(() => {
            scene.systems['arjs']._arSession.start();
        }, 1000);
    }
});