var chartApp = angular.module("chartApp", []);

chartApp.controller('chartController', function($scope, chartService, $http) {
    $scope.run = function() {
       chartService.fetchJSON($scope,$http);
    }
});

chartApp.service('chartService', ['$http', function($scope,$http) {

    this.fetchJSON = function($scope,$http) {
        $http.get('http://localhost/angular-chart-app/data.json').then(function(response) {

            //dane w data.json zapisane sa jako obiekt w strukturze: "label1" : value, "label2" : value, 
            //kod umozliwia swobodne dodawanie nowych danych
            
            var dataArray = Object.values(response.data); //pobranie wszystkich labels
            var labelArray = Object.keys(response.data); //pobranie wartosci
            
            var dirData = {}; //obiekt na dane wysylane do dyrektywy {{data}}

            //mieszanie danych i dodawanie kolejnych elementow do ww. obiektu
            for (var i = 0, length = dataArray.length; i < length; i++) {
                var j = Math.floor(Math.random() * length);
                var curIndex = dataArray[i];
                dataArray[i] = dataArray[j];
                dataArray[j] = curIndex;
                dirData[i] = dataArray[i]; 
            }

            //zapisanie danych do dyrektywy ng-data={{data}}
            $scope.data = dirData;

            //pobranie danych z dyrektywy
            var chartData = [];
            Object.values($scope.data).forEach(function(el) {
                chartData.push(el);
            });

            //tworzenie wykresu na podstawie aktualnych danych
            var canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
            var chartObj = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:labelArray,
                    datasets: [{
                        label:"My First dataset",
                        backgroundColor:'#222',
                        borderColor:'#222',
                        fill:false,
                        data:chartData
                    }]
                }
            });
        });
    }
}]);



