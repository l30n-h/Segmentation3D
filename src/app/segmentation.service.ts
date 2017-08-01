import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class SegmentationService {

  constructor(private zone: NgZone) { }

  filterTypes = [
    "Gauss",
    "Sobel",
    "Sobel no blur",
    "Make all values the same",
    "Extend edges",
    "Avg. gradients",
    "Create group from selected",
    "Remove selected"
  ];

  colorTypes = [
    "Position",
    "Value",
    "Normal",
    "Group",
    "Binarisation"
  ];

  clickActions = [
    "Info",
    "Select",
    "Flood-Fill"
  ];

  loadFile(file, gridSize) {
    loadFile(file, gridSize);
  }

  save() {
    save();
  }

  filter(type) {
    filter(type);
  }

  set colorType(v) {
    setColorType(v);
  }
  get colorType() {
    return colorType;
  }

  set clickAction(v) {
    setClickAction(v);
  }
  get clickAction() {
    return clickType;
  }

  get groups() {
    return groups;
  }

  addSelectedToGroup(group) {
    addSelectedToGroup(group);
  }

  showGroup(group) {
    showGroup(group);
  }


  hideGroup(group) {
    hideGroup(group);
  }

  unselectAll() {
    unselectAll();
  }

  rgbToHex(c) {
    function componentToHex(c) {
      var hex = Math.floor(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
  }

  hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  prepare(surfaceView, canvas) {
    this.zone.runOutsideAngular(() => {
      prepare(surfaceView, canvas);
    });
  }

  init() {
    this.zone.runOutsideAngular(() => {
      init();
    });
  }

  start() {
    this.zone.runOutsideAngular(() => {
      loopSimple();
    });
  }

  destroy() {
    this.zone.runOutsideAngular(() => {
      destroy();
    });
  }

}

let renderer: THREE.WebGLRenderer;
let surfaceView;
let canvas;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let groups = [];
let voxels = new VoxelMap();
let rasterSize;
let positionOffset = { x: 0, y: 0, z: 0 };
let voxelsBounds = {
  min: { x: 0, y: 0, z: 0, value: 0, sx: 0, sy: 0, sz: 0 },
  max: { x: 0, y: 0, z: 0, value: 0, sx: 0, sy: 0, sz: 0 },
};
let voxelCubeMap = new Map();

let controls;
let raycaster = new THREE.Raycaster();
let mousePos = new THREE.Vector2(), INTERSECTED, doRaycast = null;

let needsRerendering = true;
let voxelSize = 1;

let material = new THREE.LineBasicMaterial({ color: 0x0000ff });
let geometry = new THREE.Geometry();
let line = new THREE.Line(geometry, material);


let colorType = "Position";
let lastColorType = colorType;
let clickType = "Info";

let mouseDown = false;
function prepare(sv, c) {
  surfaceView = sv;
  canvas = c;

  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  camera = new THREE.PerspectiveCamera(45, getSurfaceWidth() / getSurfaceHeight(), 0.1, 500);
  scene = new THREE.Scene();
  resize();

  window.addEventListener('unload', (event) => {
    destroy();
  }, false);
  window.addEventListener('resize', (event) => {
    resize();
  }, false);

  window.addEventListener('keydown', (event) => {
    if (event.key == "Shift") controls.deactivate();
  })

  window.addEventListener('keyup', (event) => {
    if (event.key == "Shift") controls.activate();
  })
  window.addEventListener('mouseup', (event) => {
    mouseDown = false;
  }, false);

  surfaceView.addEventListener('mousedown', (event) => {
    setMousePosition(event);
    mouseDown = true;
  }, false);
  surfaceView.addEventListener('mousemove', (event) => {
    setMousePosition(event);
  }, false);
  surfaceView.addEventListener('click', (event) => {
    setMousePosition(event);
  }, false);
}

function loadFile(file, gridSize) {
  if (!file) {
    console.log('No file selected.');
    return;
  }
  toVoxels(file, gridSize);
}

function save() {
  let text = "";
  voxels.forEach((voxel, key) => {
    let p = voxels.getPosition(key);
    text += "v " + p.x + " " + p.y + " " + p.z + "\n";
  });
  download("voxel.obj", text);
}

function setColorType(type) {
  lastColorType = colorType;
  colorType = type;
  updateColors();
}

function setClickAction(action) {
  clickType = action;
}

function destroy() {
  clean();
  renderer.dispose();
  renderer.forceContextLoss();
}

function getSurfaceWidth() {
  return surfaceView.offsetWidth;
}
function getSurfaceHeight() {
  return surfaceView.offsetHeight;
}

function VoxelMap(...values) {

  this.voxel = new Map();
  this.disabled = new Map();

  this.get = (x, y, z) => {
    return this.getByKey(this.getKey(x, y, z));
  }

  this.set = (x, y, z, v) => {
    this.setByKey(this.getKey(x, y, z), v);
  }

  this.remove = (x, y, z) => {
    this.removeByKey(this.getKey(x, y, z));
  }

  this.disable = (x, y, z) => {
    this.disableByKey(this.getKey(x, y, z));
  }

  this.enable = (x, y, z) => {
    this.enableByKey(this.getKey(x, y, z));
  }

  this.getByKey = (k) => {
    return this.voxel.get(k);
  }

  this.setByKey = (k, v) => {
    this.voxel.set(k, v);
  }

  this.removeByKey = (key) => {
    this.voxel.delete(key);
  }

  this.disableByKey = (key) => {
    let v = this.voxel.get(key);
    if (v) {
      this.voxel.delete(key);
      this.disabled.set(key, v);
    }
  }

  this.enableByKey = (key) => {
    let v = this.disabled.get(key);
    if (v) {
      this.disabled.delete(key);
      this.voxel.set(key, v);
    }
  }

  this.size = () => {
    return this.voxel.size;
  }

  this.clear = () => {
    this.voxel.clear();
    this.disabled.clear();
  }

  this.entries = () => {
    return this.voxel.entries();
  }

  this.values = () => {
    return this.voxel.values();
  }

  this.keys = () => {
    return this.voxel.keys();
  }

  this.getPosition = (key) => {
    let s = key.split("/");
    if (!s || s.length < 3) return null;
    return {
      x: parseInt(s[0]),
      y: parseInt(s[1]),
      z: parseInt(s[2])
    }
  }

  this.getKey = (x, y, z) => {
    return x + "/" + y + "/" + z;
  }

  this.forEach = (callback) => {
    return this.voxel.forEach(callback);
  }

  if (values) values.forEach((v) => this.set(v.x, v.y, v.z, v));
}

function VertexGeometry(cubes = true) {
  let boxSize = voxelSize * 0 + 0.7;
  let vboMap = new VoxelMap();

  this.add = (position, voxel) => {
    let p = getVBOPosition(position);
    let vbo = vboMap.get(p.x, p.y, p.z);
    if (!vbo) {
      vbo = { vertices: [], colors: [], geo: new THREE.BufferGeometry() };
      vboMap.set(p.x, p.y, p.z, vbo);
    }
    let vboIndex = Math.floor(vbo.vertices.length / 3);
    let vboLength;
    if (cubes) {
      vboIndex *= 8;
      vboLength = 8;
      vbo.vertices.push(position.x, position.y, position.z);
    } else {
      if (voxel.vertices) {
        vboLength = voxel.vertices.length;
        voxel.vertices.forEach(v => {
          vbo.vertices.push(v.x, v.y, v.z);
          vbo.colors.push(1, 0, 0);
        });
      } else {
        vboLength = 1;
        vbo.vertices.push(position.x, position.y, position.z);
      }
    }
    vbo.colors.push(1, 0, 0);
    return { vbo: vbo.geo, vboIndex: vboIndex, vboLength };
  }

  this.dispose = () => {
    vboMap.clear();
    vboMap = null;
  }

  this.drawnObjects = () => {
    if (cubes) return Array.from(vboMap.entries()).map((e) => getCubeMesh(e[1]));
    return Array.from(vboMap.entries()).map((e) => getPointsMesh(e[1]));
  }

  function getVBOPosition(p) {
    return { x: Math.floor(p.x / 10), y: Math.floor(p.y / 10), z: Math.floor(p.z / 10) }
  }

  function getCubeMesh(vbo) {
    let hbs = boxSize / 2;
    let vertices = new Float32Array(vbo.vertices.length * 8);
    for (let i = 0; i < vbo.vertices.length; i += 3) {
      let x = vbo.vertices[i];
      let y = vbo.vertices[i + 1];
      let z = vbo.vertices[i + 2];
      let i8 = i * 8;
      vertices[i8] = vertices[i8 + 3] = vertices[i8 + 6] = vertices[i8 + 9] = x - hbs;
      vertices[i8 + 1] = vertices[i8 + 4] = vertices[i8 + 13] = vertices[i8 + 16] = y - hbs;
      vertices[i8 + 2] = vertices[i8 + 8] = vertices[i8 + 14] = vertices[i8 + 20] = z - hbs;
      vertices[i8 + 12] = vertices[i8 + 15] = vertices[i8 + 18] = vertices[i8 + 21] = x + hbs;
      vertices[i8 + 7] = vertices[i8 + 10] = vertices[i8 + 19] = vertices[i8 + 22] = y + hbs;
      vertices[i8 + 5] = vertices[i8 + 11] = vertices[i8 + 17] = vertices[i8 + 23] = z + hbs;
    }
    let colors = new Float32Array(vbo.vertices.length * 8);
    for (let i = 0; i < Math.min(vbo.colors.length, vbo.vertices.length); i += 3) {
      let r = vbo.colors[i];
      let g = vbo.colors[i + 1];
      let b = vbo.colors[i + 2];
      let i8 = i * 8;
      for (let j = 0; j < 24; j += 3) {
        colors[i8 + j] = r;
        colors[i8 + j + 1] = g;
        colors[i8 + j + 2] = b;
      }
    }

    let indices = new Uint32Array(Math.floor(vbo.vertices.length / 3) * 16 - 2);
    for (let i = 0, o = 0; i < indices.length; i += 16, o += 8) {
      indices[i] = indices[i + 7] = 2 + o;
      indices[i + 1] = 6 + o;
      indices[i + 2] = indices[i + 9] = 0 + o;
      indices[i + 3] = 4 + o;
      indices[i + 4] = indices[i + 11] = 5 + o;
      indices[i + 5] = 6 + o;
      indices[i + 6] = indices[i + 13] = 7 + o;
      indices[i + 8] = indices[i + 12] = 3 + o;
      indices[i + 10] = 1 + o;
      if (i + 14 < indices.length) {
        indices[i + 14] = indices[i + 13];
        indices[i + 15] = 10 + o;
      }
    }

    vbo.geo.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    vbo.geo.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    vbo.geo.setIndex(new THREE.BufferAttribute(indices, 1));
    let m = new THREE.Mesh(vbo.geo, new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors }));
    m.drawMode = THREE.TriangleStripDrawMode;
    return m;
  }

  function getPointsMesh(vbo) {
    vbo.geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(vbo.vertices), 3));
    vbo.geo.addAttribute('color', new THREE.BufferAttribute(new Float32Array(vbo.colors), 3));
    return new THREE.Points(vbo.geo, new THREE.PointsMaterial({ vertexColors: THREE.VertexColors, size: 10 }));
  }
}

