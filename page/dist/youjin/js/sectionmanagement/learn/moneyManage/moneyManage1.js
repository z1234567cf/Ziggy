/**
 * Created by Administrator on 2016/12/5.
 */

/*
 * 数据类
 *
 * */
//数据定义(中间过渡数据)
var relational={
    "star":0,//定义了从那个值开始翻
    "evSize":10,//定义了每页最多显示几个
    "pageIndex":1,//页码数 现在第几页
    "pageCount":"",//页码总数
    "phoneNumberSize":11,//定义了手机的数值长度
    "uid":"",//用户的uid的中间存储地方
    "url":"http://120.24.43.90/",//更换地址
    "ajax":"2",//本页ajax数量
    "corr":"",//判断点击的是新增按钮还是修改
    "if_open":1,//用来判断是否开启启用
    "search":false,//是否使用搜索功能
    "xxid":"1",//1/财富管理 2/想买保险 3/玩转基金 4/小白炒股 5/第一套房 6/闲钱投资 7/长期投资 8/家庭财务
};
//数据初始化
function dataInitialPart() {
    relational.star=0;
    relational.pageIndex=1;
}
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={

    };
    return _data;
}
//测试数据
var test_data= {
    "data":[
    ]
};
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"lnid":data["lnid"], "zcf_name":"lnid",},
        {"paixu":data["paixu"], "zcf_name":"paixu",},
    ];
    _2=[
        {"name":data["name"], "zcf_name":"name",},
    ];

    var _data=[_1,_2];
    return _data;
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
        var td=$("<td></td>"),ul=$("<ul></ul>"),_li_span=$("<li></li>"),count=0,_li_span2=$("<li></li>"),count2=0;
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
            }else if(name=="lnid"){
                if(corespond[name]){
                    var _span=$("<span></span>");
                    _span.text(corespond[name]+":");
                    li.append(_span);
                }
                var span=$("<span></span>");
                span.text(" "+_data[i][j][name]);
                li=$("<li style='display: none'></li>");
                li.append(span);
                ul.append(li)

            }else{
                //var li=$("<li></li>");
                if(corespond[name]){
                    var _span=$("<span></span>");
                    _span.text(corespond[name]+":");
                    li.append(_span);
                }
                var span=$("<span></span>");
                span.text(" "+_data[i][j][name]);
                li.append(span);
                ul.append(li)
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
}
//添加行的点击事件（代表选中与否）并且设置当前UID的值
function trClick() {
    $(".table tbody tr").css("backgroundColor","");
    var bolean=$(this).find("td:first-child div").hasClass("table_choice");
    if(bolean){
        $(this).find("td:first-child div.table_choice").removeClass("table_choice");
        $(this).css("backgroundColor","");
        relational.uid=undefined;
    }else {
        $("#table .table_unchoice").each(function () {
            $(this).removeClass("table_choice");
        });
        $(this).find(".table_unchoice").addClass("table_choice");
        $(this).css("backgroundColor","#d6f2e1");
        var uid= $(this).find("td:first-child li span").eq(0).text();
        var _uid=$.trim(uid);
        relational.uid=_uid;

        //这里向其他窗口传输数据
        var data={
            xxid:relational.xxid,
            lnid:relational.uid,
        };
        var data2=JSON.stringify(data);
        postMesToB(data2);
        console.log("_uid",_uid);
    }
}
//制造option
function domOption(data,bank) {
    var length=data.length,
        i;
    for(i=0;i<length;i++){
        var option=$("<option></option>");
        option.val(data[i]["v"]);
        option.text(data[i]["name"]);
        bank.append(option);
    }
}
/*
 * ajax类
 * */
