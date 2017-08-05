webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"vbox wh100\">\n\n    <md-toolbar color=\"warn\">\n        <input type=\"file\" #inputFile>\n\n        <input #inputGridSize placeholder=\"Gridsize\" value=\"100\" type=\"number\" maxlength=\"7\">\n\n        <button md-button (click)=\"service.loadFile(inputFile['files'][0], inputGridSize.value)\">Load</button>\n        <button md-button [mdMenuTriggerFor]=\"menuFilter\">Filter</button>\n        <button md-button> Save</button>\n\n        <md-select placeholder=\"Color\" [(ngModel)]=\"service.colorType\">\n            <md-option *ngFor=\"let c of service.colorTypes\" [value]=\"c\">{{c}}</md-option>\n        </md-select>\n\n        <md-select placeholder=\"OnClick\" [(ngModel)]=\"service.clickAction\">\n            <md-option *ngFor=\"let c of service.clickActions\" [value]=\"c\">{{c}}</md-option>\n        </md-select>\n\n        <button md-button (click)=\"service.unselectAll()\">Unselect all</button>\n        <button md-button><md-icon>more_vert</md-icon></button>\n        <span class=\"grow\"></span>\n        <button md-button (click)=\"sidenav.toggle()\"><md-icon>menu</md-icon></button>\n    </md-toolbar>\n\n    <md-menu #menuFilter>\n        <button md-menu-item *ngFor=\"let f of service.filterTypes\" (click)=\"service.filter(f)\">{{f}}</button>\n    </md-menu>\n\n    <md-sidenav-container class=\"grow wh100\">\n        <md-sidenav #sidenav align=\"end\">\n             <md-tab-group class=\"min100 wh100\">\n                 <md-tab label=\"Groups\" >\n                     <div class=\"vbox grow wh100 min100\">\n                         <md-card *ngFor=\"let group of service.groups\">\n                            <md-card-header >\n                                <div md-card-avatar [style.backgroundColor]=\"service.rgbToHex(group.color)\"\n                                    [colorPicker]=\"service.rgbToHex(group.color)\"\n                                    (colorPickerChange)=\"group.color=service.hexToRgb($event)\"\n                                ></div>\n                                <md-input-container>\n                                    <input mdInput placeholder=\"Name\" [value]=\"group.name\">\n                                </md-input-container>\n                                \n                            </md-card-header>\n                            <md-card-actions>\n                                <button md-button (click)=\"service.addSelectedToGroup(group)\">ADD SELECTED</button>\n                                <button md-button (click)=\"service.showGroup(group)\">SHOW ALL</button>\n                                <button md-button (click)=\"service.hideGroup(group)\">HIDE ALL</button>\n                            </md-card-actions>\n                        </md-card> \n                    </div> \n                </md-tab> \n            </md-tab-group> \n\n        </md-sidenav>\n        <app-surface-view ></app-surface-view>\n    </md-sidenav-container>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__segmentation_service__ = __webpack_require__("../../../../../src/app/segmentation.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(service) {
        this.service = service;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__segmentation_service__["a" /* SegmentationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__segmentation_service__["a" /* SegmentationService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_color_picker__ = __webpack_require__("../../../../angular4-color-picker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_color_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular4_color_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__surface_view_surface_view_component__ = __webpack_require__("../../../../../src/app/surface-view/surface-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__segmentation_service__ = __webpack_require__("../../../../../src/app/segmentation.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__surface_view_surface_view_component__["a" /* SurfaceViewComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_6_angular4_color_picker__["ColorPickerModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__segmentation_service__["a" /* SegmentationService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/segmentation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__("../../../../three/build/three.module.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SegmentationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SegmentationService = (function () {
    function SegmentationService(zone) {
        this.zone = zone;
        this.filterTypes = [
            "Gauss",
            "Sobel",
            "Sobel no blur",
            "Make all values the same",
            "Extend edges",
            "Avg. gradients",
            "Create group from selected",
            "Remove selected"
        ];
        this.colorTypes = [
            "Position",
            "Value",
            "Normal",
            "Group",
            "Binarisation"
        ];
        this.clickActions = [
            "Info",
            "Select",
            "Flood-Fill"
        ];
    }
    SegmentationService.prototype.loadFile = function (file, gridSize) {
        loadFile(file, gridSize);
    };
    SegmentationService.prototype.save = function () {
        save();
    };
    SegmentationService.prototype.filter = function (type) {
        filter(type);
    };
    Object.defineProperty(SegmentationService.prototype, "colorType", {
        get: function () {
            return colorType;
        },
        set: function (v) {
            setColorType(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentationService.prototype, "clickAction", {
        get: function () {
            return clickType;
        },
        set: function (v) {
            setClickAction(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SegmentationService.prototype, "groups", {
        get: function () {
            return groups;
        },
        enumerable: true,
        configurable: true
    });
    SegmentationService.prototype.addSelectedToGroup = function (group) {
        addSelectedToGroup(group);
    };
    SegmentationService.prototype.showGroup = function (group) {
        showGroup(group);
    };
    SegmentationService.prototype.hideGroup = function (group) {
        hideGroup(group);
    };
    SegmentationService.prototype.unselectAll = function () {
        unselectAll();
    };
    SegmentationService.prototype.rgbToHex = function (c) {
        function componentToHex(c) {
            var hex = Math.floor(c).toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
    };
    SegmentationService.prototype.hexToRgb = function (hex) {
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
    };
    SegmentationService.prototype.prepare = function (surfaceView, canvas) {
        this.zone.runOutsideAngular(function () {
            prepare(surfaceView, canvas);
        });
    };
    SegmentationService.prototype.init = function () {
        this.zone.runOutsideAngular(function () {
            init();
        });
    };
    SegmentationService.prototype.start = function () {
        this.zone.runOutsideAngular(function () {
            loopSimple();
        });
    };
    SegmentationService.prototype.destroy = function () {
        this.zone.runOutsideAngular(function () {
            destroy();
        });
    };
    return SegmentationService;
}());
SegmentationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _a || Object])
], SegmentationService);

var renderer;
var surfaceView;
var canvas;
var scene;
var camera;
var groups = [];
var voxels = new VoxelMap();
var rasterSize;
var positionOffset = { x: 0, y: 0, z: 0 };
var voxelsBounds = {
    min: { x: 0, y: 0, z: 0, value: 0, sx: 0, sy: 0, sz: 0 },
    max: { x: 0, y: 0, z: 0, value: 0, sx: 0, sy: 0, sz: 0 },
};
var voxelCubeMap = new Map();
var controls;
var raycaster = new __WEBPACK_IMPORTED_MODULE_1_three__["a" /* Raycaster */]();
var mousePos = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */](), INTERSECTED, doRaycast = null;
var needsRerendering = true;
var voxelSize = 1;
var material = new __WEBPACK_IMPORTED_MODULE_1_three__["c" /* LineBasicMaterial */]({ color: 0x0000ff });
var geometry = new __WEBPACK_IMPORTED_MODULE_1_three__["d" /* Geometry */]();
var line = new __WEBPACK_IMPORTED_MODULE_1_three__["e" /* Line */](geometry, material);
var colorType = "Position";
var lastColorType = colorType;
var clickType = "Info";
var mouseDown = false;
function prepare(sv, c) {
    surfaceView = sv;
    canvas = c;
    renderer = new __WEBPACK_IMPORTED_MODULE_1_three__["f" /* WebGLRenderer */]({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    camera = new __WEBPACK_IMPORTED_MODULE_1_three__["g" /* PerspectiveCamera */](45, getSurfaceWidth() / getSurfaceHeight(), 0.1, 500);
    scene = new __WEBPACK_IMPORTED_MODULE_1_three__["h" /* Scene */]();
    resize();
    window.addEventListener('unload', function (event) {
        destroy();
    }, false);
    window.addEventListener('resize', function (event) {
        resize();
    }, false);
    window.addEventListener('keydown', function (event) {
        if (event.key == "Shift")
            controls.deactivate();
    });
    window.addEventListener('keyup', function (event) {
        if (event.key == "Shift")
            controls.activate();
    });
    window.addEventListener('mouseup', function (event) {
        mouseDown = false;
    }, false);
    surfaceView.addEventListener('mousedown', function (event) {
        setMousePosition(event);
        mouseDown = true;
    }, false);
    surfaceView.addEventListener('mousemove', function (event) {
        setMousePosition(event);
    }, false);
    surfaceView.addEventListener('click', function (event) {
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
    var text = "";
    voxels.forEach(function (voxel, key) {
        var p = voxels.getPosition(key);
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
function VoxelMap() {
    var _this = this;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    this.voxel = new Map();
    this.disabled = new Map();
    this.get = function (x, y, z) {
        return _this.getByKey(_this.getKey(x, y, z));
    };
    this.set = function (x, y, z, v) {
        _this.setByKey(_this.getKey(x, y, z), v);
    };
    this.remove = function (x, y, z) {
        _this.removeByKey(_this.getKey(x, y, z));
    };
    this.disable = function (x, y, z) {
        _this.disableByKey(_this.getKey(x, y, z));
    };
    this.enable = function (x, y, z) {
        _this.enableByKey(_this.getKey(x, y, z));
    };
    this.getByKey = function (k) {
        return _this.voxel.get(k);
    };
    this.setByKey = function (k, v) {
        _this.voxel.set(k, v);
    };
    this.removeByKey = function (key) {
        _this.voxel.delete(key);
    };
    this.disableByKey = function (key) {
        var v = _this.voxel.get(key);
        if (v) {
            _this.voxel.delete(key);
            _this.disabled.set(key, v);
        }
    };
    this.enableByKey = function (key) {
        var v = _this.disabled.get(key);
        if (v) {
            _this.disabled.delete(key);
            _this.voxel.set(key, v);
        }
    };
    this.size = function () {
        return _this.voxel.size;
    };
    this.clear = function () {
        _this.voxel.clear();
        _this.disabled.clear();
    };
    this.entries = function () {
        return _this.voxel.entries();
    };
    this.values = function () {
        return _this.voxel.values();
    };
    this.keys = function () {
        return _this.voxel.keys();
    };
    this.getPosition = function (key) {
        var s = key.split("/");
        if (!s || s.length < 3)
            return null;
        return {
            x: parseInt(s[0]),
            y: parseInt(s[1]),
            z: parseInt(s[2])
        };
    };
    this.getKey = function (x, y, z) {
        return x + "/" + y + "/" + z;
    };
    this.forEach = function (callback) {
        return _this.voxel.forEach(callback);
    };
    if (values)
        values.forEach(function (v) { return _this.set(v.x, v.y, v.z, v); });
}
function VertexGeometry(cubes) {
    if (cubes === void 0) { cubes = true; }
    var boxSize = voxelSize * 0 + 0.7;
    var vboMap = new VoxelMap();
    this.add = function (position, voxel) {
        var p = getVBOPosition(position);
        var vbo = vboMap.get(p.x, p.y, p.z);
        if (!vbo) {
            vbo = { vertices: [], colors: [], geo: new __WEBPACK_IMPORTED_MODULE_1_three__["i" /* BufferGeometry */]() };
            vboMap.set(p.x, p.y, p.z, vbo);
        }
        var vboIndex = Math.floor(vbo.vertices.length / 3);
        var vboLength;
        if (cubes) {
            vboIndex *= 8;
            vboLength = 8;
            vbo.vertices.push(position.x, position.y, position.z);
        }
        else {
            if (voxel.vertices) {
                vboLength = voxel.vertices.length;
                voxel.vertices.forEach(function (v) {
                    vbo.vertices.push(v.x, v.y, v.z);
                    vbo.colors.push(1, 0, 0);
                });
            }
            else {
                vboLength = 1;
                vbo.vertices.push(position.x, position.y, position.z);
            }
        }
        vbo.colors.push(1, 0, 0);
        return { vbo: vbo.geo, vboIndex: vboIndex, vboLength: vboLength };
    };
    this.dispose = function () {
        vboMap.clear();
        vboMap = null;
    };
    this.drawnObjects = function () {
        if (cubes)
            return Array.from(vboMap.entries()).map(function (e) { return getCubeMesh(e[1]); });
        return Array.from(vboMap.entries()).map(function (e) { return getPointsMesh(e[1]); });
    };
    function getVBOPosition(p) {
        return { x: Math.floor(p.x / 10), y: Math.floor(p.y / 10), z: Math.floor(p.z / 10) };
    }
    function getCubeMesh(vbo) {
        var hbs = boxSize / 2;
        var vertices = new Float32Array(vbo.vertices.length * 8);
        for (var i = 0; i < vbo.vertices.length; i += 3) {
            var x = vbo.vertices[i];
            var y = vbo.vertices[i + 1];
            var z = vbo.vertices[i + 2];
            var i8 = i * 8;
            vertices[i8] = vertices[i8 + 3] = vertices[i8 + 6] = vertices[i8 + 9] = x - hbs;
            vertices[i8 + 1] = vertices[i8 + 4] = vertices[i8 + 13] = vertices[i8 + 16] = y - hbs;
            vertices[i8 + 2] = vertices[i8 + 8] = vertices[i8 + 14] = vertices[i8 + 20] = z - hbs;
            vertices[i8 + 12] = vertices[i8 + 15] = vertices[i8 + 18] = vertices[i8 + 21] = x + hbs;
            vertices[i8 + 7] = vertices[i8 + 10] = vertices[i8 + 19] = vertices[i8 + 22] = y + hbs;
            vertices[i8 + 5] = vertices[i8 + 11] = vertices[i8 + 17] = vertices[i8 + 23] = z + hbs;
        }
        var colors = new Float32Array(vbo.vertices.length * 8);
        for (var i = 0; i < Math.min(vbo.colors.length, vbo.vertices.length); i += 3) {
            var r = vbo.colors[i];
            var g = vbo.colors[i + 1];
            var b = vbo.colors[i + 2];
            var i8 = i * 8;
            for (var j = 0; j < 24; j += 3) {
                colors[i8 + j] = r;
                colors[i8 + j + 1] = g;
                colors[i8 + j + 2] = b;
            }
        }
        var indices = new Uint32Array(Math.floor(vbo.vertices.length / 3) * 16 - 2);
        for (var i = 0, o = 0; i < indices.length; i += 16, o += 8) {
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
        vbo.geo.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* BufferAttribute */](vertices, 3));
        vbo.geo.addAttribute('color', new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* BufferAttribute */](colors, 3));
        vbo.geo.setIndex(new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* BufferAttribute */](indices, 1));
        var m = new __WEBPACK_IMPORTED_MODULE_1_three__["k" /* Mesh */](vbo.geo, new __WEBPACK_IMPORTED_MODULE_1_three__["l" /* MeshBasicMaterial */]({ vertexColors: __WEBPACK_IMPORTED_MODULE_1_three__["m" /* VertexColors */] }));
        m.drawMode = __WEBPACK_IMPORTED_MODULE_1_three__["n" /* TriangleStripDrawMode */];
        return m;
    }
    function getPointsMesh(vbo) {
        vbo.geo.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* BufferAttribute */](new Float32Array(vbo.vertices), 3));
        vbo.geo.addAttribute('color', new __WEBPACK_IMPORTED_MODULE_1_three__["j" /* BufferAttribute */](new Float32Array(vbo.colors), 3));
        return new __WEBPACK_IMPORTED_MODULE_1_three__["o" /* Points */](vbo.geo, new __WEBPACK_IMPORTED_MODULE_1_three__["p" /* PointsMaterial */]({ vertexColors: __WEBPACK_IMPORTED_MODULE_1_three__["m" /* VertexColors */], size: 10 }));
    }
}
function Frustum(eye, dir, up, near, far, top, bottom, right, left) {
    var _this = this;
    dir = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(dir).normalize();
    up = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(up);
    var side = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().crossVectors(dir, up).normalize();
    up.crossVectors(side, dir).normalize();
    var vn = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().addScaledVector(dir, near);
    var vf = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().addScaledVector(dir, far);
    var vt = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(vn).addScaledVector(up, top);
    var vb = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(vn).addScaledVector(up, bottom);
    var vr = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(vn).addScaledVector(side, right);
    var vl = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().add(vn).addScaledVector(side, left);
    var nt = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().crossVectors(side, vt).normalize();
    var nb = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().crossVectors(vb, side).normalize();
    var nr = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().crossVectors(vr, up).normalize();
    var nl = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().crossVectors(up, vl).normalize();
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
    this.containsVoxel = function (v, radius) {
        for (var _i = 0, _a = Object.keys(_this.plane); _i < _a.length; _i++) {
            var pk = _a[_i];
            var p = _this.plane[pk];
            if (dot(v, p) > p.d + radius) {
                return false;
            }
        }
        return true;
    };
    this.getVoxels = function (voxels) {
        var nvoxels = new VoxelMap();
        var offset = Math.sqrt(Math.pow(voxelSize, 2) * 3) / 2;
        voxels.forEach(function (voxel, key) {
            var p = voxels.getPosition(key);
            if (_this.containsVoxel(p, offset)) {
                nvoxels.setByKey(key, voxel);
            }
        });
        return nvoxels;
    };
}
function getColor(p, voxel) {
    if (voxel === void 0) { voxel = null; }
    if (!voxel)
        voxel = voxels.get(p.x, p.y, p.z);
    var red = 0, green = 0, blue = 0, vc;
    function calcColor(type) {
        if (type == "Position") {
            red = incContrast(p.x, voxelsBounds.min.x, voxelsBounds.max.x, 30, 225);
            green = incContrast(p.y, voxelsBounds.min.y, voxelsBounds.max.y, 30, 225);
            blue = incContrast(p.z, voxelsBounds.min.z, voxelsBounds.max.z, 30, 225);
        }
        else if (type == "Value") {
            vc = incContrast(voxel.value, voxelsBounds.min.value, voxelsBounds.max.value, 30, 225);
            red = green = blue = vc;
        }
        else if (type == "Normal") {
            red = incContrast(voxel["sx"] || 0, voxelsBounds.min.sx, voxelsBounds.max.sx, 30, 225);
            green = incContrast(voxel["sy"] || 0, voxelsBounds.min.sy, voxelsBounds.max.sy, 30, 225);
            blue = incContrast(voxel["sz"] || 0, voxelsBounds.min.sz, voxelsBounds.max.sz, 30, 225);
        }
        else if (type == "Group") {
            if (!voxel.group) {
                calcColor(colorType == lastColorType ? "Position" : lastColorType);
            }
            else {
                var c = voxel.group.color;
                red = c.r;
                green = c.g;
                blue = c.b;
            }
        }
        else {
            vc = Math.round(Math.floor(incContrast(voxel.value, voxelsBounds.min.value, voxelsBounds.max.value, 30, 225) / 19.5) * 19.5);
            red = green = blue = vc;
        }
    }
    calcColor(colorType);
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
    };
}
function setColor(cube, color) {
    var r = color.r / 255;
    var g = color.g / 255;
    var b = color.b / 255;
    var colors = cube.vbo.getAttribute("color");
    if (colors) {
        for (var c = 0; c < cube.vboLength; c++)
            colors.setXYZ(cube.vboIndex + c, r, g, b);
        colors.needsUpdate = true;
    }
}
function stringToColor(string) {
    if (!string)
        return undefined;
    var str = string;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var r = (hash >> 8) & 0xFF;
    var g = (hash >> 16) & 0xFF;
    var b = (hash >> 24) & 0xFF;
    return { r: r, g: g, b: b };
}
function addSelectedToGroup(group) {
    if (group === void 0) { group = undefined; }
    if (!group) {
        var groupId = groups.length;
        var name = groupId.toString();
        var r = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
        var g = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
        var b = incContrast(Math.floor(Math.random() * 255), 0, 255, 30, 225);
        group = {
            name: name,
            _color: { r: r, g: g, b: b },
            get color() { return this._color; },
            set color(c) {
                var _this = this;
                this._color = c;
                updateColors({ needsUpdate: function (voxel) { return voxel.group == _this; } });
            },
            voxelKeys: new Set()
        };
        groups[groupId] = group;
    }
    voxels.forEach(function (voxel, key) {
        if (voxel.selected && !voxel.group) {
            voxel.group = group;
            group.voxelKeys.add(key);
        }
    });
    updateColors({ needsUpdate: function (voxel) { return voxel.group == group; } });
}
function showGroup(group) {
    group.voxelKeys.forEach(function (key) {
        voxels.enableByKey(key);
    });
    loadScene();
}
function hideGroup(group) {
    group.voxelKeys.forEach(function (key) {
        voxels.disableByKey(key);
    });
    loadScene();
}
function unselectAll() {
    voxels.forEach(function (voxel, key) {
        delete voxel.selected;
    });
    updateColors();
}
function raycastClicked(position) {
    var vp = pointToVoxel(position);
    if (clickType == "Flood-Fill") {
        setTimeout(function () {
            var v2 = null;
            var selected = floodFill(function (p, p1) {
                // let v = voxels.get(x, y, z);
                // if (!v) return false;
                // return v.value > 0;
                var v1 = voxels.get(p.x, p.y, p.z);
                if (!v1)
                    return false;
                //if (v2 == null) v2 = v1;
                var v2 = voxels.get(p1.x, p1.y, p1.z);
                if (!v2)
                    return false;
                var dot = v1.sx * v2.sx + v1.sy * v2.sy + v1.sz * v2.sz;
                return dot >= 0.98;
            }, vp);
            selected.forEach(function (voxel, key) {
                voxels.getByKey(key)["selected"] = true;
            });
            updateColors({ needsUpdate: function (voxel) { return voxel.selected; } });
        }, 0);
    }
    else if (clickType == "Select") {
        var voxel = voxels.get(vp.x, vp.y, vp.z);
        if (voxel)
            voxel["selected"] = true;
    }
    else {
        console.log(vp);
        console.log(voxels.get(vp.x, vp.y, vp.z));
    }
}
function pointToVoxel(p) {
    var vsh = voxelSize / 2 - 0.01;
    return {
        x: Math.floor(p.x + vsh),
        y: Math.floor(p.y + vsh),
        z: Math.floor(p.z + vsh)
    };
}
function clearScene() {
    voxelCubeMap.clear();
    INTERSECTED = null;
    for (var i = scene.children.length - 1; i >= 0; i--) {
        var child = scene.children[i];
        scene.remove(child);
        if (child instanceof __WEBPACK_IMPORTED_MODULE_1_three__["k" /* Mesh */]) {
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
    controls.addEventListener('change', function (e) { needsRerendering = true; }, false);
    controls.userPanSpeed = 0.02;
    camera.position.z = 5;
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            for (var z = 0; z < 10; z++) {
                voxels.set(x, y, z, { value: 1 });
            }
        }
    }
    loadScene();
}
function resize() {
    var width = getSurfaceWidth();
    var height = getSurfaceHeight();
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
        var hit_position = [];
        var hit_normal = [];
        var getVoxel = function (x, y, z) {
            return voxels.get(x, y, z);
        };
        var vsh = voxelSize / 2;
        var min = { x: voxelsBounds.min.x - vsh, y: voxelsBounds.min.y - vsh, z: voxelsBounds.min.z - vsh };
        var max = { x: voxelsBounds.max.x + vsh, y: voxelsBounds.max.y + vsh, z: voxelsBounds.max.z + vsh };
        var hit = raycast(getVoxel, raycaster.ray.origin, raycaster.ray.direction, min, max);
        if (hit) {
            var vp = pointToVoxel(hit.position);
            var voxel = voxels.get(vp.x, vp.y, vp.z);
            if (voxel) {
                if (!INTERSECTED || INTERSECTED.voxel != voxel) {
                    if (INTERSECTED)
                        setColor(INTERSECTED.cube, getColor(INTERSECTED.vp, INTERSECTED.voxel));
                    INTERSECTED = {
                        voxel: voxel,
                        cube: voxelCubeMap.get(voxels.getKey(vp.x, vp.y, vp.z)),
                        vp: vp
                    };
                    setColor(INTERSECTED.cube, { r: 0, g: 255, b: 0 });
                }
            }
            else {
                console.log(hit);
            }
        }
        else {
            if (INTERSECTED)
                setColor(INTERSECTED.cube, getColor(INTERSECTED.vp, INTERSECTED.voxel));
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
    var rect = surfaceView.getBoundingClientRect();
    var x = ((event.pageX - rect.left) / getSurfaceWidth()) * 2 - 1;
    var y = -((event.pageY - rect.top) / getSurfaceHeight()) * 2 + 1;
    if (event.ctrlKey) {
        if (mouseDown)
            doRaycast = "click";
        else if (doRaycast != "click")
            doRaycast = event.type;
        mousePos.x = x;
        mousePos.y = y;
    }
    else if (event.shiftKey && event.type == "click") {
        var top = Math.tan(camera.fov / 360 * Math.PI) * camera.near;
        var right = top * camera.aspect;
        var frustum = new Frustum(camera.position, camera.getWorldDirection(), camera.up, camera.near, camera.far, top, -top, right, -right);
        var nvoxels = frustum.getVoxels(voxels);
        nvoxels.forEach(function (voxel, key) {
            voxels.getByKey(key)["selected"] = true;
        });
        updateColors({ needsUpdate: function (voxel) { return voxel.selected; } });
    }
}
function calculateBounds() {
    var minKeys = Object.keys(voxelsBounds.min);
    var maxKeys = Object.keys(voxelsBounds.max);
    minKeys.forEach(function (v) { return voxelsBounds.min[v] = Number.POSITIVE_INFINITY; });
    maxKeys.forEach(function (v) { return voxelsBounds.max[v] = Number.NEGATIVE_INFINITY; });
    minKeys = minKeys.filter(function (v) { return v != "x" && v != "y" && v != "z"; });
    maxKeys = maxKeys.filter(function (v) { return v != "x" && v != "y" && v != "z"; });
    var coords = ["x", "y", "z"];
    voxels.forEach(function (voxel, key) {
        var v = voxel.value;
        var p = voxels.getPosition(key);
        if (Math.abs(v) > 0.001) {
            coords.forEach(function (v) {
                voxelsBounds.min[v] = Math.min(voxelsBounds.min[v], p[v]);
                voxelsBounds.max[v] = Math.max(voxelsBounds.max[v], p[v]);
            });
            minKeys.forEach(function (v) { return voxelsBounds.min[v] = Math.min(voxelsBounds.min[v], voxel[v] || 0); });
            maxKeys.forEach(function (v) { return voxelsBounds.max[v] = Math.max(voxelsBounds.max[v], voxel[v] || 0); });
        }
        else {
            voxels.removeByKey(key);
        }
    });
    console.log(voxelsBounds);
    var updateControls = true;
    coords.forEach(function (v) {
        positionOffset[v] = (voxelsBounds.max[v] - voxelsBounds.min[v]) / 2 + voxelsBounds.min[v];
        if (updateControls && Number.isNaN(positionOffset[v]))
            updateControls = false;
    });
    if (updateControls) {
        controls.userPanSpeed = 0.004 * new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().subVectors(voxelsBounds.max, voxelsBounds.min).length();
        controls.setPosition(positionOffset);
    }
}
function loadScene(reloadGeometry) {
    if (reloadGeometry === void 0) { reloadGeometry = true; }
    calculateBounds();
    if (reloadGeometry) {
        clearScene();
        var axisHelper = new __WEBPACK_IMPORTED_MODULE_1_three__["r" /* AxisHelper */](5);
        scene.add(axisHelper);
        var vGeometry_1 = new VertexGeometry(true);
        voxels.forEach(function (voxel, key) {
            var p = voxels.getPosition(key);
            var cube = vGeometry_1.add(p, voxel);
            voxelCubeMap.set(key, cube);
        });
        vGeometry_1.drawnObjects().forEach(function (o) { return scene.add(o); });
        vGeometry_1.dispose();
    }
    updateColors();
    needsRerendering = true;
}
function updateColors(filter) {
    if (filter === void 0) { filter = null; }
    var needsUpdate = function (voxel) { return true; };
    if (filter && filter.needsUpdate != undefined) {
        needsUpdate = filter.needsUpdate;
    }
    voxels.forEach(function (voxel, key) {
        if (needsUpdate(voxel)) {
            var v = voxel.value;
            var p = voxels.getPosition(key);
            var color = getColor(p, voxel);
            setColor(voxelCubeMap.get(key), color);
        }
    });
    needsRerendering = true;
}
function incContrast(v, minV, maxV, min, max) {
    return ((minV == maxV ? 1 : ((v - minV) / (maxV - minV))) * (max - min) + min);
}
function gauss3D(voxels) {
    return korrelation3D(voxels, [1 / 4, 2 / 4, 1 / 4]);
}
function korrelation1D(voxels, kernel, axis, out) {
    if (out === void 0) { out = new VoxelMap(); }
    var getPositionByAxis;
    if (axis == "x")
        getPositionByAxis = function (p, o) { return ({ x: p.x + o, y: p.y, z: p.z }); };
    else if (axis == "y")
        getPositionByAxis = function (p, o) { return ({ x: p.x, y: p.y + o, z: p.z }); };
    else
        getPositionByAxis = function (p, o) { return ({ x: p.x, y: p.y, z: p.z + o }); };
    var kh = Math.floor(kernel.length / 2);
    var keys = new Set();
    voxels.forEach(function (voxel, key) {
        var vp = voxels.getPosition(key);
        for (var o = -kh; o < kernel.length - kh; o++) {
            var op = getPositionByAxis(vp, o);
            keys.add(voxels.getKey(op.x, op.y, op.z));
        }
    });
    var getValue = function (voxels, x, y, z) {
        var v = voxels.get(x, y, z);
        if (!v || !v.value)
            return 0;
        return v.value;
    };
    keys.forEach(function (key) {
        var vp = voxels.getPosition(key);
        var sum = 0;
        kernel.forEach(function (v, ki) {
            var p = getPositionByAxis(vp, ki - kh);
            sum += getValue(voxels, p.x, p.y, p.z) * v;
        });
        if (sum != 0) {
            var v = out.getByKey(key);
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
    var nvoxels = korrelation1D(voxels, kernel, "x");
    var nvoxels2 = korrelation1D(nvoxels, kernel, "y");
    nvoxels.clear();
    return korrelation1D(nvoxels2, kernel, "z", nvoxels);
}
function sobel3D(voxels, blur) {
    if (blur === void 0) { blur = true; }
    var sx = sobel1D(voxels, "x", blur);
    var sy = sobel1D(voxels, "y", blur);
    var sz = sobel1D(voxels, "z", blur);
    var nvoxels = new VoxelMap();
    function merge(s, name, out) {
        s.forEach(function (voxel, key) {
            if (voxel.value != 0) {
                var nvoxel = nvoxels.getByKey(key);
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
function sobel1D(voxels, axis, blur) {
    if (blur === void 0) { blur = true; }
    var nvoxels, nvoxels2;
    if (blur) {
        var kernelBlur = [1, 2, 1];
        if (axis == "x") {
            nvoxels = korrelation1D(voxels, kernelBlur, "z");
            nvoxels2 = korrelation1D(nvoxels, kernelBlur, "y");
            nvoxels.clear();
        }
        else if (axis == "y") {
            nvoxels = korrelation1D(voxels, kernelBlur, "x");
            nvoxels2 = korrelation1D(nvoxels, kernelBlur, "z");
            nvoxels.clear();
        }
        else {
            nvoxels = korrelation1D(voxels, kernelBlur, "y");
            nvoxels2 = korrelation1D(nvoxels, kernelBlur, "x");
            nvoxels.clear();
        }
    }
    else {
        nvoxels2 = voxels;
        nvoxels = new VoxelMap();
    }
    var kernelDiff = [1, 0, -1];
    if (axis == "x")
        return korrelation1D(nvoxels2, kernelDiff, "x", nvoxels);
    if (axis == "y")
        return korrelation1D(nvoxels2, kernelDiff, "y", nvoxels);
    return korrelation1D(nvoxels2, kernelDiff, "z", nvoxels);
}
function normalizeGradients(voxels) {
    var nvoxels = new VoxelMap();
    var v = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]();
    voxels.forEach(function (voxel, key) {
        v.set(voxel.sx || 0, voxel.sy || 0, voxel.sz || 0);
        var length = v.length();
        if (length >= 0.001) {
            v.normalize();
            nvoxels.setByKey(key, { value: length, sx: v.x, sy: v.y, sz: v.z });
        }
    });
    return nvoxels;
}
function avgGradients(voxels) {
    var nvoxels = new VoxelMap();
    var avg = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]();
    var v = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]();
    voxels.forEach(function (voxel, key) {
        var p = voxels.getPosition(key);
        var value = voxel.value;
        avg.set(voxel.sx || 0, voxel.sy || 0, voxel.sz || 0);
        var c = 1;
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                for (var z = -1; z <= 1; z++) {
                    if (x != 0 && y != 0 && z != 0) {
                        var nv = voxels.get(p.x + x, p.y + y, p.z + z);
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
        nvoxels.setByKey(key, { value: value / c, sx: avg.x, sy: avg.y, sz: avg.z });
    });
    return nvoxels;
}
function extendEdge(voxels) {
    var nvoxels = new VoxelMap();
    var todo = new Set();
    voxels.forEach(function (voxel, key) {
        nvoxels.setByKey(key, voxel);
        var p = voxels.getPosition(key);
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                for (var z = -1; z <= 1; z++) {
                    if (x == 0 && y == 0 && z == 0)
                        continue;
                    var k = voxels.getKey(p.x + x, p.y + y, p.z + z);
                    if (!voxels.getByKey(k))
                        todo.add(k);
                }
            }
        }
    });
    function hasNeighbour(voxels, p, dir, u) {
        for (var s = 1; s <= u; s++) {
            if (voxels.get(p.x + dir.x * s, p.y + dir.y * s, p.z + dir.z * s))
                return true;
        }
        return false;
    }
    var u = 3;
    todo.forEach(function (key) {
        var p = voxels.getPosition(key);
        if (voxels.get(p.x - 1, p.y, p.z) && hasNeighbour(voxels, p, { x: 1, y: 0, z: 0 }, u)
            || voxels.get(p.x, p.y - 1, p.z) && hasNeighbour(voxels, p, { x: 0, y: 1, z: 0 }, u)
            || voxels.get(p.x, p.y, p.z - 1) && hasNeighbour(voxels, p, { x: 0, y: 0, z: 1 }, u)
            || voxels.get(p.x - 1, p.y - 1, p.z - 1) && hasNeighbour(voxels, p, { x: 1, y: 1, z: 1 }, u)
            || voxels.get(p.x + 1, p.y - 1, p.z - 1) && hasNeighbour(voxels, p, { x: -1, y: 1, z: 1 }, u)
            || voxels.get(p.x - 1, p.y + 1, p.z - 1) && hasNeighbour(voxels, p, { x: 1, y: -1, z: 1 }, u)
            || voxels.get(p.x - 1, p.y - 1, p.z + 1) && hasNeighbour(voxels, p, { x: 1, y: 1, z: -1 }, u)) {
            nvoxels.setByKey(key, { value: 10 });
        }
    });
    return nvoxels;
}
function removeSelected(voxels) {
    var nvoxels = new VoxelMap();
    voxels.forEach(function (voxel, key) {
        if (!voxel.selected)
            nvoxels.setByKey(key, voxel);
    });
    return nvoxels;
}
function setAllValuesTo(voxels, value) {
    voxels.forEach(function (voxel, key) {
        voxel.value = value;
    });
}
function filter(filter) {
    if (filter === void 0) { filter = ""; }
    setTimeout(function () {
        console.log("filter start");
        console.log(voxels.size());
        var reloadGeometry = true;
        var nVoxels = voxels;
        if (filter.startsWith("Gauss")) {
            nVoxels = gauss3D(voxels);
            nVoxels.forEach(function (voxel, key) {
                if (Math.abs(voxel.value) <= 0.001)
                    nVoxels.removeByKey(key);
            });
        }
        else if (filter.startsWith("Sobel")) {
            nVoxels = normalizeGradients(sobel3D(voxels, !filter.endsWith("no blur")));
        }
        else if (filter.startsWith("Create group from selected")) {
            addSelectedToGroup();
            reloadGeometry = false;
        }
        else if (filter.startsWith("Remove selected")) {
            nVoxels = removeSelected(voxels);
        }
        else if (filter.startsWith("Make all values the same")) {
            setAllValuesTo(voxels, 10);
            reloadGeometry = false;
        }
        else if (filter.startsWith("Extend edges")) {
            nVoxels = extendEdge(voxels);
        }
        else if (filter.startsWith("Avg. gradients")) {
            nVoxels = avgGradients(nVoxels);
            reloadGeometry = false;
        }
        console.log("filter done");
        console.log(nVoxels.size());
        nVoxels.disabled = voxels.disabled;
        voxels = nVoxels;
        loadScene(reloadGeometry);
    }, 0);
}
function toVoxels(file, rSize) {
    clean();
    console.log("read start");
    rasterSize = rSize;
    var min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
    var max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
    var vertexMatcher = /\s*v\s+([\-+]?\d+(?:\.\d+)?)\s+([\-+]?\d+(?:\.\d+)?)\s+([\-+]?\d+(?:\.\d+)?)/;
    readSomeLines(file, function (line) {
        var match = vertexMatcher.exec(line);
        if (match) {
            for (var i = 0; i < min.length; i++) {
                var v = parseFloat(match[i + 1]);
                min[i] = Math.min(min[i], v);
                max[i] = Math.max(max[i], v);
            }
        }
    }, function onComplete() {
        var dif = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
        var fac = (rasterSize - 1) / dif;
        var nvoxels = new VoxelMap();
        readSomeLines(file, function (line) {
            var match = vertexMatcher.exec(line);
            if (match) {
                var vertexArr = [];
                var vertexClamped = [];
                for (var i = 0; i < min.length; i++) {
                    vertexArr[i] = (parseFloat(match[i + 1]) - min[i]) * fac;
                    vertexClamped[i] = Math.floor(vertexArr[i]);
                }
                var vertex = { x: vertexArr[0], y: vertexArr[1], z: vertexArr[2] };
                var voxel = nvoxels.get(vertexClamped[0], vertexClamped[1], vertexClamped[2]);
                if (voxel) {
                    voxel.value++;
                    voxel.vertices.set(vertex.x, vertex.y, vertex.z, vertex);
                }
                else
                    nvoxels.set(vertexClamped[0], vertexClamped[1], vertexClamped[2], { value: 10, vertices: new VoxelMap(vertex) });
            }
        }, function onComplete() {
            console.log('read done');
            setTimeout(function () {
                voxels.forEach(function (voxel, key) {
                    voxel.vertices = voxel.vertices.values().slice();
                });
                console.log(nvoxels.size());
                voxels = nvoxels;
                loadScene();
            }, 0);
        });
    });
}
function readSomeLines(file, forEachLine, onComplete) {
    var CHUNK_SIZE = 20000; // 50kb, arbitrarily chosen.
    var offset = 0;
    var results = '';
    var fr = new FileReader();
    fr.onload = function () {
        // Use stream:true in case we cut the file
        // in the middle of a multi-byte character
        results += fr.result;
        var lines = results.split('\n');
        results = lines.pop(); // In case the line did not end yet.
        for (var i = 0; i < lines.length; ++i) {
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
        var slice = file.slice(offset, offset + CHUNK_SIZE);
        fr.readAsText(slice);
    }
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
var PI2 = Math.PI * 2;
function FFT(f, inverse) {
    if (inverse === void 0) { inverse = false; }
    var dir = inverse ? -1 : 1;
    var out = _FFT(f, dir);
    if (dir == -1) {
        var N = out.length;
        for (var i = 0; i < N; i++) {
            out[i][0] /= N;
            out[i][1] /= N;
        }
    }
    return out;
}
function _FFT(f, dir) {
    var n = f.length;
    if (n == 1)
        return [[f[0][0], f[0][1]]];
    var nh = Math.floor(n / 2);
    var hf = [];
    for (var i = 0; i < nh; i++)
        hf[i] = f[2 * i];
    var g = _FFT(hf, dir);
    for (var i = 0; i < nh; i++)
        hf[i] = f[2 * i + 1];
    var u = _FFT(hf, dir);
    var c = [];
    for (var k = 0; k < n; k++)
        c[k] = [];
    for (var k = 0; k < nh; k++) {
        var a = -dir * k * PI2 / n;
        var cos = Math.cos(a);
        var sin = Math.sin(a);
        var mr = u[k][0] * cos - u[k][1] * sin;
        var mi = u[k][0] * sin + u[k][1] * cos;
        c[k][0] = g[k][0] + mr;
        c[k][1] = g[k][1] + mi;
        c[k + nh][0] = g[k][0] - mr;
        c[k + nh][1] = g[k][1] - mi;
    }
    if (n - nh > nh)
        c[n - 1] = [0, 0];
    return c;
}
function FFT3d(src, M, N, O, inverse) {
    if (inverse === void 0) { inverse = false; }
    function getValue(x, y, z, i) {
        if (!Array.isArray(src)) {
            if (i == 1)
                return 0;
            var v = src.get(x, y, z);
            if (v && v.value)
                return v.value;
            return 0;
        }
        if (!inverse && i == 1)
            return 0;
        var arr = src[x];
        if (!arr)
            return 0;
        arr = arr[y];
        if (!arr)
            return 0;
        arr = arr[z];
        if (Array.isArray(arr))
            return arr[i];
        return arr || 0;
    }
    M = nextPowerOf2(M);
    N = nextPowerOf2(N);
    O = nextPowerOf2(O);
    var c = [];
    for (var x = 0; x < M; x++) {
        c[x] = [];
        for (var y = 0; y < N; y++) {
            c[x][y] = [];
            for (var z = 0; z < O; z++) {
                c[x][y][z] = [];
            }
        }
    }
    var rows = [];
    for (var i = 0; i < M; i++)
        rows[i] = [];
    for (var z = 0; z < O; z++) {
        for (var y = 0; y < N; y++) {
            for (var x = 0; x < M; x++) {
                rows[x][0] = getValue(x, y, z, 0);
                rows[x][1] = getValue(x, y, z, 1);
            }
            rows = FFT(rows, inverse);
            for (var x = 0; x < M; x++) {
                c[x][y][z][0] = rows[x][0];
                c[x][y][z][1] = rows[x][1];
            }
        }
    }
    var cols = [];
    for (var i = 0; i < N; i++)
        cols[i] = [];
    for (var x = 0; x < M; x++) {
        for (var z = 0; z < O; z++) {
            for (var y = 0; y < N; y++) {
                cols[y][0] = c[x][y][z][0];
                cols[y][1] = c[x][y][z][1];
            }
            cols = FFT(cols, inverse);
            for (var y = 0; y < N; y++) {
                c[x][y][z][0] = cols[y][0];
                c[x][y][z][1] = cols[y][1];
            }
        }
    }
    var depths = [];
    for (var i = 0; i < O; i++)
        depths[i] = [];
    for (var x = 0; x < M; x++) {
        for (var y = 0; y < N; y++) {
            for (var z = 0; z < O; z++) {
                depths[z][0] = c[x][y][z][0];
                depths[z][1] = c[x][y][z][1];
            }
            depths = FFT(depths, inverse);
            for (var z = 0; z < O; z++) {
                c[x][y][z][0] = depths[z][0];
                c[x][y][z][1] = depths[z][1];
            }
        }
    }
    return c;
}
function toAmplitude(f) {
    for (var x = 0; x < f.length; x++) {
        for (var y = 0; y < f[x].length; y++) {
            for (var z = 0; z < f[x][y].length; z++) {
                var real = f[x][y][z][0];
                var imag = f[x][y][z][1];
                f[x][y][z] = Math.sqrt(real * real + imag * imag);
            }
        }
    }
    return f;
}
function toLog(f) {
    for (var x = 0; x < f.length; x++) {
        for (var y = 0; y < f[x].length; y++) {
            for (var z = 0; z < f[x][y].length; z++) {
                f[x][y][z] = Math.log(1 + f[x][y][z]);
            }
        }
    }
    return f;
}
function nextPowerOf2(a) {
    var b = 1;
    while (b < a)
        b = b << 1;
    return b;
}
function count8Neighbour(f) {
    var selected = new VoxelMap();
    f.forEach(function (voxel, key) {
        var p = f.getPosition(key);
        selected.setByKey(key, count8NeighbourAt(f, p.x, p.y, p.z));
    });
    return selected;
}
function count8NeighbourAt(f, x, y, z) {
    var n = 0;
    for (var nx = x - 1; nx <= x + 1; nx++) {
        for (var ny = y - 1; ny <= y + 1; ny++) {
            for (var nz = z - 1; nz <= z + 1; nz++) {
                var v = f.get(nx, ny, nz);
                if (v && v.value != 0)
                    n++;
            }
        }
    }
    return n;
}
function floodFill(shouldBeSelected, p) {
    var selected = new VoxelMap();
    var stack = [];
    stack.push({ p: { x: p.x, y: p.y, z: p.z }, l: { x: p.x, y: p.y, z: p.z } });
    while (stack.length > 0) {
        var e = stack.pop();
        var p_1 = e.p;
        if (!selected.get(p_1.x, p_1.y, p_1.z)) {
            var sbm = shouldBeSelected(e.p, e.l);
            if (sbm) {
                selected.set(p_1.x, p_1.y, p_1.z, true);
                for (var nx = p_1.x - 1; nx <= p_1.x + 1; nx++) {
                    for (var ny = p_1.y - 1; ny <= p_1.y + 1; ny++) {
                        for (var nz = p_1.z - 1; nz <= p_1.z + 1; nz++) {
                            if (nx != p_1.x || ny != p_1.y || nz != p_1.z) {
                                stack.push({ p: { x: nx, y: ny, z: nz }, l: { x: p_1.x, y: p_1.y, z: p_1.z } });
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
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare_fn(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        }
        else if (cmp < 0) {
            n = k - 1;
        }
        else {
            return k;
        }
    }
    return -m - 1;
}
function nextVoxel(p, d) {
    var vp = pointToVoxel(p);
    var difx = vp.x + Math.sign(d.x) / 2 - p.x;
    var dify = vp.y + Math.sign(d.y) / 2 - p.y;
    var difz = vp.z + Math.sign(d.z) / 2 - p.z;
    var min = Math.max(Math.min(difx / d.x, dify / d.y, difz / d.z), 0.06);
    return { position: { x: p.x + d.x * min, y: p.y + d.y * min, z: p.z + d.z * min }, t: min };
}
function raycast(getVoxel, p, d, min, max) {
    var r = intersectsRayAABB(p, d, min, max);
    if (!r)
        return false;
    var t = r.tmin < 0 ? 0 : r.tmin;
    var i = { x: p.x + t * d.x, y: p.y + t * d.y, z: p.z + t * d.z };
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
    var pI = i;
    var maxIt = Math.abs(max.x - min.x) + Math.abs(max.y - min.y) + Math.abs(max.z - min.z);
    while (t <= r.tmax) {
        if (maxIt-- < 0)
            break;
        // m = new THREE.Mesh(wb, new THREE.MeshBasicMaterial(0x0000ff));
        // m.position.set(vp.x, vp.y, vp.z)
        // scene.add(new THREE.BoxHelper(m, 0x0000ff));
        var vp = pointToVoxel(pI);
        if (getVoxel(vp.x, vp.y, vp.z)) {
            return { position: vp };
        }
        var out = nextVoxel(pI, d);
        pI = out.position;
        t += out.t;
    }
    return false;
}
function intersectsRayAABB(p, d, min, max) {
    var tmin = (min.x - p.x) / d.x;
    var tmax = (max.x - p.x) / d.x;
    if (tmin > tmax) {
        var tmp = tmin;
        tmin = tmax;
        tmax = tmp;
    }
    var tymin = (min.y - p.y) / d.y;
    var tymax = (max.y - p.y) / d.y;
    if (tymin > tymax) {
        var tmp = tymin;
        tymin = tymax;
        tymax = tmp;
    }
    if ((tmin > tymax) || (tymin > tmax))
        return false;
    if (tymin > tmin)
        tmin = tymin;
    if (tymax < tmax)
        tmax = tymax;
    var tzmin = (min.z - p.z) / d.z;
    var tzmax = (max.z - p.z) / d.z;
    if (tzmin > tzmax) {
        var tmp = tzmin;
        tzmin = tzmax;
        tzmax = tmp;
    }
    if ((tmin > tzmax) || (tzmin > tmax))
        return false;
    if (tzmin > tmin)
        tmin = tzmin;
    if (tzmax < tmax)
        tmax = tzmax;
    return { tmin: tmin, tmax: tmax };
}
function updateHistogram(container) {
    var hist = new Array(256).fill(0);
    var histR = new Array(256).fill(0);
    var histG = new Array(256).fill(0);
    var histB = new Array(256).fill(0);
    voxels.forEach(function (voxel, key) {
        var c = getColor(voxels.getPosition(key), voxel);
        hist[Math.floor((c.r + c.g + c.b) / 3)]++;
        histR[Math.floor(c.r)]++;
        histG[Math.floor(c.g)]++;
        histB[Math.floor(c.b)]++;
    });
    var max = 100 / Math.max.apply(Math, hist);
    var maxR = 100 / Math.max.apply(Math, histR);
    var maxG = 100 / Math.max.apply(Math, histG);
    var maxB = 100 / Math.max.apply(Math, histB);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300px');
    svg.setAttribute('viewBox', '0 0 255 100');
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', 'translate(0,100) scale(1,-1)');
    var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', hist.map(function (v, i) { return i + "," + v * max; }).join(" "));
    polyline.setAttribute('style', 'fill:none;stroke:black;stroke-width:1');
    var polylineR = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polylineR.setAttribute('points', histR.map(function (v, i) { return i + "," + v * maxR; }).join(" "));
    polylineR.setAttribute('style', 'fill:none;stroke:red;stroke-width:1');
    var polylineG = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polylineG.setAttribute('points', histG.map(function (v, i) { return i + "," + v * maxG; }).join(" "));
    polylineG.setAttribute('style', 'fill:none;stroke:green;stroke-width:1');
    var polylineB = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polylineB.setAttribute('points', histB.map(function (v, i) { return i + "," + v * maxB; }).join(" "));
    polylineB.setAttribute('style', 'fill:none;stroke:blue;stroke-width:1');
    g.appendChild(polyline);
    g.appendChild(polylineR);
    g.appendChild(polylineG);
    g.appendChild(polylineB);
    svg.appendChild(g);
    var div = document.createElement('div');
    div.setAttribute('style', 'display:flex;flex-direction:row');
    var cb = document.createElement('input');
    cb.setAttribute('type', 'checkbox');
    cb.checked = true;
    cb.addEventListener('click', (function (e) { return polyline.setAttribute('visibility', cb.checked ? 'visible' : 'hidden'); }));
    var cbR = document.createElement('input');
    cbR.setAttribute('type', 'checkbox');
    cbR.checked = true;
    cbR.addEventListener('click', (function (e) { return polylineR.setAttribute('visibility', cbR.checked ? 'visible' : 'hidden'); }));
    var cbG = document.createElement('input');
    cbG.setAttribute('type', 'checkbox');
    cbG.checked = true;
    cbG.addEventListener('click', (function (e) { return polylineG.setAttribute('visibility', cbG.checked ? 'visible' : 'hidden'); }));
    var cbB = document.createElement('input');
    cbB.setAttribute('type', 'checkbox');
    cbB.checked = true;
    cbB.addEventListener('click', (function (e) { return polylineB.setAttribute('visibility', cbB.checked ? 'visible' : 'hidden'); }));
    div.appendChild(document.createTextNode("Grey:"));
    div.appendChild(cb);
    div.appendChild(document.createTextNode("Red:"));
    div.appendChild(cbR);
    div.appendChild(document.createTextNode("Green:"));
    div.appendChild(cbG);
    div.appendChild(document.createTextNode("Blue:"));
    div.appendChild(cbB);
    while (container.firstChild)
        container.removeChild(container.firstChild);
    container.appendChild(svg);
    container.appendChild(div);
}
function createOrbitControls(object, domElement) {
    var OrbitControls = function (object, domElement) {
        this.object = object;
        this.domElement = (domElement !== undefined) ? domElement : document;
        // API
        this.enabled = true;
        this.center = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]();
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
        var scope = this;
        var EPS = 0.000001;
        var PIXELS_PER_ROUND = 1800;
        var rotateStart = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var rotateEnd = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var rotateDelta = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var zoomStart = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var zoomEnd = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var zoomDelta = new __WEBPACK_IMPORTED_MODULE_1_three__["b" /* Vector2 */]();
        var phiDelta = 0;
        var thetaDelta = 0;
        var scale = 1;
        var radius = 1;
        var lastPosition = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]();
        var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
        var state = STATE.NONE;
        // events
        var changeEvent = { type: 'change' };
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
            if (Number.isNaN(distance.x) || Number.isNaN(distance.y) || Number.isNaN(distance.z))
                return;
            this.object.position.add(distance);
            this.center.add(distance);
        };
        this.setPosition = function (position) {
            var distance = new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */]().subVectors(position, this.center);
            this.object.position.add(distance);
            this.center.add(distance);
        };
        this.update = function () {
            var position = this.object.position;
            var offset = position.clone().sub(this.center);
            // angle from z-axis around y-axis
            var theta = Math.atan2(offset.x, offset.z);
            // angle from y-axis
            var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
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
            if (scope.enabled === false)
                return;
            if (scope.userRotate === false)
                return;
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
            }
            else if (state === STATE.ZOOM) {
                //state = STATE.ZOOM;
                zoomStart.set(event.clientX, event.clientY);
            }
            else if (state === STATE.PAN) {
                //state = STATE.PAN;
            }
            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('mouseup', onMouseUp, false);
        }
        function onMouseMove(event) {
            if (scope.enabled === false)
                return;
            event.preventDefault();
            if (state === STATE.ROTATE) {
                rotateEnd.set(event.clientX, event.clientY);
                rotateDelta.subVectors(rotateEnd, rotateStart);
                scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);
                scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);
                rotateStart.copy(rotateEnd);
            }
            else if (state === STATE.ZOOM) {
                zoomEnd.set(event.clientX, event.clientY);
                zoomDelta.subVectors(zoomEnd, zoomStart);
                if (zoomDelta.y > 0) {
                    scope.zoomIn();
                }
                else {
                    scope.zoomOut();
                }
                zoomStart.copy(zoomEnd);
            }
            else if (state === STATE.PAN) {
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](-movementX, movementY, 0));
            }
        }
        function onMouseUp(event) {
            if (scope.enabled === false)
                return;
            if (scope.userRotate === false)
                return;
            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);
            state = STATE.NONE;
        }
        function onMouseWheel(event) {
            if (scope.enabled === false)
                return;
            if (scope.userZoom === false)
                return;
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta;
            }
            else if (event.detail) {
                delta = -event.detail;
            }
            if (delta > 0) {
                scope.zoomOut();
            }
            else {
                scope.zoomIn();
            }
        }
        function onKeyDown(event) {
            if (scope.enabled === false)
                return;
            if (scope.userPan === false)
                return;
            switch (event.keyCode) {
                case scope.keys.UP:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](0, 1, 0));
                    break;
                case scope.keys.BOTTOM:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](0, -1, 0));
                    break;
                case scope.keys.LEFT:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](-1, 0, 0));
                    break;
                case scope.keys.RIGHT:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](1, 0, 0));
                    break;
                case scope.keys.FORWARD:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](0, 0, -1));
                    break;
                case scope.keys.BACKWARD:
                    scope.pan(new __WEBPACK_IMPORTED_MODULE_1_three__["q" /* Vector3 */](0, 0, 1));
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
        var activated = false;
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
        };
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
        };
        this.activate();
    };
    OrbitControls.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_1_three__["s" /* EventDispatcher */].prototype);
    return new OrbitControls(camera, domElement);
}
var _a;
//# sourceMappingURL=segmentation.service.js.map

