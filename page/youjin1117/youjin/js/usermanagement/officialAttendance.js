/**
 * Created by Administrator on 2017/1/10.
 */
/**
 * Created by Administrator on 2017/1/6.
 */
/**
 * Created by Administrator on 2017/1/5.
 */
/**
 * Created by Administrator on 2016/12/20.
 */
relational.label="pid";
relational.time_start="";
relational.time_end="";
relational.trid="23";
relational.typeF="";
relational.s_type=1;
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    _data["zcf_pid"]=_data["pid"];
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
        {"pid":data["pid"], "zcf_name":"pid",},
        {"user":data["user"], "zcf_name":"user",},
    ];
    _4=[
        {"mobile":data["mobile"], "zcf_name":"mobile",},
    ];
    _6=[
        {"leix":data["leix"], "zcf_name":"leix",},
    ];
    _5=[
        {"slice":data["slice"], "zcf_name":"slice",},
    ];
    _7=[
        {"time_h":data["time_h"], "zcf_name":"time_h",},
    ];
    _8=[
        {"pingtai":data["pingtai"], "zcf_name":"pingtai",},
    ];
    var _data=[_1,_4,_6,_5,_7,_8];
    return _data;
}
/*
 * ajax类
 * */
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=UserManage&s=getSigninList&is_open=0&start="+star+"&limit="+ evSize +
                "&type="+relational.typeF+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end+
                "&s_type="+relational.s_type;
            break;
        case 1:
            url=relational.url+"?m=UserManage&s=getSigninList&is_open=1&start="+star+"&limit="+evSize +
                "&type="+relational.typeF+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end+
                "&s_type="+relational.s_type;
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
            url= relational.url+"?m=UserManage&s=getSigninList&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size+
                "&type="+relational.typeF+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end+
                "&s_type="+relational.s_type;
            break;
        case 1:
            url=relational.url+"?m=UserManage&s=getSigninList&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size+
                "&type="+relational.typeF+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end+
                "&s_type="+relational.s_type;
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
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=Manage&s=getDianpingInfo&pid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"];
    //ajaxGetList(data["province"],"1");
    setPopValue(data);
}
//新增数据(审核)的AJAX
function ajaxAdd(data,id) {
    var _url;
    if(id=="#zcf_new_pop_debitCard"){
        _url=relational.url+"?m=Manage&s=updateDianping";
        data[relational.label]=relational.uid;
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=Manage&s=delDianping";
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
function ajaxGetValue() {
    $.ajax(
        {
            type: "GET",
            url:relational.url+"?m=Account&s=getAllTransType",
            success: function (msg) {
                var _msg=msg;
                ajaxGetValueScs(_msg)
            },
        }
    )
}
//制造option
function ajaxGetValueScs(msg) {
    var _data=msg.data;
    var par=$("#zcf_option");
    domOption(_data,par,"trid","desc");
}
//
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
            ajxaGet(relational.uid);
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
    //制作选择项的值
    //ajaxGetValue();
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
    });
    $("#select").change(function () {
        var val=$(this).val();
        relational.typeF=val;
        pageChange();
        ajaxN(relational.star,relational.evSize);
    })
}
