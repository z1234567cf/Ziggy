/**
 * Created by Administrator on 2016/12/12.
 */
relational.label="boid";
relational.pboid=0;
relational.level=1;
relational.ptid="";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    _data["line_number"]=_data["number"];
    _data["line_beijing"]=_data["beijing"];
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={

    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"boid":data["boid"], "zcf_name":"boid",},
        {"name":data["name"], "zcf_name":"name",},
        {"line_number":data["line_number"], "zcf_name":"line_number",},
        {"line_beijing":data["line_beijing"], "zcf_name":"line_beijing",},
    ];
    var _data=[_1];
    return _data;
}
/*
 * ajax类
 * */
//ajax主体显示的ajax
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Wd&s=getWdBossList&is_open=0&start="+star+"&limit="+evSize+
                "&level="+relational.level+"&ptid="+relational.ptid+"&pboid="+relational.pboid;
            break;
        case 1:
            url=relational.url+"?m=Wd&s=getWdBossList&is_open=1&start="+star+"&limit="+evSize+
                "&level="+relational.level+"&ptid="+relational.ptid+"&pboid="+relational.pboid;
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
    $("#table tbody tr").click(function (e) {
        var e=e||event,
            _this=this;
        trClick(e,_this);
        var data={
            uid:relational.ptid,
            pboid:relational.uid,
        };
        youJin.postMesToB("third",data);
        var data2={
            src:true
        };
        youJin.postMesToB("four",data2);
        youJin.postMesToB("five",data2);
    });
}
//搜索ajax
function ajaxSearch(star,size,numeber) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Wd&s=getWdBossList&is_open=0&name="+numeber+"&start="+star+"&limit="+size+
                "&level="+ relational.level+"&ptid="+relational.ptid+"&pboid="+relational.pboid;
            break;
        case 1:
            url=relational.url+"?m=Wd&s=getWdBossList&is_open=1&name="+numeber+"&start="+star+"&limit="+size+
                "&level="+ relational.level+"&ptid="+relational.ptid+"&pboid="+relational.pboid;
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
        $("#table tbody tr").click(function (e) {
            var e=e||event,
                _this=this;
            trClick(e,_this);
            var data={
                uid:relational.ptid,
                pboid:relational.uid,
            };
            youJin.postMesToB("third",data);
            var data2={
                src:true
            };
            youJin.postMesToB("four",data2);
            youJin.postMesToB("five",data2);
        });
    }
}

//获取其他接口列表
function ajaxGetList(pid,async) {
    var url=relational.url+"?m=Wd&s=getArea",
        fn=ajaxFirstScs;
    if(pid){
        url=relational.url+"?m=Wd&s=getArea&pid="+pid;
        fn=ajaxSecondScs;
    }
    var  asyncF=true;
    if(async){
        asyncF=false;
    }
    $.ajax(
        {
            type: "GET",
            async:asyncF,
            url: url,
            success: fn,
        }
    )
}
//成功回调
function ajaxFirstScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='province']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank);
}
function ajaxSecondScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='city']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank);
}
//制造option
function domOption(data,bank) {
    var length=data.length,
        i;
    for(i=0;i<length;i++){
        var option=$("<option></option>");
        option.val(data[i]["id"]);
        option.text(data[i]["name"]);
        bank.append(option);
    }
}


//获得当前要修改数据的AJAX
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=Wd&s=getWdBossInfo&boid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"];
    // ajaxGetList(data["province"],"1");
    setPopValue(data);
}
//新增数据的AJAX
function ajaxAdd(data) {
    data["level"]=relational.level;
    data["ptid"]=relational.ptid;
    data["pboid"]=relational.pboid;
    if(data["number"]){
        if(!(data["number"].indexOf("%")>-1)){
            data["number"]=data["number"]+"%";
        }
    }
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Wd&s=addWdBoss",
            data:data,
            success: ajaxAddScs,
        }
    )
}
//成功回调函数
function ajaxAddScs(msg) {
    if(msg.r==1){
        if(relational.corr=="add"){
            popplug([{},{content:"添加成功"}]);
        }else if(relational.corr=="modify"){
            popplug([{},{content:"修改成功"}]);
        }
        hideNewPop();
        clearPopValue();
        ajaxN(relational.star,relational.evSize);
    }
    if(msg.r==0){
        var msg1=msg.msg;
        popplug([{},{content:msg1}]);
    }
}
//平台搜索功能
function ajaxplatformSearch(name,DOM) {
    var _this=DOM;
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=Wd&s=searchByName&name="+name,
            success: function (msg) {
                var data=msg.data,
                    length=data.length,
                    i;
                var bro=youJin.platformSearchShow(_this),
                    ul=bro.find("ul");
                ul.children("li").remove();
                for(i=0;i<length;i++){
                    var li=youJin.makeDom(data[i],ul);
                    li.click(function (e) {
                        var e=e||event,
                            _this=this;
                        youJin.liClickHandle(_this);
                    })
                }
            },
        }
    )
}
$(document).ready(readyHandle);
function readyHandle() {
    //数据测试
    console.log("ready");
    //console.log(relational);
    pageChange();
    // ajaxN(relational.star,relational.evSize);
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
    //传给父窗口
    // postMesToP("ready");
    //信息接收
    window.addEventListener("message",function (e) {
        var e=e||event;
        var data=JSON.parse(e.data);
        if(data.hasOwnProperty("src")){
            window.location=location.href;
            return
        }
        console.log("message",e,data);
        relational.ptid=data.uid;
        $("#zcf_mask").remove();
        ajaxN(relational.star,relational.evSize);
    });
    //搜索下拉提示
    // var ptid=$("#zcf_new_pop_debitCard [data-base='ptname']");
    // ptid.bind("input",function (e) {
    //     var e=e||event,
    //         _this=this;
    //     var val=$.trim($(this).val());
    //     youJin.platformSearch(ajaxplatformSearch,val,_this);
    // });
    // ptid.focus(function (e) {
    //     var e=e||event,
    //         _this=this;
    //     var val=$.trim($(this).val());
    //     youJin.platformSearch(ajaxplatformSearch,val,_this);
    // });
    // ptid.blur(function (e) {
    //     var e=e||event,
    //         _this=this;
    //     clearTimeout(youJin.setTime);
    //     youJin.setTime=setTimeout(function () {
    //         youJin.platformSearchHide(_this);
    //     },200);
    // });
    //平台搜索
    //群发信息
    youJin.postMesToBShell(2,5);
}
