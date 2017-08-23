var app = angular.module('myApp', ['ngRoute']);

app.controller('MainController', function($scope, $http) {

    $scope.messages = [];
    $scope.sayHelloToServer = function() {
        $http.get("/api?_=" + Date.now()).then(function(response) {
            $scope.messages.push(response.data);

            // Make request to /metrics and the rest          
            $http.get("/metrics?_=" + Date.now()).then(function(response) {
                $scope.metrics = response.data;
            });
        });
    };
    
    $scope.sayHelloToServer();
    
    var styles = [];
    var colors = ["black", "green", "red", "blue", "white", "yellow", "gray", "brown", "magenta"];
    var colorIndex = 0;
    
    $scope.getStyle = function(message) {
        if (!styles[message]) {
            styles[message] = {'color': colors[colorIndex]};
            colorIndex = colorIndex < colors.length - 1 ? colorIndex + 1 : 0;
        }
        return styles[message];
    }

});
