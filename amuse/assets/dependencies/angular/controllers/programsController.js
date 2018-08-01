app.controller('programsController', function ($scope, $http,$routeParams) {

  $scope.programs = [];
  $scope.patientId= $routeParams.patientId;
  $scope.therapistId= $routeParams.therapistId;


  $http.get(`patient/${$scope.patientId}/programs`)
    .then(function(response) {
      response.data.forEach((program)=>{
        $http.get(`program/${program.id}/`)
          .then(function(response) {
            $scope.programs.push(response.data);
          });
      });
    });



});
