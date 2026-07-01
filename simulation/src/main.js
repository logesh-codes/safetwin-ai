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

// ================= AI DASHBOARD =================
const dashboard = document.createElement("div");

dashboard.style.position = "absolute";
dashboard.style.top = "10px";
dashboard.style.left = "10px";
dashboard.style.padding = "8px";
dashboard.style.background = "rgba(0,0,0,0.8)";
dashboard.style.color = "lime";
dashboard.style.fontFamily = "monospace";
dashboard.style.fontSize = "12px";
dashboard.style.border = "2px solid lime";
dashboard.style.whiteSpace = "pre-line";
dashboard.style.width = "280px";
dashboard.style.height = "350px";
dashboard.style.overflowY = "auto";
dashboard.style.overflowX = "hidden";

document.body.appendChild(dashboard);
// ================= AI INCIDENT LOG =================
const incidentLog = document.createElement("div");

incidentLog.style.position = "absolute";
incidentLog.style.top = "10px";
incidentLog.style.right = "10px";
incidentLog.style.width = "270px";
incidentLog.style.height = "320px";
incidentLog.style.overflowY = "auto";
incidentLog.style.background = "rgba(0,0,0,0.8)";
incidentLog.style.color = "white";
incidentLog.style.fontFamily = "monospace";
incidentLog.style.fontSize = "15px";
incidentLog.style.padding = "10px";
incidentLog.style.border = "2px solid cyan";

incidentLog.innerHTML = "<b>AI INCIDENT LOG</b><hr>";

document.body.appendChild(incidentLog);
// ================= PASSENGER ANALYTICS =================
const analytics = document.createElement("div");

analytics.style.position = "absolute";
analytics.style.bottom = "0";
analytics.style.left = "10px";
analytics.style.width = "280px";
analytics.style.background = "rgba(0,0,0,0.8)";
analytics.style.color = "cyan";
analytics.style.fontFamily = "monospace";
analytics.style.fontSize = "14px";
analytics.style.padding = "10px";
analytics.style.border = "2px solid cyan";
analytics.style.width = "280px";
analytics.style.height = "100px";
analytics.style.overflowY = "auto";
document.body.appendChild(analytics);
// ================= AI LIVE GRAPH =================
const graphCanvas = document.createElement("canvas");

graphCanvas.width = 320;
graphCanvas.height = 180;

graphCanvas.style.position = "absolute";
graphCanvas.style.right = "10px";
graphCanvas.style.bottom = "10px";
graphCanvas.style.background = "rgba(0,0,0,0.85)";
graphCanvas.style.border = "2px solid cyan";

document.body.appendChild(graphCanvas);

const graphCtx = graphCanvas.getContext("2d");

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
// ================= AI HEAT MAP =================
const heatGeometry = new THREE.PlaneGeometry(6, 3);

const heatMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.4,
  side: THREE.DoubleSide
});

const heatMap = new THREE.Mesh(
  heatGeometry,
  heatMaterial
);

heatMap.rotation.x = -Math.PI / 2;

// Above platform
heatMap.position.set(0, 0.53, 5);

scene.add(heatMap);
// AI Platform Safety Line
const safetyLineGeometry = new THREE.BoxGeometry(
  8,
  0.05,
  0.2
);

const safetyLineMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const safetyLine = new THREE.Mesh(
  safetyLineGeometry,
  safetyLineMaterial
);

// Place it near the platform edge
safetyLine.position.set(0, 0.52, 3.1);

scene.add(safetyLine);
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
// AI Emergency Beacon
const beaconGeometry = new THREE.SphereGeometry(
  0.2,
  16,
  16
);

const beaconMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const beacon = new THREE.Mesh(
  beaconGeometry,
  beaconMaterial
);

// Above the display board
beacon.position.set(0, 6.2, 2);

scene.add(beacon);
// Display Board Text
const displayCanvas = document.createElement("canvas");
displayCanvas.width = 512;
displayCanvas.height = 128;

const displayContext = displayCanvas.getContext("2d");

const displayTexture = new THREE.CanvasTexture(displayCanvas);

displayBoard.material = new THREE.MeshBasicMaterial({
  map: displayTexture
});
// ================= CCTV CAMERA =================

// Camera Body
const cctvGeometry = new THREE.BoxGeometry(
  0.8,
  0.4,
  0.4
);

const cctvMaterial = new THREE.MeshBasicMaterial({
  color: 0x222222
});

const cctv = new THREE.Mesh(
  cctvGeometry,
  cctvMaterial
);

// Position above platform
cctv.position.set(-5, 6.5, 4);

scene.add(cctv);

// Camera Lens
const lensGeometry = new THREE.CylinderGeometry(
  0.12,
  0.12,
  0.4,
  20
);

const lensMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000
});

const lens = new THREE.Mesh(
  lensGeometry,
  lensMaterial
);

lens.rotation.x = Math.PI / 2;

lens.position.set(
  0,
  0,
  0.35
);

