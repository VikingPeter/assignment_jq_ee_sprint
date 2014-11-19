$(function() {


	/* VARIABLES */

	var $form = $('.fields');
	var $input = $('.input');
	var $tField = $('#one-line');
	var $tArea = $('#text-block');
	var $pwd = $('#password');
	var $conf = $('#confirmation');

	/* PNDPO'S MAD CODE FLOWS, YO  */

	function twitter( field ) {

		$(field).keyup( function(){
				var chars = $( this ).data( 'max' )
			// Find a better way
			if ( $( this ).val() == 0) {
				$( this ).next().text((""));
			} else {

				$( this ).next().text(( " " + chars - $( this ).val().length) + " characters remaining");

				if ( $(this).val().length > chars) {
        	$( this ).val( $( this ).val().substr(0, chars));
				}
			}

		});
	}

	function validateAllFields( fields ) {
		$.each(fields, function ( index, field) {
			if (validateLength( $(field) )) {
				return true;
			}
		});
		return false;
	}

	function validateAllFields( fields ) {
			var arr = [];
			$.each(fields, function ( index, field ) {
			  arr.unshift(validateLength( $(field) ));
			});

			if ($.inArray( false, arr) > -1) {
				return false;
			} else {
				return true;
			}
		}

	function validateLength( field ) {
		// using these in one line caused problems
		if ( (4 <= field.val().length) && (field.val().length <= field.data('max')) ) {
			return true;
		} else {
			return false;
		}

	}

	// refactor to 'activeValidate' which runs all the callbacks on keyup
	function validatePassword ( pass, conf ) {

		// Text field -- 4-32 characters
		// Text area -- 4-140 characters
		// Password/confirmation -- 6-16 characters
		// Password -- must match confirmation
		conf.keyup( function(){

			if ( ( pass.val() === conf.val() ) && ( 6 <= pass.val().length <= pass.data('max') ) ) {
				conf.next().removeClass('sad')
				conf.next().text(" ")
				return true;
			} else {
				conf.next().addClass('sad')
				conf.next().text(" password doesn't match");
				return false;
			}
		});
	}


	function validate(fields) {
		$( fields ).submit(function( event ) {
		  if ( validateAllFields( $input ) ) {
		    $( "span" ).text( "Validated..." ).show();
		    return;
		  }
		  $( "span" ).text( "Not valid!" ).show();
		  event.preventDefault();
		});
	}

	twitter($input);
	validatePassword($pwd,$conf);
	validate($form);

});