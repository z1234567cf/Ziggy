/**
 * Created by Administrator on 2016/12/7.
 */
/*
* 存放可以复用的函数
* */
//数据定义(中间过渡数据)
var relational={
    "star":0,//定义了从那个值开始翻
    "evSize":10,//定义了每页最多显示几个
    "pageIndex":1,//页码数 现在第几页
    "pageCount":"",//页码总数
    "phoneNumberSize":11,//定义了手机的数值长度
    "uid":"",//用户的uid的中间存储地方
    "uid2":"",//坑爹的第二个中间数据存储
    "url":"http://120.24.43.90/",//更换地址
    "corr":"",//判断点击的是新增按钮还是修改
    "if_open":1,//用来判断是否开启启用
    "search":false,//是否使用搜索功能
    "time":"",//给定时器的过渡中间量
};
var youJin={};
//数据初始化
function dataInitialPart() {
    relational.star=0;
    relational.pageIndex=1;
}
/*
 * 元素生成类
 * */
//控制DOM的生成形式单行操作
function operate(data) {
    var corespond=correspondObj();
    var _data=dataClassify(data);
    var parent=$(".table tbody"),tr=$("<tr></tr>");
    parent.append(tr);
    var i,length=_data.length;
    for(i=0;i<length;i++){
        var td=$("<td></td>"),ul=$("<ul></ul>"),_li_span=$("<li></li>"),count=0,_li_span2=$("<li></li>"),count2=0,line_arry=[];
        td.append(ul);
        for (var j=0;j<_data[i].length;j++){
            var span=$("<span></span>"),li=$("<li></li>"),name=_data[i][j]["zcf_name"];
            if(name=="un"||name=="uname"){
                //var span=$("<span></span>");
                if(count==0){
                    span.text(_data[i][j][name]+" ");
                }else{
                    span.text("["+_data[i][j][name]+"]");
                }
                _li_span.append(span);
                count++;
                if(count==2){
                    ul.append(_li_span);
                }
            }else if(name==relational.label){
                // if(corespond[name]){
                //     var _span=$("<span></span>");
                //     _span.text(corespond[name]+":");
                //     li.append(_span);
                // }
                var span=$("<span></span>");
                span.text(" "+_data[i][j][name]);
                li=$("<li style='display: none'></li>");
                li.append(span);
                ul.append(li)
            } else if(name==relational.label2){
                var span=$("<span></span>");
                span.text(" "+_data[i][j][name]);
                li=$("<li style='display: none'></li>");
                li.append(span);
                ul.append(li)
            }else if(name=="zcf_Data"){
                var span=$("<span></span>");
                span.data("data",data);
                li=$("<li style='display: none'></li>");
                li.append(span);
                ul.append(li)
            }else if(name=="zcf_img_url"){//用于处理图片
                var img=$("<img width='50px' height='40px' class='dom_img'/>");
                img.attr("src",_data[i][j][name]);
                // span.data("data",data);
                li=$("<li></li>");
                li.append(img);
                ul.append(li)
            }else if(name=="zcf_content"){//用于处理内容
                var span=$("<span class='dom_content'>请点击查看</span>");
                span.data("data",_data[i][j][name]);//将内容缓存到span对象里面
                li=$("<li></li>");
                li.append(span);
                ul.append(li)
            } else{
                var line_span=$("<span></span>");
                //console.log(_data[i][j]["zcf_name"],";",name);
                //设置不同参数在同行显示相加
                if(name.indexOf('line_')>-1){
                    console.log("line_",j);
                    if(!_data[i][j][name]){
                        continue;
                    }
                    if(corespond[name]){
                        var _span=$("<span></span>");
                        _span.text(corespond[name]+":");
                        line_span.append(_span);
                    }
                    var span=$("<span></span>");
                    span.text(" "+_data[i][j][name]);
                    line_span.append(span);
                    line_arry.push(line_span);
                    if(j==_data[i].length-1){
                        if(line_arry.length===0){
                            continue;
                        }
                        var word='';
                        for(var k=0;k<line_arry.length;k++){
                            if(k==line_arry.length-1){
                                word=word+line_arry[k][0].outerHTML;
                                continue;
                            }
                            word=word+line_arry[k][0].outerHTML+";";
                        }
                        li.html("["+word+"]");
                        ul.append(li);
                        console.log("html",line_arry);
                    }
                }else{
                    if(corespond[name]){
                        var _span=$("<span></span>");
                        _span.text(corespond[name]+":");
                        li.append(_span);
                    }
                    var span=$("<span></span>");
                    span.text(" "+_data[i][j][name]);
                    li.append(span);
                    ul.append(li)
                }
            };
        }
        if(i==0){
            var div=$("<div class='table_unchoice'></div>");
            td.append(div);
            // var _str=_data[0][0]["uid"]+"";
            // div.attr("data-src",_str);
        }
        tr.append(td);
    }

    //抓取span判断文本内容
    youJin.judgeCotent(tr);

    //抓取img设置相应的点击事件
    youJin.domImgEvent(tr);

    //抓取content的相应点击事件
    youJin.domContentEvent(tr);
}
//添加行的点击事件（代表选中与否）并且设置当前UID的值
function trClick(e,DOM) {
    var _this=DOM?DOM:this;
    console.log("trClick","this",_this);
    $(".table tbody tr").css("backgroundColor","");
    var bolean=$(_this).find("td:first-child div").hasClass("table_choice");
    if(bolean){
        $(_this).find("td:first-child div.table_choice").removeClass("table_choice");
        $(_this).css("backgroundColor","");
        relational.uid=undefined;
        relational.uid2=undefined;
        relational.data=undefined;
    }else {
        $("#table .table_unchoice").each(function () {
            $(this).removeClass("table_choice");
        });
        $(_this).find(".table_unchoice").addClass("table_choice");
        $(_this).css("backgroundColor","#d6f2e1");
        var uid= $(_this).find("td:first-child li span").eq(0).text();
        var _uid=$.trim(uid);
        var uid2=$(_this).find("td:first-child li span").eq(1).text();
        var data=$(_this).find("td:first-child li span").eq(2).data("data");
        var _uid2=$.trim(uid2);
        relational.uid=_uid;
        relational.uid2=_uid2;
        relational.data=data;
        // postMesToB(_uid);
        //console.log("_uid",_uid,"_uid2",_uid2,"data",data);
    }
}
//制造option
function domOption(data,bank,name,name2) {
    var length=data.length,
        i;
    var _name1=name||"v";
    var _name2=name2||"name";
    for(i=0;i<length;i++){
        var option=$("<option></option>");
        option.val(data[i][_name1]);
        option.text(data[i][_name2]);
        bank.append(option);
    }
}
/*
 * 翻页功能类
 * */
