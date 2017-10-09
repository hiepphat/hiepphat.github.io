$(function(){

	var loading = false;
	var load_flag = false;
	var loading_pathes = [];
	var draw_cnt = 9;
	var draw_comp_cnt = 0;

	if(location.hash){
		$(window).on('loadingAllComplete',function(){
			var positionTop = $('body.sp')[0] ? $(location.hash).offset().top - 100 : $(location.hash).offset().top;
			console.log($(location.hash).offset().top + '/' + positionTop);
			$('body,html').animate({ scrollTop: positionTop }, 700, 'swing');
		});
	}

	if($('body').hasClass('inner-page')){
		$('body').addClass('active');
		$('.l-global-navi').css({opacity: 1});
		return false;
	}

	$('#logo, #btn-gnav, #icon-mouse, #copy, #page-title, #contents-nav').addClass('hidden');
	$('#loading-parts').addClass('active');
	if($('body.loading')[0]){
		loading = true;
	}

	//preload
	image= new Image();
	if($('#kv-image').length){
        image.src = ($('#kv-image').css('background-image')).replace(/^(url.*)(http.*jpg?)(.*)$/g,'$2');
        $('#kv-image-clone').css('background-image', 'url(' + image.src + ')');
        $(image).load(function() {
            load_flag = true;
        });
	}

	//first scene -> draw logo
	if(loading){
		$('body,html').addClass('active');
		setTimeout(function(){
			draw_path($('#path-n'),{strokeWidth: 8, duration: 1000, complete: function(){ second_scene(); }});
			draw_path($('#path-p, #path-f1'),{strokeWidth: 8, duration: 1500, delay: 200 ,complete: function(){ second_scene(); }});
			$('#path-dot1').velocity({r:5}, { duration: 100, delay: 800 ,complete: function(){ second_scene(); }});
			$('#path-dot2').velocity({r:5}, { duration: 100, delay: 1200 ,complete: function(){ second_scene(); }});
			draw_path($('#path-f2'),{strokeWidth: 8, duration: 600, delay: 400 ,complete: function(){ second_scene(); }});
			draw_path($('#path-o1, #path-o2'),{strokeWidth: 8, duration: 1500 ,complete: function(){ second_scene(); }});
			draw_path($('#path-d, #path-s'),{strokeWidth: 8, duration: 1500, delay: 200 ,complete: function(){ second_scene(); }});
			draw_path($('#path-bt, #path-bb, #path-bl, #path-br'),{strokeWidth: 3, duration: 1200, delay: 500 ,complete: function(){ second_scene(); }});
			draw_path($('#path-sub1, #path-sub2, #path-sub3'),{strokeWidth: 25, duration: 700, delay: 900 ,complete: function(){ second_scene(); }});
		},800);
	}else{
		setTimeout(function(){
			if(load_flag){
				last_scene(loading);
			}else{
				$(window).load(function(){
					last_scene(loading);
				});
			}
		},500);
	}

	//second scene -> reverse draw logo
	function second_scene(){
		draw_comp_cnt++;
		if(draw_cnt == draw_comp_cnt){
			setTimeout(function(){
				if(load_flag){
					$('#loading-mask path, #path-dot1, #path-dot2').velocity('reverse',{duration: 700, complete: function(){last_scene(true)}});
				}else{
					$(window).load(function(){
						$('#loading-mask path, #path-dot1, #path-dot2').velocity('reverse',{duration: 700, complete: function(){last_scene(true)}});
					});
				}
			}, 1000);
		}
	};

});

