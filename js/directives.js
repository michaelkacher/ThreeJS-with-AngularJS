'use strict';

angular.module('threeViewer.directives', ['threeViewer.services'])
    // Creates the directive (reusable chunk of html and javascript) for three.js.
    // Note that right now the SceneService and CameraService are injected into the directive.  These
    // services are used to manipulate the scene else where.
    // Currently the Renderer and controls are part of the directive but could just as easily be 
    // moved into their own services if functionality they provide need to be manipulated by a UI control.
  .directive('threeViewport', ['SceneService', 'CameraService', function (SceneService, CameraService) {
      return {
          restrict: "AE",

          link: function (scope, element, attribute) {
              var renderer;
              var controls;

              init();
              animate();

              function init() {
                  // Add the camera
                  CameraService.perspectiveCam.position.set(0, 0, 200);
                  SceneService.scene.add(CameraService.perspectiveCam);

                  // create the renderer
                  renderer = new THREE.WebGLRenderer({ antialias: true });
                  renderer.setSize(window.innerWidth, window.innerHeight);

                  // set up the controls with the camera and renderer
                  controls = new THREE.OrbitControls(CameraService.perspectiveCam, renderer.domElement);

                  // add renderer to DOM
                  element[0].appendChild(renderer.domElement);

                  // handles resizing the renderer when the window is resized
                  window.addEventListener('resize', onWindowResize, false);
              }

              function animate() {
                  requestAnimationFrame(animate);
                  renderer.render(SceneService.scene, CameraService.perspectiveCam);
                  controls.update();
              }

              function onWindowResize(event) {
                  renderer.setSize(window.innerWidth, window.innerHeight);
                  CameraService.perspectiveCam.aspect = window.innerWidth / window.innerHeight;
                  CameraService.perspectiveCam.updateProjectionMatrix();
              }
          }
      }
  }
  ]);