function Frustum(eye, dir, up, near, far, top, bottom, right, left) {
  dir = new THREE.Vector3().add(dir).normalize();
  up = new THREE.Vector3().add(up);
  let side = new THREE.Vector3().crossVectors(dir, up).normalize();
  up.crossVectors(side, dir).normalize();
  let vn = new THREE.Vector3().addScaledVector(dir, near);
  let vf = new THREE.Vector3().addScaledVector(dir, far);
  let vt = new THREE.Vector3().add(vn).addScaledVector(up, top);
  let vb = new THREE.Vector3().add(vn).addScaledVector(up, bottom);
  let vr = new THREE.Vector3().add(vn).addScaledVector(side, right);
  let vl = new THREE.Vector3().add(vn).addScaledVector(side, left);
  let nt = new THREE.Vector3().crossVectors(side, vt).normalize();
  let nb = new THREE.Vector3().crossVectors(vb, side).normalize();
  let nr = new THREE.Vector3().crossVectors(vr, up).normalize();
  let nl = new THREE.Vector3().crossVectors(up, vl).normalize();
  vn.add(eye);
  vf.add(eye);
  vt.add(eye);
  vb.add(eye);
  vr.add(eye);
  vl.add(eye);

  function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  this.plane = {};
  this.plane.near = { x: -dir.x, y: -dir.y, z: -dir.z, d: -dot(dir, vn) };
  this.plane.far = { x: dir.x, y: dir.y, z: dir.z, d: dot(dir, vf) };
  this.plane.top = { x: nt.x, y: nt.y, z: nt.z, d: dot(nt, vt) };
  this.plane.bottom = { x: nb.x, y: nb.y, z: nb.z, d: dot(nb, vb) };
  this.plane.right = { x: nr.x, y: nr.y, z: nr.z, d: dot(nr, vr) };
  this.plane.left = { x: nl.x, y: nl.y, z: nl.z, d: dot(nl, vl) };
  this.containsVoxel = (v, radius) => {
    for (let pk of Object.keys(this.plane)) {
      let p = this.plane[pk];
      if (dot(v, p) > p.d + radius) {
        return false;
      }
    }
    return true;
  }

  this.getVoxels = (voxels) => {
    let nvoxels = new VoxelMap();
    let offset = Math.sqrt(Math.pow(voxelSize, 2) * 3) / 2;
    voxels.forEach((voxel, key) => {
      let p = voxels.getPosition(key);
      if (this.containsVoxel(p, offset)) {
        nvoxels.setByKey(key, voxel);
      }
    });
    return nvoxels;
  }
}

function getColor(p, voxel = null) {
  if (!voxel) voxel = voxels.get(p.x, p.y, p.z);
  let red = 0, green = 0, blue = 0, vc;
  function calcColor(type) {
    if (type == "Position") {
      red = incContrast(p.x, voxelsBounds.min.x, voxelsBounds.max.x, 30, 225);
      green = incContrast(p.y, voxelsBounds.min.y, voxelsBounds.max.y, 30, 225);
      blue = incContrast(p.z, voxelsBounds.min.z, voxelsBounds.max.z, 30, 225);
    } else if (type == "Value") {
      vc = incContrast(voxel.value, voxelsBounds.min.value, voxelsBounds.max.value, 30, 225);
      red = green = blue = vc;
    } else if (type == "Normal") {
      red = incContrast(voxel["sx"] || 0, voxelsBounds.min.sx, voxelsBounds.max.sx, 30, 225);
      green = incContrast(voxel["sy"] || 0, voxelsBounds.min.sy, voxelsBounds.max.sy, 30, 225);
      blue = incContrast(voxel["sz"] || 0, voxelsBounds.min.sz, voxelsBounds.max.sz, 30, 225);
    } else if (type == "Group") {
      if (!voxel.group) {
        calcColor(colorType == lastColorType ? "Position" : lastColorType);
      } else {
        let c = voxel.group.color;
        red = c.r;
        green = c.g;
        blue = c.b;
      }
    } else {
      vc = Math.round(Math.floor(incContrast(voxel.value, voxelsBounds.min.value, voxelsBounds.max.value, 30, 225) / 19.5) * 19.5);
      red = green = blue = vc;
    }
  }
  calcColor(colorType)
  if (voxel.selected) {
    red *= 0.66;
    green *= 0.66;
    blue *= 0.66;
  }
  return {
    r: red,
    g: green,
    b: blue,
    hex: (red << 16) + (green << 8) + blue
  }
}

