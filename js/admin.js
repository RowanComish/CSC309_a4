
const VIEW_STATE = 'view';
const CHANGE_STATE = 'change';
const DELETE_STATE = 'delete';
const ADD_STATE = 'add';

var state = VIEW_STATE;

$(document).on('ready', function(){
	console.log("ready");
	$("#changeInfo").on('click', function(){
		
		$(".insert-hidden").show();
        $(".insert").show();
        
        $(".insert-group").show();
        $(".user-title").show();
        
        $(".delete-group").hide();
        
		$("ul .list-group-item .insert").html('<input type="text" placeholder="New Info" class="form-control">');
		
		state = CHANGE_STATE;
		
        $('#info-title').text('Change User Information:');
                getUser();

	});
    $("#deleteItem").on('click', function(){
        $(".insert-hidden").hide();
        $(".insert").hide();
        $(".insert-group").hide();
        
        $(".delete-group").show();
        $(".user-title").show();
        
        state = DELETE_STATE;
        
        $('#info-title').text('Delete User:');
        getUser();

	});
    $("#addItem").on('click', function(){
        $(".insert-hidden").show();
        $(".insert").show();
        $(".insert-group").show();
        
        $(".delete-group").hide();
        $(".user-title").hide();
        
		$("ul .list-group-item .insert").html('<input type="text" placeholder="New Info" class="form-control">');
		
		state = ADD_STATE;
		
        $('#info-title').text('New User:');
        
        clearFields();
	});
});
