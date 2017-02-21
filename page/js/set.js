/**
    *平台控制中心
 */
var platformControl = {
    _platform:[],//平台缓存数组
    /**
        * 事件控制
     */
    init:function(){    	
        this.addEvents();//时间监听
     	this.getBankList();	//获取列表
     	this.platClick();//弹出层
    },
    /**
    * 事件监听
    */
    addEvents:function()
    {
        var _inThis = this;      
        //提交银行卡信息
        $("#addSubmit").click(function(){
            _inThis.addPlatform();
        });
    },
    /**
    * 列表内按钮事件
    */
    addListEvents:function(){
        var _inThis = this;
        //修改平台信息
        $(".btnupdate").click(function(){
            var tr    = $(this).parent().parent();
            var $data = _inThis._platform[tr.index()];
			
			$("#name").val($data.name);
			$("#province").val($data.province);
			$("#city").val($data.);
			$("#area").val($data.city);
			$("#apr").val($data.);
			$("#url").val($data.apr);
			$("#background").val($data.);
			$("#bus_model").val($data.background);
			$("#is_cunguan").val($data.is_cunguan);
			$("#cg_bank").val($data.cg_bank);
			$("#is_open").val($data.is_open);
		
            $("#bank_id").val($data.bankid);
            $("#bank").val($data.bank);
            $("#branch_bank").val($data.branch);
            $("#account_bank,#account_bank2").val($data.account_clear);  //account_clear 是完整银行账号 
            if($data.provinceName && $data.provinceName!=""){
                $("#province option").each(function(){ 
                    if($(this).text() == $data.provinceName){ 
                    $(this).attr("selected", true);
                    }
                });
            }
            if($data.cityName && $data.cityName!=""){
                $("#province").data("city", $data.cityName);
            }
            if($data.provinceName && $data.provinceName!=""){
                $("#province").trigger("change");  
            }
            $("#winTit").text("修改平台信息");
            $("#wBifbox").fadeIn();

        });
        //删除平台
        $(".btndel").click(function(){
            var tr = $(this).parent().parent();            
            $.dialog.confirm('您确认平台吗', function(){               
                BaseControl.loadJson("/?m=User&s=deldbank&bankid="+_inThis._platform[tr.index()].bankid,function(json){
                    if(json.r)
                    {
                        BaseControl.showWin({msg:"平台删除成功",isclose:false,hidespeed:3,wintype:"success",callback:function(){
                            _inThis.getBankList();
                         }});  
                    }else
                    {
                        BaseControl.showWin({msg:json.msg,isclose:false,hidespeed:3,wintype:"error"});
                    }
                });
            });
        });

        //省份切换联城市
        $("#province").change(function(){
            //省份切换
            _inThis.getCityByProvince(this.value);
        });
    },
    /**
     * 获取平台列表
     */
	
    getBankList: function(){
        var _inThis = this;
		BaseControl.loadJson("/?m=Wd&s=wdList",function(result){
			if(!result.data){
				alert("暂无任何数据");
				return
			}
			_inThis._platform = result.data;
			BaseControl.converTemplateToHtml(result,"liTemplate","liShow",function(){
				_inThis.addListEvents();
			});
		});
    },
    /**
    * 获取省份下面的地级市
    * @param provinceId:number 省份编号
    */
    getCityByProvince:function(provinceId)
    {
        BaseControl.loadJson({
            url:"/?m=Wd&s=getArea",
            type:"post",
            data:{areaId:provinceId}
        },function(json){
            if(json)
            {
                $("#city option").remove();
                $(json).each(function(){
                    $("#city").append('<option value="'+this.city+'">'+this.name+'</option>');
                });
            }else
            {
                $("#city").html('<option value="-1" selected>城市</option>');
            }
        });
    },
    /**
    * 添加银行卡
     */
	addPlatform: function(){
        var _inThis = this;
        var name = $("#name").val();
		var province = $("#province").val();
		var city = $("#city").val();
		var area = $("#area").val();
		var apr = $("#apr").val();
		var url = $("#url").val();
		var background = $("#background").val();
		var bus_model = $("#bus_model").val();
		var is_cunguan = $("#is_cunguan").val();
		var cg_bank = $("#cg_bank").val();
		var is_open = $("#is_open").val();

        
        BaseControl.loadJson({
            url:"/?m=Wd&s=addWd",
            type:"post",
            data:{
                name:name,
				province:province,
				city:city,
				area:area,
				apr:apr,
				url:url,
				background:background,
				bus_model:bus_model,
				is_cunguan:is_cunguan,
				cg_bank:cg_bank,
				is_open:is_open
            }
        },function(json){
            if(json.r=='1'){
                 BaseControl.showWin({msg:"平台信息提交成功",isclose:false,hidespeed:3,wintype:"success",callback:function(){                    
                    _inThis.getBankList();
					$("#wBifbox").hide();
                 }});  
                 $("#winTit").text("添加银行卡"); 
                 $("#bankid").val("");             
                 return;             
            }
            BaseControl.showWin({msg:json.msg,isclose:false,hidespeed:3,wintype:"error"});
        });
    },
    
    //弹出添加银行卡
	platClick:function(){
		$("#add").click(function(){
            addForm.reset();
            $("#winTit").text("添加平台"); 
			$("#wBifbox").show();
		})
		$(".xclose").click(function(){
			$("#wBifbox").hide();
		});
		//建立遮罩
		var wid = document.body.clientWidth + "px";
		var hid =  window.screen.availHeight + "px";
		$("#wBifbox").css({"height":hid,"width":wid});
		$(".winbox").css({ 
			position:'absolute', 
			left: ($(window).width() - $(".bank").outerWidth())/2, 
			top: 100
		});
	}
};

platformControl.init();