function setColor(cube, color) {
  let r = color.r / 255;
  let g = color.g / 255;
  let b = color.b / 255;
  let colors = cube.vbo.getAttribute("color");
  if (colors) {
    for (let c = 0; c < cube.vboLength; c++) colors.setXYZ(cube.vboIndex + c, r, g, b);
    colors.needsUpdate = true;
  }
}

function stringToColor(string) {
  if (!string) return undefined;
  let str = string;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let r = (hash >> 8) & 0xFF;
  let g = (hash >> 16) & 0xFF;
  let b = (hash >> 24) & 0xFF;
  return { r, g, b };
}

function addSelectedToGroup(group = undefined) {
  if (!group) {
    let groupId = groups.length;
    let name = groupId.toString();
    let r = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
    let g = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
    let b = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
    group = {
      name,
      _color: { r, g, b },
      get color() { return this._color },
      set color(c) { this._color = c; updateColors({ needsUpdate: (voxel) => voxel.group == this }) },
      voxelKeys: new Set()
    };
    groups[groupId] = group;
  }
  voxels.forEach((voxel, key) => {
    if (voxel.selected && !voxel.group) {
      voxel.group = group;
      group.voxelKeys.add(key);
    }
  });
  updateColors({ needsUpdate: (voxel) => voxel.group == group });
}

function showGroup(group) {
  group.voxelKeys.forEach((key) => {
    voxels.enableByKey(key);
  });
  loadScene();
}

function hideGroup(group) {
  group.voxelKeys.forEach((key) => {
    voxels.disableByKey(key);
  });
  loadScene();
}

function unselectAll() {
  voxels.forEach((voxel, key) => {
    delete voxel.selected;
  });
  updateColors();
}

function raycastClicked(position) {
  let vp = pointToVoxel(position);
  if (clickType == "Flood-Fill") {
    setTimeout(() => {
      let v2 = null
      let selected = floodFill((p, p1) => {
        // let v = voxels.get(x, y, z);
        // if (!v) return false;
        // return v.value > 0;

        let v1 = voxels.get(p.x, p.y, p.z);
        if (!v1) return false;
        //if (v2 == null) v2 = v1;
        let v2 = voxels.get(p1.x, p1.y, p1.z);
        if (!v2) return false;
        let dot = v1.sx * v2.sx + v1.sy * v2.sy + v1.sz * v2.sz;
        return dot >= 0.98;
      }, vp);

      selected.forEach((voxel, key) => {
        voxels.getByKey(key)["selected"] = true;
      });
      updateColors({ needsUpdate: (voxel) => voxel.selected });
    }, 0);
  } else if (clickType == "Select") {
    let voxel = voxels.get(vp.x, vp.y, vp.z);
    if (voxel) voxel["selected"] = true;
  } else {
    console.log(vp);
    console.log(voxels.get(vp.x, vp.y, vp.z));
  }
}

function pointToVoxel(p) {
  let vsh = voxelSize / 2 - 0.01;

  return {
    x: Math.floor(p.x + vsh),
    y: Math.floor(p.y + vsh),
    z: Math.floor(p.z + vsh)
  };
}

function clearScene() {
  voxelCubeMap.clear();
  INTERSECTED = null;
  for (let i = scene.children.length - 1; i >= 0; i--) {
    let child = scene.children[i]
    scene.remove(child);
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      child.material.dispose();
      child.geometry = null;
      child.material = null;
    }
  }
  renderer.render(scene, camera);
}

function clean() {
  clearScene();
  voxels.clear();
  groups = [];
}

function init() {
  controls = createOrbitControls(camera, canvas);
  controls.addEventListener('change', (e) => { needsRerendering = true; }, false);
  controls.userPanSpeed = 0.02;
  camera.position.z = 5;

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      for (let z = 0; z < 10; z++) {
        voxels.set(x, y, z, { value: 1 });
      }
    }
  }

  loadScene();
}

function resize() {
  let width = getSurfaceWidth();
  let height = getSurfaceHeight();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  needsRerendering = true;
}

function update() {
  controls.update();
}

function render() {
  if (doRaycast) {
    raycaster.setFromCamera(mousePos, camera);

    let hit_position = []
    let hit_normal = []
    let getVoxel = (x, y, z) => {
      return voxels.get(x, y, z);
    }
    let vsh = voxelSize / 2;
    let min = { x: voxelsBounds.min.x - vsh, y: voxelsBounds.min.y - vsh, z: voxelsBounds.min.z - vsh };
    let max = { x: voxelsBounds.max.x + vsh, y: voxelsBounds.max.y + vsh, z: voxelsBounds.max.z + vsh };
    let hit = raycast(getVoxel, raycaster.ray.origin, raycaster.ray.direction, min, max);
    if (hit) {
      let vp = pointToVoxel(hit.position);
      let voxel = voxels.get(vp.x, vp.y, vp.z);
      if (voxel) {
        if (!INTERSECTED || INTERSECTED.voxel != voxel) {
          if (INTERSECTED) setColor(INTERSECTED.cube, getColor(INTERSECTED.vp, INTERSECTED.voxel));
          INTERSECTED = {
            voxel: voxel,
            cube: voxelCubeMap.get(voxels.getKey(vp.x, vp.y, vp.z)),
            vp: vp
          };
          setColor(INTERSECTED.cube, { r: 0, g: 255, b: 0 })
        }
      } else {
        console.log(hit)
      }
    } else {
      if (INTERSECTED) setColor(INTERSECTED.cube, getColor(INTERSECTED.vp, INTERSECTED.voxel));
      INTERSECTED = null;
    }
    if (doRaycast == "click") {
      if (hit) {
        raycastClicked(hit.position);
      }
    }
    doRaycast = false;

    needsRerendering = true;
  }
  if (needsRerendering) {
    renderer.render(scene, camera);
    needsRerendering = false;
    //console.log(renderer.info);
  }
}

function loopSimple() {
  render();
  update();
  requestAnimationFrame(loopSimple);
}

function setMousePosition(event) {
  let rect = surfaceView.getBoundingClientRect();
  let x = ((event.pageX - rect.left) / getSurfaceWidth()) * 2 - 1;
  let y = - ((event.pageY - rect.top) / getSurfaceHeight()) * 2 + 1;
  if (event.ctrlKey) {
    if (mouseDown) doRaycast = "click"
    else if (doRaycast != "click") doRaycast = event.type;
    mousePos.x = x;
    mousePos.y = y;
  }

  else if (event.shiftKey && event.type == "click") {
    let top = Math.tan(camera.fov / 360 * Math.PI) * camera.near;
    let right = top * camera.aspect;
    let frustum = new Frustum(camera.position, camera.getWorldDirection(),
      camera.up, camera.near, camera.far, top, -top, right, -right
    );
    let nvoxels = frustum.getVoxels(voxels);
    nvoxels.forEach((voxel, key) => {
      voxels.getByKey(key)["selected"] = true;
    });
    updateColors({ needsUpdate: (voxel) => voxel.selected });
  }
}

