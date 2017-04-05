
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.converter')
      .controller('converterCtrl', converterCtrl);

  /** @ngInject */
  function converterCtrl($scope,$http,$timeout) {
    
    var api_url = 'https://api.fixer.io/';  
    
    $scope.amount1 = 1;
    $scope.currency1 = 'AUD';
    $scope.currency2 = 'USD';


    $scope.calculate = function(am1,cu1,cu2){
         $http({
        url: api_url+'latest', 
        method: "GET",
        params:{base:cu1,symbols:cu2}
        })
        .then(function(response) {
            $scope.rate = Object.values(response.data.rates)[0];  
            $scope.amount2 = $scope.rate*am1;
            
        });
    }

   $scope.calculate($scope.amount1,$scope.currency1,$scope.currency2);


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