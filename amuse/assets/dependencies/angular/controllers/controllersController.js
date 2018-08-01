app.controller('controllersController', function($scope, $http) {
   $http.get('ableton')
     .then(response=>{
          $scope.summary = response.data;

          for (let i=0;i < $scope.summary.tracks.length; i++) {
            $scope.$watch(`summary.tracks[${i}].volume`,(curr,prev)=>{
              if(!_.isUndefined(curr)){
                $http.get(`ableton/volume_track?volume=${curr}&track=${i}`);
              }

            });

          }

       });

   $scope.$watch("summary.master.volume",(curr,prev)=>{
     if(!_.isUndefined(curr)){
       $http.get(`ableton/volume?volume=${curr}`)
     }

   });



  $scope.play = ()=>{
     $http.get('ableton/play')
   };
  $scope.stop = ()=>{
    $http.get('ableton/stop')
  };
  $scope.pause = ()=>{
    $http.get('ableton/pause')
  };
});