function calculateBounds() {
  let minKeys = Object.keys(voxelsBounds.min);
  let maxKeys = Object.keys(voxelsBounds.max);
  minKeys.forEach(v => voxelsBounds.min[v] = Number.POSITIVE_INFINITY);
  maxKeys.forEach(v => voxelsBounds.max[v] = Number.NEGATIVE_INFINITY);

  minKeys = minKeys.filter(v => v != "x" && v != "y" && v != "z");
  maxKeys = maxKeys.filter(v => v != "x" && v != "y" && v != "z");
  let coords = ["x", "y", "z"];
  voxels.forEach((voxel, key) => {
    let v = voxel.value;
    let p = voxels.getPosition(key);
    if (Math.abs(v) > 0.001) {
      coords.forEach(v => {
        voxelsBounds.min[v] = Math.min(voxelsBounds.min[v], p[v]);
        voxelsBounds.max[v] = Math.max(voxelsBounds.max[v], p[v]);
      });
      minKeys.forEach(v => voxelsBounds.min[v] = Math.min(voxelsBounds.min[v], voxel[v] || 0));
      maxKeys.forEach(v => voxelsBounds.max[v] = Math.max(voxelsBounds.max[v], voxel[v] || 0));
    } else {
      voxels.removeByKey(key)
    }
  });
  console.log(voxelsBounds);
  let updateControls = true;
  coords.forEach(v => {
    positionOffset[v] = (voxelsBounds.max[v] - voxelsBounds.min[v]) / 2 + voxelsBounds.min[v];
    if (updateControls && Number.isNaN(positionOffset[v])) updateControls = false;
  });
  if (updateControls) {
    controls.userPanSpeed = 0.004 * new THREE.Vector3().subVectors(voxelsBounds.max, voxelsBounds.min).length()
    controls.setPosition(positionOffset);
  }
}

function loadScene(reloadGeometry = true) {
  calculateBounds();

  if (reloadGeometry) {
    clearScene();
    let axisHelper = new THREE.AxisHelper(5);
    scene.add(axisHelper);

    let vGeometry = new VertexGeometry(true);
    voxels.forEach((voxel, key) => {
      let p = voxels.getPosition(key);
      let cube = vGeometry.add(p, voxel);
      voxelCubeMap.set(key, cube);
    });
    vGeometry.drawnObjects().forEach(o => scene.add(o));
    vGeometry.dispose();
  }
  updateColors();
  needsRerendering = true;
}

function updateColors(filter = null) {
  let needsUpdate = (voxel) => true;
  if (filter && filter.needsUpdate != undefined) {
    needsUpdate = filter.needsUpdate;
  }
  voxels.forEach((voxel, key) => {
    if (needsUpdate(voxel)) {
      let v = voxel.value;
      let p = voxels.getPosition(key);
      let color = getColor(p, voxel);
      setColor(voxelCubeMap.get(key), color);
    }
  });
  needsRerendering = true;
}

function incContrast(v, minV, maxV, min, max) {
  return /*Math.floor*/((minV == maxV ? 1 : ((v - minV) / (maxV - minV))) * (max - min) + min);
}

function gauss3D(voxels) {
  return korrelation3D(voxels, [1 / 4, 2 / 4, 1 / 4]);
}

function korrelation1D(voxels, kernel, axis, out = new VoxelMap()) {
  let getPositionByAxis;
  if (axis == "x") getPositionByAxis = (p, o) => ({ x: p.x + o, y: p.y, z: p.z });
  else if (axis == "y") getPositionByAxis = (p, o) => ({ x: p.x, y: p.y + o, z: p.z });
  else getPositionByAxis = (p, o) => ({ x: p.x, y: p.y, z: p.z + o });
  let kh = Math.floor(kernel.length / 2);

  let keys = new Set();
  voxels.forEach((voxel, key) => {
    let vp = voxels.getPosition(key);
    for (let o = -kh; o < kernel.length - kh; o++) {
      let op = getPositionByAxis(vp, o);
      keys.add(voxels.getKey(op.x, op.y, op.z));
    }
  });

  let getValue = (voxels, x, y, z) => {
    let v = voxels.get(x, y, z);
    if (!v || !v.value) return 0;
    return v.value;
  }

  keys.forEach((key) => {
    let vp = voxels.getPosition(key);
    let sum = 0;
    kernel.forEach((v, ki) => {
      let p = getPositionByAxis(vp, ki - kh);
      sum += getValue(voxels, p.x, p.y, p.z) * v;
    });
    if (sum != 0) {
      let v = out.getByKey(key);
      if (!v) {
        v = { value: 0 };
        out.setByKey(key, v);
      }
      v.value = sum;
    }
  });
  return out;
}

function korrelation3D(voxels, kernel) {
  let nvoxels = korrelation1D(voxels, kernel, "x");
  let nvoxels2 = korrelation1D(nvoxels, kernel, "y"); nvoxels.clear();
  return korrelation1D(nvoxels2, kernel, "z", nvoxels);
}

function sobel3D(voxels, blur = true) {
  let sx = sobel1D(voxels, "x", blur);
  let sy = sobel1D(voxels, "y", blur);
  let sz = sobel1D(voxels, "z", blur);
  let nvoxels = new VoxelMap();
  function merge(s, name, out) {
    s.forEach((voxel, key) => {
      if (voxel.value != 0) {
        let nvoxel = nvoxels.getByKey(key);
        if (!nvoxel) {
          nvoxel = {};
          nvoxels.setByKey(key, nvoxel);
        }
        nvoxel[name] = voxel.value;
      }
    });
  }
  merge(sx, "sx", nvoxels);
  merge(sy, "sy", nvoxels);
  merge(sz, "sz", nvoxels);
  return nvoxels;
}

function sobel1D(voxels, axis, blur = true) {
  let nvoxels, nvoxels2;
  if (blur) {
    let kernelBlur = [1, 2, 1];
    if (axis == "x") {
      nvoxels = korrelation1D(voxels, kernelBlur, "z");
      nvoxels2 = korrelation1D(nvoxels, kernelBlur, "y"); nvoxels.clear();
    } else if (axis == "y") {
      nvoxels = korrelation1D(voxels, kernelBlur, "x");
      nvoxels2 = korrelation1D(nvoxels, kernelBlur, "z"); nvoxels.clear();
    } else {
      nvoxels = korrelation1D(voxels, kernelBlur, "y");
      nvoxels2 = korrelation1D(nvoxels, kernelBlur, "x"); nvoxels.clear();
    }
  } else {
    nvoxels2 = voxels;
    nvoxels = new VoxelMap();
  }
  let kernelDiff = [1, 0, -1];
  if (axis == "x") return korrelation1D(nvoxels2, kernelDiff, "x", nvoxels);
  if (axis == "y") return korrelation1D(nvoxels2, kernelDiff, "y", nvoxels);
  return korrelation1D(nvoxels2, kernelDiff, "z", nvoxels);
}

