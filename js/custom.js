$(window).load(function() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$('body').addClass('ios');
	} else {
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');

	/*Wow*/
	new WOW().init();
});
/* viewport width */
function viewport() {
	var e = window,
	a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {
		width: e[a + 'Width'],
		height: e[a + 'Height']
	}
};
/* viewport width */
$(function() {
	/* placeholder*/
	$('input, textarea').each(function() {
		var placeholder = $(this).attr('placeholder');
		$(this).focus(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', placeholder);
		});
	});
	/* placeholder*/

	$('.button-nav').click(function() {
		$(this).toggleClass('active'),
		$('.main-nav-list').slideToggle();
		return false;
	});

});



$(document).ready(function() {

	$(".js-box-form-input").keyup(function() {
		var value = $(this).val();

		if (value.length > 0) {
			$(this).parent().addClass('not-empty');
		} else {
			$(this).parent().removeClass('not-empty');
		}
	})
	.keyup();

	$(".js-mobile-menu").click(function() {
		$(this).toggleClass('mobile-menu_open');
		$('.menu').toggleClass('open-menu');
		$("body").toggleClass("body-overflow");
	});

	$('.js-box-form-input_phone').mask('+7 (000) 000 00 00');

	$(".js-box-form-input").focusout(function() {
		$(this).keyup(function() {
			$(this).parent().css('color', 'inherit');
		});

		if ($(this).val() <= 0) {
			//$(this).parent().css('color', 'red');
		} else {
			$(this).parent().css('color', 'inherit');
		}

	});


	$(".js-box-form-input").focus(function() {
		if ($('#message-error').length > 0 ) {
			$('.message-label').css('display', 'none');
		} else {
			$('.message-label').css('display', 'block');
		}
	});


	$(".js-box-form-input_phone").focusout(function() {
		if ($(this).val() === '+7 (___) ___ __ __') {
			$(this).parent().removeClass('not-empty');
			$(this).parent().css('color', 'red');
		}

		if ($(this).is(":invalid")) {
			$(this).parent().css('color', 'red');
		}

	})

	/* footer form validation*/
	$(".js-box-form").validate({
		messages: {
			name: "Имя - это поле обязательно для заполнения",
			phone: "Телефон - это поле обязательно для заполнения",
			message: "Сообщение - это поле обязательно для заполнения",
			theme: "Тема - это поле обязательно для заполнения",
			email: "Пожалуйста, введите правильный email адрес"
		},

		submitHandler: function(form) {
			var f = $('.js-box-form');
			var name = $('input[name=name]', f).val();
			var phone = $('input[name=phone]', f).val();
			var email = $('input[name=email]', f).val();
			var message = $('textarea[name=message]', f).val();
			var theme = $('input[name=theme]', f).val();

			var email = $('input[name=email]', f).val();  
			var query = 'act=sender';
			query += '&name=' + encodeURIComponent(name),
			query += '&email=' + encodeURIComponent(email),
			query += '&phone=' + encodeURIComponent(phone),
			query += '&theme=' + encodeURIComponent(theme),
			query += '&message=' + encodeURIComponent(message);

			$.ajax({
				type: "POST",
				data: query,
				url: "./sender.php",
				dataType: "json",
				success : function(result) {
					$('input[type=email], input[type=text]', f).val('');
					$('textarea[name=message]').empty();
					f.find('.js-form').hide();
					$('.js-success').show();
					setTimeout(function(){
						f.find('.js-form').show();
						$('.js-success').hide();
					},6000);
				},
				error: function(xhr, resp, text) {
					alert('Ошибка! Повторите позже.');
				}
			});
		}
	});



	$(".js-anchor").on("click",function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 500);
		return false;
	});


});



var handler = function() {

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	if (viewport_wid <= 991) {

	}

}
$(window).bind('load', handler);
$(window).bind('resize', handler);