// JavaScript Document
$(function() {

    //首页banner
    var qiehuan = $(".banner ul li");
    var bottn = $(".banner dd");
    var speed = 5000;
    var nowindex = 0;
    var length = qiehuan.length;
    var tme = null;
    qiehuan.eq(nowindex).fadeIn('slow').siblings().fadeOut('slow');

    function lunbo() {
        nowindex++;
        if (nowindex < 0) {
            nowindex = length - 1;
        }
        else if (nowindex > length - 1) {
            nowindex = 0;
        }
        qiehuan.eq(nowindex).fadeIn('slow').siblings().fadeOut('slow');
        bottn.eq(nowindex).addClass('current').siblings().removeClass('current');
    }
    bottn.click(function() {
        clearInterval(tme);
        $(this).addClass('current').siblings().removeClass('current');
        nowindex = bottn.index(this);
        qiehuan.eq(nowindex).fadeIn('slow').siblings().fadeOut('slow');
        tme = setInterval(lunbo, speed)
    })
    tme = setInterval(lunbo, speed);


    //内页banner

    var lis = $(".ban ul li");
    var legs = $(".ban ul li").length;
    var myNum = 0;
    var myTimer = null;
    lis.eq(myNum).fadeIn('slow').siblings().fadeOut('slow');
    function ban() {
        myNum++;
        if (myNum < 0) {
            myNum = legs - 1;
        }
        else if (myNum > legs - 1) {
            myNum = 0;
        }
        lis.eq(myNum).fadeIn(800).siblings().fadeOut(800);
    }
    myTimer = setInterval(ban, 4000);


    //我们的供应商
    gttscr($('.imglist'), $('.jcarousel-prev'), $('.jcarousel-next'));

    function gttscr(ul, prev, next) {
        if (ul.children().length <= 6) {
            return false;
        }
        var blen = true;
        var timer = setInterval(nextf, 3000);

        ul.hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(nextf, 3000);
            nextf();
        })
        prev.click(function() {
            if (!blen) {
                return false;
            }
            blen = false;
            clearInterval(timer);
            ul.children().last().prependTo(ul);
            ul.css('marginLeft', -129);
            ul.animate({ marginLeft: 0 }, 400, function() {
                blen = true;
            });
            timer = setInterval(nextf, 3000);
        });

        next.click(function() {
            if (!blen) {
                return false;
            }
            blen = false;
            clearInterval(timer);
            nextf();
            timer = setInterval(nextf, 3000);
        })

        function nextf() {
            ul.animate({ marginLeft: -129 }, 400, function() {
                ul.children().first().appendTo(ul);
                ul.css('marginLeft', 0);
                blen = true;
            })
        }
    }





    $('.xiaz li p').click(function() {
        $(this).parent().toggleClass('current').siblings().removeClass('current');
        $(this).next('.xiazai').slideToggle().parent().siblings().find('.xiazai').slideUp();
    })

    $('.xiaz li').each(function() {
        $(this).find('.xiazai dl dd:last').css('border', 'none')
    })

    var _body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //operaFix


    //导航
    $('.nav ul li .down_nav').each(function() {
        $(this).find('dl dd:odd').css({ 'border': 'none', 'margin-right': '0px' })
    })

    $('.nav li').hover(function() {
        var left = $(this).position().left;
        $('.dq_nav').stop(true, true).animate({
            'left': left - 19
        }, 400);
        if ($(this).find('.down_nav').length > 0) {
            $(this).addClass('hover');
        }
        $(this).find('.down_nav').stop(true, true).slideDown(300);
    }, function() {
        $(this).removeClass('hover');
        $(this).find('.down_nav').stop(true, true).slideUp(200);
    });
    $('.nav').mouseleave(function() {
        var left2 = $('.nav li.current').position().left;
        $('.dq_nav').stop(true, true).animate({
            'left': left2 - 19
        }, 400);
    })
    $('.nav li.current').each(function() {
        var left = $(this).position().left;
        $('.dq_nav').css('left', left - 19)
    })

    $('.pro li').hover(function() {
        $(this).addClass('current');
        $(this).find('.pro_txt dl').fadeIn(100);
    }, function() {
        $(this).removeClass('current');
        $(this).find('.pro_txt dl').fadeOut(100);
    })
    $('.left_nav dl dd.current .erji.current span em').text('-')


    $('.liuyan div.ly_p').click(function() {
        $('.liuyan_box').slideToggle();
    })


    //人才招聘
    $('.car_table tr:even').addClass('odd')
    $('.car_table tr:first').removeClass('odd')



    $("input:text,textarea").focus(function() {

        if ($(this).val() == this.defaultValue) {

            $(this).val("");

        }

    }).blur(function() {

        if ($(this).val() == "") {

            $(this).val(this.defaultValue);

        }

    });
    //表单失焦

    //带缩略图的图片轮换效果如下
    $('.xtu ul').css('width', $('.xtu ul li').length * $('.xtu li').outerWidth(true));
    var num = 6;
    var index = 0;
    var num2 = Math.ceil(num / 2);
    //$('.datu ul').css('width',$('.kh_ban .datu li').length*$('.kh_ban .datu li').width())
    function change() {
         
        if (index < num2) {
            $('.xtu ul').stop(true, true).animate({ 'left': '0' }, 500)
        } else if (index + num2 < $('.xtu ul li').length) {
            $('.xtu ul').stop(true, true).animate({ 'left': -(index - num2 + 1) * $('.xtu li').outerWidth(true) }, 500)
        } else {
            $('.xtu ul').stop(true, true).animate({ 'left': -($('.xtu ul li').length - num) * $('.xtu li').outerWidth(true) }, 500)
        }
        var h = $('.xtu li').eq(index).index();
        for (var i = 0; i < $('.xtu li').length; i++) {
            $('.xtu li').eq(h).addClass('current').siblings().removeClass('current')
        }
        for (var j = 0; j < $('.datu li').length; j++) {
            //$('.datu ul').stop(true,false).animate({'left':-h*$('.kh_ban .datu li').width()},500)
            $('.datu li').eq(h).fadeIn(100).siblings().fadeOut(100);
        }
    }
    $('.you').click(function() {
        index++;
        if (index == $('.xtu li').length) {
            index = 0
        }
        change();
    });
    $('.zuo').click(function() {
        index--;
        if (index == -1) {
            index = $('.xtu li').length - 1
        }
        change();
    });
    $('.xtu li').click(function() {
        var index2 = $(this).index();
        index = index2;
        change();
    });
    //   $('.xtu li:first').trigger('click');
    $(".datu li:first").show();
    $('.xtu li.djclass').trigger('click')
})


$(document).ready(function() {

/****/		
		
		
		
	     $(".index_left_menu li").mouseenter(function(){
	     $(this).find("div.left_down").stop(true,true).slideDown().parent("li").siblings("li").find("div.left_down").slideUp();
			})

	     $(".left_menu li").mouseenter(function(){
	     $(this).find("div.left_down").stop(true,true).slideDown().parent("li").siblings("li").find("div.left_down").slideUp();
			})
			
			
			
	   
	  
})