function normalizeGradients(voxels) {
  let nvoxels = new VoxelMap();
  let v = new THREE.Vector3();
  voxels.forEach((voxel, key) => {
    v.set(voxel.sx || 0, voxel.sy || 0, voxel.sz || 0)
    let length = v.length();
    if (length >= 0.001) {
      v.normalize();
      nvoxels.setByKey(key, { value: length, sx: v.x, sy: v.y, sz: v.z })
    }
  });
  return nvoxels;
}

function avgGradients(voxels) {
  let nvoxels = new VoxelMap();
  let avg = new THREE.Vector3();
  let v = new THREE.Vector3();
  voxels.forEach((voxel, key) => {
    let p = voxels.getPosition(key);
    let value = voxel.value;
    avg.set(voxel.sx || 0, voxel.sy || 0, voxel.sz || 0)
    let c = 1;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x != 0 && y != 0 && z != 0) {
            let nv = voxels.get(p.x + x, p.y + y, p.z + z);
            if (nv) {
              v.set(nv.sx || 0, nv.sy || 0, nv.sz || 0);
              avg.add(v);
              value += nv.value;
              c++;
            }
          }
        }
      }
    }
    avg.divideScalar(c);
    avg.normalize();
    nvoxels.setByKey(key, { value: value / c, sx: avg.x, sy: avg.y, sz: avg.z })
  });
  return nvoxels;
}

function extendEdge(voxels) {
  let nvoxels = new VoxelMap();
  let todo = new Set();
  voxels.forEach((voxel, key) => {
    nvoxels.setByKey(key, voxel);
    let p = voxels.getPosition(key);

    for (let x = - 1; x <= 1; x++) {
      for (let y = - 1; y <= 1; y++) {
        for (let z = - 1; z <= 1; z++) {
          if (x == 0 && y == 0 && z == 0) continue;
          let k = voxels.getKey(p.x + x, p.y + y, p.z + z);
          if (!voxels.getByKey(k)) todo.add(k);
        }
      }
    }
  });
  function hasNeighbour(voxels, p, dir, u) {
    for (let s = 1; s <= u; s++) {
      if (voxels.get(p.x + dir.x * s, p.y + dir.y * s, p.z + dir.z * s)) return true;
    }
    return false;
  }
  let u = 3;
  todo.forEach((key) => {
    let p = voxels.getPosition(key);
    if (voxels.get(p.x - 1, p.y, p.z) && hasNeighbour(voxels, p, { x: 1, y: 0, z: 0 }, u)
      || voxels.get(p.x, p.y - 1, p.z) && hasNeighbour(voxels, p, { x: 0, y: 1, z: 0 }, u)
      || voxels.get(p.x, p.y, p.z - 1) && hasNeighbour(voxels, p, { x: 0, y: 0, z: 1 }, u)

      || voxels.get(p.x - 1, p.y - 1, p.z - 1) && hasNeighbour(voxels, p, { x: 1, y: 1, z: 1 }, u)
      || voxels.get(p.x + 1, p.y - 1, p.z - 1) && hasNeighbour(voxels, p, { x: -1, y: 1, z: 1 }, u)
      || voxels.get(p.x - 1, p.y + 1, p.z - 1) && hasNeighbour(voxels, p, { x: 1, y: -1, z: 1 }, u)
      || voxels.get(p.x - 1, p.y - 1, p.z + 1) && hasNeighbour(voxels, p, { x: 1, y: 1, z: -1 }, u)

    ) {
      nvoxels.setByKey(key, { value: 10 });
    }
  });
  return nvoxels;
}

function removeSelected(voxels) {
  let nvoxels = new VoxelMap();
  voxels.forEach((voxel, key) => {
    if (!voxel.selected) nvoxels.setByKey(key, voxel)
  });
  return nvoxels;
}

function setAllValuesTo(voxels, value) {
  voxels.forEach((voxel, key) => {
    voxel.value = value;
  });
}

function filter(filter = "") {
  setTimeout(() => {
    console.log("filter start")
    console.log(voxels.size());
    let reloadGeometry = true;
    let nVoxels = voxels;
    if (filter.startsWith("Gauss")) {
      nVoxels = gauss3D(voxels);
      nVoxels.forEach((voxel, key) => {
        if (Math.abs(voxel.value) <= 0.001) nVoxels.removeByKey(key);
      });
    } else if (filter.startsWith("Sobel")) {
      nVoxels = normalizeGradients(sobel3D(voxels, !filter.endsWith("no blur")));
    } else if (filter.startsWith("Create group from selected")) {
      addSelectedToGroup();
      reloadGeometry = false;
    } else if (filter.startsWith("Remove selected")) {
      nVoxels = removeSelected(voxels);
    } else if (filter.startsWith("Make all values the same")) {
      setAllValuesTo(voxels, 10);
      reloadGeometry = false;
    } else if (filter.startsWith("Extend edges")) {
      nVoxels = extendEdge(voxels);
    } else if (filter.startsWith("Avg. gradients")) {
      nVoxels = avgGradients(nVoxels);
      reloadGeometry = false;
    }
    console.log("filter done")
    console.log(nVoxels.size())
    nVoxels.disabled = voxels.disabled;
    voxels = nVoxels;
    loadScene(reloadGeometry);
  }, 0);
}

function toVoxels(file, rSize) {
  clean();
  console.log("read start")
  rasterSize = rSize;

  let min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
  let max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
  let vertexMatcher = /\s*v\s+([\-+]?\d+(?:\.\d+)?)\s+([\-+]?\d+(?:\.\d+)?)\s+([\-+]?\d+(?:\.\d+)?)/;
  readSomeLines(file, function (line) {
    let match = vertexMatcher.exec(line)
    if (match) {
      for (let i = 0; i < min.length; i++) {
        let v = parseFloat(match[i + 1]);
        min[i] = Math.min(min[i], v);
        max[i] = Math.max(max[i], v);
      }
    }
  }, function onComplete() {
    let dif = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
    let fac = (rasterSize - 1) / dif;
    let nvoxels = new VoxelMap();
    readSomeLines(file, function (line) {
      let match = vertexMatcher.exec(line)
      if (match) {
        let vertexArr = [];
        let vertexClamped = [];
        for (let i = 0; i < min.length; i++) {
          vertexArr[i] = (parseFloat(match[i + 1]) - min[i]) * fac;
          vertexClamped[i] = Math.floor(vertexArr[i]);
        }
        let vertex = { x: vertexArr[0], y: vertexArr[1], z: vertexArr[2] };
        let voxel = nvoxels.get(vertexClamped[0], vertexClamped[1], vertexClamped[2]);
        if (voxel) {
          voxel.value++;
          voxel.vertices.set(vertex.x, vertex.y, vertex.z, vertex);
        }
        else nvoxels.set(vertexClamped[0], vertexClamped[1], vertexClamped[2], { value: 10, vertices: new VoxelMap(vertex) });
      }
    }, function onComplete() {
      console.log('read done');
      setTimeout(() => {
        voxels.forEach((voxel, key) => {
          voxel.vertices = [...voxel.vertices.values()];
        });
        console.log(nvoxels.size());
        voxels = nvoxels;
        loadScene();
      }, 0);
    });
  });
}

function readSomeLines(file, forEachLine, onComplete) {
  let CHUNK_SIZE = 20000; // 50kb, arbitrarily chosen.
  let offset = 0;
  let results = '';
  let fr = new FileReader();
  fr.onload = function () {
    // Use stream:true in case we cut the file
    // in the middle of a multi-byte character
    results += fr.result;
    let lines = results.split('\n');
    results = lines.pop(); // In case the line did not end yet.

    for (let i = 0; i < lines.length; ++i) {
      forEachLine(lines[i] + '\n');
    }
    offset += CHUNK_SIZE;
    seek();
  };
  fr.onerror = function () {
    onComplete(fr.error);
  };
  seek();

  function seek() {
    if (offset !== 0 && offset >= file.size) {
      // We did not find all lines, but there are no more lines.
      forEachLine(results); // This is from lines.pop(), before.
      onComplete(); // Done
      return;
    }
    let slice = file.slice(offset, offset + CHUNK_SIZE);
    fr.readAsText(slice);
  }
}

