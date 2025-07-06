document.addEventListener('DOMContentLoaded', function() {
    // Handle reset button
    const resetBtn = document.getElementById('reset-scene');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const chair = document.querySelector('[gltf-model]');
            if (chair) {
                chair.setAttribute('position', '0 0 -1');
                chair.setAttribute('rotation', '0 0 0');
                chair.setAttribute('scale', '0.5 0.5 0.5');
            }
        });
    }

    // Add loading state
    const chairModel = document.querySelector('[gltf-model]');
    if (chairModel) {
        chairModel.addEventListener('model-loading', function() {
            console.log('Chair model is loading...');
        });
        
        chairModel.addEventListener('model-loaded', function() {
            console.log('Chair model loaded successfully');
        });
        
        chairModel.addEventListener('model-error', function() {
            alert('Failed to load chair model. Please check console for details.');
            console.error('Model error:', this.components['gltf-model'].model);
        });
    }
});