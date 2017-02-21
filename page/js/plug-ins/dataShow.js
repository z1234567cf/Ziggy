/**
 * Created by Administrator on 2016/11/9.
 */
var data_show={
    size:5,//显示行数，每页几行
    width:14,
};
var  data_name_match={
        province:"省",
        city:"市",
        area:"区/县",
        icp_beian:"icp备案号",
        icp_xuke:"icp许可",
        police_beian:"警方备案",
        serve_mobile:"服务电话",
        public_weixin:"微信账号",
        addr:"办公地址",
        pt_desc:"平台介绍",
        manage_desc:"高管简介",
        company_name:"公司名称",
        com_reg_num:"营业执照注册号",
        legal_person:"法人代表",
        boss:"股东",
        name:"平台名称",
        apr:"年化收益",
        url:"链接",
        background:"背景",
        bus_model:"车贷",
        begin_time:"上线时间",
        rongzi:"融资情况",
        jianguan:"监管协会",
        bz_model:"保障模式",
        logo:"logo",
        cred_img:"证件照",
        com_img:"公司实景图",
        is_cunguan:"是否存管",
        cg_bank:"存管银行",
        is_open:"是否开放",
    };
var data_id={

};
var modifDate={

};
    //显示内容的函数

function creat_c(a,b,j,id,data,_div,bloean) {
    //只要建造一个就放在for循环外面
    var _7=arguments[7],_8=arguments[8],_9=arguments[9],_10=arguments[10],_11=arguments[11],_12=arguments[12],_13=arguments[13];
    function _reapt_switch(p,data,j,span) {
        switch ( p["index"]){
            case 0:
                p.html("<span>"+data_name_match[_7]+"</span>"+":");
                span.text(data[j][_7]);
                span.data("data_id",_7);
                p.append(span);
                break;
            case 1:
                p.html("<span>"+data_name_match[_8]+"</span>"+":");
                span.text(data[j][_8]);
                span.data("data_id",_8);
                p.append(span);
                break;
            case 2:
                p.html("<span>"+data_name_match[_9]+"</span>"+":");
                span.text(data[j][_9]);
                span.data("data_id",_9);
                p.append(span);
                break;
            case 3:
                p.html("<span>"+data_name_match[_10]+"</span>"+":");
                span.text(data[j][_10]);
                span.data("data_id",_10);
                p.append(span);
                break;
            case 4:
                p.html("<span>"+data_name_match[_11]+"</span>"+":");
                span.text(data[j][_11]);
                span.data("data_id",_11);
                p.append(span);
                break;
            case 5:
                p.html("<span>"+data_name_match[_12]+"</span>"+":");
                span.text(data[j][_12]);
                span.data("data_id",_12);
                p.append(span);
                break;
            case 6:
                p.html("<span>"+data_name_match[_13]+"</span>"+":");
                span.text(data[j][_13]);
                span.data("data_id",_13);
                p.append(span);
                break;
            default:
                break;
        }
    }
    if(a>1){
        var divShellp=$("<div class='divShellp'></div>");
        if(!bloean){//布尔值如果为true就不加入到显示板块
            b.append(divShellp);
        }
    };
    //这段代码可以优化 2016/11/11
    //添加到隐藏板块
    if(bloean&&a>1){
        var divD=$("<div></div>");//外面已经循环了 所以不需要再在自己创造了
        if(id=="company"){
            divD.css({"width":"35%",})
        }else if(id=="picture"){
            divD.css({"width":"35%",})
        }
        else if(id=="icp"){
            divD.css({"width":"15%",})
        }
        else if(id=="bank"){
            divD.css({"width":"15%",})
        }
        divD.css({"float":"left",});
        for (var k=0;k<a;k++){
            var  p=$("<p></p>");
            if(id=="company"){
                p.css({"display":"block"})
            }else if(id=="picture"){
                p.css({"display":"inline-block"})
            }
            else if(id=="icp"){
                p.css({"display":"block"})
            }
            else if(id=="bank"){
                p.css({"display":"block"})
            }
            var span=$("<span class='value'></span>");
            p.css({"margin":"0 20px",});
            p["index"]=k;
            _reapt_switch(p,data,j,span);
                span.click(spanChange);
                divD.append(p);
        }
                _div.append(divD);
    }
    for (var i=0;i<a;i++){
      var  p=$("<p></p>");
        //p.css({"height":"100px","border-left":"1px solid #0e90d2","border-right":"1px solid #0e90d2"});
        var span=$("<span class='value'></span>");
        p["index"]=i;
        if(a>1){
            _reapt_switch(p,data,j,span);
                divShellp.append(p);

        }else if(a==1){
            var divShellp=$("<div class='divShellp'></div>");
            p.html("<span>"+data_name_match[id]+"</span>"+":");
            span.text(data[j][id]);
            span.data("data_id",id);
            p.append(span);
            // p.text(data_name_match[id]+":"+data[j][id]);
            divShellp.append(p);
            b.append(divShellp);
        }
        span.click(spanChange);
    }
    //这段代码可以优化
    //$(".data_body").append(b);
}
//这是一个span变input的功能模块 可以加工一下变插件是个插件
function spanChange() {
    var input=$("<input type='text'/>");
    var _this=this;//通过事件的接口；
    input.attr("placeholder",$(this).text());
    //input.val($(this).text());
    $(_this).after(input);
    input.focus();
    $(_this).detach();
    input.blur(function () {
        $(this).after( $(_this));
        var val=$(this).val()||$(this).attr("placeholder");
        $(_this).text(val);
        $(this).remove();
    })
}
//显示框插件
function _height_alertContent(a,b){
    //top最顶级的window对象，
    //console.log("top");
    //console.log(top.$("body"));//top下的jq
    var mask=top.document.createElement("div");
    var content=top.document.createElement("div");
    var p=top.document.createElement("p");
    var div=top.document.createElement("div");
    var buttonSure=top.document.createElement("input");
    buttonSure.setAttribute("type","button");
    buttonSure.setAttribute("value","确定");
    top.Element.prototype.textM=function (a) {
        if(!a){
            return this.innerText!=""?this.innerText:this.textContent;
        }else{
            if(this.innerText){
                return this.innerText=a
            }else{
                 return this.textContent=a
            }
        }

    };
    p.textM(a);
    div.textM(b);
    buttonSure.style.outline="none";
    buttonSure.style.border="1px solid #ADAD9B";
    buttonSure.style.position="absolute";
    buttonSure.style.right="40px";
    buttonSure.style.bottom="30px";
    p.style.borderBottom="1px solid #ADAD9B";
    p.style.height="24px";
    p.style.lineHeight="24px";
    p.style.marginLeft="20px";
    p.style.marginRight="20px";
    div.style.margin="10px 20px";
    div.style.lineHeight="60px";
    mask.appendChild(content);
    var body=top.document.getElementsByTagName("body")[0];
    body.appendChild(mask);
    mask.style.position="fixed";
    mask.style.top="0";
    mask.style.left="0";
    mask.style.height="100%";
    mask.style.width="100%";
    //mask.style.backgroundColor="black";
    content.style.position="absolute";
    content.style.top="50%";
    content.style.left="50%";
    content.style.height="200px";
    content.style.width="300px";
    content.style.marginLeft="-150px";
    content.style.marginTop="-100px";
    content.style.backgroundColor="white";
    content.style.border="1px solid #ADAD9B";
    div.appendChild(buttonSure);
    content.appendChild(p);
    content.appendChild(div);
    buttonSure.onclick=function () {
        body.removeChild(mask);
    }
}
function modifyDateEach() {
    var id=$(this).data("data_id");
    var val=$(this).text();
    modifDate[id]=val;
}
function modifyDate(e) {
    var e=e||event;
    e.stopPropagation();
    var parents=$(this).parent(),parentsBor=parents.next(),ptid=parents.data("data_id");
    modifDate["ptid"]=ptid;
    //console.log(parents,parentsBor);
    parents.find(".value").each(modifyDateEach);
    parentsBor.find(".value").each(modifyDateEach);
    $.ajax({
            type:"POST",
            dataType:"json",
            data:modifDate,
            url:"http://120.24.43.90/?m=Wd&s=saveWd",
            success:function (msg) {
                _height_alertContent("添加提示：","添加成功");
            },
            error:function (msg) {
                console.log(msg);
            }
    })
}
function create(data) {
        var _ulShell=$("<div></div>");
        $(".data_body").append(_ulShell);
    var limit=data.length<data_show.size?data.length:data_show.size;
    for(var j=0;j<limit;j++){
        var _ul=$("<div></div>"),_div=$("<div></div>"),_div2=$("<div></div>"),_div3=$("<div></div>");
        _ulShell.append(_ul);
        _ul.data("data_id",data[j]["ptid"]);
        _div.css({"backgroundColor":"#D2D2CF","width":"100%","height":"200px","display":"none","position":"relative"});
        _div3.text("确定添加");
        _div3.css({"position":"absolute","top":"0","left":"130px","border":"1px solid #D0D2C1"});
        _ul.after(_div);
        _ul.append(_div2);
        _ul.append(_div3);
        _div2.css({"backgroundColor":"#B3D297","width":"15px","height":"15px","position":"absolute","top":"0","left":"0"});
        _ul.css({"position":"relative"});
        _div3.click(modifyDate);
        //闭包调用
        _div2.click((function (a) {
            function slidde(e) {
                var e=e||event;
                a.slideToggle("slow");
                e.stopPropagation();
            }
            return slidde;
        })(_div));
        _ul.click((function (a) {
            function slidde(e) {
                var e=e||event;
                a.slideToggle("slow");
            }
            return slidde;
        })(_div));
        $(".data_headFul li").each(function () {
            var id=this.id;
           if(this.id=="site"){
               creat_c(3,_ul,j,id,data,_div,false,"province","city","area");
           }else if(this.id=="icp"){
               creat_c(3,_ul,j,id,data,_div,true,"icp_beian","icp_xuke","police_beian");
           }else if(this.id=="contact"){
               creat_c(2,_ul,j,id,data,_div,false,"serve_mobile","public_weixin");
           }else if(this.id=="company"){
               creat_c(7,_ul,j,id,data,_div,true,"addr","pt_desc","manage_desc","company_name","com_reg_num","legal_person","boss");
           }else if(this.id=="picture"){
               creat_c(3,_ul,j,id,data,_div,true,"logo","cred_img","com_img");
           }
           else if(this.id=="bank"){
               creat_c(3,_ul,j,id,data,_div,true,"is_cunguan","cg_bank","is_open");
           }
           else {
               creat_c(1,_ul,j,id,data,_div,false);
           }
        });
        _ul.find("p").click(function (e) {
            var e=e||event;
            e.stopPropagation();
        });
    }
}