cctv.add(lens);
// Train
const trainGeometry = new THREE.BoxGeometry(
  8,
  2,
  2
);

const trainMaterial = new THREE.MeshBasicMaterial({
  color: 0x333333
});

const train = new THREE.Mesh(
  trainGeometry,
  trainMaterial
);

// Start outside station
train.position.set(-20, 1, 5);

scene.add(train);
// Train Door
const doorGeometry = new THREE.BoxGeometry(
  0.5,
  1.5,
  0.1
);

const doorMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ffff
});

const trainDoor = new THREE.Mesh(
  doorGeometry,
  doorMaterial
);

trainDoor.position.set(
  -20,
  1,
  6.1
);

scene.add(trainDoor);
// Multiple Passengers
const passengers = [];
let crowdCount = 0;
let highCrowd = false;
let alertShown = false;
let routeToExit = false;
let evacuationStarted = false;
let evacuationCompleted = false;
let trainArrived = false;
let doorOpened = false;
let boardingStarted = false;
let trainDeparted = false;
let doorClosing = false;
let doorsClosed = false;
let doorOpenTime = 0;
let flashState = false;
let warningFlash = false;
let cameraTargetRotation = 0;
let stationStatus = "🟢 NORMAL";
let stationAnnouncement = "";
let platformStatus = "GREEN";
let exitStatus = "CLOSED";
let beaconStatus = "GREEN";
let cctvStatus = "NORMAL";
let prediction = "🟢 Crowd Stable";
let crowdHistory = [];
const totalPassengers = 10;
function addIncident(message) {

  const time = new Date().toLocaleTimeString();

  incidentLog.innerHTML +=
    `<div>${time} ${message}</div>`;

  incidentLog.scrollTop = incidentLog.scrollHeight;
}
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
  
  // Train arriving

if (!trainArrived) {

  train.position.x += 0.05;
  trainDoor.position.x += 0.05;

  if (train.position.x >= 0) {

    train.position.x = 0;
    trainDoor.position.x = 0;

    trainArrived = true;

    stationStatus = "🚆 TRAIN ARRIVED";

    console.log("🚆 TRAIN ARRIVED");
    addIncident("🚆 Train Arrived");
    stationAnnouncement = "🔊 Train has arrived at Platform 1";
console.log(stationAnnouncement);
  }
}
if (trainArrived && !doorOpened) {

  trainDoor.position.z += 0.02;

  if (trainDoor.position.z >= 7) {

   doorOpened = true;

doorOpenTime = Date.now();
stationStatus = "🚪 DOORS OPENED";

console.log("🚪 TRAIN DOORS OPENED");
addIncident("🚪 Doors Opened");
stationAnnouncement = "🔊 Doors are now open";
console.log(stationAnnouncement);
  }
}
if (
  doorOpened &&
  !boardingStarted &&
  Date.now() - doorOpenTime > 5000
) {
  boardingStarted = true;
  stationStatus = "🚶 PASSENGERS BOARDING";
  addIncident("🚶 Boarding Started");

  console.log("🚶 PASSENGERS BOARDING");
  stationAnnouncement = "🔊 Please board the train";
console.log(stationAnnouncement);
}

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
if (p.visible && p.position.z >= 4.5) {
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
if (boardingStarted && !evacuationStarted) {

  if (p.position.x < 0) {
    p.position.x += 0.02;
  }

  if (p.position.x > 0) {
    p.position.x -= 0.02;
  }

  if (p.position.z > 5) {
    p.position.z -= 0.02;
  }

  if (
    Math.abs(p.position.x) < 0.2 &&
    p.position.z <= 5.2
  ) {
    p.visible = false;
    crowdCount = Math.max(0, crowdCount - 1);
  }

}
  });
  // AI CCTV Tracking
if (crowdCount >= 8) {
  cameraTargetRotation = 0.6;
}
else if (crowdCount >= 5) {
  cameraTargetRotation = 0.3;
}
else {
  cameraTargetRotation = 0;
}

