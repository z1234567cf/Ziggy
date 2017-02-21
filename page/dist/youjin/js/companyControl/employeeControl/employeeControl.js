/**
 * Created by Administrator on 2017/2/4.
 */
relational.label="id";
relational.label2="uid";
// relational.time_start="";
// relational.time_end="";
relational.type="0";
// relational.is_child="0";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    // _data["zcf_pid"]=_data["pid"];
    _data["zcf_status"]=_data["status"]==0?"正常":"冻结";
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
        {"id":data["id"], "zcf_name":"id",},
        {"uid":data["uid"], "zcf_name":"uid",},
        {"zcf_Data":data["zcf_Data"], "zcf_name":"zcf_Data",},
        {"username":data["username"], "zcf_name":"username",},
        // {"xb":data["xb"], "zcf_name":"xb",},
    ];
    _2=[
        {"rname":data["rname"], "zcf_name":"rname",},
    ];
    _3=[
        {"mobile":data["mobile"], "zcf_name":"mobile",},
    ];
    _4=[
        {"zcf_status":data["zcf_status"], "zcf_name":"zcf_status",},
    ];
    _5=[
        {"last_logintime":data["last_logintime"], "zcf_name":"last_logintime",},
    ];
    // _6=[
    //     {"star":data["star"], "zcf_name":"star",},
    // ];
    // _7=[
    //     {"huifu_nums":data["huifu_nums"], "zcf_name":"huifu_nums",},
    // ];
    // _8=[
    //     {"jinghua":data["jinghua"], "zcf_name":"jinghua",},
    // ];
    // _9=[
    //     {"pingtai":data["pingtai"], "zcf_name":"pingtai",},
    // ];
    var _data=[_1,_2,_3,_4,_5];
    return _data;
}
/*
 * ajax类
 * */
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Worker&s=getWorkerList&is_open=0&start="+star+"&limit="+ evSize;
            break;
        case 1:
            url=relational.url+"?m=Worker&s=getWorkerList&is_open=1&start="+star+"&limit="+evSize;
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
            url= relational.url+"?m=Worker&s=getWorkerList&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Worker&s=getWorkerList&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size;
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
            url: relational.url+"?m=Worker&s=getWorkerInfo&uid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"];
    // ajaxGetList(false,"1");
    setPopValue(data);
}
//新增数据(审核)的AJAX
function ajaxAdd(data,id,reid) {
    var _url;
    if(reid=="zcf_add"){
        _url=relational.url+"?m=Worker&s=addWorker";
        //data[relational.label]=relational.uid;
    }
    if(reid=="zcf_modify"){
        _url=relational.url+"?m=Worker&s=addWorker";
        data[relational.label]=relational.uid;
    }
    if(reid=="zcf_resetPw"){
        _url=relational.url+"?m=UserManage&s=resetPassword";
        data["ty"]="login";
        data[relational.label2]=relational.uid2;
    }
    if(reid=="zcf_frozen"){
        _url=relational.url+"?m=Worker&s=addWorker";
        data=relational.data;
        data[relational.label]=relational.uid;
        data["status"]=1;
    }
    if(reid=="zcf_unfrozen"){
        _url=relational.url+"?m=Worker&s=addWorker";
        data=relational.data;
        data[relational.label]=relational.uid;
        data["status"]=0;
    }
    if(reid=="zcf_delete"){
        _url=relational.url+"?m=Worker&s=delWorker";
        data=relational.data;
        // data[relational.label]=relational.uid;
    }
    // if(reid=="zcf_delete"){
    //     _url=relational.url+"?m=Manage&s=setDianpingGood";
    //     data[relational.label]=relational.uid;
    // }
    //获取百度编辑器下的值
    // var data1=youJin.UEditorGetValue();
    // for(var i in data1){
    //     data[i]=data1[i];
    // }
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
            url:relational.url+"?m=Worker&s=getWorkerInfo&uid="+relational.uid2,
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
    // relational.time=setInterval(function () {
    //     if(top.relational.ueStatus==="ready"){
    //         clearInterval(relational.time);
    //         youJin.UEditorSetValue(_data,id);
    //         top.relational.ueStatus="done";
    //         console.log("top.relational.ueStatus",top.relational.ueStatus);
    //     }
    // },50);

}
//获取其他接口列表
function ajaxGetList(pid,async) {
    var url=relational.url+"?m=Worker&s=getRoleList",
        fn=ajaxFirstScs;
    if(pid){
        url=relational.url+"?m=Worker&s=addWorker&pid="+pid;
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
    var bank=$(document.body).find("#zcf_new_pop_fn1 [data-base='rid']"),
        data=msg.data;
    bank.children().remove();
        data.unshift({
            rid:"",
            rname:"",
        });
    domOption(data,bank,"rid","rname");
}
function ajaxSecondScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='city']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank);
}
$(document).ready(readyHandle);
function readyHandle() {
    //数据测试
    //console.log("ready");
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
            $("#zcf_new_pop_fn1")[0].reID=_this.id;
            youJin.ifDisable(false,"[data-base]");
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn1");
            //给主框传递的信息对象
            // top.postMessage(_data,"*");
            ajaxGetValue("#zcf_new_pop_fn1")
        }
        if(_this.id=="zcf_add"){
            $("#zcf_new_pop_fn1")[0].reID=_this.id;
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn1");
            youJin.ifDisableY();
            // ajaxGetValue()
        }
        //更改内容
        if(_this.id=="zcf_resetPw"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            $("#zcf_new_pop_fn2")[0].reID=_this.id;
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn2");
            youJin.changTipContent("#zcf_new_pop_fn2","确认重置登录密码吗?")
        }
        if(_this.id=="zcf_frozen"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            $("#zcf_new_pop_fn2")[0].reID=_this.id;
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn2");
            youJin.changTipContent("#zcf_new_pop_fn2","确认冻结吗？");
        }
        if(_this.id=="zcf_unfrozen"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            $("#zcf_new_pop_fn2")[0].reID=_this.id;
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn2");
            youJin.changTipContent("#zcf_new_pop_fn2","确认解冻吗？");
        }
        if(_this.id=="zcf_delete"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            $("#zcf_new_pop_fn2")[0].reID=_this.id;
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_fn2");
            youJin.changTipContent("#zcf_new_pop_fn2","确认删除吗？");
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
            id="#"+par.attr("id"),
            reid=par[0].reID;
        //console.log("id",id);
        youJin.newPopButtonClick(e,_this,id,ajaxAdd,reid);
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
        //console.log("id",id);
        youJin.newPopButtonClick(e,_this,id);
    });
    //确定角色
    ajaxGetList(false);
    //时间段搜索
    // $("#zcf_left_input").blur(function () {
    //     clearTimeout(relational.time);
    //     var _this=this;
    //     relational.time=setTimeout(function () {
    //         var val=$(_this).val();
    //         //console.log("blur");
    //         relational.time_start=val;
    //         pageChange();
    //         ajaxN(relational.star,relational.evSize);
    //     },300);
    // });
    // $("#zcf_right_input").blur(function () {
    //     clearTimeout(relational.time);
    //     var _this=this;
    //     relational.time=setTimeout(function () {
    //         var val=$(_this).val();
    //         relational.time_end=val;
    //         pageChange();
    //         ajaxN(relational.star,relational.evSize);
    //     },300);
    // });
}