//显示总页数
function showCountPage(e) {
    var text="总共"+e+"页";
    $("#zcf_cFoot_pageCount").text(text);
}
//判断页码总数
function pageCountJudege(count) {
    var count=+count;
    relational.pageCount=Math.ceil(count/relational.evSize);
}
//页数转换并显示页码数字
function pageChange() {
    relational.star=relational.pageIndex*relational.evSize-relational.evSize;//这里吃了个大亏
    $("#pageSelect").val(relational.pageIndex);
}
//页尾点击函数
function containFootClickHandle(fn,addValue) {
    function containFootClickHandle() {
        if(this.id=="first"){
            relational.pageIndex=1;
            pageChange();
            fn(relational.star,relational.evSize,addValue);
        }else if(this.id=="before"){
            if(relational.pageIndex>1){
                relational.pageIndex--;
                pageChange();
                fn(relational.star,relational.evSize,addValue);
            }
        }else if(this.id=="after"){
            console.log(11);
            if(relational.pageIndex<relational.pageCount){
                relational.pageIndex++;
                pageChange();
                fn(relational.star,relational.evSize,addValue);
            }
        }else if(this.id=="last"){
            relational.pageIndex=relational.pageCount;
            pageChange();
            fn(relational.star,relational.evSize,addValue);
        }
    }
    return containFootClickHandle;
}
//页面跳转功能
function pageSelectJump(fn,searchValue) {
    function pageSelectJump() {
        var val=$("#pageSelect").val()-0;
        if(val>0&&val<=relational.pageCount){
            relational.pageIndex=val;
            pageChange();
            fn(relational.star,relational.evSize,searchValue);
        }else {
            popplug([{},{content:"请输入正确的数字"}]);
            return false;
            //alert("请输入正确的数字");
        }
    }
    return pageSelectJump;
}
//显示每页有几条在页码条的显示位
function eSizeShow(e) {
    $("#zcf_cFoot_count").val(e);
}
//改变全局的relational.evSize值;
function changeEvSize(fn,searchValue) {
    function changeEvSize() {
        var val=$("#zcf_cFoot_count").val();
        if(!isNaN(val)){
            relational.evSize=val;
            relational.pageIndex=1;
            relational.star=0;
            $("#pageSelect").val(relational.pageIndex);
            fn(relational.star,relational.evSize,searchValue);
        }
    }
    return changeEvSize;
}
/*
 * 搜索框功能
 * */
