/// http://seiyria.com/bootstrap-slider/


//set tooltip
$('#bootstrap_volume_slider').slider({ 
    
    formatter: function(value) {
		return 'volume: ' + value;
	}
});


$('#bootstrap_volume_slider').slider({  
    tooltip: 'always'
});


//volume change event
var SoundValueChange = function(){
    console.log("volume: "+ volume_change.getValue()); // 0 to 10
}

var volume_change = $('#bootstrap_volume_slider').slider()
		.on('slide', SoundValueChange)
		.data('slider');


//verticals

$('#bootstrap_volume_slider1').slider({ 
    
    formatter: function(value) {
		return 'volume: ' + value;
	}
});

/*
$('#bootstrap_volume_slider2').slider({ 
    
    formatter: function(value) {
		return 'volume: ' + value;
	}
});

$('#bootstrap_volume_slider3').slider({ 
    
    formatter: function(value) {
		return 'volume: ' + value;
	}
});
*/