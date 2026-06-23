import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x808080,
  side: THREE.DoubleSide
});

const floor = new THREE.Mesh(
  floorGeometry,
  floorMaterial
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Grid
const grid = new THREE.GridHelper(20, 20);
scene.add(grid);
// Left Gate Pillar
const gateGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
const gateMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000
});

const leftGate = new THREE.Mesh(
  gateGeometry,
  gateMaterial
);

leftGate.position.set(-1, 1, 0);
scene.add(leftGate);

// Right Gate Pillar
const rightGate = new THREE.Mesh(
  gateGeometry,
  gateMaterial
);

rightGate.position.set(1, 1, 0);
scene.add(rightGate);
// Gate Zone
const gateZoneGeometry = new THREE.BoxGeometry(
  4,
  0.1,
  4
);

const gateZoneMaterial = new THREE.MeshBasicMaterial({
  color: 0xff9999
});

const gateZone = new THREE.Mesh(
  gateZoneGeometry,
  gateZoneMaterial
);

gateZone.position.set(0, 0.05, 0);

scene.add(gateZone);
// Platform Area
const platformGeometry = new THREE.BoxGeometry(
  8,
  0.5,
  4
);

const platformMaterial = new THREE.MeshBasicMaterial({
  color: 0x00aa00
});

const platform = new THREE.Mesh(
  platformGeometry,
  platformMaterial
);

platform.position.set(0, 0.25, 5);

scene.add(platform);
// Escalator
const escalatorGeometry = new THREE.BoxGeometry(
  2,
  0.5,
  4
);

const escalatorMaterial = new THREE.MeshBasicMaterial({
  color: 0x4444ff
});

const escalator = new THREE.Mesh(
  escalatorGeometry,
  escalatorMaterial
);

escalator.position.set(-6, 0.25, 5);

scene.add(escalator);
// Extra Exit Gate
const extraExitGeometry = new THREE.BoxGeometry(
  2,
  2,
  0.5
);

const extraExitMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00
});

const extraExit = new THREE.Mesh(
  extraExitGeometry,
  extraExitMaterial
);

extraExit.position.set(8, 1, 8);

// Hidden initially
extraExit.visible = false;

scene.add(extraExit);
// Exit Corridor
const corridorGeometry = new THREE.BoxGeometry(
  4,
  0.2,
  6
);

const corridorMaterial = new THREE.MeshBasicMaterial({
  color: 0x555555
});

const corridor = new THREE.Mesh(
  corridorGeometry,
  corridorMaterial
);

corridor.position.set(6, 0.1, 6);

scene.add(corridor);
// Exit Zone
const exitZoneGeometry = new THREE.BoxGeometry(
  4,
  0.1,
  4
);

const exitZoneMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff99
});

const exitZone = new THREE.Mesh(
  exitZoneGeometry,
  exitZoneMaterial
);

exitZone.position.set(8, 0.05, 8);

scene.add(exitZone);
// Warning Board
const warningGeometry = new THREE.BoxGeometry(
  3,
  1,
  0.2
);

const warningMaterial = new THREE.MeshBasicMaterial({
  color: 0xffa500
});

const warningBoard = new THREE.Mesh(
  warningGeometry,
  warningMaterial
);

warningBoard.position.set(0, 3, 2);

// Hidden initially
warningBoard.visible = false;

scene.add(warningBoard);
// Digital Display Board
const displayGeometry = new THREE.BoxGeometry(
  4,
  1.5,
  0.2
);

const displayMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const displayBoard = new THREE.Mesh(
  displayGeometry,
  displayMaterial
);

displayBoard.position.set(0, 5, 2);

scene.add(displayBoard);
// Multiple Passengers
const passengers = [];
let crowdCount = 0;
let highCrowd = false;
let alertShown = false;
let routeToExit = false;
let evacuationStarted = false;
let evacuationCompleted = false;

function createPassenger(xOffset) {
  const geometry = new THREE.BoxGeometry(0.5, 1, 0.5);

  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  });

  const passenger = new THREE.Mesh(
    geometry,
    material
  );

  passenger.position.set(
    xOffset,
    0.5,
    -10
  );

  scene.add(passenger);
  passenger.targetX = (Math.random() - 0.5) * 6;

  passengers.push(passenger);
}

// Create 10 passengers
for (let i = 0; i < 10; i++) {

  const xPos = (i % 5) - 2;

  createPassenger(xPos);

  passengers[i].position.z = -10 - (Math.floor(i / 5) * 2);
}

// Camera Position
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

// Animation Loop
let gateOpen = false;
function animate() {
  requestAnimationFrame(animate);
  crowdCount = 0;

  passengers.forEach((p) => {
   

    if (p.position.z < -1 && !gateOpen) {
      p.position.z += 0.02;
    }

    if (p.position.z >= -1 && !gateOpen) {
      gateOpen = true;

      leftGate.position.x = -2;
      rightGate.position.x = 2;
    }

  if (gateOpen) {

  if (p.position.z < 5) {
    p.position.z += 0.02;
  }

  if (p.position.x < p.targetX) {
    p.position.x += 0.01;
  }

  if (p.position.x > p.targetX) {
    p.position.x -= 0.01;
  }
}
if (p.position.z >= 4.5) {
  crowdCount++;
}
if (evacuationStarted) {

  if (p.position.x < 8) {
    p.position.x += 0.02;
  }

  if (p.position.z < 8) {
    p.position.z += 0.02;
  }
  // Check if passenger reached exit
  if (p.position.x >= 7.8 && p.position.z >= 7.8) {
    p.visible = false;
  }

}

  });
 if (crowdCount >= 8) {

  highCrowd = true;

  platform.material.color.set(0xff0000);

  extraExit.visible = true;
  warningBoard.visible = true;
  routeToExit = true;

} 
else if (crowdCount >= 5) {

  platform.material.color.set(0xffff00);

  extraExit.visible = false;
  warningBoard.visible = false;
  routeToExit = false;

} 
else {

  platform.material.color.set(0x00aa00);

  extraExit.visible = false;
  warningBoard.visible = false;
  routeToExit = false;
}
// Update Display Board Color

if (crowdCount <= 4) {
  displayBoard.material.color.set(0x00ff00);
}

else if (crowdCount <= 7) {
  displayBoard.material.color.set(0xffff00);
}

else {
  displayBoard.material.color.set(0xff0000);
}
  if (crowdCount > 0) {
  console.log("Crowd Count:", crowdCount);
 if (highCrowd && !alertShown) {
  console.log("🚨 HIGH CROWD ALERT");
  console.log("🚪 EXTRA EXIT OPENED");
   console.log("👥 EVACUATION STARTED");
  alertShown = true;
   evacuationStarted = true;
}
}
const remainingPassengers =
  passengers.filter(p => p.visible).length;

if (
  evacuationStarted &&
  remainingPassengers === 0 &&
  !evacuationCompleted
) {
  console.log("✅ EVACUATION COMPLETED");
  evacuationCompleted = true;
}

  renderer.render(scene, camera);
}

   

animate();