//跳转页的相应的事件解绑
function containFootButtonEventUnbind() {
    //$("#containFoot li").click(containFootClickHandle(ajaxN));
    $("#containFoot li").unbind("click");
    //$("#pageSelectJump").click(pageSelectJump(ajaxN));
    $("#pageSelectJump").unbind("click");
    // $("#zcf_cFoot_pageSelectSure").click(changeEvSize(ajaxN));
    $("#zcf_cFoot_pageSelectSure").unbind("click");
}
function containFootButtonEventBind(fn,searchValue) {
    $("#containFoot li").click(containFootClickHandle(fn,searchValue));
    $("#pageSelectJump").click(pageSelectJump(fn,searchValue));
    $("#zcf_cFoot_pageSelectSure").click(changeEvSize(fn,searchValue));
}
//图片点击搜索函数
function searchImgClickHandle(){
    var val=$("#search input").val();
    if(val){
        relational.search=true;
        judgeSearchVal(val);
        dataInitialPart();
        pageChange();
        containFootButtonEventUnbind();
        containFootButtonEventBind(ajaxSearch,val)
    }else {
        relational.search=false;
        dataInitialPart();
        pageChange();
        containFootButtonEventUnbind();
        containFootButtonEventBind(ajaxN);
        ajaxN(relational.star,relational.evSize);
    }

}
//搜索输入值的判定与发送
function judgeSearchVal(val) {
    //值得判断逻辑预留处

    var val=val;
    console.log("val",val);
    ajaxSearch(relational.star,relational.evSize,val);
    return true;
}
//搜索框聚焦
function searchInputFocus() {
    $(window).unbind("keydown");
    $(window).keydown(searchKeydown);
}
//搜索框失去焦点
function searchInputBlur() {
    $(window).unbind("keydown");
}
//键盘点击事件
function searchKeydown(e) {
    var val=$("#search input").val();
    var e=e||event;
    if(val&&e.which==13){
        //页面数据初始
        relational.search=true;
        judgeSearchVal(val);
        dataInitialPart();
        pageChange();
        containFootButtonEventUnbind();
        containFootButtonEventBind(ajaxSearch,val)
    }else if(!val&&e.which==13){
        relational.search=false;
        dataInitialPart();
        pageChange();
        containFootButtonEventUnbind();
        containFootButtonEventBind(ajaxN);
        ajaxN(relational.star,relational.evSize);
    }
}

/*
 * 修改框相关
 * */
