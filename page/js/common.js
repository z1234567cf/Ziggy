var paypassinit=false;
var paypasssed="";
// 交易密码需要随机码，这里初始化随机码
// 

function str_repeat(i, m) {
    for (var o = []; m > 0; o[--m] = i);
    return o.join('');
}
function sprintf() {
    var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
    while (f) {
        if (m = /^[^\x25]+/.exec(f)) {
            o.push(m[0]);
        }
        else if (m = /^\x25{2}/.exec(f)) {
            o.push('%');
        }
        else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
            if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
                throw('Too few arguments.');
            }
            if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
                throw('Expecting number but found ' + typeof(a));
            }
            switch (m[7]) {
                case 'b': a = a.toString(2); break;
                case 'c': a = String.fromCharCode(a); break;
                case 'd': a = parseInt(a); break;
                case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                case 'o': a = a.toString(8); break;
                case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                case 'u': a = Math.abs(a); break;
                case 'x': a = a.toString(16); break;
                case 'X': a = a.toString(16).toUpperCase(); break;
            }
            a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
            c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
            x = m[5] - String(a).length - s.length;
            p = m[5] ? str_repeat(c, x) : '';
            o.push(s + (m[4] ? a + p : p + a));
        }
        else {
            throw('Huh ?!');
        }
        f = f.substring(m[0].length);
    }
    return o.join('');
}
function initpaypass(){ 
    if(paypassinit)
        return;
    GD.loadJson("/?m=User&s=passsed",function(json){
        if(json.r && json.r==1){
            paypasssed=json.sedpassed;
            paypassinit=true;
        }
    })
}
var ajaxtip=null  ;
       
function toJson(form){  
  var str = form.serialize(); 
  str = str.replace(/&/g , '","');  
  str = str.replace(/=/g , '":"');
  str = '{"'+str +'"}';  
  return str;  
}  
function toDate(nS){
    var now = "";
    var date= new Date(parseInt(nS) * 1000); 
    now = date.getFullYear()+"-"; //读英文就行了
    now = now + (date.getMonth()+1)+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
    now = now + date.getDate()+"";
    return now; 
    }
