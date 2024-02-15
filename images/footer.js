
/* goto top */

$(function(){
    $("#gotop").click(function(){
        jQuery("html,body").animate({
            scrollTop:0
        },500);
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 300){
            $('#gotop').fadeIn("fast");
        } else {
            $('#gotop').stop().fadeOut("fast");
        }
    });
});

/* Plugin nav bar hover slidedown */
/* 20170426, if mobile, disable hover */

$(document).ready(function() {    
	if (!isMobile.any){

  $('.navbar-default .navbar-nav > li.dropdown').hover(function() {
$('ul.dropdown-menu', this).stop(true, true).slideDown('fast');
$(this).addClass('open');
      }, function() {
$('ul.dropdown-menu', this).stop(true, true).slideUp('fast');
$(this).removeClass('open');
      });

	}
   });


/* prod img */
/* no use */

/*
$(document).ready(function(){

		$(".prod_img_zoom").imagezoom();
		
		$("#thumblist li a").click(function(){
			$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
			$(".prod_img_zoom").attr('src',$(this).find("img").attr("mid"));
			$(".prod_img_zoom").attr('rel',$(this).find("img").attr("big"));
		});

    //$('[data-toggle=tooltip]').tooltip();

});
*/

/* shopping cart */

	/* Plugin ajaxForm */
 
        $(document).ready(function() { 
			// ShopCartForm 表單，成功後返回執行的 script
            /*$('#ShopCartForm').ajaxForm(function() { 
				$.unblockUI();
            });*/ 

			$('#ShopCartForm').ajaxForm({ 
				// target identifies the element(s) to update with the server response 
				//target: '#htmlExampleTarget', 
		 
				// success identifies the function to invoke when the server response 
				// has been received; here we apply a fade-in effect to the new content 
				data: $(this).serialize(),
				success: function() { 
					//$('#htmlExampleTarget').fadeIn('slow'); 
					getMiniCart();
					pop_cart_layer();

					$.unblockUI();
				},
                error: function (data) {
				   var r = jQuery.parseJSON(data.responseText);
				   alert("Message: " + r.Message);
				   alert("StackTrace: " + r.StackTrace);
				   alert("ExceptionType: " + r.ExceptionType);
				   $.unblockUI();
                }
			});
        }); 


	/* Plugin BlockUI */

	$(document).ready(function() { 
		// 當按下 addshopcart 按鈕，執行 blockUI
		$('#addshopcart').click(function() { 

			var shoplan = (Cookies.get('ShopLan'));
			var buyclass = Cookies.get('buyClass');
			var partnerid = Cookies.get("partnerID");

			if (buyclass=="valuation"){	// car or valuation
				if (confirm("目前模式為詢價車模式，切換至購物模式嗎？(詢價車會被清空)")==false){
					return false;
				}else{
					$.get("/MainFile/buyClass_ajax.asp?m=car", function(data){});
					//$("#title_addshopart").html("加入購物車");
					//$("#bs-example-navbar-collapse-1").html($("bs-example-navbar-collapse-1").html().replace('詢價車','購物車'));
					$("#title_inquiry_addcart").html("加入購物車");
					$("#title_continue_shop").html("繼續購物");
					$("#title_goto_shopcart").html("前往結帳");
					$("#layer_cart_priceblock").show();
				}
			}

			var add_message = '加入購物車中，請稍候...';
			if (shoplan==2)
			{
				add_message = 'Loading...';
			}

			flytocart();

			$.blockUI({ 
				//message: '<h3><span class="fa fa-spinner fa-spin"></span> <font color=#ffffff>加入購物車中，請稍候...</font> </h3>',
				message: '<h3><span class="fa fa-spinner fa-spin"></span> <font color=#ffffff>'+add_message+'</font> </h3>',
				css: { 
				border: 'none', 
				padding: '15px', 
				backgroundColor: '#000', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: .5, 
				color: '#fff' 
			} }); 
	 
			//setTimeout($.unblockUI, 2000); 
		}); 

		// 當按下 #addinquirycart 詢價按鈕時
		$('#addinquirycart').click(function() { 

			var shoplan = (Cookies.get('ShopLan'));
			var buyclass = Cookies.get('buyClass');
			var partnerid = Cookies.get("partnerID");

			if (buyclass=="car"){	// car or valuation
				if (confirm("目前模式為購物車模式，切換至詢價模式嗎？(購物車會被清空)")==false){
					return false;
				}else{
					$.get("/MainFile/buyClass_ajax.asp?m=valuation", function(data){});
					$("#title_inquiry_addcart").html("加入詢價車");
					$("#title_continue_shop").html("繼續詢價");
					$("#title_goto_shopcart").html("前往詢價");
					$("#layer_cart_priceblock").hide();
				}
			}

			var add_message = '加入詢價車中，請稍候...';
			if (shoplan==2)
			{
				add_message = 'Loading...';
			}

			flytocart();

			$.blockUI({ 
				//message: '<h3><span class="fa fa-spinner fa-spin"></span> <font color=#ffffff>加入購物車中，請稍候...</font> </h3>',
				message: '<h3><span class="fa fa-spinner fa-spin"></span> <font color=#ffffff>'+add_message+'</font> </h3>',
				css: { 
				border: 'none', 
				padding: '15px', 
				backgroundColor: '#000', 
				'-webkit-border-radius': '10px', 
				'-moz-border-radius': '10px', 
				opacity: .5, 
				color: '#fff' 
			} }); 
	 
			//setTimeout($.unblockUI, 2000); 
		}); 

	}); 
		function getMiniCart(){
			/*$.get("/MainFile/ShopList_Mini.asp", function(data){
			  //alert("Data Loaded: " + data);
			  $("#shoplist_mini").html(data);
			});
			$.get("/MainFile/ShopCartNumber.asp", function(data){
			  $("#cart_number").html(data);
			});
			$.get("/MainFile/ShopCartTotal.asp", function(data){
			  $("#cartTol").html(data);
			});		*/

		}

		$(document).ready(function() { 
			// 當畫面重整時，更新下拉購物車
			// getMiniCart();
		});

		/* fly to cart effect */
		function flytocart(){

			var isFlyCart = (Cookies.get('isFlyCart'));
			if (isFlyCart!='False')
			{
				var flyElm = $('#zoom_01').clone().css('opacity','0.7');
				flyElm.css({
					'z-index': 9000,
					'display': 'block',
					'position': 'absolute',
					'top': $('#zoom_01').offset().top +'px',
					'left': $('#zoom_01').offset().left +'px',
					'width': $('#zoom_01').width() +'px',
					'height': $('#zoom_01').height() +'px'
				});
				$('body').append(flyElm);
				var ww = $('#zoom_01').offset().top + ($('#zoom_01').width()/2)-50
				var hh = $('#zoom_01').offset().left + ($('#zoom_01').height()/2)-50
				flyElm.animate({
					top:ww,
					left:hh,
					width:150,
					height:150,
				},'fast');
				flyElm.animate({
					top:$('.cart_number').offset().top-250,
					left:$('.cart_number').offset().left,
					width:50,
					height:50,
					opacity:0
				},'slow');
			}
		}

//商品屬性選擇
/*
$(function(){
	$(".prod_attrib .prod_attrib_para").each(function(){
		var i=$(this);
		var p=i.find("ul>li");
		p.click(function(){
			if(!!$(this).hasClass("selected")){
				$(this).removeClass("selected");
				i.removeAttr("data-attrval");
			}else{
				$(this).addClass("selected").siblings("li").removeClass("selected");
				i.attr("data-attrval",$(this).attr("data-aid"))
			}
			//do 
		})
	})
})
*/



document.write('<script src="/images/jquery.form.min.js"></script>');
document.write('<script src="/images/jquery.blockUI.min.js"></script>');
document.write('<script src="/images/chili-1.7.pack.js"></script>');
document.write('<script src="/images/jquery.imagezoom.min.js"></script>');
document.write('<script src="/images/isMobile.min.js"></script>');
