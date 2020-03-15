jQuery(function($){
	$.ajax({
		url: "/comments", 
		success: function(result){
			console.log(result);
			let monthName=[
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			];

			for(let i=0; i<result.length;i++){
				console.log(result[i]);
				let commentTime = new Date(result[i].time * 1000);
				console.log(commentTime);
				let formattedTime = monthName[commentTime.getMonth()-1]+' '+commentTime.getDate()+', '+commentTime.getFullYear()+'&nbsp;&nbsp;&nbsp;&nbsp;'+commentTime.getHours()+':'+commentTime.getMinutes();
				$('#comments').append('<div class="singleComment"><h4>'+result[i].name+'</h4><span>'+formattedTime+'</span><p>'+result[i].content+'</p></div>');
			}
		},
		error: function(xhr, status, error) {
	  		var err = eval("(" + xhr.responseText + ")");
	 		alert(err.Message);
 		}
	});
});
console.log('hello');
//ajax: asynchronous json and xml -> non-blocking
//json: javascript object notation
//xml: Extensible Markup Language
//html: hypertext markup language
//REST: representational state transfer
//			- representational: the server represents the data (of the database), specifically of an object, to the client
//			- state: no matter who asks, the server will always respond in the same way. It will represent the current state of the system (of the requested object)
//			- transfer: with a RESTful API, the client can change the state of an object and the system. He can instruct the server to TRANSFER from the current state to the next state
//			- methods: 	GET: 	get the state of an object
//			-			POST: 	edit an object
//			-			PUT: 	create a new object
//			-			DELETE: delete an object
//nbsp: non breaking space