// Smooth camera rotation
cctv.rotation.y += (cameraTargetRotation - cctv.rotation.y) * 0.05;
 if (crowdCount >= 8) {
  platformStatus = "RED";
exitStatus = "OPEN";
beaconStatus = "RED";
cctvStatus = "TRACKING";

  highCrowd = true;
  heatMap.material.color.set(0xff0000);

  platform.material.color.set(0xff0000);
  flashState = !flashState;

if (flashState) {
  safetyLine.material.color.set(0xff0000);
} else {
  safetyLine.material.color.set(0xffffff);
}

  extraExit.visible = true;
  routeToExit = true;

  warningFlash = !warningFlash;

  warningBoard.visible = warningFlash;

  // AI Beacon Flashing Red
  beacon.material.color.set(
    warningFlash ? 0xff0000 : 0x550000
  );

}
else if (crowdCount >= 5) {
  platformStatus = "YELLOW";
exitStatus = "CLOSED";
beaconStatus = "YELLOW";
cctvStatus = "TRACKING";

  platform.material.color.set(0xffff00);
  safetyLine.material.color.set(0xffff00);
  heatMap.material.color.set(0xffff00);

  extraExit.visible = false;
  warningBoard.visible = false;
  warningFlash = false;
  routeToExit = false;

  // AI Beacon Yellow
  beacon.material.color.set(0xffff00);

}
else {
  platformStatus = "GREEN";
exitStatus = "CLOSED";
beaconStatus = "GREEN";
cctvStatus = "NORMAL";

  platform.material.color.set(0x00aa00);
  safetyLine.material.color.set(0x00ff00);
  heatMap.material.color.set(0x00ff00);

  extraExit.visible = false;
  warningBoard.visible = false;
  routeToExit = false;

  // AI Beacon Green
  beacon.material.color.set(0x00ff00);

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
  addIncident("🚨 High Crowd Detected");
  console.log("🚪 EXTRA EXIT OPENED");
  addIncident("🚪 Extra Exit Opened");
   console.log("👥 EVACUATION STARTED");
   stationAnnouncement =
  "🔊 Platform is crowded. Please stand behind the safety line";
console.log(stationAnnouncement);
  alertShown = true;
   //evacuationStarted = true;
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
const boardedPassengers =
  passengers.filter(p => p.visible).length;
  if (boardedPassengers === 0) {
  platform.material.color.set(0x00aa00);
}

if (
  boardingStarted &&
  boardedPassengers === 0 &&
  !doorClosing&&
  !doorsClosed
) {

  doorClosing = true;
  stationStatus = "🚪 TRAIN DOORS CLOSING";

  console.log("🚪 TRAIN DOORS CLOSING");
  addIncident("🚪 Doors Closing");
  stationAnnouncement = "🔊 Doors are closing";
console.log(stationAnnouncement);
}
if (doorClosing) {

  trainDoor.position.z -= 0.02;

  if (trainDoor.position.z <= 6.1) {

    trainDoor.position.z = 6.1;

    doorClosing = false;
    doorsClosed = true;
    trainDeparted = true;
    stationStatus = "🚆 TRAIN DEPARTING";

    console.log("🚆 TRAIN DEPARTING");
    addIncident("🚆 Train Departing");
    stationAnnouncement =
  "🔊 Train departing. Please stand clear";
console.log(stationAnnouncement);
  }
}

if (trainDeparted) {

  train.position.x += 0.05;
  trainDoor.position.x += 0.05;

  if (train.position.x > 25) {

    stationStatus = "🟢 SERVICE NORMAL";
  }
}
// ================= DISPLAY BOARD TEXT =================

displayContext.fillStyle = "black";
displayContext.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

displayContext.fillStyle = "lime";
displayContext.font = "bold 34px Arial";
displayContext.textAlign = "center";
displayContext.textBaseline = "middle";

displayContext.fillText(
    stationStatus,
    displayCanvas.width / 2,
    displayCanvas.height / 2
);

displayTexture.needsUpdate = true;
let crowdLevel = "LOW";

if (crowdCount >= 8) {
  crowdLevel = "HIGH";
}
else if (crowdCount >= 5) {
  crowdLevel = "MEDIUM";
}
// ================= AI METRICS =================
let safetyScore = 100 - (crowdCount * 10);

if (safetyScore < 0) {
  safetyScore = 0;
}

let occupancy = Math.round((crowdCount / 10) * 100);

let riskLevel = "LOW";

if (crowdCount >= 8) {
  riskLevel = "HIGH";
}
else if (crowdCount >= 5) {
  riskLevel = "MEDIUM";
}
const boarded = passengers.filter(p => !p.visible).length;

const waiting = totalPassengers - boarded;

const efficiency =
Math.round((boarded / totalPassengers) * 100);
// ================= AI PREDICTION =================

if (crowdCount >= 8) {
    prediction = "🔴 Overcrowding Expected";
}
else if (crowdCount >= 5) {
    prediction = "🟡 Crowd Increasing";
}
else {
    prediction = "🟢 Crowd Stable";
}
dashboard.innerHTML =
`AI STATION DASHBOARD

Train : ${trainArrived ? "ARRIVED" : "COMING"}

Doors : ${
doorOpened
? (doorClosing ? "CLOSING" : "OPEN")
: "CLOSED"
}

Passengers : ${crowdCount}

Crowd : ${crowdLevel}

Platform : ${platformStatus}

Emergency Exit : ${exitStatus}

Beacon : ${beaconStatus}

CCTV : ${cctvStatus}
Safety Score : ${safetyScore}%

Platform Occupancy : ${occupancy}%

AI Risk Level : ${riskLevel}
Prediction :${prediction}



Announcement :${stationAnnouncement}


Status :${stationStatus}`;

analytics.innerHTML =
`AI PASSENGER ANALYTICS

Total Passengers : ${totalPassengers}

Boarded : ${boarded}

Waiting : ${waiting}

Train Efficiency : ${efficiency}%

Average Crowd : ${crowdLevel}`;


  renderer.render(scene, camera);
}

   

animate();
