jQuery(function($){
	$('.findOutMoreButton').on('click', function() {
		let contentContainerId = $(this).attr('data-contentContainer'); 	// <-- example: contentContainerId = '#musicContent'
		let thatContent = $(contentContainerId).html();						// <-- example: thatContent = '<h3>Music</h3><ul><li>USC College...'
		$('#popUp #popUpContent').html(thatContent);                        //remove and replace content
		$('#popUp').addClass('active');
	});
	$('#popUp').on('click', function(event) {
		if (event.target.id == 'popUp' || event.target.id == 'closeWindow') {
			$('#popUp').removeClass('active');
		}
	});
});

//$(): find html tag(s)