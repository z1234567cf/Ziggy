
relational.label="leid";
//relational.dataTypeID="jpid";//删除图像是要取DATA下的什么的类型ID（跟上传图片有关的参数）例如："link_table_id": "wpid",
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
        {"leid":data["leid"], "zcf_name":"leid",},
        {"paixu":data["paixu"], "zcf_name":"paixu",},
    ];
    _2=[
        {"title":data["title"], "zcf_name":"title",},
    ];
    _3=[
        {"content":data["content"], "zcf_name":"content",},
    ];
    _4=[
        {"lines":data["lines"], "zcf_name":"lines",},
    ];
    var _data=[_1,_2,_3,_4];
    return _data;
}
//ajax主体显示的ajax
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Study&s=getLessonList&is_open=0&start="+star+"&limit="+evSize+"&lnid="+relational.lnid;
            break;
        case 1:
            url=relational.url+"?m=Study&s=getLessonList&is_open=1&start="+star+"&limit="+evSize+"&lnid="+relational.lnid;
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
            url= relational.url+"?m=Study&s=getLessonList&is_open=0&name="+numeber+"&start="+star+"&limit="+size+"&lnid="+relational.lnid;
            break;
        case 1:
            url=relational.url+"?m=Study&s=getLessonList&is_open=1&name="+numeber+"&start="+star+"&limit="+size+"&lnid="+relational.lnid;
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
            url: relational.url+"?m=Study&s=getLessonInfo&leid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    console.log('ajxaGetScs');
    var data=msg["data"];
    setPopValue(data);
    relational.time=setInterval(function () {
        if(top.relational.ueStatus==="ready"){
            clearInterval(relational.time);
            youJin.UEditorSetValue(data);
            top.relational.ueStatus="done";
            console.log("top.relational.ueStatus",top.relational.ueStatus);
        }
    },50);
}
//新增数据的AJAX
function ajaxAdd(data) {
    var data1=youJin.UEditorGetValue();
    for(var i in data1){
        data[i]=data1[i];
    }
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Study&s=addLesson"+"&lnid="+relational.lnid+"&xxid="+relational.xxid,
            data:data,
            success: ajaxAddScs,
        }
    )
}
//成功回调函数
function ajaxAddScs(msg) {
    if(msg.r==1){
        // clearPopValue();
        // if(relational.corr=="add"){
        //     popplug([{},{content:"添加成功"}]);
        // }else if(relational.corr=="modify"){
        //     popplug([{},{content:"修改成功"}]);
        // }
        // ajaxN(relational.star,relational.evSize);
        var msg1=msg.msg;
        popplug([{},{content:msg1}]);
        hideNewPop();
        clearPopValue();
        ajaxN(relational.star,relational.evSize);
    }
    if(msg.r==0){
        var msg1=msg.msg;
        popplug([{},{content:msg1}]);
    }
}
function messageHandle(e) {
    $("#zcf_mask").remove();
    var data=JSON.parse(e.data);
    relational.lnid=data.lnid;
    relational.xxid=data.xxid;
    dataInitialPart();
    pageChange();
    ajaxN(relational.star,relational.evSize)
}
$(document).ready(readyHandle);
function readyHandle() {
    //数据测试
    console.log("test");
    pageChange();
    //ajaxN(relational.star,relational.evSize);//靠前一个页面触发所以不在ready中调用
    //console.log(relational);
    //页码条点击事件
    containFootButtonEventBind(ajaxN);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框相关
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    //功能条点击相关
    $(".setUl li").click(function (e) {
        var e=e||event,
            _this=this;
        setUlLiclick(e,_this);
    });
    //功能条启用转换
    $("#zcf_select").change(changIfOpen);
    //修改框的点击事件
    $("#zcf_new_pop_debitCard .new_pop_tail button").click(newPopButtonClick);
    //点击大红X
    $(".new_pop_head_X").click(newPopButtonClick);
    //信息接收
    window.addEventListener("message",function (e) {
        $("#zcf_mask").remove();
        var data=JSON.parse(e.data);
        relational.lnid=data.lnid;
        relational.xxid=data.xxid;
        dataInitialPart();
        pageChange();
        ajaxN(relational.star,relational.evSize)
    });
    youJin.labelSelectAll();
}