function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);



  element.click();

  document.body.removeChild(element);
}

let PI2 = Math.PI * 2;

function FFT(f, inverse = false) {
  let dir = inverse ? -1 : 1;
  let out = _FFT(f, dir);
  if (dir == -1) {
    let N = out.length;
    for (let i = 0; i < N; i++) {
      out[i][0] /= N;
      out[i][1] /= N;
    }
  }
  return out;
}

function _FFT(f, dir) {
  let n = f.length;
  if (n == 1) return [[f[0][0], f[0][1]]];
  let nh = Math.floor(n / 2);
  let hf = [];
  for (let i = 0; i < nh; i++)
    hf[i] = f[2 * i];
  let g = _FFT(hf, dir);

  for (let i = 0; i < nh; i++)
    hf[i] = f[2 * i + 1];
  let u = _FFT(hf, dir);

  let c = [];
  for (let k = 0; k < n; k++) c[k] = [];
  for (let k = 0; k < nh; k++) {
    let a = -dir * k * PI2 / n;
    let cos = Math.cos(a);
    let sin = Math.sin(a);
    let mr = u[k][0] * cos - u[k][1] * sin;
    let mi = u[k][0] * sin + u[k][1] * cos;
    c[k][0] = g[k][0] + mr;
    c[k][1] = g[k][1] + mi;
    c[k + nh][0] = g[k][0] - mr;
    c[k + nh][1] = g[k][1] - mi;
  }
  if (n - nh > nh) c[n - 1] = [0, 0];
  return c;
}

function FFT3d(src, M, N, O, inverse = false) {
  function getValue(x, y, z, i) {
    if (!Array.isArray(src)) {
      if (i == 1) return 0;
      let v = src.get(x, y, z);
      if (v && v.value) return v.value;
      return 0;
    }
    if (!inverse && i == 1) return 0;
    let arr = src[x];
    if (!arr) return 0;
    arr = arr[y];
    if (!arr) return 0;
    arr = arr[z];
    if (Array.isArray(arr)) return arr[i];
    return arr || 0;
  }
  M = nextPowerOf2(M);
  N = nextPowerOf2(N);
  O = nextPowerOf2(O);
  let c = [];
  for (let x = 0; x < M; x++) {
    c[x] = [];
    for (let y = 0; y < N; y++) {
      c[x][y] = [];
      for (let z = 0; z < O; z++) {
        c[x][y][z] = [];
      }
    }
  }
  let rows = []; for (let i = 0; i < M; i++) rows[i] = [];
  for (let z = 0; z < O; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        rows[x][0] = getValue(x, y, z, 0);
        rows[x][1] = getValue(x, y, z, 1);
      }
      rows = FFT(rows, inverse);
      for (let x = 0; x < M; x++) {
        c[x][y][z][0] = rows[x][0];
        c[x][y][z][1] = rows[x][1];
      }
    }
  }
  let cols = []; for (let i = 0; i < N; i++) cols[i] = [];
  for (let x = 0; x < M; x++) {
    for (let z = 0; z < O; z++) {
      for (let y = 0; y < N; y++) {
        cols[y][0] = c[x][y][z][0];
        cols[y][1] = c[x][y][z][1];
      }
      cols = FFT(cols, inverse);
      for (let y = 0; y < N; y++) {
        c[x][y][z][0] = cols[y][0];
        c[x][y][z][1] = cols[y][1];
      }
    }
  }
  let depths = []; for (let i = 0; i < O; i++) depths[i] = [];
  for (let x = 0; x < M; x++) {
    for (let y = 0; y < N; y++) {
      for (let z = 0; z < O; z++) {
        depths[z][0] = c[x][y][z][0];
        depths[z][1] = c[x][y][z][1];
      }
      depths = FFT(depths, inverse);
      for (let z = 0; z < O; z++) {
        c[x][y][z][0] = depths[z][0];
        c[x][y][z][1] = depths[z][1];
      }
    }
  }
  return c;
}

function toAmplitude(f) {
  for (let x = 0; x < f.length; x++) {
    for (let y = 0; y < f[x].length; y++) {
      for (let z = 0; z < f[x][y].length; z++) {
        let real = f[x][y][z][0];
        let imag = f[x][y][z][1];
        f[x][y][z] = Math.sqrt(real * real + imag * imag);
      }
    }
  }
  return f;
}

function toLog(f) {
  for (let x = 0; x < f.length; x++) {
    for (let y = 0; y < f[x].length; y++) {
      for (let z = 0; z < f[x][y].length; z++) {
        f[x][y][z] = Math.log(1 + f[x][y][z]);
      }
    }
  }
  return f;
}

function nextPowerOf2(a) {
  let b = 1;
  while (b < a) b = b << 1;
  return b;
}

function count8Neighbour(f) {
  let selected = new VoxelMap();
  f.forEach((voxel, key) => {
    let p = f.getPosition(key);
    selected.setByKey(key, count8NeighbourAt(f, p.x, p.y, p.z));
  });
  return selected;
}

function count8NeighbourAt(f, x, y, z) {
  let n = 0;
  for (let nx = x - 1; nx <= x + 1; nx++) {
    for (let ny = y - 1; ny <= y + 1; ny++) {
      for (let nz = z - 1; nz <= z + 1; nz++) {
        let v = f.get(nx, ny, nz);
        if (v && v.value != 0) n++;
      }
    }
  }
  return n;
}

function floodFill(shouldBeSelected, p) {
  let selected = new VoxelMap();
  let stack = [];
  stack.push({ p: { x: p.x, y: p.y, z: p.z }, l: { x: p.x, y: p.y, z: p.z } });
  while (stack.length > 0) {
    let e = stack.pop();
    let p = e.p;
    if (!selected.get(p.x, p.y, p.z)) {
      let sbm = shouldBeSelected(e.p, e.l);
      if (sbm) {
        selected.set(p.x, p.y, p.z, true);
        for (let nx = p.x - 1; nx <= p.x + 1; nx++) {
          for (let ny = p.y - 1; ny <= p.y + 1; ny++) {
            for (let nz = p.z - 1; nz <= p.z + 1; nz++) {
              if (nx != p.x || ny != p.y || nz != p.z) {
                stack.push({ p: { x: nx, y: ny, z: nz }, l: { x: p.x, y: p.y, z: p.z } });
              }
            }
          }
        }
      }
    }
  }
  return selected;
}


function binarySearch(ar, el, compare_fn) {
  let m = 0;
  let n = ar.length - 1;
  while (m <= n) {
    let k = (n + m) >> 1;
    let cmp = compare_fn(el, ar[k]);
    if (cmp > 0) {
      m = k + 1;
    } else if (cmp < 0) {
      n = k - 1;
    } else {
      return k;
    }
  }
  return -m - 1;
}

