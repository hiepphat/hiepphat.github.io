jQuery(function(){

	var removeIOSRubberEffect = function(el) {
		el.addEventListener('touchstart', function() {
			var top = el.scrollTop
				, totalScroll = el.scrollHeight
				, currentScroll = top + el.offsetHeight
	
			//If we're at the top or the bottom of the containers
			//scroll, push up or down one pixel.
			//
			//this prevents the scroll from "passing through" to
			//the body.
			if(top === 0) {
				el.scrollTop = 1
			} else if(currentScroll === totalScroll) {
				el.scrollTop = top - 1
			}
		})
	
		el.addEventListener('touchmove', function(evt) {
			//if the content is actually scrollable, i.e. the content is long enough
			//that scrolling can occur
			if(el.offsetHeight < el.scrollHeight) evt._isScroller = true;
			// else 
				else evt._isScroller = false;
		})
		//
		document.body.addEventListener('touchmove', function(evt) {
			//In this case, the default behavior is scrolling the body, which
			//would result in an overflow.  Since we don't want that, we preventDefault.
			if(evt._isScroller === false) {
				evt.preventDefault()
			}
		})
	}

	// ==================================================
	// スムーススクロール
	// ==================================================
	jQuery('a.smooth[href^="#"]').on('click', function(){
			if($('.js-hamburger').hasClass('clicked')){
				$('.js-hamburger').trigger('click');
			}
			var $_this = jQuery(this);
			var $speed = 500;
			var $href= jQuery(this).attr("href");
			var $target = jQuery($href == "#" || $href == "" ? 'html' : $href);
			var position = $target.offset().top;
			jQuery("html, body").animate({scrollTop:position}, $speed, "swing");
			return false;
	});
	// ==================================================
	// back to top
	// ==================================================
	jQuery('.js-to-top').on('click', function(e){
		e.preventDefault();
		jQuery("html, body").animate({scrollTop: 0}, 1000, "swing");
	});
	// ==================================================
	// Navigation
	// ==================================================
	$(window).on('scroll', function() {
		if ($(this).scrollTop() == 0 && window.outerWidth > 767) {
			$('#global-navi .l-navigation').fadeIn();
		} else {
			$('#global-navi .l-navigation').fadeOut();
		}

		if (jQuery(this).scrollTop() > 250) {
			jQuery('.js-to-top').addClass('l-to-top-fix').fadeIn('slow');
			jQuery('.wrap-btn-nav-inner').addClass('scrolled');
		} else {
			jQuery('.js-to-top').removeClass('l-to-top-fix').fadeOut('slow');
            jQuery('.wrap-btn-nav-inner').removeClass('scrolled');
		}
		var pos = jQuery(this).scrollTop() + window.innerHeight - jQuery('.l-footer-to-top').height() / 2;
		var docHeight = jQuery(document).height();
		var offset = docHeight - 26.5;
		if (window.outerWidth < 768) offset = docHeight - 23;
		if (pos > offset) {
			jQuery('.js-to-top').removeClass('l-to-top-fix');
		} else {
			jQuery('.js-to-top').addClass('l-to-top-fix');
		}
	});


	// $('a.smooth').on('click', function(){
	// 	$('.js-hamburger').trigger('click');
	// 	var $_this = jQuery(this);
	// 	var $speed = 500;
	// 	var $href= jQuery(this).attr("href");
	// 	$href = $href[1];
	// 	var $target = jQuery($href == "#" || $href == "" ? 'html' : $href);
	// 	var position = $target.offset().top;
	// 	if($(window).width() > 992){
	// 		position = position - 103;
	// 	}
	// 	jQuery("html, body").animate({scrollTop:position}, $speed, "swing");
	// 	return false;
	// });


	$('.js-hamburger').on('click', function() {
		$(this).toggleClass("clicked");
		$(".l-site-header").toggleClass('on');
		if ($(this).hasClass('clicked')) {
			$('#navbar').fadeIn();
			$('body').css('overflow', 'hidden');
			$('.l-navigation-list .l-navigation-item').each(function() {
				var wEl = $(this).innerWidth();
				var wText = $(this).find('.link-text').outerWidth();
				var wArrow = wEl - wText - 20;
				$(this).find('.icon-arrow').width(wArrow);
			});
			removeIOSRubberEffect(document.querySelector('.l-site-header #navbar'));
		} else {
			$('#navbar').fadeOut();
			$('body').css('overflow', '');
		}
	});

	//KV
	$(window).on('resize', function() {
		// var marginNum = '39px';
		if (window.outerWidth < 992) {
			// marginNum = '26px';
			$('#global-navi .l-navigation').fadeOut();
		} else {
			$('#global-navi .l-navigation').css('display', 'inline-block');
		}
		// $('#kv').css('margin-top', marginNum);
		setTimeout(function(){
			$('.l-navigation-list .l-navigation-item').each(function() {
				var wEl = $(this).innerWidth();
				var wText = $(this).find('.link-text').outerWidth();
				var wArrow = wEl - wText - 20;
				$(this).find('.icon-arrow').width(wArrow);
			});
		}, 500);
	});

	var $kv_slider_opt = {
		arrows: false,
		pager : false,
		controls: true,
		infiniteLoop: true,
		auto: true,
		autoStart: true,
		// nextSelector: '.kv-arrow-next',
		// prevSelector: '.kv-arrow-prev',
		nextText: '',
		prevText: '',
		autoControls: true,
		moveSlides: 1,
		pause: 5000,
		speed: 1500,
		//useCss: false,
		touchEnabled: false,
		oneToOneTouch: false,
		preventDefaultSwipeY: false
	};
	if($('#kv_slider')[0]){
		var $kv_slider = $('#kv_slider').bxSlider($kv_slider_opt);
		$(document).on('loadingEnd', function(){
			$('.l-kv').addClass('active');
		});
	}

	$('.inview').each(function(){
		$(this).on('inview', function() {
			$(this).stop().velocity({opacity: 1, top: 0}, 1000);
		});
	});

	// display more
	$(".js-button-mission-more").on('click', function(e){
		var option = $(this).data('option');
		$(option).removeClass('d-n');
		$(this.parentElement).addClass('d-n');
		return false;
	});
	$(".js-button-contact").on('click', function(e){
		$(".l-footer-company").addClass('l-company-highlight');
		$(this.parentElement).addClass('d-n');
		$("html, body").animate({ scrollTop: $(document).height() }, 1000, "swing");
		return false;
	});
});	//document ready

function initMap() {
    var uluru = {lat: 35.671246,  lng: 139.718638};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru,
        styles: [
            {
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "stylers": [
                    {
                        "color": "#131314"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#131313"
                    },
                    {
                        "lightness": 7
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 25
                    }
                ]
            }
        ]
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: '/common/images/pages/company/map-marker.png'
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(uluru);
	});
}
