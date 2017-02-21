/**
 * Created by Administrator on 2016/11/7.
 */
$(document).ready(redayHandle);
var data={
};
var length={};
function submitHandle(e) {
    length.count=0;
     length.whole=$("#input_groups>p").length+$("#input_groups>div>p").length-1;
    $("#input_groups input:file").each(shell("请输入","id"));
    $("#input_groups select").each(shell("请选择","id"));
    $("#input_groups input:radio:checked").each(shell("请选择","name"));
    $("#input_groups label>input:text").each(shell("请输入","id"));
    if( length.count==length.whole){
        $.ajax(
            {
                type: "POST",
                url: "http://120.24.43.90/?m=Wd&s=addWd",
                data: data,
                dataType:"json",
                success: function(msg){
                    console.log(msg);
                    alert(msg.msg);
                   window.location="http://120.24.43.90/page/list/addplatform.html";
                },
                error:function () {
                    console.log("error")
                }
            }
        );
    }
    return false;
}
//不存在警告
function warn(a,b) {
    if(!a["swith"]){
        var p=$(a).parents("p"),span=$("<span></span>"),text=p.children("label").children("span").text();
        //p.children("label")调用init对象 也就是
        span.addClass("create");//代表是创造出来的标签
        span.css("color","red");
        span.text(b+text);
        p.append(span);
        a["swith"]=1;
    }
}
//a是文字，b是选择的方式,c是长度计数
function shell(a,b) {
    var a=a,b=b;
    function vertical() {
        var id=$(this).attr(b);
        if($(this).val()){
            length.count++;
            $(this).parents("p").find(".create").remove();
            // if($(this).attr("type")!="file"){
                data[id]=$(this).val();
            // }
        }else{
            warn(this,a)
        }
    }
    return vertical;
}
//省市联动开始
function provinceReady(msg,_this,c,d) {
    if(!_this.swith){
        var length=msg.data.length,data=msg.data;
        for(var i=0;i<length;i++){
           var option=$("<option></option>");
            option.attr("value",data[i]["id"]);
            option.text(data[i]["name"]);
            if(!c&&!d){
                $(_this).append(option);
            }else if(c&&!d){
                c.append(option);
            }else if(d){
                d.append(option);
            }
        }
        if(!c&&!d){
            _this.change(cityHandle);
        }else if(c&&!d){
            c.change(countyHandle);
        }
        _this.swith=1;
    }
}

function provinceHandle(a) {
    var _this=a;
    $.ajax(
        {
            type: "POST",
            url: "http://120.24.43.90/?m=Wd&s=getArea&pid=0",
            dataType:"json",
            success: function(msg){
                //console.log("provinceHandle");
                provinceReady(msg,_this);
            },
            error:function () {
                //alert("error")
            }
        }
    );
}
//闭包开始
function shellHandle(a,b,c) {
    function handle() {
        var value=$(this).val();
        if(value){
            $.ajax(
                {
                    type: "GET",
                    url: "http://120.24.43.90/?m=Wd&s=getArea&pid="+value,
                    dataType:"json",
                    success: function(msg){
                        a.remove();
                        provinceReady(msg,this,b,c)
                    },
                    error:function () {
                        alert("error");
                    }
                }
            );
        }
    }
    return handle
}//没有调用//
function countyHandle() {
    var value=$(this).val();
    if(value){
        $.ajax(
            {
                type: "GET",
                url: "http://120.24.43.90/?m=Wd&s=getArea&pid="+value,
                dataType:"json",
                success: function(msg){
                    $("#area>option:not(:first)").remove();//选择不是第一个子集元素的其他元素//
                    provinceReady(msg,this,$("#city"),$("#area"))
                },
                error:function () {
                    alert("error");
                }
            }
        );
    }
}
function cityHandle() {
    var value=$(this).val();
    if(value){
        $.ajax(
            {
                type: "GET",
                url: "http://120.24.43.90/?m=Wd&s=getArea&pid="+value,
                dataType:"json",
                success: function(msg){
                    var kk=$("#city").children();
                    //console.log( kk);
                    $("#city>option:not(:first)").remove();
                    provinceReady(msg,this,$("#city"))
                },
                error:function () {
                    alert("error");
                }
            }
        );
    }
}
function setHandle() {
    $("input").val("2012/11/22");
}
function redayHandle() {
    $("#input_groups").submit(submitHandle);
    provinceHandle($("#province"));
    $("#set").click(setHandle)
}