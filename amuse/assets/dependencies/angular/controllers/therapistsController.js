app.controller('therapistsController', function ($scope, $http) {

  $scope.therapists = [];


    $http.get("therapist")
      .then(function (response) {
        $scope.therapists = response.data;
      });

});
