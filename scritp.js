const PARTICLE_COUNT = 200;
const SEA_SIZE = 100;
const WAVES_INTENSITY = 5;
const WAVES_SMOOTHNESS = 7;
const STEP = 0.2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.fog = new THREE.FogExp2(0x000104, 0.03);

const pMaterial = new THREE.PointsMaterial({
  color: "rgb(18, 47, 78)",
  size: 0.15,
  fog: false
});
const generateBackgroundParticles = () => {
  const particles = new THREE.Geometry();
  for (let p = 0; p < PARTICLE_COUNT; p++) {
    const pX = Math.random() * 100 - 50,
      pY = Math.random() * 100 - 50,
      pZ = Math.random() * 100 - 50,
      particle = new THREE.Vector3(pX, pY, pZ);
    particles.vertices.push(particle);
  }
  return particles;
};
const backgroundParticles = generateBackgroundParticles();
const backgroundParticleSystem = new THREE.Points(
  backgroundParticles,
  pMaterial
);
scene.add(backgroundParticleSystem);

const pn = new Perlin(new Date().toString());

const generateSeaParticles = () => {
  const particles = new THREE.Geometry();
  for (let i = 0; i < SEA_SIZE * 2; i += STEP) {
    for (let j = 0; j < SEA_SIZE; j += STEP) {
      const pX = -i + SEA_SIZE;
      const pZ = -j;
      const pY =
        pn.noise(i / WAVES_SMOOTHNESS, j / WAVES_SMOOTHNESS, 0) *
        -WAVES_INTENSITY;
      particle = new THREE.Vector3(pX, pY, pZ);
      particles.vertices.push(particle);
    }
  }
  return particles;
};
const seaMaterial = new THREE.PointsMaterial({
  color: "rgb(18, 47, 78)",
  size: 0.08
});
const seaParticles = generateSeaParticles();
const seaParticleSystem = new THREE.Points(seaParticles, seaMaterial);
scene.add(seaParticleSystem);

const render = () => {
  requestAnimationFrame(render);
  backgroundParticleSystem.rotation.y += 0.0005;
  renderer.render(scene, camera);
};
render();