function nextVoxel(p, d) {
  let vp = pointToVoxel(p);
  let difx = vp.x + Math.sign(d.x) / 2 - p.x;
  let dify = vp.y + Math.sign(d.y) / 2 - p.y;
  let difz = vp.z + Math.sign(d.z) / 2 - p.z;
  let min = Math.max(Math.min(difx / d.x, dify / d.y, difz / d.z), 0.06);
  return { position: { x: p.x + d.x * min, y: p.y + d.y * min, z: p.z + d.z * min }, t: min };
}

function raycast(getVoxel, p, d, min, max) {
  let r = intersectsRayAABB(p, d, min, max);
  if (!r) return false;

  let t = r.tmin < 0 ? 0 : r.tmin;

  let i = { x: p.x + t * d.x, y: p.y + t * d.y, z: p.z + t * d.z };


  // console.log("start")
  // let rayLine = new THREE.Geometry();
  // rayLine.vertices.push(new THREE.Vector3(i.x, i.y, i.z))
  // rayLine.vertices.push(new THREE.Vector3(i.x + d.x * 100, i.y + d.y * 100, i.z + d.z * 100))
  // scene.add(new THREE.Line(rayLine, new THREE.MeshBasicMaterial({ color: 0xffff00 })))

  // let wb = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  // let m = new THREE.Mesh(wb, new THREE.MeshBasicMaterial(0xff0000));
  // let vp = pointToVoxel(i);
  // m.position.set(vp.x, vp.y, vp.z)
  // scene.add(new THREE.BoxHelper(m, 0xff0000));

  let pI = i;
  let maxIt = Math.abs(max.x - min.x) + Math.abs(max.y - min.y) + Math.abs(max.z - min.z);
  while (t <= r.tmax) {
    if (maxIt-- < 0) break;
    // m = new THREE.Mesh(wb, new THREE.MeshBasicMaterial(0x0000ff));
    // m.position.set(vp.x, vp.y, vp.z)
    // scene.add(new THREE.BoxHelper(m, 0x0000ff));

    let vp = pointToVoxel(pI);
    if (getVoxel(vp.x, vp.y, vp.z)) {
      return { position: vp };
    }
    let out = nextVoxel(pI, d);
    pI = out.position;
    t += out.t;
  }
  return false;

}


function intersectsRayAABB(p, d, min, max) {
  let tmin = (min.x - p.x) / d.x;
  let tmax = (max.x - p.x) / d.x;
  if (tmin > tmax) { let tmp = tmin; tmin = tmax; tmax = tmp; }

  let tymin = (min.y - p.y) / d.y;
  let tymax = (max.y - p.y) / d.y;
  if (tymin > tymax) { let tmp = tymin; tymin = tymax; tymax = tmp; }

  if ((tmin > tymax) || (tymin > tmax)) return false;
  if (tymin > tmin)
    tmin = tymin;
  if (tymax < tmax)
    tmax = tymax;

  let tzmin = (min.z - p.z) / d.z;
  let tzmax = (max.z - p.z) / d.z;
  if (tzmin > tzmax) { let tmp = tzmin; tzmin = tzmax; tzmax = tmp; }

  if ((tmin > tzmax) || (tzmin > tmax)) return false;

  if (tzmin > tmin)
    tmin = tzmin;
  if (tzmax < tmax)
    tmax = tzmax;

  return { tmin, tmax };
}




function updateHistogram(container) {
  let hist = new Array(256).fill(0);
  let histR = new Array(256).fill(0);
  let histG = new Array(256).fill(0);
  let histB = new Array(256).fill(0);
  voxels.forEach((voxel, key) => {
    let c = getColor(voxels.getPosition(key), voxel);
    hist[Math.floor((c.r + c.g + c.b) / 3)]++;
    histR[Math.floor(c.r)]++;
    histG[Math.floor(c.g)]++;
    histB[Math.floor(c.b)]++;
  });
  let max = 100 / Math.max(...hist);
  let maxR = 100 / Math.max(...histR);
  let maxG = 100 / Math.max(...histG);
  let maxB = 100 / Math.max(...histB);
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '300px');
  svg.setAttribute('viewBox', '0 0 255 100');
  let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', 'translate(0,100) scale(1,-1)');
  let polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', hist.map((v, i) => i + "," + v * max).join(" "));
  polyline.setAttribute('style', 'fill:none;stroke:black;stroke-width:1');
  let polylineR = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polylineR.setAttribute('points', histR.map((v, i) => i + "," + v * maxR).join(" "));
  polylineR.setAttribute('style', 'fill:none;stroke:red;stroke-width:1');
  let polylineG = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polylineG.setAttribute('points', histG.map((v, i) => i + "," + v * maxG).join(" "));
  polylineG.setAttribute('style', 'fill:none;stroke:green;stroke-width:1');
  let polylineB = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polylineB.setAttribute('points', histB.map((v, i) => i + "," + v * maxB).join(" "));
  polylineB.setAttribute('style', 'fill:none;stroke:blue;stroke-width:1');
  g.appendChild(polyline);
  g.appendChild(polylineR);
  g.appendChild(polylineG);
  g.appendChild(polylineB);
  svg.appendChild(g);

  let div = document.createElement('div');
  div.setAttribute('style', 'display:flex;flex-direction:row');
  let cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');
  cb.checked = true;
  cb.addEventListener('click', ((e) => polyline.setAttribute('visibility', cb.checked ? 'visible' : 'hidden')));
  let cbR = document.createElement('input');
  cbR.setAttribute('type', 'checkbox');
  cbR.checked = true;
  cbR.addEventListener('click', ((e) => polylineR.setAttribute('visibility', cbR.checked ? 'visible' : 'hidden')));
  let cbG = document.createElement('input');
  cbG.setAttribute('type', 'checkbox');
  cbG.checked = true;
  cbG.addEventListener('click', ((e) => polylineG.setAttribute('visibility', cbG.checked ? 'visible' : 'hidden')));
  let cbB = document.createElement('input');
  cbB.setAttribute('type', 'checkbox');
  cbB.checked = true;
  cbB.addEventListener('click', ((e) => polylineB.setAttribute('visibility', cbB.checked ? 'visible' : 'hidden')));

  div.appendChild(document.createTextNode("Grey:"))
  div.appendChild(cb);
  div.appendChild(document.createTextNode("Red:"))
  div.appendChild(cbR);
  div.appendChild(document.createTextNode("Green:"))
  div.appendChild(cbG);
  div.appendChild(document.createTextNode("Blue:"))
  div.appendChild(cbB);

  while (container.firstChild) container.removeChild(container.firstChild);
  container.appendChild(svg);
  container.appendChild(div);
}



