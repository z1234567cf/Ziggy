/**
 * Created by Administrator on 2017/1/6.
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
relational.label="qsid";
relational.label2="epid";
relational.time_start="";
relational.time_end="";
relational.trid="23";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    _data["zcf_pid"]=_data["pid"];
    _data["zcf_img_url"]=_data["img_url"];//所有的图片类都归于这一类
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        ubi:"U币",
        title:"任务",
        time_h:"提交",
        check_time:"审核",
        shenheren:"审核",
    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"qsid":data["qsid"], "zcf_name":"qsid",},
        {"epid":data["epid"], "zcf_name":"epid",},
        {"zcf_Data":data["zcf_Data"], "zcf_name":"zcf_Data",},//代表将整个数据存储到当前dom中
        {"user":data["user"], "zcf_name":"user",},
    ];
    _2=[
        {"mobile":data["mobile"], "zcf_name":"mobile",},
    ];
    _7=[
        {"zcf_img_url":data["zcf_img_url"], "zcf_name":"zcf_img_url",},
    ];
    _3=[
        {"name":data["name"], "zcf_name":"name",},
    ];
    _4=[
        {"ubi":data["ubi"], "zcf_name":"ubi",},
        {"title":data["title"], "zcf_name":"title",},
    ];
    _5=[
        {"time_h":data["time_h"], "zcf_name":"time_h",},
        {"check_time":data["check_time"], "zcf_name":"check_time",},
        // {"unkonw":data["unkonw"], "zcf_name":"unkonw",},
    ];
    _6=[
        {"zhuangtai":data["zhuangtai"], "zcf_name":"zhuangtai",},
        {"shenheren":data["shenheren"], "zcf_name":"shenheren",},
    ];
    // _9=[
    //     {"pingtai":data["pingtai"], "zcf_name":"pingtai",},
    // ];
    var _data=[_1,_2,_7,_3,_4,_5,_6];
    return _data;
}
/*
 * ajax类
 * */
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Qujin&s=getQujinApply&is_open=0&start="+star+"&limit="+ evSize +
                "&trid="+relational.trid+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=Qujin&s=getQujinApply&is_open=1&start="+star+"&limit="+evSize +
                "&trid="+relational.trid+
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
            url= relational.url+"?m=Qujin&s=getQujinApply&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size+
                "&trid="+relational.trid+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=Qujin&s=getQujinApply&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size+
                "&trid="+relational.trid+
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
//获得当前要修改数据的AJAX(此处比较特殊)
function ajxaGet(obj) {
    $.ajax(
        {
            type: "POST",
            data:obj,
            url: relational.url+"?m=Qujin&s=getCheckInfo",
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"],
        title=msg["title"],
        pingtai=msg["pingtai"],
        i,
        length=data?data.length:0;
    //ajaxGetList(data["province"],"1");
    //setPopValue(data);
    var par=$(top.document.body).find("#zcf_new_pop_debitCard"),
        span=par.find(".new_pop_text").eq(0),
        select=par.find("[data-select]").eq(0),
        arr=["","content","jiangli","etid"];//要取得字段
    span.text(pingtai+" "+title["note"]+" "+relational.data["mobile"]);
    console.log("data",data,"par",par);
    select.children().remove();
    for(i=0;i<length;i++){
        youJin.makeDomOption(data[i],select,arr);
    }
}
//DOM生成
youJin.makeDomOption=function (data,select,arr) {
    var option=$("<option></option>"),
        span1=$("<span></span>"),
        span2=$("<span></span>"),
        span3=$("<span></span>");
    //span1.text(data[arr[0]]);
    span2.text(data[arr[1]]);
    span3.text(" "+data[arr[2]]);
    //option.append(span1);
    option.append(span2);
    option.append(span3);
    option.val(data[arr[3]]);
    select.append(option);
};
//新增数据(审核)的AJAX
function ajaxAdd(data,id) {
    var _url;
    if(id=="#zcf_new_pop_debitCard"){
        _url=relational.url+"?m=Qujin&s=checkQujinApply";
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
        if(_this.id=="zcf_check"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this);
            var obj={
                eaid:relational.data["eaid"],
                epid:relational.data["epid"],
            };
            ajxaGet(obj);
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
    // $("#zcf_option").change(function () {
    //     var val=$(this).val();
    //     relational.trid=val;
    //     pageChange();
    //     ajaxN(relational.star,relational.evSize);
    // })
}
