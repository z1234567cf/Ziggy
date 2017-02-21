 var CID = "endtime";
 var iSTime=0;  
function Bclass(_bid,_callback){
    var bid=_bid;
    var binfo;
    this.callback=_callback;
    var me=this;                  
    this.load=function(_callback){//加载数据函数
        if(window.dcretpass)
            GD.init('/?m=Test&s=view&bid='+bid+"&dpass="+window.dcretpass);
        else
            GD.init('/?m=Test&s=view&bid='+bid); 
        if(typeof _callback=='function')
            GD.BEFOREDOJSON = function(_json){ me.docalc(_json);_callback(_json);}  //计算特殊变量
        else
            GD.BEFOREDOJSON = this.docalc;  //计算特殊变量
        GD.havedosecond=0;//强制刷新，防止不刷新
        GD.load(0,this.dataload);
    };
    this.dataload=function(json){//加载数据完成后
        if(json.r==1){
            if(json.needpwd && json.needpwd==1){
                show_biaomima(function (){
                    //me.load();
                });
                return;
            }
            iSTime = json.binfo._golefttime;
            // apply(me,json);
            
            // me.docalc();        // 计算特殊变量
            // SetJsonValue(json); // 对取回来的数据直接赋值
            // SetJsonHtml(me.c);  // 对计算的变量进行HTML输出
            me._j = json;
            me.PrintRepayList(json);     // 显示还款
            me.PrintTenderList(json);    // 显示投标
            me.PrintAttentionList(json); // 显示受信资料
            me.PrintDiyaList(json);      // 显示抵押物
            if(json.binfo.borrow_style==0){
                $(".borrow_contentsdiv").show();
                $("#diya_list").hide();
            }else{
                $("#diya_list").show();
                $(".borrow_contentsdiv").hide();
            }
            var _ifr = document.getElementById('ifr_lyb') ;
            if(_ifr ){  // 加载填写留言 iframe
                _ifr.src = "/plug_lyb.php?objtype=bid&objid=" + json.binfo.bid;
            }
            if(iSTime>0)
                ReadStartTime();   
        }else{
            $.dialog.alert(json.msg);
        }
        if(typeof me.callback=='function'){
            me.callback(json);   
        }
    };
    this.PrintAttentionList=function(_json){ 
         this.PrintByTemplate("attention_template",_json.attention_list,"attention_list");
         if(_json.spic && _json.spic==1){
            if($("#spic_block").length==1){
                this.PrintByTemplate("spic_template",_json.attention_list,"spic_list");
                $("#spic_block").show();   
            }
         }
    };
    this.PrintDiyaList=function(_json){
         this.PrintByTemplate("diya_template",_json.diya_list,"diya_list");
    }
    this.PrintRepayList=function(_json){
        if(document.getElementById('repay_template')){
            this.PrintByTemplate("repay_template",_json.repay_list,"repay_list");
        }
    };
    this.PrintTenderList=function(_json){
         this.PrintByTemplate("tender_template",_json.tender_list,"tender_list");
    };
    this.PrintByTemplate=function(tempid,data,showid){
          if(document.getElementById(tempid)){
            var tjson={base:this._j,list:data};
            var rst = TrimPath.processDOMTemplate(tempid,tjson );
            $("#"+showid).html(rst);
         } 
    };
    //计算特殊变量
    this.docalc=function(_json){
         if(_json.needpwd && _json.needpwd==1){
                return;
         }
        ///表标记处理
        if(_json.r!=1){
            $.dialog.alert(_json.msg);
            return;
        }
        if(_json.r!=1){
            $.dialog.alert(_json.msg);
            return;
        }
        if(_json.binfo.account==0){
            _json.binfo.account_f = "不限";
            _json.binfo.v_borrow_account_wait="不限";
        }else{
            _json.binfo.account_f = (_json.binfo.account*1).formatMoney(2, '') ;
            _json.binfo.v_borrow_account_wait=_json.binfo.borrow_account_wait;
            }
        
        if(_json.binfo.ispassword){
            _json.binfo.name += ' [<font color=red title="仅提供给拥有指定密码的投资人">密码</font>]';
        }else{ 
            show_biaomima = null; // 不是密码标的话那么密码标函数为空 [一定要设置为空]
        }
        if((_json.binfo.attr&128)==128) {_json.binfo.name += ' <img src="/ind/images/biao/dx.gif" title="定向标,总资产大于50万以上用户可投" />'};
        me._j = _json;
        if(_json.user){
            if(_json.user.sex == '1' ) _json.user.sex = "女";
            else if(_json.user.sex == '0' ) _json.user.sex = "男";
            else if(!_json.user.sex) _json.user.sex = "男 ";
        }
        
        //_json.binfo.verify_time = _json.binfo.verify_time.substr(0,10);
        if(!_json.c)_json.c = {};
        // 最大可投如果是0表示不限制
        _json.c.v_tender_account_max = '￥'+_json.binfo.tender_account_max;
        if(_json.binfo.tender_account_max==0) _json.c.v_tender_account_max = '<font color=green>不限</font>';
        _json.c.show_flag="";
        _json.c.show_apr_bymonth=toDecimalf(parseFloat(_json.binfo.borrow_apr) /12); // 月利率
        
        if(_json.binfo.isjiangli*1){
            _json.c.show_flag += ' <font color=red title="奖励: '+_json.binfo.borrow_jiangli+' 元">[奖]</font>';
        }
        
        if(_json.binfo.days>0){
            _json.c.show_pierod= _json.binfo.days +' 天';
            _json.c.show_flag += ' <img src="/ind/images/biao/day.gif" align="absmiddle"/>';
        }else{
            _json.c.show_pierod= _json.binfo.borrow_period +' 个月';
        }

        if(_json.binfo.flag>=1){
            _json.c.show_flag+= ' <img src="/ind/images/biao/'+_json.binfo.flag+'.gif" align="absmiddle"/>';
        }
        else{
            _json.c.show_flag+= '';
        }

        ///状态判断
        me.getstats(_json.binfo.status,_json.binfo.isapp);   
        //标类型处理
        if(_json.binfo.flag==3){
            _json.c.flagname="抵押标";
        }else if(_json.binfo.flag==1){
            _json.c.flagname="推荐标";
        }else if (_json.binfo.flag==2){
            _json.c.flag_name='快借标';
        }else if(_json.binfo.flag==3){
            _json.c.flag_name='抵押标';
        }else if(_json.binfo.flag==4){
            _json.c.flag_name='秒还标';
        }else{
            _json.c.flag_name='信用标';
        }
        if(_json.binfo.borrow_style==1){
            _json.c.show_borrow_style="月还息到期还本"; 
        }else  if(_json.binfo.borrow_style==2){
            _json.c.show_borrow_style="等额本息还款"; 
        }else  if(_json.binfo.borrow_style==3){
            _json.c.show_borrow_style="月还息到期还本(湖)"; 
        }else  if(_json.binfo.borrow_style==4){
            _json.c.show_borrow_style="月先还息到期还本"; 
        }else{
             _json.c.show_borrow_style="按月分期还款"; 
        }     
        ///账户信息计算处理
        if(_json.jiekuan.borrow_success_account >_json.jiekuan.tender_success_account){
            _json.c.fuzai="借出小于借入";
        }else{
            _json.c.fuzai="借出大于借入";
        }
        _json.c.total_money = parseFloat(_json.account_detail.v_twait_benjin) +parseFloat(_json.account_detail.v_twait_lixi) + parseFloat(_json.account_detail.freeze)  + parseFloat(_json.account_detail.buketi) + parseFloat(_json.account_detail.keti);
        _json.c.total_money = _json.c.total_money.toFixed(2);
        _json.c.use_money =  parseFloat(_json.account_detail.buketi) + parseFloat(_json.account_detail.keti);
        _json.c.use_money = _json.c.use_money.toFixed(2);
        $("useravatar").attr("src","/forum/uc_serverccc/avatar.php?uid="+_json._ME.uc_id+"&type=real&size=big")

        ///借款信息处理
        me.realstats();
        me.jindu(_json);
        //奖励 
        if(_json.binfo.borrow_jiangli!='' && _json.binfo.borrow_jiangli!=0){
            if (_json.binfo.jiangli>0){
                 _json.c.show_borrow_jiangli = getFloatValue2(_json.binfo.jiangli*100,2)+"%"; 
                 _json.binfo.borrow_jiangli  = '奖励: '+_json.binfo.jiangli*100+"%";   
            }else{
                _json.c.show_borrow_jiangli = getFloatValue2(_json.binfo.borrow_jiangli,2); 
                _json.binfo.borrow_jiangli  = '奖励: '+moneyStr2(_json.binfo.borrow_jiangli);
            }
        }else{
            _json.c.show_borrow_jiangli='未设置奖励。';  
        }

        ///投标摘要
        if(_json.binfo.borrow_contents==null){
            _json.c.show_borrow_contents='暂无内容';    
        }else{
            _json.c.show_borrow_contents=_json.binfo.borrow_contents;    
        }
        
        if(_json.user.marriage==0)
            _json.c.showmarriage="未婚";
        else 
            _json.c.showmarriage="已婚";
        _json.c.showishave="";
        if((_json.user.ishave&1)==1)
            _json.c.showishave+="有车";
        if((_json.user.ishave&2)==2)
            _json.c.showishave+="有房";
        if(!_json.user.ishave||_json.user.ishave=='0') _json.c.showishave+="无记录";
        
    };
    this.jindu=function(_json){
        var jd=140 * (1-_json.binfo.borrow_account_scale/100);
        $('#k_jindu').html('<img src="/ind/images/percentImageshort.png" style="background:url(/ind/images/percentImage_back4_biaoinfo.png);background-position: -' +jd + 'px 0px;background-repeat:no-repeat;"/>');
    }
    
    ///表状态处理函数
    this.getstats=function(status,isapp){
        if (status==3){
            this._j.binfo.left_time = '<font color=green>已成功</font>';
            if(this._j.binfo.repay_id!=0 && this._j.binfo.repay_id_last==this._j.binfo.repay_id)
                this._j.c.show_status='<img src="/ind/images/biao/status_5.gif"  border="0" align="absmiddle" />';
            else
                this._j.c.show_status='<img src="/ind/images/biao/status_2.gif" border="0"  align="absmiddle" />';
            
        }else if (status==5){
            this._j.c.show_status='<font color="green">用户已取消</font>';
        }else if (status==4){
            this._j.c.show_status='<font color="green">审核不通过</font>';
        }else if (status==1){
            if(this._j.binfo.lefttime>0){ 
                if ((this._j.binfo.flag==5 && this._j.binfo.account==0)|| parseFloat(this._j.binfo.borrow_account_wait)> 0){
                    this._j.c.show_status='<img src="/ind/images/biao/tender.gif" border="0" style="cursor:pointer" id="tenderimg" align="absmiddle" onclick="return show_tender();"/>';
                }else{
                    this._j.c.show_status='<img src="/ind/images/biao/tender_wait.jpg" border="0" align="absmiddle" />';
                }
            }else{
                this._j.c.show_status='<font color="red">已过期</font>';
            }
        }else if (status==7){
            this._j.c.show_status='<font color="green">自动投标中</font>';
        }else if (status==6){
            this._j.c.show_status='<img src="/ind/images/biao/status_5.gif"  border="0" align="absmiddle" />';
        }else if (status==8){
            this._j.c.show_status='<font color="green">复审处理中</font>';
        }else{
            this._j.c.show_status='<font color="green">未初审或已失效</font>';
        }  
        if(isapp == 1){//如果是手机标
            this._j.c.show_status='<a href="/ind/appxz.html"><img src="/ind/images/biao/tender_app.gif"  border="0" align="absmiddle" /></a>';
        }
    };
    ///认证变量处理
    this.realstats=function(){
        // 实名认证
        this._j.c.showreal_status='<img src="/ind/images/shenfen/real_'+this._j.user.real_status+'.jpg">';
        
        // 手机认证 
        this._j.c.showmobile_status='<img src="/ind/images/shenfen/mobile_'+this._j.user.mobile_status+'.jpg">';
        
        // vip认证 
        this._j.c.showemail_status='<img src="/ind/images/shenfen/email_'+this._j.user.email_status+'.jpg">';
        
    };
    ///启动倒计时
    this.startTimeTic=function(){
        if(window.CID != null){
            var iTime = GD.binfo.left_time;//剩余时间 秒
            RemainTime(iTime);
        }
    }; 
}
// 显示密码标的密码输入面板
var show_biaomima = function(callback){
    if(GD.uid){
        $.dialog({title: '密码标-密码确认',
            icon: 'face-smile.png',
            fixed: true,
            lock: true,
            parent: parent || null,
            content: [
               '<div style="margin-bottom:5px;font-size:12px">此标是定向给投资机构和大额投资人的哦<BR>请输入投标密码:',
               '</div><br/>',
               '<table>',
               '<tr><td><b>投标密码:</b></td><td><input type="password" name="mimapass" id="mimapass" class="sdtb" value="" />',
               '</td></tr>',
               '</table>'
            ].join(''),
            init: function(){
                input = this.DOM.content[0].getElementsByTagName('input')[0];
                input.select();
                input.focus();
            },
            ok: function(here){
                check_mimabiao(callback);
            },
            cancel: true

        });
    }else{
        $.dialog.alert("您还没有登录 <a href='/ind/login.html'><u>点击登录</u></a>");
    }
};
var check_mimabiao=function(callback)
{
    $.dialog.tips('数据加载中...',600,'loading.gif');
    var _pass = $("#mimapass").val();
    if(_pass==""){
        $.dialog.tips("密码不能为空",3,'tips.gif',function(){ show_biaomima()});
    }
    $.ajax({ 
        type: "post", 
        url: "/?m=User&s=TenderMiMa", //&bid=2&uid=2&account=10
        data: { bid: bid , mima: _pass},
        dataType: "json", 
        success: function (data) { 
            var s='';
            var t = 3;
            if(data){
                if(data.r==1){
                    window.haveinput = _pass;  // 标记密码已经输入成功，且核对正确
                    window.dcretpass =  data.dpass;
                    s="密码验证成功,请稍后..";
                    t = 1;
                    if(typeof callback == "function")
                        callback();
                    else
                        show_tender(); // 继续投标                       
                }else{
                    s="密码核对失败 "+data.msg; 
                }
            }else{ 
                s='可能网络问题，服务器返回错误';
            }
            $.dialog.tips(s,t,'tips.gif',function(){doFirst();});
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            $.dialog.tips('系统出现故障，请晚点再试',3,'error.gif');
        } 
    })
}
// 显示投标面板，提供输入投标金额以及支付密码的面板
function show_tender(str){
    if(typeof str == 'undefined' && bc._j._ME && bc._j._ME.dfpaypass && bc._j._ME.dfpaypass==1){
        $.dialog.confirm("你的交易密码为默认密码，请确认然后修改交易密码", function(){
                    __redirect("/page/ucenter_mmxg.html");
                },function(){
                    show_tender(true);
                } );
        return ;             
    } 
    
    if(bc._j.binfo.isxs==2) //定时标
        tbyzh =  ['<tr>',
                '<td><b>投标验证:</b></td><td><input type="text" name="tbyzm" id="tbyzm" class="sdtb" value="" />',
                '<img src="/?m=Biao&a=CnVerify&vt=tb&bid=',
                bc._j.binfo.bid,
                '" onclick="this.src=\'/?m=Biao&a=CnVerify&vt=tb&bid=',
                bc._j.binfo.bid,
                '\'"></td></tr>'].join('');
    else
        tbyzh ='';
    if(bc._j.binfo.htzr && bc._j.binfo.htzr==1)
        zrxyck =  ['<tr>',
                '<td><b>债权回购:</b></td><td><input type="checkbox" name="zqzr" checked="true" id="zqzr" style="border: 1px solid #809db9;margin: 2px 5px 0 5px;" value="1"/>',
                '</td></tr>'].join('');   
    else
        zrxyck='';
    if(!window.haveinput && typeof show_biaomima=='function' && window.bc)return show_biaomima();
    var sscontent   = [
               '<div style="margin-bottom:5px;font-size:12px">请输入投标金额,此标最大可投:'+setmoney(),
               '</div><br/>',
               '<table><tr>',
               '<td><b>投资金额:</b></td><td><input name="money" id="money" value="" class="sdtb" /><a href="#" onclick="return GetJE()">最大可投</a> <a href="#" onclick="showlixi();">计算利息</a></td>',
               '</tr>',
               '<tr>',
               '<td><b>交易密码:</b></td><td><input type="password" name="paypass" id="paypass" class="sdtb" value="" />',
               '<a target="_block" href="/page/ucenter_mmxg.html#jymm">更改交易密码</a></td></tr>',
               tbyzh,
               zrxyck,
               '</table>'
            ].join('');
    if(bc._j.binfo.flag==5 && bc._j.binfo.hdflag==1)//体验标
        sscontent   = [
               '<div style="margin-bottom:5px;font-size:12px">你的体验金余额为:'+(bc._j.binfo.MeBalance),
               '</div><br/>',
               '<div style="margin-bottom:5px;font-size:12px">请输入投标金额,此标最大可投:'+setmoney(),
               '</div><br/>',
               '<table><tr>',
               '<td><b>投资金额:</b></td><td><input name="money" id="money" value="'+setmoney()+'" class="sdtb" /><a href="#" onclick="return GetJE()">最大可投</a> <a href="#" onclick="showlixi();">计算利息</a></td>',
               '</tr>',
               '<tr>',
               '<td><b>交易密码:</b></td><td><input type="password" name="paypass" id="paypass" class="sdtb" value="" />',
               '<a target="_block" href="/page/ucenter_mmxg.html#jymm">更改交易密码</a></td></tr>',
               tbyzh,
               zrxyck,
               '</table>'
            ].join('');
    if(GD.uid){
        $.dialog({title: '投标',
            icon: 'success.gif',
            fixed: true,
            lock: true,
            parent: parent || null,
            content: sscontent,
            init: function(){
                input = this.DOM.content[0].getElementsByTagName('input')[0];
                input.select();
                input.focus();
            },
            ok: function(here){
                check_tender();
            },
            cancel: true

        });
    }else{
        $.dialog.alert("您还没有登录 <a href='/ind/login.html'><u>点击登录</u></a>");
    }
}
function add_black(){
     if(GD.uid){
        $.dialog.confirm('确定要把他(她)加入到你的黑名单用户中吗？', function(){
            $.dialog.tips('数据加载中...',600,'loading.gif');
            $.ajax({ 
                type: "post", 
                 url: "/?m=Tender&s=SetHmd",    // &bid=2&uid=2&account=10
                data: { hm:1,huid:bc._j.binfo.uid},
                dataType: "json", 
                success: function (data) { 
                    if(data.r==1){
                        var s=data.msg; 
                    }else{
                        var s=data.msg; 
                    }
                    $.dialog.tips(s,3,'tips.gif',function(){doFirst();});
                }, 
                error: function (XMLHttpRequest, textStatus, errorThrown) { 
                    $.dialog.tips('系统出现故障，请晚点再试',3,'error.gif');
                } 
            })    
        });
    }else{
        $.dialog.alert("你没有登录",function (){
                ___GoURL((_SITE&&_SITE._loginurl)?_SITE._loginurl:'/login.html');
        });
    }
}

