
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.converter')
      .controller('converterCtrl', converterCtrl);

  /** @ngInject */
  function converterCtrl($scope,$http,$timeout) {
    
    var api_url = 'https://api.fixer.io/';  
    // console.log($stateParams);
    // $scope.request = $stateParams;
    
    // $scope.amount1 = 1;
    $scope.currency1 = 'AUD';
    $scope.currency2 = 'USD';

    $scope.convertAmount1 = function(am1,cu1,cu2){
        console.log('$scope.currency1',cu1)
        console.log('$scope.currency2',cu2)
        
        $http({
            url: api_url+'latest', 
            method: "GET",
            params:{base:cu1,symbols:cu2}
            })
            .then(function(response) {
                 $timeout(function() {
                var rate = Object.values(response.data.rates)[0];  
                console.log('rate',rate)               
                $scope.amount2 = rate*am1;
                console.log('amount2',$scope.amount2)
                 },0);
            });
    }

    $scope.convertAmount2 = function(am2){
        // console.log('am2',am2)
        
        $http({
            url: api_url+'latest', 
            method: "GET",
            params:{base:$scope.currency2,symbols:$scope.currency1}
            })
            .then(function(response) {
                 $timeout(function() {
                var rate = Object.values(response.data.rates)[0];    
                console.log('rate',rate)            
                $scope.amount1 = rate*am2;
                console.log('amount1',$scope.amount1)
                 },0);
            });
    }


  //Latest//////////////////////////////////////////////////////////////////////////////////////////////////////
   $http({
      url: api_url+'latest', 
      method: "GET",
      params:{base:'AUD',symbols:'USD'}
    })
    .then(function(response) {
        $scope.convertion = response.data;
        console.log('convertion',$scope.convertion)
    });

    //Historical rates///////////////////////////////////////////////////////////////////////////////////////////
   $scope.keys;
   $scope.rates;
   $http({
      url: api_url+'2000-01-03', 
      method: "GET"
    })
    .then(function(response) {
        $scope.historical = response.data;
        // console.log('historical',$scope.historical)
        $scope.keys = Object.keys(response.data.rates);
        // console.log('keys',$scope.keys)
        $scope.rates = Object.values(response.data.rates);
        // console.log('rates',$scope.rates)
        $scope.areaLineData = {
            labels: $scope.keys.slice(0,10),
            series: [
                $scope.rates.slice(0,10)
            ]
        };
        $scope.areaLineOptions = {
        fullWidth: true,
        height: "300px",
        low: 0,
        showArea: true
        };

        $timeout(function(){
        
        new Chartist.Line('#area-chart', $scope.areaLineData, $scope.areaLineOptions);
        
        });
    });


    

    
  }
})();