//显示修改框
function showNewPop(id) {
    //console.log("pop");
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        pop=$(_id);
    pop.detach();
    $(body).append(pop);
    pop.addClass("new_pop_show");
}
//隐藏修改框
function hideNewPop(id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        pop=$(body).find(_id);
    //console.log("pop",pop);
    $(pop).detach();
    $(window.document.body).append(pop);
    $(pop).removeClass("new_pop_show");
}
//更改弹出框的提示内容
function changeNewPopHeadTip(_this,id) {
    var text=$(_this).find("span").text(),
        text1=text+"信息";
    var _id=id||"#zcf_new_pop_debitCard";
    $(_id).find(".new_pop_head_tips").text(text1);
    //$("#zcf_new_pop_debitCard .new_pop_head_tips").text(text1);
}
//给弹框赋值
function setPopValue(data,id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        //不包含多选框 多选框另外搞
        pop=$(body).find(_id),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_radio=pop.find(" [data-base]:radio"),
        data_checkbox=pop.find(" [data-base]:checkbox"),
        checkbox_value={},
        data_base_hide=pop.find("[data-baseH]");

    //对选取的元素进行值得设置
    data_base.each(
        function () {
            var item=$(this).attr("data-base"),
                val=$(this).val();
            for(var date_item in data){
                if(item==date_item){
                    $(this).val(data[date_item])
                }
            }
        }
    );

    //单选框的设置
    data_radio.each(
        function () {
            var item=$(this).attr("data-base"),
                val=$(this).val();
            for(var date_item in data){
                if(item==date_item&&val==data[date_item]){
                    $(this).prop("checked",true);
                }
            }
        }
    );

    //多选框的设置
    data_checkbox.each(
        function () {
            var item=$(this).attr("data-base"),
                val=$(this).val();
            if(!checkbox_value[item]){
                checkbox_value[item]=data[item].split(",");
            }
            var i=0,
                length=checkbox_value[item].length;
            for(i=0;i<length;i++){
                if(checkbox_value[item][i]==val){
                    $(this).prop("checked",true);
                }
            }
        }
    );

    //隐藏数值设置
    data_base_hide.each(
        function () {
            var item=$(this).attr("data-baseH");
            $(this).data(item,data[item]);
        }
    );
    //console.log("popset",pop,"data_radio",data_radio)
}
//给UEdtor赋值考虑到异步跟其他赋值分开写
youJin.UEditorSetValue=function (data,id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        iframeOri=$(body).find(".ueditor_iframe")[0].contentWindow,
        iframeChir=$(iframeOri.document.body).find("#ueditor_0")[0].contentWindow,
        par=$(body).find(".ueditor_iframe").parent(".test_far"),
        key=par.attr("data-base"),
        // iframe=par.find("#ueditor_0"),
        // iframeWin=iframe[0].contentWindow,
        ifrBody=iframeChir.document.body;
        ifrBody.innerHTML=data[key];
    // console.log($(body).find(".ueditor_iframe")[0],"iframeOri",iframeOri,"iframeChir",iframeOri.document.body);
    // var data12=new Date();
    // console.log('ajaxmain',data12.getTime());
};
//获取点击保存按钮之后弹框中的值
function getPopValue(id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        data={},
        pop=$(body).find(_id),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_radio=pop.find(" [data-base]:radio:checked"),
        data_checkbox=pop.find(" [data-base]:checkbox:checked"),
        checkbox_value={},
        data_base_hide=pop.find("[data-baseH]");

    //console.log(data_radio,"data_radio",data_base,"data_base");
    //对选取的元素进行值得选取
    data_base.each(
        function () {
            var item=$(this).attr("data-base"),
                val=$(this).val();
            if(!val){
                //    预留 如果只为空要怎么处理
            }
            data[item]=val;
        }
    );

    //单选选中时候的取值
    data_radio.each(function () {
        var item=$(this).attr("data-base"),
            val=$(this).val();
        data[item]=val;
    });

    //多选框的取值
    data_checkbox.each(function () {
        var item=$(this).attr("data-base"),
            val=$(this).val();
        if(checkbox_value[item]){
            checkbox_value[item]=checkbox_value[item]+","+val;
        }else {
            checkbox_value[item]=val;
        }
        data[item]=checkbox_value[item];
    });

    //隐藏项的取值
    data_base_hide.each(function () {
        var item=$(this).attr("data-baseH"),
            val=$(this).data(item);
        data[item]=val;
    });
    return data;
}
//获取UEditor的赋值
youJin.UEditorGetValue=function (id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        iframeOri=$(body).find(".ueditor_iframe")[0].contentWindow,
        iframeChir=$(iframeOri.document.body).find("#ueditor_0")[0].contentWindow,//初次id就是ueditor_0 新增ID会增加 取第一次就只能用ID
        par=$(body).find(".ueditor_iframe").parent(".test_far"),
        key=par.attr("data-base"),
        // iframe=par.find("#ueditor_0"),
        // iframeWin=iframe[0].contentWindow,
        ifrBody=iframeChir.document.body,
        data={};
        data[key]=ifrBody.innerHTML;
    return data;
};
//保存成功后清空弹框值
function clearPopValue(id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=window.document.body,
        pop=$(body).find(_id),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_checked=pop.find(" [data-base]:checked"),
        data_radio=pop.find(" [data-base]:radio:checked"),
        data_checkbox=pop.find(" [data-base]:checkbox:checked"),
        data_base_hide=pop.find("[data-baseH]"),
        data_inputFile=pop.find(":file"),
        data_new_pop_text=pop.find(".new_pop_text");

    //清空值
    data_base.each(function () {
        $(this).val("");
    });

    //选定的的input清理设置
    data_checked.each(function () {
        $(this).prop("checked",false);
    });

    //隐藏项的清空
    data_base_hide.each(function () {
        var item=$(this).attr("data-baseH");
        $(this).data(item,"");
    });

    //删除input file元素
    data_inputFile.remove();

    //data_new_pop_text 清除
    data_new_pop_text.each(function () {
        $(this).text("");
    })
}
//清空UEditor
youJin.UEditorClearValue=function (id) {
    var _id=id||"#zcf_new_pop_debitCard";
    var body=top.document.body,
        UE=$(body).find("#zcf_container"),
        par=UE.parent("div"),
        key=par.attr("data-base"),
        iframe=$("#ueditor_0"),
        iframeWin=iframe[0].contentWindow,
        ifrBody=iframeWin.document.body;
    ifrBody.innerHTML="";
};
//弹出框的按钮选项
function newPopButtonClick(e,_this1) {
    var e=e||event;
    var _this=_this1||this;
    var val=$.trim($(_this).attr("class"));
    if(val=="new_pop_tail_button1"){
        var data=getPopValue();
        if(relational.uid&&relational.corr==="modify"){
            data[relational.label]=relational.uid;
        }
        ajaxAdd(data);
    }else {
        hideNewPop();
        clearPopValue();//要放在hideNewPop后面 先隐藏到子页面 然后再在清空
    }
}
/*
 * 功能条功能
 * */
