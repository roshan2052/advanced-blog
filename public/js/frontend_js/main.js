/*price range*/ 
$ = jQuery.noConflict();

 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/ 
$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});

$(document).ready(function () {
    $("#selSize").change(function () {
        var idSize = $(this).val();
        /*if(idSize = ""){
        	return false;
        } */
        $.ajax({
            type:'get',
            url:'/get-product-price',
            data:{idSize:idSize},
            success:function(resp) {
            	//alert(resp); return false;
            	var arr = resp.split('#');
                $("#getPrice").html("Rs. "+ arr[0]);
                $('#price').val(arr[0]);
                //Send the updated price based on size of the product
                if (arr[1] == 0){
                    $("#cartButton").hide();
                    $("#availability").text(" Out of Stock");
                }else {
                    $("#cartButton").show();
                    $("#availability").text(" In Stock");
                }
            },error:function () {
            	alert("error");
            }
        });
    });
}); 

// Replace Main Image with aleternate Image
$(document).ready(function(){
	//alert("hello");
    $(".changeImage").click(function () {
        var image = $(this).attr('src');
        $(".mainImage").attr("src", image);
    });// Instantiate EasyZoom instances
		var $easyzoom = $('.easyzoom').easyZoom();

		// Setup thumbnails example
		var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');

		$('.thumbnails').on('click', 'a', function(e) {
			var $this = $(this);

			e.preventDefault();

			// Use EasyZoom's `swap` method
			api1.swap($this.data('standard'), $this.attr('href'));
		});

		// Setup toggles example
		var api2 = $easyzoom.filter('.easyzoom--with-toggle').data('easyZoom');

		$('.toggle').on('click', function() {
			var $this = $(this);

			if ($this.data("active") === true) {
				$this.text("Switch on").data("active", false);
				api2.teardown();
			} else {
				$this.text("Switch off").data("active", true);
				api2._init();
			}
		});
});


// Validation for registration form

$().ready(function () {
    // validate register on keyup and submit
    $("#registerForm").validate({
         rules: {
             name: {
                required: true,
                minLength: 2,
             },
             password: {
                 required: true,
                 minLength: 6
             },
             email:{
                 required: true,
                 email: true,
                 remote: "/check-email"

             },
             messages:{
                 name: "Please Enter Your Name",
                 password: {
                     required: "Please Provide Your Password",
                     minLength: "Password must be more than 6 characters",
                 },
                 email:{
                     required: "Please Enter Email",
                     email: "Please Enter a valid email address",
                     remote: "<span class='text-danger'> Already Exits </span>"
                 }
             }
         }
    });

    $("#accountForm").validate({
         rules: {
             name: {
                required: true,
                minLength: 2,
             },
             address: {
                 required: true,
                 minLength: 6
             },
             city:{
                 required: true,
                 minLength: 6

             },
             messages:{
                 name: "Please Enter Your Name",
                 address: {
                     required: "Please Provide Your address",
                     minLength: "Address must be more than 6 characters",
                 },
                 city:{
                    required: "Please Enter city",
                    minLength: "city must be more than 6 characters",
                 }
             }
         }
    });

    $("#loginForm").validate({
        rules: {
            password: {
                required: true,
            },
            email:{
                required: true,
                email: true,

            },
            messages:{
                password: {
                    required: "Please Provide Your Password",
                },
                email:{
                    required: "Please Enter Email",
                    email: "Please Enter a valid email address",
                }
            }
        }
    });

    $("#passwordForm").validate({
        rules:{
            current_pwd:{
                required: true,
                minlength:8,
                maxlength:20
            },
            new_pwd:{
                required: true,
                minlength:8,
                maxlength:20
            },
            confirm_pwd:{
                required:true,
                minlength:8,
                maxlength:20,
                equalTo:"#new_pwd"
            }
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        }
    });

    $('#myPassword').passtrength({
        minChars: 4,
        passwordToggle: true,
        tooltip: true,
        eyeImg : "http://localhost:8888/meroshop/public/images/frontend_images/eye.svg",
    });

    //checking user password
    $("#current_pwd").keyup(function(){
        var current_pwd = $(this).val();
         //alert(current_pwd); 
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
           type: 'post',
           url: 'check-user-pwd',
           data: {current_pwd:current_pwd},
           success: function(resp){
              //alert(resp);
              
               if(resp=="False"){
                   $("#chkPwd").html("<font color='red'> Current Password Does Not Match </font>");
               } else if(resp == "true"){
                   $("#chkPwd").html("<font color='green'> Current Password  Matched </font>");

               } 
           } , error: function(){
               alert("Error")
            }
        }); 
    }); 


    // Shipping Address same as Billing Address
    $("#copyAddress").click(function(){
     // alert("test");
    if(this.checked){
        $("#shipping_name").val($("#billing_name").val());
        $("#shipping_address").val($("#billing_address").val());
        $("#shipping_city").val($("#billing_city").val());
        $("#shipping_state").val($("#billing_state").val());
        $("#shipping_pincode").val($("#billing_pincode").val());
        $("#shipping_mobile").val($("#billing_mobile").val());
        $("#shipping_country").val($("#billing_country").val());
    }else{
        $("#shipping_name").val('');
        $("#shipping_address").val(null);
        $("#shipping_city").val(null);
        $("#shipping_state").val(null);
        $("#shipping_pincode").val(null);
        $("#shipping_mobile").val(null);
        $("#shipping_country").val(null);
    }

 });
});


$(".error").fadeTo(2000, 500).slideUp(1000, function(){
    $(".error").slideUp(500);
});


function selectPaymentMethod(){
   if($('#paypal').is(':checked') || $('#COD').is(':checked')){

   }else{
    alert("please select payment method");
    return false;
    }
   
}



