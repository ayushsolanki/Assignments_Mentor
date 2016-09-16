$(document).ready(function() {
$(function(){
  $('#showPhoneNav').click(function() {
    $("#myNav").slideToggle(5000,function(){ //Shows Nav area
	   $("#myNav").animate({
          height:'200',
           opacity: '0.5'
       });
        if ($('#myNav').is(':visible')) {
		$('#showPhoneNav').text('Hide Navigation');
	} else {
		$('#showPhoneNav').text('Show Navigation');
	} //end of if
	}); //end of slidetoggle
  }); //end of myNav
}); //end showPhoneNav
}); //end of ready