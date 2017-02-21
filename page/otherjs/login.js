function _redirect(){
    ++_oknum  ;
    // window.json.havezh 表示是服务器告之否有转换 [适合老系统的老帐号]
    if(window.json.havezh==1){
        $.dialog.tips("老账号转换成功。",5,'tips.gif') ; 
        
        $.ajax({
            dataType:'text',
            url:'/api/t.php?ti='(new Date()).getTime(),
            cache:false,
            async:false,//同步请求
            success:_redirect,
            error:function(){
                $.dialog.tips("网络异常",5,'tips.gif');
            }
        });  
    }
    
    if(window.json.lastscript) {
        $.getScript( window.json.lastscript , _gogo ) ;
    } else {
        _gogo();
    }
}
function _gogo()
{
    var _redurl = document.referrer?document.referrer : '/';
    if(window.json && window.json.GOURL)
    {
        if(window.json.GOURL!="" && window.json.GOURL !="/")
            _redurl = window.json.GOURL;
    }

    _redurl = _redurl.replace(document.location.protocol+'//'+document.location.host,'') ;
    
    if(_redurl == 'index.php' || _redurl == 'index.php' || _redurl == '/' || _redurl == '' || _redurl == "/ind/register.html" || _redurl == "register.html"){ 
        _redurl = '/page/ucenter.html' ;
    }
    window.location.href = _redurl;
}
function slatcdpass(_pass,_cd,_salt)
{ 
    return Ext.MD5(Ext.MD5(Ext.MD5(_pass)+_salt)+_cd) ;
}
function post(step){
    if(step=='old'){
        $('#password').attr("value",$('#password1').attr("value"));
    }else{  // 获得 cd 
        if(step==1){    // 第一步 获得 cd
            window._oknum = 0; 

            GD.loadJson({url:"/?m=&s=getcd",data:{'username':$('#username').attr("value")}},function(json){
                // json = {cd:'',salt:''}
                $('#password').attr("value",slatcdpass($('#password1').attr("value"),json.cd,json.salt));
                post(2); // 第二步 登陆
            }); 
            return false;
        }else if(step!=2){ 
            return false;
        }
        //
    }
    var _s = $('#form1').attr('s');
    if(!_s) _s = 'login';
    GD.Post("/?m=&s="+_s+"&ismd5="+(step=='old'?'0':'1'),'form1',function(json){
        if(!json)return false;
        window.json = json;
        if(json.isold==1){
            post('old');
        }else if(json.script) {
            for(var i=json.script.length-1;i>=0;i--){ 
                if( self.location.href.substr(0,8) == 'https://') { 
                    json.script[i]= json.script[i].replace('http://','https://'); 
                }
                if(i==0)
                    $.getScript( json.script[i] , _redirect ) ;
                else 
                    $.getScript( json.script[i]) ;
            }
            setCookie('luser',$('#username').attr("value")) ;
            AjaxTip("登录校验跳转中... ",true) ; 
        } else {
            ajaxDone(json);
        }
    }); 
    
    return false;
};
var _ResetCookieUserName=function(){ 
    var _luser = getCookie('luser');
    if(_luser)$('#username').attr("value",_luser) ;
}