/***/ }),

/***/ "../../../../../src/app/surface-view/surface-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/surface-view/surface-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div #surfaceView class=\"vbox max100 wh100\" style=\"overflow: hidden;\">\n    <canvas #canvas class=\"grow\"></canvas>\n</div>"

/***/ }),

/***/ "../../../../../src/app/surface-view/surface-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__segmentation_service__ = __webpack_require__("../../../../../src/app/segmentation.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurfaceViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SurfaceViewComponent = (function () {
    function SurfaceViewComponent(service) {
        this.service = service;
    }
    SurfaceViewComponent.prototype.ngOnInit = function () {
        this.service.prepare(this.surfaceView.nativeElement, this.canvas.nativeElement);
        this.service.init();
        this.service.start();
    };
    SurfaceViewComponent.prototype.ngOnDestroy = function () {
        this.service.destroy();
    };
    return SurfaceViewComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* ViewChild */])('surfaceView'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ElementRef */]) === "function" && _a || Object)
], SurfaceViewComponent.prototype, "surfaceView", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ElementRef */]) === "function" && _b || Object)
], SurfaceViewComponent.prototype, "canvas", void 0);
SurfaceViewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Component */])({
        selector: 'app-surface-view',
        template: __webpack_require__("../../../../../src/app/surface-view/surface-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/surface-view/surface-view.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__segmentation_service__["a" /* SegmentationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__segmentation_service__["a" /* SegmentationService */]) === "function" && _c || Object])
], SurfaceViewComponent);

var _a, _b, _c;
//# sourceMappingURL=surface-view.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map