function createOrbitControls(object, domElement) {
  let OrbitControls = function (object, domElement) {

    this.object = object;
    this.domElement = (domElement !== undefined) ? domElement : document;

    // API

    this.enabled = true;

    this.center = new THREE.Vector3();

    this.userZoom = true;
    this.userZoomSpeed = 1.0;

    this.userRotate = true;
    this.userRotateSpeed = 1.0;

    this.userPan = true;
    this.userPanSpeed = 2.0;

    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    this.minDistance = 0;
    this.maxDistance = Infinity;

    // 65 /*A*/, 83 /*S*/, 68 /*D*/
    //this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ROTATE: 65, ZOOM: 83, PAN: 68 };
    this.keys = { LEFT: 65, FORWARD: 87, RIGHT: 68, BACKWARD: 83, UP: 69, BOTTOM: 81, ROTATE: 82, ZOOM: 90, PAN: 84 };

    // internals

    let scope = this;

    let EPS = 0.000001;
    let PIXELS_PER_ROUND = 1800;

    let rotateStart = new THREE.Vector2();
    let rotateEnd = new THREE.Vector2();
    let rotateDelta = new THREE.Vector2();

    let zoomStart = new THREE.Vector2();
    let zoomEnd = new THREE.Vector2();
    let zoomDelta = new THREE.Vector2();

    let phiDelta = 0;
    let thetaDelta = 0;
    let scale = 1;
    let radius = 1;

    let lastPosition = new THREE.Vector3();

    let STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
    let state = STATE.NONE;

    // events

    let changeEvent = { type: 'change' };


    this.rotateLeft = function (angle) {

      if (angle === undefined) {

        angle = getAutoRotationAngle();

      }

      thetaDelta -= angle;

    };

    this.rotateRight = function (angle) {

      if (angle === undefined) {

        angle = getAutoRotationAngle();

      }

      thetaDelta += angle;

    };

    this.rotateUp = function (angle) {

      if (angle === undefined) {

        angle = getAutoRotationAngle();

      }

      phiDelta -= angle;

    };

    this.rotateDown = function (angle) {

      if (angle === undefined) {

        angle = getAutoRotationAngle();

      }

      phiDelta += angle;

    };

    this.zoomIn = function (zoomScale) {

      if (zoomScale === undefined) {

        zoomScale = getZoomScale();

      }

      scale /= zoomScale;

    };

    this.zoomOut = function (zoomScale) {

      if (zoomScale === undefined) {

        zoomScale = getZoomScale();

      }

      scale *= zoomScale;

    };

    this.pan = function (distance) {

      distance.transformDirection(this.object.matrix);
      distance.multiplyScalar(scope.userPanSpeed /** radius*/);
      if (Number.isNaN(distance.x) || Number.isNaN(distance.y) || Number.isNaN(distance.z)) return;
      this.object.position.add(distance);
      this.center.add(distance);

    };

    this.setPosition = function (position) {
      let distance = new THREE.Vector3().subVectors(position, this.center)
      this.object.position.add(distance);
      this.center.add(distance);
    }

    this.update = function () {

      let position = this.object.position;
      let offset = position.clone().sub(this.center);

      // angle from z-axis around y-axis

      let theta = Math.atan2(offset.x, offset.z);

      // angle from y-axis

      let phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

      if (this.autoRotate) {

        this.rotateLeft(getAutoRotationAngle());

      }

      theta += thetaDelta;
      phi += phiDelta;

      // restrict phi to be between desired limits
      phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

      // restrict phi to be betwee EPS and PI-EPS
      phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

      // restrict radius to be between desired limits
      radius = Math.max(this.minDistance, Math.min(this.maxDistance, offset.length() * scale));

      offset.x = radius * Math.sin(phi) * Math.sin(theta);
      offset.y = radius * Math.cos(phi);
      offset.z = radius * Math.sin(phi) * Math.cos(theta);

      position.copy(this.center).add(offset);

      this.object.lookAt(this.center);

      thetaDelta = 0;
      phiDelta = 0;
      scale = 1;

      if (lastPosition.distanceTo(this.object.position) > 0) {

        this.dispatchEvent(changeEvent);

        lastPosition.copy(this.object.position);

      }

    };


    function getAutoRotationAngle() {

      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }

    function getZoomScale() {

      return Math.pow(0.95, scope.userZoomSpeed);

    }

    function onMouseDown(event) {

      if (scope.enabled === false) return;
      if (scope.userRotate === false) return;

      event.preventDefault();

      if (state === STATE.NONE) {
        if (event.button === 0)
          state = STATE.ROTATE;
        if (event.button === 1)
          state = STATE.ZOOM;
        if (event.button === 2)
          state = STATE.PAN;
      }


      if (state === STATE.ROTATE) {

        //state = STATE.ROTATE;

        rotateStart.set(event.clientX, event.clientY);

      } else if (state === STATE.ZOOM) {

        //state = STATE.ZOOM;

        zoomStart.set(event.clientX, event.clientY);

      } else if (state === STATE.PAN) {

        //state = STATE.PAN;

      }

      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);

    }

    function onMouseMove(event) {

      if (scope.enabled === false) return;

      event.preventDefault();



      if (state === STATE.ROTATE) {

        rotateEnd.set(event.clientX, event.clientY);
        rotateDelta.subVectors(rotateEnd, rotateStart);

        scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);
        scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);

        rotateStart.copy(rotateEnd);

      } else if (state === STATE.ZOOM) {

        zoomEnd.set(event.clientX, event.clientY);
        zoomDelta.subVectors(zoomEnd, zoomStart);

        if (zoomDelta.y > 0) {

          scope.zoomIn();

        } else {

          scope.zoomOut();

        }

        zoomStart.copy(zoomEnd);

      } else if (state === STATE.PAN) {

        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        scope.pan(new THREE.Vector3(- movementX, movementY, 0));

      }

    }

    function onMouseUp(event) {

      if (scope.enabled === false) return;
      if (scope.userRotate === false) return;

      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);

      state = STATE.NONE;

    }

    function onMouseWheel(event) {

      if (scope.enabled === false) return;
      if (scope.userZoom === false) return;

      let delta = 0;

      if (event.wheelDelta) { // WebKit / Opera / Explorer 9

        delta = event.wheelDelta;

      } else if (event.detail) { // Firefox

        delta = - event.detail;

      }

      if (delta > 0) {

        scope.zoomOut();

      } else {

        scope.zoomIn();

      }

    }

    function onKeyDown(event) {

      if (scope.enabled === false) return;
      if (scope.userPan === false) return;
      switch (event.keyCode) {
        case scope.keys.UP:
          scope.pan(new THREE.Vector3(0, 1, 0));
          break;
        case scope.keys.BOTTOM:
          scope.pan(new THREE.Vector3(0, - 1, 0));
          break;
        case scope.keys.LEFT:
          scope.pan(new THREE.Vector3(- 1, 0, 0));
          break;
        case scope.keys.RIGHT:
          scope.pan(new THREE.Vector3(1, 0, 0));
          break;
        case scope.keys.FORWARD:
          scope.pan(new THREE.Vector3(0, 0, -1));
          break;
        case scope.keys.BACKWARD:
          scope.pan(new THREE.Vector3(0, 0, 1));
          break;

        case scope.keys.ROTATE:
          state = STATE.ROTATE;
          break;
        case scope.keys.ZOOM:
          state = STATE.ZOOM;
          break;
        case scope.keys.PAN:
          state = STATE.PAN;
          break;

      }

    }

    function onKeyUp(event) {

      switch (event.keyCode) {

        case scope.keys.ROTATE:
        case scope.keys.ZOOM:
        case scope.keys.PAN:
          state = STATE.NONE;
          break;
      }

    }

    function preventDefault(event) {
      event.preventDefault();
    }

    let activated = false;
    this.activate = function () {
      if (!activated) {
        this.domElement.addEventListener('contextmenu', preventDefault, false);
        this.domElement.addEventListener('mousedown', onMouseDown, false);
        this.domElement.addEventListener('mousewheel', onMouseWheel, false);
        this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);
        activated = true;
      }
    }

    this.deactivate = function () {
      if (activated) {
        this.domElement.removeEventListener('contextmenu', preventDefault);
        this.domElement.removeEventListener('mousedown', onMouseDown);
        this.domElement.removeEventListener('mousewheel', onMouseWheel);
        this.domElement.removeEventListener('DOMMouseScroll', onMouseWheel); // firefox
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        activated = false;
      }
    }

    this.activate();
  };

  OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
  return new OrbitControls(camera, domElement);
}