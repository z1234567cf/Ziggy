/**
 * Created by Administrator on 2016/11/16.
 */
var YJ_main={
    "service":[
        {
            "name":"userinfo",
            "content":"用户信息",
            "level":"1",//预留功能接口
            "data":[
                {
                    "name":"信息管理",
                    "url":"url/informationManagement.html",
                    "ifid":"6",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name": "sign",
            "content":"签到",
            "level":"1",//预留功能接口
            "data": [
                {
                    "name":"官方签到",
                    "url":"url/officialAttendance.html",
                    "ifid":"1",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到1",
                    "url":"url/three.html",
                    "ifid":"2",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到2",
                    "url":"url/readingSign.html",
                    "ifid":"3",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到3",
                    "url":"",
                    "ifid":"4",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到4",
                    "url":"",
                    "ifid":"5",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        }
    ],
}
function headMclick() {
    var id=this.id;
    if(YJ_main[id]){
        $(this).parent().find("li").css({"backgroundColor":"","border-radius":"","color":''});
        $(this).css({"backgroundColor":"white","border-radius":"3px","color":'#2380f4'});
        var data=YJ_main[id];
        $("#containMainL_ul").children().remove();
        console.log(1);
        for(var i=0;i<data.length;i++){
            var li=$("<li></li>"),div=$("<div></div>"),img=$("<img src='../youjin/images/user/bc_10.png'>"),span=$("<span></span>");
            span.text(data[i]["content"]);
            li.append(div);
            div.append(img);
            div.append(span);
            $("#containMainL_ul").append(li);
            if(data[i]["data"]){
                var data_data=data[i]["data"];
                var li_ul=$("<ul class='containMainL_ul_ul' style='display: none'></ul>");
                li.after(li_ul);
                //下拉
                li.click((function(li_ul){
                        function ul() {
                            li_ul.toggle();
                        }
                        return ul;
                    })(li_ul));
                for(var j=0;j<data_data.length;j++){
                    var li_ul_li=$("<li></li>"),li_ul_img=$("<img src='../youjin/images/user/bc_18.png'>"),name=data_data[j]["name"];
                    li_ul_li.text(name);
                    li_ul.append(li_ul_li);
                    li_ul_li.append(li_ul_img);
                    if(data_data[j]["data"].length!=0){
                        console.log(data_data[j]["data"]);
                        //给可能的下级数据留的接入口//写入URL的地方
                    }else{
                        var url=data_data[j]["url"],ifid=data_data[j]["ifid"];
                        li_ul_li.data({"url":url,"ifid":ifid,"name":name});
                        li_ul_li.click(li_ul_liHandle);
                    }

                }
            }
        }
    }
}
//框架控制生成函数
function li_ul_liHandle() {
    if($(".navLabel>div").length>=7){
        alert("窗口太多请先关闭窗口");
        return ;
    }
    $(".containMainL_ul .containMainL_ul_ul>li").css({"backgroundColor":"","color":""});
    $(this).css({"backgroundColor":"#ebf3ff","color":"#2380f4"});
    var _li=this,spanBloean=false,divBloean=false;
    $(".navLabel>div").each(function () {
       if(!$(this).data("ifid")){
           $(this).remove();
       }
       $(this).css({"backgroundColor":"#91bff9"});
       if($(this).data("ifid")==$(_li).data("ifid")){
           $(this).css({"backgroundColor":""});
           spanBloean=true;
       }
    });
    $("#iframe>div").each(function () {
        if(!$(this).data("ifid")){
            $(this).remove();
        }
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
            divBloean=true;
        }
    });
    var ifid=$(this).data("ifid"),url=$(this).data("url");
    if(!spanBloean){
        var div=$("<div></div>"),span=$("<span></span>"),img=$("<img src='../youjin/images/user/未标题-6.png'>");
        span.text($(this).data("name"));
        div.click(divLable);
        img.click(imgLable);
        div.append(span);
        div.append(img);
        div.data({"url":url,"ifid":ifid});
        $(".navLabel").append(div);
    }
    if(!divBloean){
        var div2=$("<div></div>"),iframe=$("<iframe frameborder='0'scrolling ='no'></iframe>");
        div2.css({"position":"relative","z-index":"1"});
        div2.data("ifid",ifid);
        iframe.attr("src",url);
        iframe.css({"width":"998px","height":"766px"});
        div2.append(iframe);
        $("#iframe").append(div2);
    }
}
function divLable() {
    var _li=this;
    $(".navLabel>div").css({"backgroundColor":"#91bff9"});
    $(this).css({"backgroundColor":""});
    $("#iframe>div").each(function () {
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
            divBloean=true;
        }
    });
    $(".containMainL_ul_ul>li").each(function () {
        $(this).css({"backgroundColor":"","color":""});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"backgroundColor":"#ebf3ff","color":"#2380f4"});
        }
    });
}
function imgLable(e) {
    var e=e||event;
    e.stopPropagation();
    var _li=this;
    var ifid=$(_li).parent("div").data("ifid");
    console.log(ifid);
    $(_li).parent("div").remove();
    $("#iframe>div").each(function () {
        if($(this).data("ifid")==ifid&&$(this).css("display")=="block"){
           $(this).remove();
            $(".navLabel>div:last-child").trigger("click");
        }else if($(this).data("ifid")==ifid&&$(this).css("display")!="block"){
            $(this).remove();
        }
    });
    //$(".navLabel>div:last-child").trigger("click");
}
function timeDisplay() {
    var week={
        "0":"星期天",
        "1":"星期一",
        "2":"星期二",
        "3":"星期三",
        "4":"星期四",
        "5":"星期五",
        "6":"星期六",
    };
    var data=new Date(),date=data.getDate(),day=data.getDay(),year=data.getFullYear(),hour=data.getHours(),minnute=data.getMinutes(),seconds=data.getSeconds(),month=data.getMonth()+1;
    var dayC=week[day];

    if(minnute<10){
        minnute="0"+minnute;
    }
    if(seconds<10){
        seconds="0"+seconds;
    }
    var k=year+"-"+month+"-"+date+" "+" "+hour+":"+minnute+":"+seconds+" "+dayC;
     $("#timeDisplay").text(k);

}
function readyHandle() {
    $(".headM>li").click(headMclick);
    $("#service").trigger("click");
    setInterval(timeDisplay,600);
}
$(document).ready(readyHandle);