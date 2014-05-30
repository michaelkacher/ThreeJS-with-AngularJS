'use strict';
angular.module('threeViewer.controllers', ['threeViewer.services'])

  // Control that manages changes to the 3d scene
.controller('SceneControl', ['$scope', 'ModelFactory', 'CameraService',
    function ($scope, ModelFactory, CameraService) {
        $scope.data = {};
        $scope.data.xOffset = 0;
        $scope.data.yOffset = 0;

        // adds new models at the provided offset
        $scope.addModel = function () {
            ModelFactory.addModel($scope.data.xOffset, $scope.data.yOffset);
        }

        // brings camera out
        $scope.increaseCameraZ = function () {
            CameraService.perspectiveCam.position.z += 50;
        }

        //brings camera in
        $scope.decreaseCameraZ = function () {
            CameraService.perspectiveCam.position.z -= 50;
        }
    }]);