//ajax主体显示的ajax
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Study&s=getLessonNameList&is_open=0&xxid="+relational.xxid+"&start="+star+"&limit="+evSize;
            break;
        case 1:
            url=relational.url+"?m=Study&s=getLessonNameList&xxid="+relational.xxid+"&start="+star+"&limit="+evSize;
            break;
    }
    $.ajax({
        type: "GET",
        url: url,
        success: successHandle
    });
}
//成功回调
function successHandle(msg) {
    relational.uid=undefined;
    pageCountJudege(msg.count);
    showCountPage(relational.pageCount);
    //页码条每页条数显示
    eSizeShow(relational.evSize);
    $("#table tbody").children().remove();
    var data=msg.data,length=data.length;
    for(var i=0;i<length;i++){
        var _data=originalDataOperate(data[i]);
        operate(_data);
    }
    $("#table tbody tr").click(trClick);
}
//搜索ajax
function ajaxSearch(star,size,numeber) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Study&s=getLessonNameList&is_open=0&xxid="+relational.xxid+"&name="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Study&s=getLessonNameList&xxid="+relational.xxid+"&name="+numeber+"&start="+star+"&limit="+size;
            break;
    }
    $.ajax({
        type: "GET",
        url: url,
        success: searchHandle,
    });
}
//搜索回调函数
function searchHandle(msg) {
    relational.uid=undefined;
    pageCountJudege(msg.count);
    showCountPage(relational.pageCount);
    //页码条每页条数显示
    eSizeShow(relational.evSize);
    $("#table tbody").children().remove();
    var data=msg.data;
    //确定data是否存在
    if(data){
        var length=data.length;
        for(var i=0;i<length;i++){
            var _data=originalDataOperate(data[i]);
            operate(_data);
        }
        $("#table tbody tr").click(trClick);
    }
}
//获取银行列表的AJAX
// function ajaxBankList() {
//     $.ajax(
//         {
//             type: "GET",
//             url: relational.url+"?m=Bank&s=BankList",
//             success: ajaxBankListScs,
//         }
//     )
// }
// //成功回调
// function ajaxBankListScs(msg) {
//     var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='bank']"),
//         data=msg.data;
//     bank.children().remove();
//     domOption(data,bank);
// }
//获得当前要修改数据的AJAX
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=Study&s=getLessonNameInfo&lnid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"];
    setPopValue(data);
}
//新增数据的AJAX
function ajaxAdd(data) {
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Study&s=addLessonName"+"&xxid="+relational.xxid,
            data:data,
            success: ajaxAddScs,
        }
    )
}
//成功回调函数
function ajaxAddScs(msg) {
    if(msg.r==1){
        clearPopValue();
        if(relational.corr=="add"){
            popplug([{},{content:"添加成功"}]);
        }else if(relational.corr=="modify"){
            popplug([{},{content:"修改成功"}]);
        }
        ajaxN(relational.star,relational.evSize);
    }
    if(msg.r==0){
        var msg1=msg.msg;
        popplug([{},{content:msg1}]);
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
function showNewPop() {
    console.log("pop");
    var body=top.document.body,
        pop=$("#zcf_new_pop_debitCard");
    pop.detach();
    $(body).append(pop);
    pop.addClass("new_pop_show");
}
//隐藏修改框
function hideNewPop(_this) {
    var pop=$(_this).parents("#zcf_new_pop_debitCard");
    $(pop).detach();
    $(window.document.body).append(pop);
    $(pop).removeClass("new_pop_show");
}
//更改弹出框的提示内容
function changeNewPopHeadTip(_this) {
    var text=$(_this).find("span").text(),

        text1=text+"信息";
    $("#zcf_new_pop_debitCard .new_pop_head_tips").text(text1);
}
//给弹框赋值
function setPopValue(data) {
    var body=top.document.body,
        //不包含多选框 多选框另外搞
        pop=$(body).find("#zcf_new_pop_debitCard"),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_radio=pop.find(" [data-base]:radio"),
        data_checkbox=pop.find(" [data-base]:checkbox"),
        checkbox_value={};

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
    )
}
//获取点击保存按钮之后弹框中的值
function getPopValue() {
    var body=top.document.body,
        data={},
        pop=$(body).find("#zcf_new_pop_debitCard"),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_radio=pop.find(" [data-base]:radio:checked"),
        data_checkbox=pop.find(" [data-base]:checkbox:checked"),
        checkbox_value={};

    console.log(data_radio,"data_radio",data_base,"data_base");
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
    return data;
}
//保存成功后清空弹框值
function clearPopValue() {
    var body=window.document.body,
        pop=$(body).find("#zcf_new_pop_debitCard"),
        data_base=pop.find(" [data-base]").not(":radio").not(":checkbox"),
        data_checked=pop.find(" [data-base]:checked"),
        data_radio=pop.find(" [data-base]:radio:checked"),
        data_checkbox=pop.find(" [data-base]:checkbox:checked");

    //清空值
    data_base.each(function () {
        $(this).val("");
    });

    //选定的的input清理设置
    data_checked.each(function () {
        $(this).prop("checked",false);
    })
}
//弹出框的按钮选项
function newPopButtonClick() {
    var _this=this;
    if(_this.id=="new_pop_tail_button1"){
        var data=getPopValue();
        if(relational.uid&&relational.corr==="modify"){
            data["lnid"]=relational.uid;
        }
        ajaxAdd(data);
        hideNewPop(_this);
    }else {
        hideNewPop(_this);
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
function setUlLiclick() {
    var _this=this;
    //刷新功能
    if(this.id=="refreash"){
        refreshZ();
        return false;
    }
    //点击使弹出框显示
    if(this.id=="add"){
        relational.corr="add";
        changeNewPopHeadTip(_this);
        youJin.defaultIfOpen();
        showNewPop();
        // ajaxBankList();
    }
    //功能条的修改功能
    if(this.id=="modify"){
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

/*
* 传输数据
* */
//给兄弟右窗口
function postMesToB(uid) {
    var par=parent,
        bro=par.frames["right"],
        uid=uid;
    bro.postMessage(uid,"*");
    console.log("postMes","bro",bro,"uid",uid);
}
//给父窗口
function postMesToP(uid) {
    var par=parent,
        bro=par.frames["right"],
        uid=uid;
    par.postMessage(uid,"*");
}
//接收数据
function messageHandle(e) {
    console.log("left",e);
    if(e.source!=window.parent) return;
    relational.xxid=e.data;
    pageChange();
    ajaxN(relational.star,relational.evSize);
}
//点新增默认选定启用为开启
var youJin={};
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
$(document).ready(readyHandle);
function readyHandle() {
    //数据测试
    console.log("test");
    //console.log(relational);
    //页码条点击事件
    containFootButtonEventBind(ajaxN);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框相关
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    //功能条点击相关
    $(".setUl li").click(setUlLiclick);
    //功能条启用转换
    $("#zcf_select").change(changIfOpen);
    //修改框的点击事件
    $("#zcf_new_pop_debitCard .new_pop_tail button").click(newPopButtonClick);
    //点击大红X
    $(".new_pop_head_X").click(newPopButtonClick);
    //信息接收
    window.addEventListener("message",messageHandle);
    //传给父窗口
    postMesToP("ready");
    youJin.labelSelectAll();
}