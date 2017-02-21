 var CID = "endtime";
 var iSTime=0;
function Zclass(_zid,_callback){
    var zid=_zid;
    var zinfo;
    this.callback=_callback;
    var me=this;
    this.load=function(){//加载数据函数
        GD.init('/?m=Crowdfund&s=GetDetailByZid&zid='+zid);
        GD.BEFOREDOJSON = this.docalc;  //计算特殊变量
        GD.havedond=0;//强制刷新，防止不刷新
        GD.load(0,this.dataload);
    };
    this.dataload=function(json){//加载数据完成后
        if(json.r==1){
            me._j = json;
            me.SupportList(json);     // 显示还款
            me.DangWeiList(json);    // 显示投标
            var _ifr = document.getElementById('ifr_lyb') ;
            if(_ifr ){  // 加载填写留言 iframe
                _ifr.src = "/plug_lyb.php?objtype=zid&objid=" + zid;
            }
        }else{
           ajaxDone(json)
        }
        if(typeof me.callback=='function'){
            me.callback(json);   
        }
    };
     
    this.SupportList=function(_json){
        if(document.getElementById('support_template')){
            this.PrintByTemplate("support_template",_json,"support_list");
        }
    }
    this.DangWeiList=function(_json){
        if(document.getElementById('dangwei_template')){
            this.PrintByTemplate("dangwei_template",_json,"dangwei_list");
        }
    };
    this.PrintByTemplate=function(tempid,data,showid){
          if(document.getElementById(tempid)){
            var rst = TrimPath.processDOMTemplate(tempid,data );
            $("#"+showid).html(rst);
         } 
    };
    //计算特殊变量
    this.docalc=function(_json){
    };
}
function toDecimal(x) {            
    var f = parseFloat(x);      
    if (isNaN(f)) {          
        return;         
    }            
    f = Math.round(x*100)/100;     
    return f;    
}
function toDecimalf(x) {            
    var f = parseFloat(x);      
    if (isNaN(f)) {          
        return;         
    }            
    f = Math.floor(x*100)/100;     
    return f;    
}

function showpayz(){
    if(typeof str =='undefined' && z._ME && z._ME.dfpaypass && z._ME.dfpaypass==1){
        $.dialog.confirm("你的交易密码为默认密码，请确认然后修改交易密码", function(){
                    __redirect("/page/ucenter_mmxg.html");
                },function(){
                    show_tender(true);
                } );
        return ;             
    } 
    if(GD.uid){
        $.dialog({title: '确认付款',
            icon: 'success.gif',
            fixed: true,
            lock: true,
            parent: parent || null,
            content: [
               '<table><tr>',
               '<tr>',
               '<td><b>交易密码:</b></td><td><input type="password" name="paypass" id="paypass" class="sdtb" value="" />',
               '<a target="_block" href="/page/ucenter_mmxg.html#jymm">更改交易密码</a></td></tr>',
               '</table>'
            ].join(''),
            init: function(){
                input = this.DOM.content[0].getElementsByTagName('input')[0];
                input.select();
                input.focus();
            },
            ok: function(here){
                gopayz();
            },
            cancel: true

        });
    }else{
        $.dialog.alert("您还没有登录 <a href='/ind/login.html'><u>点击登录</u></a>");
    }
}
function  gopayz(){
    $.dialog.tips('数据加载中...',600,'loading.gif');
     var pdata={oid:$("#orderid").val(),pwd:SaltPassword($("#paypass").val())};
    $.ajax({ 
        type: "post", 
        url: "/?m=Crowdfund&s=PayOrder", //&bid=2&uid=2&account=10
        data: pdata,
        dataType: "json", 
        success: function (data) { 
            if(data.r==1){
                var s="支付成功" 
            }else{
                var s="支付失败:"+data.msg;
            }
            sec=3;
            if(data.sec)
                sec=data.sec;
            if(data._gourl){ // 如果服务器有致命跳转地址
                $.dialog.confirm(s, function(){
                    ___GoURL(data._gourl);
                },function(){
                    showpayz();
                } );
            } else {
                $.dialog.tips(s,sec,'tips.gif',function(){doFirst();});
            }
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            $.dialog.tips('系统出现故障，请晚点再试',3,'error.gif');
        } 
    }) ;
}