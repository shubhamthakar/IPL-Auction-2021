/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */

var keys = {
	bind : function() {
		$(document).on('keydown', function(event) {	
			return keys.handler(event, true);
		});
		$(document).on('keyup', function(event) {	
			return keys.handler(event, false);
		});
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
	},
	handler : function(event, status) {
		switch(event.keyCode) {
			case 57392://CTRL on MAC
			case 17://CTRL
			case 16://Shift
				keys.accelerate = status;
				break;
			case 40://DOWN ARROW
				keys.down = status;
				break;
			case 39://RIGHT ARROW
				keys.right = status;
				break;
			case 37://LEFT ARROW
				keys.left = status;			
				break;
			case 38://UP ARROW
				keys.up = status;
				break;
			case 83://S
				keys.down = status;
				break;
			case 68://D
				keys.right = status;
				break;
			case 65://A
				keys.left = status;			
				break;
			case 87://W
				keys.up = status;
				break;
			default:
				return true;
		}
			
		event.preventDefault();
		return false;
	},
	accelerate : false,
	left : false,
	up : false,
	right : false,
	down : false,
};