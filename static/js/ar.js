<script src="https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.152.2/examples/js/loaders/GLTFLoader.js"></script>

<script>
  async function startAR() {
    const arContainer = document.getElementById('ar-container');
    arContainer.style.display = 'block';

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: arContainer,
      imageTargetSrc: "https://cdn.jsdelivr.net/gh/MindAR-js/targets@master/targets/sample-target.mind",
    });

    const { renderer, scene, camera } = mindarThree;

    const anchor = mindarThree.addAnchor(0);
    const gltfLoader = new THREE.GLTFLoader();

    gltfLoader.load(
      "/static/models/chair.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.4, 0.4, 0.4); // Adjust if too big or small
        model.position.set(0, -0.5, 0); // Adjust for height
        anchor.group.add(model);
      },
      undefined,
      (error) => {
        console.error("Failed to load model:", error);
      }
    );

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
</script>