function page(jqO1,jqO2,indexTotal,pageSize,nowIndex) {
    jqO1.children().remove();
    var _ulSfoot=$("<ul class='foot_shell'></ul>");
    jqO1.append(_ulSfoot);
    jqO2.text("共计"+indexTotal+"页");
    if(indexTotal>10&&nowIndex>3){
        var j=(nowIndex+7)<indexTotal?(nowIndex+7):indexTotal;
        for(var i=nowIndex-3;i<=j;i++){
            var li=$("<li></li>"),a=$("<a></a>");
            li.index=i;
            li.append(a);
            if(i==nowIndex){
                li.css({"backgroundColor":"blue"})
            }
            a.text("第"+i+"页");
            _ulSfoot.append(li);
            li.click(shell(i,pageSize));
        }
    }else {
        var j=indexTotal<=10?indexTotal:10;
        for(var i=1;i<=j;i++){
            var li=$("<li></li>"),a=$("<a></a>");
            li.index=i;
            li.append(a);
            if(i==nowIndex){
                li.css({"backgroundColor":"blue"})
            }
            a.text("第"+i+"页");
            _ulSfoot.append(li);
            li.click(shell(i,pageSize));
        }
    }
}
//a代表第几页 b是每页有几条这是接口函数
function ajaxD(a,b) {
    $.ajax(
        {
            type:"GET",
            dataType:"json",
            url:"http://120.24.43.90/?m=Wd&s=wdList&pageSize="+b+"&pageIndex="+a,
            success:function (msg) {
                $(".data_body").children().remove();
                var _data=msg.data;
                data_show.toal=msg.total;
                data_show.index=Math.ceil(data_show.toal/data_show.size);
                page( $(".data_foot_yema"), $("#total_page"),data_show.index,data_show["size"],a);
                //便利传过来的JSON数据中的id;
                // for(var item in msg.data[0]){
                //     data_id[item]=item;
                // }
                console.log(msg);
                create(_data);
            }
        }
    )
}
function shell(a,b) {
    function ajaxIn() {
        ajaxD(a,b);
    }
    return ajaxIn;
}
function clickHandle(){
    if(this.id=="first"){
        page( $(".data_foot_yema"), $("#total_page"),data_show.index,data_show["size"],1);
        ajaxD(1,data_show["size"])
    }else {
        page( $(".data_foot_yema"), $("#total_page"),data_show.index,data_show["size"],data_show.index);//输入的总页数
        ajaxD(data_show.index,data_show["size"])
    }
}
function jumpHandle() {
        var value=$(".jump").val();
         var val=value-0;
    if(typeof val=="number"&&val>0&&val<=data_show.index){
        ajaxD(val,data_show["size"]);
        // $.ajax(
        //     {
        //         type:"GET",
        //         dataType:"json",
        //         url:"http://120.24.43.90/?m=Wd&s=wdList&pageSize="+data_show["size"]+"&pageIndex="+val,
        //         success:function (msg) {
        //             var _data=msg.data;
        //             data_show.toal=msg.total;
        //             data_show.index=Math.ceil(data_show.toal/data_show.size);
        //             $(".data_body").children().remove();
        //             page( $(".data_foot_yema"),$("#total_page"),data_show.index,data_show["size"],val);
        //             create(_data);
        //         }
        //     }
        // );

    }else{
        alert("请输入正确的数字！")
    }
}
function readyHandle() {
    ajaxD(1,data_show["size"]);
    $("#first").click(clickHandle);
    $("#last").click(clickHandle);
    $("#jump").click(jumpHandle);
}
$(document).ready(readyHandle);