//投资提交到投资接口

function GetJE(){
    $("#money").val(setmoney());
    return false;
}
function showlixi(){
    var _account = $("#money").val(); 
    if(_account=="" || _account*1==0){
        $.dialog.alert("请输入你要投入的金额");
        return ;
    }
    var surl = "account=" + _account;   
    surl = surl + "&period=" + bc._j.binfo.borrow_period;    
    surl = surl + "&apr=" +bc._j.binfo.borrow_apr; 
    $style = bc._j.binfo.borrow_style;
    if($style==2)
        $style=0;
    if($style>2){
        $style=1;
    }
    surl = surl + "&style=" +  $style;  
    surl = surl + "&days=" +  bc._j.binfo.days;   
    $.ajax({
            type: 'GET',
            url: "/?m=Biao&s=jsq&"+surl,
            dataType: "json",
            cache: false,
            success: showlixi_callback,
            error: ajaxError
        });
}
function showlixi_callback(json){
    if(json.r==1){
       __mytips("你到期能获得的利息为<font color='red'>"+json.all.interest_total+"</font>",3,"tips.gif","到期应得利息");
    }
}

function  check_tender(){
    $.dialog.tips('数据加载中...',600,'loading.gif');
     var pdata={ mima:window.haveinput,account:$("#money").val(), bid:bc._j.binfo.bid,pwd:SaltPassword($("#paypass").val())};
    if(bc._j.binfo.isxs==2)
        pdata['tbyzm']=$("#tbyzm").val();
    if(bc._j.binfo.htzr && bc._j.binfo.htzr==1)
        pdata['zqzr']=$("#zqzr").val();
    $.ajax({ 
        type: "post", 
        url: "/?m=User&s=Tender", //&bid=2&uid=2&account=10
        data: pdata,
        dataType: "json", 
        success: function (data) { 
            if(data.r==1){
                var s=data.msg; 
            }else{
                var s="投标失败:"+data.msg;
                window.haveinput = ''; // 清空投标密码，这样就需要再次输入 
            }
            sec=3;
            if(data.sec)
                sec=data.sec;
            if(data._gourl){ // 如果服务器有致命跳转地址
                $.dialog.confirm(s, function(){
                    ___GoURL(data._gourl);
                },function(){
                    show_tender(true);
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
function setmoney(){
   var m=0
   if(bc._j.binfo.tender_account_max > 0)
        m=Math.min(bc._j.binfo.MeBalance,bc._j.binfo.tender_account_max,bc._j.binfo.borrow_account_wait);
   else
        m=Math.min(bc._j.binfo.MeBalance,bc._j.binfo.borrow_account_wait);  
   if(m == 0){
       m = bc._j.binfo.MeBalance ;
   }
   return m;
}

function RemainTime(){
    var iDay,iHour,iMinute,iSecond;
    var sDay="",sTime="";
    if (iTime >= 0){
        iDay = parseInt(iTime/24/3600);
        iHour = parseInt((iTime/3600)%24);
        iMinute = parseInt((iTime/60)%60);
        iSecond = parseInt(iTime%60);
        if (iDay > 0){ 
            sDay = iDay + "天"; 
        }
        sTime =sDay + iHour + "小时" + iMinute + "分钟" + iSecond + "秒";
        if(iTime==0){
            clearTimeout(Account);
            sTime="<span style='color:green'>时间到了!</span>";
        }else{
            Account = setTimeout("RemainTime()",1000);
        }
        iTime=iTime-1;
    }else{
        sTime="<span style='color:red'>此标已过期！</span>";
    }
    $("#"+CID).html(sTime);
}
var StartTicket;
function ReadStartTime(){
    var iDay,iHour,iMinute,iSecond;
    var sDay="",sTime="";
    if(iSTime<0){
        sTime='<font color="red">已过期</font>';
    }
    if (iSTime > 0){
        iDay = parseInt(iSTime/24/3600);
        iHour = parseInt((iSTime/3600)%24);
        iMinute = parseInt((iSTime/60)%60);
        iSecond = parseInt(iSTime%60);
        if (iDay > 0){ 
            sDay = "<span class=sfm>"+iDay + "</span> 天"; 
        }
        sTime ='<div class="djs">开 标 时 间<BR>'+sDay + " <span class=sfm>" + iHour + "</span> 时 <span class=sfm>" + iMinute + "</span> 分 <span class=sfm>" + iSecond + "</span> 秒</div>";
        iSTime=iSTime-1;
        StartTicket = setTimeout("ReadStartTime()",1000);
    }else  if(iSTime==0){
        clearTimeout(StartTicket);
        sTime='<img src="/ind/images/biao/tender.gif" border="0" style="cursor:pointer" id="tenderimg" align="absmiddle" onclick="return show_tender();"/>';
    }
    $("#k_show_status").html(sTime);
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

function getFloatValue2(dec,len){
    dec=Math.floor(Math.round(dec*Math.pow(10,len+1))/10)/Math.pow(10,len); 
    return dec; 
}