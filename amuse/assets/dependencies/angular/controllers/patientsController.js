app.controller('patientsController', function ($scope,$http, $routeParams) {

  $scope.patients = [];
  $scope.therapistId = $routeParams.therapistId;

  $http.get(`therapist/${$scope.therapistId }/patients`)
    .then(function(response) {
      response.data.forEach((patient)=>{
        $http.get(`patient/${patient.id}/`)
          .then(function(response) {
            $scope.patients.push(response.data);
          });
      });
    });

});