//last scene -> fade in content module
function last_scene(loading){ // true -> top page : false -> sub page

	$('#kv-image-clone').velocity({scale: '120%'},0);

	$('#black-frame-parts').velocity({opacity: 0},{duration: 700, complete: function(){
		$('.frame-parts').trigger('active');
	}});

// KV animate ver2
	var $d1 = 220;
	$('.frame-parts').on('active',function(){
		if($(this).attr('id') == 'border-top'){
			$(this).velocity({width: '100%'},{duration: $d1, delay: $d1*2, easing: 'ease-out'});
		}else if($(this).attr('id') == 'border-bottom'){
			$(this).velocity({width: '100%'},{duration: $d1, delay: $d1*4, easing: 'ease-out', complete: function(){
				// $(this).fadeOut();
				$('#kv-image-clone').velocity({scale: '100%'},{duration: 500, easing: 'easeOutSine', complete: function(){
					$(document).trigger('loadingEnd');
					$('#border-bottom').css({'display':'none'});
				}});
			}});
		}else if($(this).attr('id') == 'border-left'){
			$(this).velocity({height: '100%'},{duration: $d1, delay: $d1*3,easing: 'ease-out', complete: function(){
				// $(this).fadeOut();
			}});
		}else if($(this).attr('id') == 'border-right'){
			$(this).velocity({height: '100%'},{duration: $d1, delay: $d1 , easing: 'ease-out', complete: function(){
				// $(this).fadeOut();
			}});
		}
	});



	// $('.frame-parts').on('active',function(){
	// 	if($(this).attr('id') == 'border-top'){
	// 		$(this).velocity({width: '100%'},{duration: 800, easing: 'ease-out'});
	// 	}else if($(this).attr('id') == 'border-bottom'){
	// 		$(this).velocity({width: '100%'},{duration: 800, delay: 100, easing: 'ease-out', complete: function(){
	// 			$(this).fadeOut();
	// 		}});
	// 	}else if($(this).attr('id') == 'border-left'){
	// 		$(this).velocity({height: '100%'},{duration: 800, easing: 'ease-out', complete: function(){
	// 			// $(this).fadeOut();
	// 		}});
	// 	}else if($(this).attr('id') == 'border-right'){
	// 		$(this).velocity({height: '100%'},{duration: 800, delay: 100 , easing: 'ease-out', complete: function(){
	// 			// $(this).fadeOut();
	// 		}});
	// 		$('#kv-image-clone').velocity({scale: '100%'},{duration: 1000, easing: 'easeOutSine', complete: function(){
	// 			$(document).trigger('loadingEnd');
	// 		}});
	// 	}
	// });

	$(document).on('loadingEnd',function(){
		$('body,html').removeClass('active').scrollTop(0);
		$('#loading-parts').removeClass('active').hide();
		$('#logo').velocity({opacity: 0, translateY: '-20px'}).velocity({opacity: 1, translateY: '0px'},{duration: 1000, delay: 100, complete: function(){ $(this).removeClass('hidden')}});
		$('#btn-gnav').velocity({opacity: 0, translateY: '-20px'}).velocity({opacity: 1, translateY: '0px'},{duration: 1000, delay: 100, complete: function(){ $(this).removeClass('hidden')}});
		$('#icon-mouse').velocity({opacity: 0, translateY: '20px'}).velocity({opacity: 1, translateY: '0px'},{duration: 1000, delay: 400, complete: function(){ $(this).removeClass('hidden')}});
		$('#border-top').fadeOut();
		$('#global-navi').stop().animate({ opacity: 1 });
		if(loading){
			$('#copy').removeClass('hidden');
			draw_path($('#copy .path1'),{strokeWidth: 11, duration: 2000 });
			draw_path($('#copy .path2'),{strokeWidth: 11, duration: 200, delay: 1800, complete: function(){ $(window).trigger('loadingAllComplete')}});
		}else{
			$('#page-title').velocity({opacity: 0, translateY: '20px'}).velocity({opacity: 1, translateY: '0px'},{duration: 800, delay: 0, complete: function(){ $(this).removeClass('hidden')}});

			$('#contents-nav').velocity({opacity:1},{duration: 10, delay: 500, complete: function(){$(this).removeClass('hidden');}});
			$('#contents-nav li').each(function($key,$val){
				$(this).velocity({opacity: 0, translateX: '10px'}).delay($key*50).velocity({opacity: 1, translateX: '0px'},{duration: 600, delay: 1200, complete: function(){ $(window).trigger('loadingAllComplete')}});
			});

		}
	});

};

// draw svg path
function draw_path($path, $options){
	var $settings = $.extend({
		strokeWidth : '1',
		stroke : '#fff',
		fill : 'none',
		duration: 3000,
		delay : 0,
		easing: 'swing',
		complete: undefined,
	}, $options);

	// pathの長さをcssにセット
	var len;
	var arr = [];
	$path.each(function($key, $val) {
		arr.push($val);
		len = arr[$key].getTotalLength() + 30 + 1 | 0; // +30は、Firefox対策。+1 | 0 は小数点切り上げ
		arr[$key].style.strokeDasharray  = len;
		arr[$key].style.strokeDashoffset = len;
	});

	// CSSの設定
	$path.css({
		stroke : $settings.stroke,
		fill : $settings.fill,
		strokeWidth : $settings.strokeWidth
	});

	// アニメーション描画
	$path.velocity(
		{ strokeDashoffset : 0 },
		{
			duration : $settings.duration ,
			easing: $settings.duration,
			delay: $settings.delay,
			complete: $settings.complete
		}
	);

	return false;
};