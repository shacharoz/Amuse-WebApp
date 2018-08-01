app.controller('programController', function ($scope, $http, $routeParams) {

  $scope.program = {};
  $scope.currentStepId = 0;
  $scope.currentStepData = {};
  $scope.currentThrapeuticValue = null;
  $scope.isPlaying = false;
  $scope.programId = $routeParams.id;
  $scope.patientId = $routeParams.patientId;
  $scope.therapistId = $routeParams.therapistId;


  $http.get(`program/${$routeParams.id}`)
    .then(function (response) {
      $scope.program = response.data;
      $scope.currentStepData = $scope.program.steps[$scope.currentStepId]
    });


  $scope.nextStep = () => {
    if ($scope.currentStepId < $scope.program.steps.length - 1) {
      $scope.currentThrapeuticValue = null;
      $scope.currentStepId++;
      $scope.currentStepData = $scope.program.steps[$scope.currentStepId];
    }
  };

  $scope.previousStep = () => {
    if ($scope.currentStepId > 0) {
      $scope.currentThrapeuticValue = null;

      $scope.currentStepId--;
      $scope.currentStepData = $scope.program.steps[$scope.currentStepId];
    }
  };

  $scope.setValues = (value) => {
    $scope.currentThrapeuticValue = value;
  };

  $scope.play = () => {
    $http.get(`program/activate?programId=${$routeParams.id}&patientId=${$scope.patientId}&therapistId=${$scope.therapistId}&stepId=${$scope.currentStepId}`)
      .then(function (response) {
        $scope.isPlaying=true;
        $scope.currentPlayingProgram = $scope.program;
      })
      .catch((err)=>{
        const a=1;
      });

  };

  $scope.stop = () => {
    $http.get(`program/deactivate?programId=${$routeParams.id}&patientId=${$scope.patientId}&therapistId=${$scope.therapistId}&stepId=${$scope.currentStepId}`)
      .then(function (response) {
        $scope.isPlaying=false;
        $scope.currentPlayingProgram = null;
      })
      .catch((err)=>{
        const a=1;
      });

  };
});
