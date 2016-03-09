$(document).on('ready', function(){
	console.log("ready");
	$("#changeInfo").on('click', function(){
		console.log("changing info");
		$("ul .list-group-item #insert").html('<input type="text" placeholder="New Info" class="form-control">');
	});
	$("#deleteInfo").on('click', function(){
		$("ul .list-group-item #insert").html('<label><input type="checkbox" value="">Delete</label>')

	});
});