//刷新功能
function refreshZ() {
    window.location=window.location.href;
}
//功能条的点击功能
function setUlLiclick(e,_this1) {
    var e=e||event;
    var _this=_this1||this;
    //刷新功能
    if(_this.id=="refreash"){
        refreshZ();
        return false;
    }
    //点击使弹出框显示
    if(_this.id=="add"){
        relational.corr="add";
        changeNewPopHeadTip(_this);
        youJin.defaultIfOpen();
        showNewPop();
        // ajaxBankList();
        // try {
        //     ajaxGetList()
        // }catch (e){
        //     console.log(e.message);
        // }
    }
    //功能条的修改功能
    if(_this.id=="modify"){
        if(!relational.uid){
            popplug([{},{content:"请选择修改对象"}]);
            return false ;
        }
        relational.corr="modify";
        changeNewPopHeadTip(_this);
        showNewPop();
        // ajaxBankList();
        ajxaGet(relational.uid)
    }
}
//功能条启用转换
function changIfOpen() {
    var val=$("#zcf_select").val();
    if(val==1){
        relational.if_open=1;
        dataInitialPart();
        pageChange();
        if(relational.search){
            var searchVal=$("#search input").val();
            ajaxSearch(relational.star,relational.evSize,searchVal);
        }else {
            ajaxN(relational.star,relational.evSize);
        }
    }else if(val==0){
        relational.if_open=0;
        dataInitialPart();
        pageChange();
        if(relational.search){
            var searchVal=$("#search input").val();
            ajaxSearch(relational.star,relational.evSize,searchVal);
        }else {
            ajaxN(relational.star,relational.evSize);
        }
    }
}
//联动功能
function chainChange() {
    var _this=this,
        val=$(_this).val();
    console.log(val,"id");
    ajaxGetList(val);
}

/*
* 此处分割线开始使用 单对象 命名空间 YUI模式进行编程
* */

