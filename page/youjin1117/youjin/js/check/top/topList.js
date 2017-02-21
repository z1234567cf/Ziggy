/**
 * Created by Administrator on 2016/12/20.
 */
relational.label="tid";
relational.label2="uid";
relational.time_start="";
relational.time_end="";
relational.type="0";
relational.is_child="0";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    //_data["zcf_tid"]=_data["tid"];.
    _data["zcf_content"]=_data["content"];
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
        {"tid":data["tid"], "zcf_name":"tid",},
        {"time_h":data["time_h"], "zcf_name":"time_h",},
    ];
    _2=[
        {"name":data["name"], "zcf_name":"name",},
    ];
    _3=[
        {"mid":data["mid"], "zcf_name":"mid",},
    ];
    _4=[
        {"user":data["user"], "zcf_name":"user",},
    ];
    _5=[
        {"title":data["title"], "zcf_name":"title",},
    ];
    _6=[
        {"zcf_content":data["zcf_content"], "zcf_name":"zcf_content",},
    ];
    _7=[
        {"star":data["star"], "zcf_name":"star",},
    ];
    _8=[
        {"lines":data["lines"], "zcf_name":"lines",},
    ];
    _9=[
        {"share":data["share"], "zcf_name":"share",},
    ];
    _10=[
        {"get_gift_ubi":data["get_gift_ubi"], "zcf_name":"get_gift_ubi",},
    ];
    _11=[
        {"is_stick":data["is_stick"], "zcf_name":"is_stick",},
    ];
    _12=[
        {"is_myself":data["is_myself"], "zcf_name":"is_myself",},
    ];
    var _data=[_1,_2,_3,_4,_5,_6,_7,_8,_9,_11,_12];
    return _data;
}
/*
 * ajax类
 * */
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Manage&s=getTopList&is_open=0&start="+star+"&limit="+ evSize +
                //"&type="+relational.type+
                //"&is_child="+relational.is_child+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=Manage&s=getTopList&is_open=1&start="+star+"&limit="+evSize +
                //"&type="+relational.type+
                //"&is_child="+relational.is_child+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
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
            url= relational.url+"?m=Manage&s=getTopList&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size+
                //"&type="+relational.type+
                //"&is_child="+relational.is_child+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=Manage&s=getTopList&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size+
                //"&type="+relational.type+
                //"&is_child="+relational.is_child+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
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
//获得当前要修改数据的AJAX
// function ajxaGet(jikID) {
//     $.ajax(
//         {
//             type: "GET",
//             url: relational.url+"?m=Manage&s=getTopInfo&tid="+jikID,
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
        _url=relational.url+"?m=Manage&s=saveTop";
        data[relational.label]=relational.uid;
        var data1=youJin.UEditorGetValue();
        for(var i in data1){
            data[i]=data1[i];
        }
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=Manage&s=delTop";
        data[relational.label]=relational.uid;
    }
    if(id=="#zcf_new_pop_removeRelation"){
        _url=relational.url+"?m=Manage&s=setDianpingGood";
        data[relational.label]=relational.uid;
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
};
//取值ajax
function ajaxGetValue(id) {
    $.ajax(
        {
            type: "GET",
            url:relational.url+"?m=Manage&s=getTopInfo&tid="+relational.uid,
            success: function (msg) {
                var _msg=msg;
                ajaxGetValueScs(_msg,id)
            },
        }
    )
}
function ajaxGetValueScs(msg,id) {
    var _data=msg.data;
    setPopValue(_data,id);
    relational.time=setInterval(function () {
        if(top.relational.ueStatus==="ready"){
            clearInterval(relational.time);
            youJin.UEditorSetValue(_data,id);
            top.relational.ueStatus="done";
            console.log("top.relational.ueStatus",top.relational.ueStatus);
        }
    },50);
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
        if(_this.id=="zcf_modify"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this);
            ajaxGetValue()
        }
        if(_this.id=="zcf_delele"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_addRelation");
        }
        if(_this.id=="zcf_essence"){
            if(!relational.uid){
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
    //时间段搜索
    $("#zcf_left_input").blur(function () {
        clearTimeout(relational.time);
        var _this=this;
        relational.time=setTimeout(function () {
            var val=$(_this).val();
            console.log("blur");
            relational.time_start=val;
            pageChange();
            ajaxN(relational.star,relational.evSize);
        },300);
    });
    $("#zcf_right_input").blur(function () {
        clearTimeout(relational.time);
        var _this=this;
        relational.time=setTimeout(function () {
            var val=$(_this).val();
            relational.time_end=val;
            pageChange();
            ajaxN(relational.star,relational.evSize);
        },300);

    })
}
