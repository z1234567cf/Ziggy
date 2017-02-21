/*
*  真正开始执行具体js代码是从这里开始的
*  到这里必须是其他 js 类库等函数均已经加载完成
*  
*  说明：
*     .全局类变了 GD 可以获取数据
*     .默认最开始就会联系服务器获得基本数据
*      基本数据有
*      GD.uid        当前用户 uid 
*      GD.un         账号名
*      GD.uname      姓名
*      GD.cid        分站 id
*      GD.cname      分站名称
*      GD.uname_kefu 所属客服名
*      GD.uid_kefu   所属客服的uid
*            
*      GD.json        本次数据的完整 json
*/
var _gaq = [];     // 点击大菜单的时候会王这里添加点击 对象 
/*  
    全局设置的变量放到了 ind/js/set.js 中       
*/
//显示最开始的最新标信息2013-9-3
$(document).ready(function(){
    if( window._SITE && _SITE._title ){ 
        if(document.body.getAttribute('havetitle') != '1'){
            document.title = _SITE._title;
        }
    }
    var _url = document.location.pathname.toLowerCase(); 
    if(_url.substr(0,11) == '/index.html' || _url == '/'){
        $("#header").load('/ind/header_index.html',waitrun);
    }else if(_url.substr(0,6) == '/forum'){
        $("#header").load('/ind/header_bbs.html',waitrun);
    }else{
        $("#header").load('/ind/header.html',waitrun);
    }
    $("#footer").load('/ind/footer.html',footrun);
    
    window.GD = new syncData();   
    initComm();
    
    var _needLoad = true;
    if(typeof doFirst == 'function') {
        _needLoad = doFirst();
    } 
    if(!GD._loadnum && _needLoad !== false){ // 如果 doFirst 中调用过了 load , 那么  _loadnum=1
        GD.init("/?m=HomeBase&s=def");
        GD.load(0);
    }
    $('#_siten').html(_SITE._sitename);
    if(typeof i_OVER == 'function') i_OVER();   
    // 存在推荐人输入框的话则强制连接服务器获取 
    jugetjr($('#tjr').is('input') ? true : false);// false 表示不强制，如果有设置推荐则去提交服务器，没有设置则不做事
});

// isforce 表示是否强制去获取一下推荐人数据
function jugetjr(isforce)
{
    if(!window.GD || GD.ishavejugetjr)return;
    
    var tjr = getParam('tjr'); 
    setTjr(tjr);  
    if(tjr||isforce){ // 如果有设置推荐人的话，这里给服务器上记录一下
        if(!tjr)tjr='';
        GD.loadJson("/?a=regtjr&tjr="+tjr,function(_j){ 
            if(_j && _j.r == 0){  // 不支持推荐人模块
                $("#tjddiv").hide();
                return ;
            }
            if(_j && _j.tjr){ 
                setTjr(_j.tjr);
            }
        });
        GD.ishavejugetjr = 1;
    }
}
// 设置显示推荐人
function setTjr(_tjr)
{
    if(!_tjr )return ;
    $('#tjr').val(_tjr);
    $('#tjr').hide();
    $('#tjrp').hide();
    $('#tjrdes').html(_tjr);
    $('#tjr').css("background", "gray");
    $("#tjr").attr({ readonly: 'true' });
    if($('#tjrdes').length==0)$("#tjddiv").hide(); // 如果没有描述的dom 那么把一行都隐藏
}
 
 