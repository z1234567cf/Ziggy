/**
 * Created by Administrator on 2017/1/6.
 */
/**
 * Created by Administrator on 2016/12/19.
 */
relational.label="mcid";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        slice:"U币",
        time_h:"提交",
        check_time:"审核",
        tijiaoren:"提交",
        shenheren:"审核",
    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"mcid":data["mcid"], "zcf_name":"mcid",},
        {"user":data["user"], "zcf_name":"user",},
    ];
    _2=[
        {"slice":data["slice"], "zcf_name":"slice",},
    ];
    _3=[
        {"msg":data["msg"], "zcf_name":"msg",},
    ];
    _4=[
        {"time_h":data["time_h"], "zcf_name":"time_h",},
        {"check_time":data["check_time"], "zcf_name":"check_time",},
        {"unknown":data["unknown"], "zcf_name":"unknown",},
    ];
    _5=[
        {"zhuangtai":data["zhuangtai"], "zcf_name":"zhuangtai",},
        {"tijiaoren":data["tijiaoren"], "zcf_name":"tijiaoren",},
        {"shenheren":data["shenheren"], "zcf_name":"shenheren",},
    ];
    var _data=[_1,_2,_3,_4,_5];
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
            url= relational.url+"?m=Account&s=getMcApplyList&is_open=0&start="+star+"&limit="+evSize+"&trid="+relational.trid;
            break;
        case 1:
            url=relational.url+"?m=Account&s=getMcApplyList&is_open=1&start="+star+"&limit="+evSize+"&trid="+relational.trid;
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
            url= relational.url+"?m=Account&s=getMcApplyList&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size+"&trid="+relational.trid;
            break;
        case 1:
            url=relational.url+"?m=Account&s=getMcApplyList&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size+"&trid="+relational.trid;
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
//获取其他接口列表
// function ajaxGetList(pid,async) {
//     var url=relational.url+"?m=Wd&s=getArea",
//         fn=ajaxFirstScs;
//     if(pid){
//         url=relational.url+"?m=Wd&s=getArea&pid="+pid;
//         fn=ajaxSecondScs;
//     }
//     var  asyncF=true;
//     if(async){
//         asyncF=false;
//     }
//     $.ajax(
//         {
//             type: "GET",
//             async:asyncF,
//             url: url,
//             success: fn,
//         }
//     )
// }
// //成功回调
// function ajaxFirstScs(msg) {
//     var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='province']"),
//         data=msg.data;
//     bank.children().remove();
//     domOption(data,bank);
// }
// function ajaxSecondScs(msg) {
//     var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='city']"),
//         data=msg.data;
//     bank.children().remove();
//     domOption(data,bank);
// }
// //制造option
// function domOption(data,bank) {
//     var length=data.length,
//         i;
//     for(i=0;i<length;i++){
//         var option=$("<option></option>");
//         option.val(data[i]["id"]);
//         option.text(data[i]["name"]);
//         bank.append(option);
//     }
// }
//获得当前要修改数据的AJAX
// function ajxaGet(jikID) {
//     $.ajax(
//         {
//             type: "GET",
//             url: relational.url+"?m=Wd&s=getWdInfo&ptid="+jikID,
//             success: ajxaGetScs,
//         }
//     )
// }
// //成功时回调函数
// function ajxaGetScs(msg) {
//     var data=msg["data"];
//     ajaxGetList(data["province"],"1");
//     setPopValue(data);
// }
//新增数据(审核)的AJAX
function ajaxAdd(data,id) {
    var _url;
    if(id=="#zcf_new_pop_debitCard"){
        _url=relational.url+"?m=Account&s=checkMcApply";
        data[relational.label]=relational.uid;
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=Account&s=addManualChange";
        //data[relational.label]=relational.uid2;
    }
    if(id=="#zcf_new_pop_removeRelation"){
        _url=relational.url+"?m=Manage&s=unlinkUidAndCompany";
        data[relational.label2]=relational.uid2;
    }
    $.ajax(
        {
            type: "POST",
            url:_url,
            data:data,
            success: function (msg) {
                var _msg=msg;
                ajaxAddScs(_msg,id)
            },
        }
    )
}
//添加关联的AJAX
function ajaxAddRelation(data,id) {
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Manage&s=linkUidAndCompany",
            data:data,
            success: function (msg) {
                var _msg=msg;
                ajaxAddScs(_msg,id)
            },
        }
    )
}
//确认解除关联
function ajaxRemoveRelation(data,id) {
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Manage&s=unlinkUidAndCompany",
            data:data,
            success: function (msg) {
                var _msg=msg;
                ajaxAddScs(_msg,id)
            },
        }
    )
}
//成功回调函数
function ajaxAddScs(msg,id) {
    if(msg.r==1){
        // if(relational.corr=="add"){
        //     popplug([{},{content:"添加成功"}]);
        // }else if(relational.corr=="modify"){
        //     popplug([{},{content:"修改成功"}]);
        // }else{
        //     popplug([{},{content:"响应成功"}]);
        // }
        var msg1=msg.msg;
        popplug([{},{content:msg1}]);
        hideNewPop(id);
        clearPopValue(id);
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
            url: relational.url+"?m=Manage&s=companyList&name="+name,
            success: function (msg) {
                var data=msg.data,
                    length=data.length,
                    i;
                var bro=youJin.platformSearchShow(_this),
                    ul=bro.find("ul");
                ul.children("li").remove();
                for(i=0;i<length;i++){
                    var li=youJin.makeDom(data[i],ul,"cid","pname");
                    li.click(function (e) {
                        var e=e||event,
                            _this=this;
                        youJin.liClickHandle(_this,"cid","pname");
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
    ajaxN(relational.star,relational.evSize);
    //页码条点击事件
    containFootButtonEventBind(ajaxN);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框相关
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    //功能条点击相关
    $(".setUl li").click(function (e) {
        var e=e||event;
        var _this=this;
        if(_this.id=="zcf_check"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this);
        }
        if(_this.id=="zcf_add_relation"){
            // if(!relational.uid2){
            //     popplug([{},{content:"请选择操作对象"}]);
            //     return ;
            // }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_addRelation");
        }
        if(_this.id=="zcf_remove_relation"){
            if(!relational.uid2){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_removeRelation");
        }
        if(_this.id=="refreash"){
            refreshZ();
        }
    });
    //功能条启用转换
    $("#zcf_select").change(changIfOpen);
    //修改框的点击事件
    $(".new_pop_tail button").click(function (e) {
        var e=e||event;
        var _this=this;
        var par=$(_this).parents(".new_pop"),
            id="#"+par.attr("id");
        console.log("id",id);
        youJin.newPopButtonClick(e,_this,id,ajaxAdd);
        //  if(id=="#zcf_new_pop_debitCard"){
        //      youJin.newPopButtonClick(e,_this,id,ajaxAdd);
        //  }
        // if(id=="#zcf_new_pop_addRelation"){
        //     youJin.newPopButtonClick(e,_this,id,ajaxAddRelation);
        // }
        //  if(id=="#zcf_new_pop_removeRelation"){
        //      youJin.newPopButtonClick(e,_this,id,ajaxRemoveRelation);
        //  }
    });
    //点击大红X
    $(".new_pop_head_X").click(function (e) {
        var e=e||event;
        var _this=this;
        var par=$(_this).parents(".new_pop"),
            id="#"+par.attr("id");
        console.log("id",id);
        youJin.newPopButtonClick(e,_this,id)
    });
    //搜索下拉提示
    var ptid=$("#zcf_new_pop_addRelation [data-base='name']");
    ptid.bind("input",function (e) {
        var e=e||event,
            _this=this;
        var val=$.trim($(this).val());
        youJin.platformSearch(ajaxplatformSearch,val,_this);
    });
    ptid.focus(function (e) {
        var e=e||event,
            _this=this;
        var val=$.trim($(this).val());
        youJin.platformSearch(ajaxplatformSearch,val,_this);
    });
    ptid.blur(function (e) {
        var e=e||event,
            _this=this;
        clearTimeout(youJin.setTime);
        youJin.setTime=setTimeout(function () {
            youJin.platformSearchHide(_this);
        },200);
    });
}