function toDateTime(nS) {     
    var now = "";
    var date= new Date(parseInt(nS) * 1000); 
    now = date.getFullYear()+"-"; //读英文就行了
    now = now + (date.getMonth()+1)+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
    now = now + date.getDate()+" ";
    now = now + date.getHours()+":";
    now = now + date.getMinutes()+":";
    now = now + date.getSeconds()+""; 
    return now;   
}
var dialog=null;
function AjaxTip(alter,donttimer){
    // 这里需要做一个 10秒判断，10秒后如果还没隐藏 话 说明网络有问题，
    if(alter==undefined) alter="<font style='font-size:16px;'>loading...</font>";
    ajaxtip =  $.dialog({
        id: 'ajaxtip',
        title: "数据交互中",
        fixed: true,
        lock: true,
        cover: true,
        max: false,
        min: false,
        init: function () {
            if(donttimer!==true){
                var that = this;
                var fn = function () {
                    that.content('超时，请刷新或重新提交').time(2);
                };
            
                if(window.timer) clearTimeout(window.timer);window.timer = 0; // 不清楚 则脚本多点几下翻页刷新的时候会很大几率出错
                window.timer = setTimeout(fn, 10000);
            }
        },
        content: alter
    });
}
function AjaxClose(){
    var d=null;
    if(ajaxtip!=null){
        if(window.timer)clearTimeout(window.timer); window.timer = 0;
        d=ajaxtip.get('ajaxtip',1);
    }
    if(d!=null)
        d.close();
}
function SaltPassword(pwd){
    if(paypassinit)
        return Ext.MD5(Ext.MD5(pwd)+paypasssed);
    else
        return pwd;
}
function waitrun(){
    $('.mainNav li.dropDown').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

	$('.mNav li.dropDown').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    $('.NmainNav li.dropDown').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
    
    $(".financingCon .close").on('click', function () {  // 这里使用 on 去掉了live ，新版的 jquery不支持 live
        $('.financingWrap').hide();
    });
    //loadUserInfo();
    //initpaypass();
}
function footrun(){
    if(typeof PrivateFootRun =="function"){
        PrivateFootRun();
    }
}
// 将源头对象 src 中有的变量克隆复制一份到 des
// [注意是完全复制一份，占用单独一份内存]
function apply(des,src)
{
    if(des && src){ 
        for(var k in src){ 
            if(typeof src[k] != 'object'){ 
                des[k] = src[k];
            }else{
                if(src[k]){
                    des[k] = {} ;
                    apply(des[k],src[k]); // 递归复制
                } else {
                    des[k] = src[k];
                }
            }
        }
    }
}
function applyIf(des,src)
{
    if(des && src){ 
        for(var k in src){ 
            if(typeof src[k] != 'object'){ 
                if(typeof des[k]=='undefined')des[k] = src[k];
            }else{
                if(src[k]){
                    if(typeof des[k]=='undefined') des[k] = {} ;
                    applyIf(des[k],src[k]); // 递归复制
                } else {
                    if(typeof des[k]=='undefined') des[k] = src[k];
                }
            }
        }
    }
}
///初始化  每个网页的头尾
function initComm(){
    // 下面设定凡是使用 ajax 教育，均显示遮罩
	
    if(document.body.getAttribute('nomask')==1){
        // 设置不要遮罩
    } else {
        $(document).ajaxStart(function(a,b,c){
            AjaxTip();
        }).ajaxStop(function(){
            AjaxClose();
        }); 
    }
}
//显示微信绑定二维码
function showwxbd(){
    GD.loadJson("/?m=User&s=WxQrcode",function(json){
        if(json.r==1){
            $.dialog({
                title:"扫描二维码关注微信服务号",
                lock: true,
                background: '#000', /* 背景色 */
                opacity: 0.5,       /* 透明度 */
                content: '<img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+json.ticket+'" width="430" height="430" />',
                icon: 'error.gif'
            });
        }else{
            if(json.msg)
                $.dialog.alert(json.msg);
        }
    })
}
function isNumeric(v) {
    if (typeof v == 'number') return true;
    if (typeof v !== 'string') return false;
    if (v === '') return false;
    if (!isNaN(v*1)) return true;
    return false;

}

///Tabl切换
function nTabs(thisObj,Num,callback){
    if(thisObj.className == "on")return;
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("li");
    for(i=0; i <tabList.length; i++)
    {
        if (i == Num)
        {
            thisObj.className = "on"; 
            document.getElementById(tabObj+"_Content"+i).style.display = "block";
            if (typeof callback == "function")
                callback(i);
        }else{
            tabList[i].className = "sta"; 
            document.getElementById(tabObj+"_Content"+i).style.display = "none";
        }
    } 
}
///Tabl图片切换
function nTabsm(thisObj,Num){
	if(thisObj.className == "on")return;
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	for(i=0; i <tabList.length; i++) {
		if (Num == 1) {
				 $("#imgPage").hide();
		} else {
		 $("#imgPage").show();
		}
					
		if (i == Num)
		{
			thisObj.className = "active"; 
						document.getElementById(tabObj+"_Content"+i).style.display = "block";
		}else{
			 tabList[i].className = "sta"; 
			document.getElementById(tabObj+"_Content"+i).style.display = "none";
			}
		  }
	 }

//获取url中的某个参数
function getParam(name){
    var search = document.location.search;
    if(!name) return search ;
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if(null != matcher){
            try{
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
            }catch(e){
                    try{
                            items = decodeURIComponent(matcher[1]);
                    }catch(e){
                            items = matcher[1];
                    }
            }
    }
    return items;
}

// 将 json 中的节点复制给对应的 dom 
// 要求 dom 的 id 和 json 中的节点名称完全一致
function SetJsonValue(json,obj,fname){
    if(obj==null || obj == undefined)
        obj=$(document);
    if(fname==null || fname == undefined)
        fname="";     
    for(var name in json){
        if (typeof json[name] == "number" || typeof json[name]=="string"){
            if(document.getElementById(name))  $("[id='"+name+"']",obj).text(json[name]);
            if(fname!='' && document.getElementById(fname+name))  $("[id='"+fname+name+"']",obj).text(json[name]);
        }else if( typeof json[name] =="object"){
            SetJsonValue(json[name],obj,name+".");
        }
    }
}

