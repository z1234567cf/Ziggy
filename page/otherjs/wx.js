//微信图片切换
$(function(){
	$(".ico_wx").hover(function(){
		$('#wx_code').show();
	},function(){
		$('#wx_code').hide();
	});
	$(".ico_wb").hover(function(){
		$('#wb_code').show();	
	},function(){
		$('#wb_code').hide();
	})
});