jQuery(function(){
	jQuery(".ico_wx").hover(function(){
			jQuery('#wx_code').show();
		},function(){
			jQuery('#wx_code').hide();
		});
		jQuery(".ico_wb").hover(function(){
			jQuery('#wb_code').show();	
		},function(){
			jQuery('#wb_code').hide();
		})
		jQuery('.srmrz,.bdsj,.dlmm,.jymm, .yhk').click(function(){
			jQuery('#fade1').show();
		})
		jQuery('#fade1,.code_close').click(function(){
			jQuery('#fade1').hide();
			jQuery('#MyDiv1').hide()
			jQuery('#MyDiv2').hide()
			jQuery('#MyDiv3').hide()
			jQuery('#MyDiv4').hide()
			jQuery('#MyDiv5').hide()
		});
		jQuery('.srmrz').click(function(){
			jQuery('#MyDiv1').show()
		})
		jQuery('.bdsj').click(function(){
			jQuery('#MyDiv2').show()
		})
		jQuery('.dlmm').click(function(){
			jQuery('#MyDiv3').show()
		})
		jQuery('.jymm').click(function(){
			jQuery('#MyDiv4').show()
		})
		jQuery('.yhk').click(function(){
			jQuery('#MyDiv5').show()
		})
});