// 将 json 中的节点复制给对应的 dom 
// 要求 dom 的 id 和 json 中的节点名称完全一致
function SetJsonHtml(json,obj){
    if(obj==null || obj == undefined)
        obj=$(document);
    for(var name in json){
        if( typeof json[name] =="object"){
                SetJsonValue(json[name],obj);
        }else if (typeof json[name] == "number" || typeof json[name]=="string"){
             $("[id="+name+"]",obj).html(json[name]);
        }
    }
}

/**
 * 普通ajax表单提交
 * @param {Object} form
 * @param {Object} callback
 * @param {String} confirmMsg 提示确认信息
 */
function validateCallback(form, callback, confirmMsg) {
    var $form = $(form);
    if (!$form.valid()) {
        return false;
    }
    if($("#wytxpwd").length > 0)
    {
        $("#wytxpwd").val(Ext.MD5($("#wytxpwd").val()));
    }
    var sdata=$form.serializeArray();
    for(var i in sdata){
       if(sdata[i].name != undefined && sdata[i].name=='pwd')
        sdata[i].value=SaltPassword(sdata[i].value);
    }
    
    var _submitFn = function () {
        $.ajax({
            type: form.method || 'POST',
            url: $form.attr("action"),
            data: sdata,
            dataType: "json",
            cache: false,
            success: callback || ajaxDone,
            error: ajaxError
        });
    }

    if (confirmMsg) {
        $.dialog.confirm(confirmMsg, _submitFn );
    } else {
        _submitFn();
    }

    return false;
}
function __mytips( content, time, icon,title, callback )
{
    var reIcon = icon ? function(){
        this.DOM.icon[0].innerHTML = '<img src="' + this.config.path + 'skins/icons/' + icon + '" class="ui_icon_bg"/>';
        this.DOM.icon[0].style.display = '';
        if( callback ) this.config.close = callback;
    } : function(){
        this.DOM.icon[0].style.display = 'none';
        if( callback ) this.config.close = callback;
    };
    var retitle=title?title:"提示信息";
    return $.dialog({
        id: 'Tips',
        title: retitle,
        cover: true,
        max: false,
        min: false,
        fixed: true,
        lock: true,
        resize: false
    })
    .content(content)
    .time(time || 1.5, reIcon);
}
function __redirect(url){
    if (!/*@cc_on!@*/0) {            
        window.open(url,'_blank');        
    } else {            
        var a = document.createElement('a');            
        a.href = url;            
        a.target = '_blank';            
        document.body.appendChild(a);            
        a.click();        
    }
}
function PostCallback(sdata,action, callback, confirmMsg) {
    for(var i in sdata){
       if(sdata[i].name != undefined && sdata[i].name=='pwd')
        sdata[i].value=SaltPassword(sdata[i].value);
    }
    
    var _submitFn = function () {
        $.ajax({
            type: 'POST',
            url: action,
            data: sdata,
            dataType: "json",
            cache: false,
            success: callback || ajaxDone,
            error: ajaxError
        });
    }

    if (confirmMsg) {
        $.dialog.confirm(confirmMsg, _submitFn );
    } else {
        _submitFn();
    }

    return false;
}
function ajaxError(xhr, ajaxOptions, thrownError){
    if ($.dialog) {
        $.dialog.alert("<div>Http status: " + xhr.status + " " + xhr.statusText + "</div>" 
            + "<div>ajaxOptions: "+ajaxOptions + "</div>"
            + "<div>thrownError: "+thrownError + "</div>"
            + "<div>"+xhr.responseText+"</div>");
    } else {
        alter("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:"+thrownError + "\n" +xhr.responseText);
    }
}
    
