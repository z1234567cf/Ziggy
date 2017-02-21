/**
 * Created by Administrator on 2016/12/8.
 */
//数据定义(中间过渡数据)
relational.label="bxid";
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
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"bxid":data["bxid"], "zcf_name":"bxid",},
        {"pname":data["pname"], "zcf_name":"pname",},
    ];
    _2=[
        {"name":data["name"], "zcf_name":"name",},
    ];
    _3=[
        {"begin_time":data["begin_time"], "zcf_name":"begin_time",},
    ];
    _4=[
        {"url":data["url"], "zcf_name":"url",},
    ];
    _9=[
        {"reg_url":data["reg_url"], "zcf_name":"reg_url",},
    ];
    _5=[
        {"down_app":data["down_app"], "zcf_name":"down_app",},
    ];
    _6=[
        {"service_mobile":data["service_mobile"], "zcf_name":"service_mobile",},
    ];
    _7=[
        {"weixin":data["weixin"], "zcf_name":"weixin",},
    ];
    _10=[
        {"addr":data["addr"], "zcf_name":"addr",},
    ];
    _8=[
        {"lines":data["lines"], "zcf_name":"lines",},
    ];
    var _data=[_1,_2,_3,_4,_9,_5,_6,_7,_10,_8];
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
            url= relational.url+"?m=Baoxian&s=getBaoxianCompanyList&is_open=0&start="+star+"&limit="+evSize;
            break;
        case 1:
            url=relational.url+"?m=Baoxian&s=getBaoxianCompanyList&is_open=1&start="+star+"&limit="+evSize;
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
            url= relational.url+"?m=Baoxian&s=getBaoxianCompanyList&is_open=0&name="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Baoxian&s=getBaoxianCompanyList&is_open=1&name="+numeber+"&start="+star+"&limit="+size;
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
            url: relational.url+"?m=Baoxian&s=getBaoxianCompanyInfo&bxid="+jikID,
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
            url: relational.url+"?m=Baoxian&s=addBaoxianCompany",
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
$(document).ready(readyHandle);
function readyHandle() {
    //数据测试
    console.log("special");
    //console.log(relational);
    pageChange();
    ajaxN(relational.star,relational.evSize);
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
    // window.addEventListener("message",messageHandle)
    console.log("special success");
}
