'use strict';

var threeViewer = angular.module("threeViewer", [
  'threeViewer.services',
  'threeViewer.directives',
  'threeViewer.controllers',
  'ngMockE2E'
]);

// mocking a rest service.  This json when
// be called when there is a get on /model/1
angular.module('threeViewer').run(function ($httpBackend) {
    $httpBackend.whenGET('/model/1').respond(
        {
            "points":
            [
                {
                    x: 0, y: 0, z: 0
                },
                {
                    x: 2, y: 5, z: 10
                },
                {
                    x: 4, y: 10, z: 20
                },
                {
                    x: 2, y: 15, z: 30
                },
                {
                    x: 4, y: 10, z: 40
                },
                {
                    x: 2, y: 5, z: 50
                },
                {
                    x: 4, y: 0, z: 40
                },
                {
                    x: 2, y: -5, z: 30
                },
                {
                    x: 0, y: -10, z: 20
                },
                {
                    x: -2, y: -5, z: 10
                }
            ]
        }
);
});