function  ajaxDone(json){
    if(json && json !== undefined){
        if(json.r == "0") {
            if(json.msg && $.dialog) $.dialog.alert(json.msg);
        } else {
            if(typeof json=='string' && $.dialog){ 
                $.dialog.tips(json,5,'tips.gif') ;
            } else {
                if(json.err && $.dialog) $.dialog.tips(json.err,5,'tips.gif') ;
                else if(json.msg && $.dialog) $.dialog.tips(json.msg,5,'tips.gif') ;
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////
function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}
function setCookie(name,value)
{
    var Days = 1;
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function loadPanelInfo(url,obj,callback){
    $.ajax({
            url:  url,
            type: "post",//默认post
            dataType:"json",
            success: function (json) {
               if(json.r !=undefined && json.r==1){
                    SetJsonValue(json.data,obj);
               } 
                 if( typeof callback == "function")
                 {
                     callback(json);
                 }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        }); 
}
function loadJs($src,tongjiid)
{
    if(tongjiid==undefined) tongjiid="_tongji_js";
    var oHead = document.body; 
    var obj = document.getElementById(tongjiid);
    var oScript= document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src=$src;
    if(obj && obj!=undefined)  {
        obj.appendChild(oScript);
    }else{
        oHead.appendChild(oScript);
    }
}
function loadArea(areaId,areaType) {
	//if(areaType=='')return;
    $.post(ajaxurl,{'areaId':areaId.value},function(data){
        if(areaType=='city'){
           $('#'+areaType).html('<option value="-1">市/县</option>'); // 清空选中一个省份的时候清空市区
           $('#area').html('<option value="-1">镇/区</option>');      // 清空城区
        }else if(areaType=='area'){
           $('#'+areaType).html('<option value="-1">镇/区</option>');
        }
        // 遍历显示
        if(data){
            var _check = ' selected ';    // 这个变量用来保证第一个被选中
            $.each(data,function(no,items){
                $('#'+areaType).append('<option value="'+items.id+'" '+_check +'>'+items.name+'</option>');
                _check ='';
            });
            if($(areaId).data("city")){
              $("#"+areaType+" option").each(function(){ 
                if($(this).text() == $(areaId).data("city")){ 
                $(this).attr("selected", true);
                }
              });
              $(areaId).removeData("city"); 
            }
        }
    });
}

    var tabIndex;
    function SelectTop(index){
        $("#li_nav li").eq(index-1).toggleClass("li3");
    }
    function SelectMenu(index) {
        setCookie("Mindex",index);
        for (i = 1; i <= 6; i++) 
        {
            if (i == index)
                continue;
            if (document.getElementById("sub_menu_" + i) && document.getElementById("sub_menu_" + i).style.display != "none")
                document.getElementById("sub_menu_" + i).style.display = "none";
                
            if(i == tabIndex)
                continue;
                
            if (document.getElementById("menu_" + i) && document.getElementById("menu_" + i).className != "mainmenu")
                document.getElementById("menu_" + i).className = "mainmenu";
         }
 
        if (document.getElementById("sub_menu_" + index) && document.getElementById("sub_menu_" + index).style.display != "block")
            document.getElementById("sub_menu_" + index).style.display = "block";
        else if(tabIndex == 0) 
            document.getElementById("sub_menu_1").style.display = "block";
            
        if (document.getElementById("menu_" + index) && document.getElementById("menu_" + index).className != "CurMenu") {
            document.getElementById("menu_" + index).className = "CurMenu";
        }
    }
    
    function HideAllMenu() 
    {
        for (i = 1; i <= 6; i++) {
            if (i == tabIndex)
                continue;
            if (document.getElementById("sub_menu_" + i) && document.getElementById("sub_menu_" + i).style.display == "block")
                document.getElementById("sub_menu_" + i).style.display = "none";
            if (document.getElementById("menu_" + i) && document.getElementById("menu_" + i).className != "mainmenu")
                document.getElementById("menu_" + i).className = "mainmenu";
        }
         if (document.getElementById("sub_menu_" + tabIndex))
            document.getElementById("sub_menu_" + tabIndex).style.display = "block";
         else
            document.getElementById("sub_menu_"+curindex).style.display = "block";
        
          if (document.getElementById("menu_" + tabIndex) && document.getElementById("menu_" + tabIndex).className != "CurMenu") 
            document.getElementById("menu_" + tabIndex).className = "CurMenu";
    }
      
    function HideMenu(e, subMenuElementID)
    {
        if(!isMouseToSubMenu(e, subMenuElementID))
        HideAllMenu();
    } 
    
    function HideSubMenu(e, handler)
    {
        if(isMouseLeaveOrEnter(e, handler))
        {
 
        HideAllMenu();
        }
    } 
    
 
    function isMouseLeaveOrEnter(e, handler)
    {
      if (e.type != 'mouseout' && e.type != 'mouseover') return false;
       var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
       while (reltg && reltg != handler)
                 reltg = reltg.parentNode;
       return (reltg != handler);
    }
 
    function isMouseToSubMenu(e, subMenuElementID)
    {
     if (e.type != 'mouseout')
        return false;
     var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
     while(reltg && reltg.id != subMenuElementID)
        reltg = reltg.parentNode;
       
      return reltg;
    }
    
    var interval = 1000; 
// 显示倒计时
function FormatSecond(sec){
    if(sec<=0) return '已过期';
    var _day = Math.floor(sec/(24*3600));
    if(_day)_day = _day + '天' ;else _day='';
    var _hour = Math.floor( (sec % (24*3600)) / 3600 ) ;
    if(_hour)_hour = _hour + '小时';else _hour='';
    var _min = Math.floor( (sec % 3600) / 60 ) ;
    if(_min)_min = _min + '分';else _min='';
    var _sec = Math.floor( sec % 60 ) ; 
    _sec = '<font color=red>'+_sec+'</font>'+ '秒';
    return _day+_hour+_min+_sec;
}
// 显示倒计时
function ShowDJS(id,sec){
    var _dom  = document.getElementById(id);
    if(_dom) { 
        _dom.innerHTML = FormatSecond(sec);
    }
    --sec;
    setTimeout("ShowDJS('"+id+"',"+sec+");",1000);
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
function moneyStr2(v, rd, _fix) {
    v = v * 1;
    if (typeof rd != 'number') rd = 2;
    if (typeof _fix != 'string') _fix = ' 元';
    if (v < 0) _fix = ' <font color=red>元</font>';
    if (-1000 < v && v < 1000) {
        return v.formatMoney(rd, '') + _fix;
    } else if (-10000 < v && v < 10000) {//小于0.5M 就显示K1024*512
        return "<font color=black >" + v.formatMoney(rd, '') + " </font>" + _fix;
    } else if (-100000 < v && v < 100000) {
        return "<font color=black title='" + (v / 10000).toFixed(rd) + "万'>" + v.formatMoney(rd,'') + " </font>" + _fix;
    } else {
        return "<font color=#DC143C title='" + (v / 10000).toFixed(rd) + "万'>" + v.formatMoney(rd, '') + " </font>" + _fix;
    }
};
// 只有正负颜色预警 适合财务用
function moneyStr3(v, rd, _fix) {
    v = v * 1;
    if (typeof rd != 'number') rd = 2;
    if (typeof _fix != 'string') _fix = ' 元';
    if (v < 0) return '<font color=red>' + v.formatMoney(rd,'') + '元</font>';
    return v.formatMoney(rd, '') + _fix;
};
String.prototype.isIn = function (cont, fh) {
    if (typeof (fh) != "string") fh = ",";
    cont = fh + cont + fh; cont = cont.toLowerCase();
    var s = fh + this + fh; s = s.toLowerCase();
    if (cont.indexOf(s) == -1) return false; return true;
};
// 创建cookie  3个参数，一个是cookie的名称，一个是值 ,一个是周期
function setCookie(name,value,days) 
{ 
    if(!days) days =365 ;// 默认一年
    var exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
 
/*获取cookie*/
function getCookie(name)
{
        if(document.cookie.length>0){
           c_start=document.cookie.indexOf(name + "=")
           if(c_start!=-1){ 
             c_start=c_start + name.length+1 
             c_end=document.cookie.indexOf(";",c_start)
             if(c_end==-1) c_end=document.cookie.length
             return unescape(document.cookie.substring(c_start,c_end))
           }
        }
        return "";
}