//隐藏提示框
youJin.platformSearchHide=function (DOM) {
   var par= $(DOM).parents(".new_pop_positon"),
       bro=par.find(".new_pop_positon_div");
    bro.css("display","none");
};
youJin.platformSearchShow=function (DOM) {
    var par= $(DOM).parents(".new_pop_positon"),
        bro=par.find(".new_pop_positon_div");
    bro.css("display","block");
    return bro;
};
//制造DOM
youJin.makeDom=function (data,ul,id,name) {
    var li=$("<li></li>");
    var _id=id||"ptid";
    var _name=name||"name";
    li.text(data[_name]);
    li.data(_id,data[_id]);
    li.data(_name,data[_name]);
    ul.append(li);
    return li;
};
youJin.platformSearch=function (fn,val,DOM) {
    fn(val,DOM);
};
//搜索条的点击选中项
youJin.liClickHandle=function (DOM,id,name) {
    console.log("liClick");
    var _id=id||"ptid";
    var _name=name||"name";
    var ptname=$(DOM).data(_name),
        ptid=$(DOM).data(_id),
        parent=$(DOM).parents(".new_pop_positon"),
        bro=parent.find(".new_pop_positon_div"),
        input=parent.find("input");
    input.val(ptname);
    var item=input.attr("data-baseH");
    input.data(item,ptid);
    bro.css("display","none");
};
youJin.postMesToB=function (name,data) {
    var bro=parent.frames[name];
    var data=JSON.stringify(data);
    bro.postMessage(data,"*");
};
//点新增默认选定启用为开启
youJin.defaultIfOpen=function () {
    var if_open=$(".new_pop  [data-base=is_open]");
    if_open.each(function () {
        var _this=$(this);
        if(_this.val()==1){
            _this.prop("checked",true)
        }
    });
    //console.log("is_open",if_open.val());
};
youJin.postMesToBShell=function (beg,end) {
    var i=beg,
        len=end,
        data={
        src:true,
        };
    for(i;i<=end;i++){
        youJin.postMesToB(i,data);
    }
};
//输入框功能禁用
youJin.ifDisable=function (_this,name) {
    if(!_this){
        var par=$(name).parents(".new_pop_body_contain");
        par.find("[data-disable]").each(function (i) {
                $(this).prop("disabled",true);
        });
        return;
    }
    var val=$(_this).val();
    if(val==3){
        var par=$(_this).parents(".new_pop_body_contain");
        par.find("[data-disable]").each(function (i) {
                $(this).prop("disabled",false);
        })
    }else {
        var par=$(_this).parents(".new_pop_body_contain");
        par.find("[data-disable]").each(function (i) {
                $(this).prop("disabled",true);
        })
    }
};
//投资input就是可用的
youJin.ifDisableY=function () {
    console.log(top);
    var top1=window.top.document.body;
    var par=$(top1).find(".new_pop_body_contain [data-base]").parents(".new_pop_body_contain");
    par.find("[data-disable]").each(function (i) {
            $(this).prop("disabled",false);
    });
};
youJin.ifValue=function () {
    console.log(top);
    var top1=window.top.document.body;
    var par=$(top1).find(".new_pop_body_contain [data-base]").parents(".new_pop_body_contain");
    par.find("[data-disable]").each(function (i) {
            $(this).val("");
    });
};
//功能条类型变换
youJin.changeType=function (_this) {
    var val=$(_this).val();
    console.log("val",val);
    return val;
    // var data;
    // switch (val){
    //     case 1:
    //        return data=1;
    //         break;
    //     case 2:
    //         return data=2;
    //         break;
    //     case 3:
    //         return data=3;
    //         break;
    //     case 4:
    //         return data=4;
    //         break;
    // }
};
//DOM制造类 制造多选框选区
youJin.domChecked=function (data,dom) {
    var length=data.length,
        i;
    var id=dom.attr("data-creat");
    for(i=0;i<length;i++){
        var label=$("<label></label>");
        var input=$("<input type='checkbox' name='if1'>");
        var span=$("<span></span>");
        input.attr('data-base',id);
        input.val(data[i]["ceid"]);
        span.text(data[i]["name"]);
        label.append(input);
        label.append(span);
        dom.append(label);
    }
};
//.setUl li下面的功能条模块
youJin.setUlLiclick=function (e,_this1) {
    //刷新功能
    if(_this.id=="refreash"){
        refreshZ();
        return false;
    }
    //点击使弹出框显示
    if(_this.id=="add"){
        relational.corr="add";
        changeNewPopHeadTip(_this);
        youJin.defaultIfOpen();
        showNewPop();
    }
    //功能条的修改功能
    if(_this.id=="modify"){
        if(!relational.uid){
            popplug([{},{content:"请选择修改对象"}]);
            return false ;
        }
        relational.corr="modify";
        changeNewPopHeadTip(_this);
        showNewPop();
        // ajaxBankList();
        ajxaGet(relational.uid)
    }
};
//显示具体的隐藏的设值框
youJin.zcf_setFrameShow=function (e,_this,id) {
    var ev=e,
        _this1=_this;
    changeNewPopHeadTip(_this1,id);
    showNewPop(id);
};
//弹出框的按钮选项
youJin.newPopButtonClick=function (e,_this1,id,fn,reid) {
    var _e=e||event;
    var _this=_this1||this;
    var val=$.trim($(_this).attr("class"));
    if(val=="new_pop_tail_button1"){
        var data=getPopValue(id);
        // if(relational.uid){
        //     data[relational.label]=relational.uid;
        // }
        if(fn){
            fn(data,id,reid);
        }
    }else {
        hideNewPop(id);
        clearPopValue(id);//要放在hideNewPop后面 先隐藏到子页面 然后再在清空
        //删除UE实例
        // console.log("delete1");
        // top.UE.delEditor('zcf_container');
        // $("#zcf_container").children().remove();
    }
};
//弹出框的提示内容更改
youJin.changTipContent=function (id,content) {
    var _id=id;
    var body=top.document.body,
        span=$(body).find(_id).find(".fn_changContent");
    span.text(content);
};
//模仿label定ID效果(不需要ID)已经兼容各种label事件定义
youJin.labelSelectAll=function () {
    var label=$("label");
    label.unbind("click",youJin.labelSelectAllCon);
    label.bind("click",youJin.labelSelectAllCon);
};
youJin.labelSelectAllCon=function() {
    var input=$(this).children("input");
    var type=input.attr("type");
    console.log(input.prop("disabled"));
    if(input.prop("disabled")===true){
        return;
    }
    if(type=="radio"){
        input.prop("checked",true);
    }else if(type=="checkbox"){
        if(!this.count){this.count=1}
        var sitch=this.count%2;
        if(sitch==1){
            input.prop("checked",true);
        }else {
            input.prop("checked",false);
        }
        this.count++;
    }
};
//定义图片类相关数据
//增加图片
youJin.ajaxAddImg=function (data,obj,fn,id) {
    var oReq = new XMLHttpRequest(),
        url=relational.url+"?m=Image&s=uploadImage"+"&type_id="+obj["type_id"]+"&out_id="+obj["out_id"];
    if(obj["zcf_model"]=="ad"){
        url=relational.url+"?m=Image&s=uploadAdImage"+"&adid="+obj["adid"];
    }
    var span=$(top.document.body).find(id).find(".new_pop_body_contain_head_span span").eq(0);
    oReq.open("POST", url);

    //
    oReq.onreadystatechange=function () {
        if (oReq.readyState==4 && oReq.status==200)
        {
            var data=JSON.parse(oReq.response);
            if(data.r=="1"){
                youJin.ajaxShow(obj,fn);
            }else {
                popplug([{},{content:data.msg}]);
            }
        }
    };

    //进度条
    oReq.upload.onprogress=function (e) {
        var e=e||event;
        clearTimeout(relational.time);
        if(e.lengthComputable){
            var per=e.loaded/e.total*100,
                per1=Math.round(per);
            span.text("已经上传"+per1+"%");
        }else {
            span.text("正在上传");
        }
    };
    //上传完毕
    oReq.upload.onload=function (e) {
        var e=e||event;
        span.text("上传完成");
        clearTimeout(relational.time);
        relational.time=setTimeout(function () {
            span.text("进度显示");
        },1000)
    };
    oReq.send(data);//send要放在onprogress之后 要不然没反应
};
//显示相应的进度文字函数
youJin.ajaxAddImgSchedule=function (e,id) {
   var span=$(id).find(".new_pop_body_contain_head_span span").eq(0);
    if(e.lengthComputable){
        var per=e.loaded/e.total*100;
        span.text("已经上传"+per+"%");
    }else {
        span.text("正在上传");
    }

};
//显示图片
youJin.ajaxShow=function (obj,fn) {
    var oReq = new XMLHttpRequest(),
        url=relational.url+"?m=Image&s=showImage"+"&type_id="+obj["type_id"]+"&out_id="+obj["out_id"];
    if(obj["zcf_model"]=="ad"){
        url=relational.url+"?m=Image&s=showAdImage"+"&adid="+obj["adid"];
    }
    oReq.open("GET", url);
    oReq.send();
    //
    oReq.onreadystatechange=function () {
        if (oReq.readyState==4 && oReq.status==200)
        {
            var data=JSON.parse(oReq.response);
            fn(data.data,obj);
        }
    };
    //
};
//显示图片成功时调用函数
youJin.ajaxShowScs=function (data,obj1) {
    var top1=$(top.document.body),
        par=top1.find("#zcf_new_pop_upload"),
        ul=par.find(".ul_img"),
        length=(data===null)?0:data.length,
        i;
    ul.children().remove();
    for(i=0;i<length;i++){
        if(data[i]["img_url"]){
            youJin.makeDomImg(data[i],ul);
        }
    }
    ul.find(".span_left").click(function () {
        var _this=$(this),
            id=_this.data("id"),
            obj={
                id:id,
                type_id:relational.type_id,
                out_id:relational.uid,
            };
            if(obj1["zcf_model"]=="ad"){
                obj={
                    zcf_model:"ad",
                    adid:relational.uid,
                };
            }
            $("#zcf_new_pop_delete").data("obj",obj);
        showNewPop("#zcf_new_pop_delete");
    });
    ul.find(".imgBeLarge").click(function (e) {
        var e=e||event,
            _this=this;
        youJin.imgBeLarge(top1,e,_this);
    });
    // pageChange();
    // ajaxN(relational.star,relational.evSize);
};
//点击查看原图
youJin.imgBeLarge=function (top1,e,_this) {
    var src=$(_this).attr("src"),
        par=$("<div class='popplug_mask'></div>"),
        div=$("<div class='popplug_mask_spaDiv'></div>"),
        img=$("<img class='popplug_mask_spaImg'>"),
        X=$("<div class='popplug_mask_spaX'>X</div>");
    if(src){
        top1.append(par);
        par.append(div);
        div.append(img);
        div.append(X);
        img.attr("src",src);
        X.click(function () {
            par.remove();
        })
    }else {
        popplug([{},{content:"图片不存在"}]);
    }

};
//点击查看内容
youJin.contentShow=function (top1,e,_this) {
    var content=$(_this).data("data"),
        par=$("<div class='popplug_mask'></div>"),
        div=$("<div class='popplug_mask_spaDiv' style='background-color: white'></div>"),
        con=$("<div></div>"),
        line=$("<div style='display: flex;flex-direction: row-reverse'></div>"),
        X=$("<div class='popplug_mask_spaX_C'>X</div>");
    if(content){
        top1.append(par);
        par.append(div);
        line.append(X);
        div.append(line);
        div.append(con);
        con.html(content);
        X.click(function () {
            par.remove();
        })
    }else {
        popplug([{},{content:"内容不存在"}]);
    }
};
//删除图片
youJin.ajaxDelete=function (obj,fn) {
    console.log("obj",obj);
    var oReq = new XMLHttpRequest(),
        url=relational.url+"?m=Image&s=delImage"+"&type_id="+obj["type_id"]+"&id="+obj["id"];
    if(obj["zcf_model"]=="ad"){
        url=relational.url+"?m=Image&s=delAdImage"+"&adid="+obj["adid"];
    }
    oReq.open("GET", url);
    oReq.send();
    //
    oReq.onreadystatechange=function () {
        if (oReq.readyState==4 && oReq.status==200)
        {
            var data=JSON.parse(oReq.response);
            if(data.r=="1"){
                hideNewPop("#zcf_new_pop_delete");
                youJin.ajaxShow(obj,fn);
            }else {
                popplug([{},{content:data.msg}]);
            }
        }
    };
    //
};
//制造DOM类函数
youJin.makeDomImg=function(data,_ul){
    var //par=$(top.document.body).find(id),
        _data=data,
        ul=_ul,
        li=$("<li></li>"),
        img=$("<img class='imgBeLarge'>"),
        div=$('<div class="img_div"></div>'),
        span_left=$('<span class="span_left">删除</span>'),
        span_right=$('<span class="span_right"></span>');
    //ul.children().remove();
    span_right.text(_data["img_name"]);
    span_right.attr("title",_data["img_name"]);
    ul.append(li);
    li.append(img);
    li.append(div);
    div.append(span_left);
    div.append(span_right);
    img.attr("src",_data["img_url"]);
    span_left.data('id',_data[relational.dataTypeID]);
};
//点击增加图片按钮时先判断 后触发默认行为；
youJin.appFile=function (_this) {
  var par=$(_this),
      inputFile=par.find(":file");
    console.log("inputFile",inputFile);
    if(inputFile.length=="0"){
        inputFile=$('<input type="file" style="display: none" multiple>');
        par.append(inputFile);
        inputFile.bind("click",function (e) {
            var e=e||event;
            e.stopPropagation();
        });
        inputFile.trigger("click");
    }else {
        inputFile.unbind("click");
        inputFile.bind("click",function (e) {
            var e=e||event;
            e.stopPropagation();
        });
        inputFile.trigger("click");
    }
};
//内容处理部分
youJin.judgeCotent=function (tr) {
    var span=tr.find("td ul li span"),
        unicodeS=youJin.hanziToUnicode("通过"),
        unicodeF=youJin.hanziToUnicode("失败"),
        unicodeE=youJin.hanziToUnicode("精华"),
        regS= new RegExp(unicodeS+"$"),
        regF= new RegExp(unicodeF+"$"),
        regE= new RegExp("^\\s*"+unicodeE+"$"),
        regT=/^\s*[0-9\-]{10}\s+[0-9\:]{8}$/ig,
        data=new Date(),
        year=data.getFullYear(),
        month=data.getMonth()+1,
        myDate=data.getDate();
    span.each(function () {
        var _this=$(this),
            text=_this.text(),
            arr=[],
            arrN=[],
            S,//通过
            F,//失败
            E,//精华
            T;
        S=regS.test(text);
        if(S){
            _this.addClass("green");
        }
        F=regF.test(text);
        if(F){
            _this.addClass("red");
        }
        E=regE.test(text);
        if(E){
            _this.addClass("red");
        }
        T=regT.test(text);
        if(T){
            //_this.addClass("Z");//测试
            text=$.trim(text);
            //console.log(year,month,myDate,"text",text);
            arr=text.split(" ");
            arrN=arr[0].split("-");
            if(arrN[0]==year&&arrN[1]==month&&arrN[2]==myDate){
                _this.addClass("orange");
            }
        }
    })
};
youJin.hanziToUnicode=function (str) {
    var str=str,//汉字
        len=str.length,
        unicoude="",
        i;
    for(i=0;i<len;i++){
        unicoude+="\\u"+parseInt(str[i].charCodeAt(0),10).toString(16);
    }
    return unicoude;
};
//图片处理部分
youJin.domImgEvent=function (tr) {
     var img=tr.find(".dom_img");
     var span=tr.find("span");
    //console.log(img,"test");//测试
    //console.log(span,"test");//测试
    img.each(function () {
        var _this=this;
        //console.log(this,"test_this");//测试
        $(this).click(function (e) {
            //console.log(this,"test_this2");//测试
            var e=e||event;
            youJin.imgBeLarge($(top.document.body),e,this);
            e.stopPropagation();
        });
    })
};
//tr中内容处理部分
youJin.domContentEvent=function (tr) {
    var con=tr.find(".dom_content");
    //console.log(img,"test");//测试
    //console.log(span,"test");//测试
    con.each(function () {
        var _this=this;
        //console.log(this,"test_this");//测试
        $(this).click(function (e) {
            //console.log(this,"test_this2");//测试
            var e=e||event;
            youJin.contentShow($(top.document.body),e,this);
            e.stopPropagation();
        });
    })
};
//迫不得已在此调用
    $(document).ready(function () {
        youJin.labelSelectAll();
    });
/*
 * 传输数据
 * */
//给兄弟右窗口
// function postMesToB(uid) {
//     var par=parent,
//         bro=par.frames["right"],
//         uid=uid;
//     bro.postMessage(uid,"*");
//     console.log("postMes","bro",bro,"uid",uid);
// }
// //给父窗口
// function postMesToP(uid) {
//     var par=parent,
//         bro=par.frames["right"],
//         uid=uid;
//     par.postMessage(uid,"*");
// }
// //接收数据
// function messageHandle(e) {
//     console.log("left",e);
//     if(e.source!=window.parent) return;
//     relational.xxid=e.data;
// }
