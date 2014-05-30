'use strict';

angular.module('threeViewer.services', [])

    // For this example this is consumed by the directive and
    // the model factory.
    .service('SceneService', function () {
        return {
            scene: new THREE.Scene()
        }
    })

    // Returns a single instance of a camera.  Consumed by directive and controls.
    .service('CameraService', function () {
        // default values for camera
        var viewAngle = 45;
        var aspectRatio = window.innerWidth / window.innerHeight;
        var near = 0.1
        var far = 15000;

        return {
            perspectiveCam: new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far)
        }
    })

    // This gets data from the $httpBackend set up in app.js.
    // One of the many cool things you can do with $httpBackend besides
    // unit testing.
    .service('ModelDataService', ['$http', function ($http) {
        this.getData = function () {
            return $http({
                method: 'GET',
                url: '/model/1',
            });
        }
    }])

    // Adds a new model to the viewer with the provided x, y offset from the UI.  This specific model
    // creates a tube that follows a collection of 3d points.
    .service('ModelFactory', ['SceneService', 'ModelDataService', function (SceneService, ModelDataService) {
        this.addModel = function (xOffset, yOffset) {

            ModelDataService.getData().then(function (dataResponse) {
                var splinePoints = [];
                var path = dataResponse.data;

                // creates the path with the provided json data
                for (var i = 0; i < path.points.length; i++) {
                    splinePoints.push(new THREE.Vector3(path.points[i].x + xOffset, path.points[i].y + yOffset, path.points[i].z));
                }

                var curve = new THREE.SplineCurve3(splinePoints);
                curve.dynamic = true;

                var segments = 300;
                var tubeRadius = 2;
                var radiusSegments = 6;
                var closedTube = false;
                var debug = false;

                // create a tube with a wireframe that follows thes provided spline path
                var tubeGeometry = new THREE.TubeGeometry(curve, segments, tubeRadius, radiusSegments, closedTube, debug);
                var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                var graphMesh = new THREE.Mesh(tubeGeometry, material);

                // add to the scene
                SceneService.scene.add(graphMesh);
            });
        }
    }]);

