/**
 * Created by Administrator on 2016/12/7.
 */
relational.label="tpid";
relational.dataTypeID="tpuid";//删除图像是要取DATA下的什么的类型ID（跟上传图片有关的参数）例如："link_table_id": "wpid",
relational.background="";
relational.bus_model="";
relational.cgid="";
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
        {"tpid":data["tpid"], "zcf_name":"tpid",},
        {"module_name":data["module_name"], "zcf_name":"module_name",},
    ];
    _2=[
        {"tpname":data["tpname"], "zcf_name":"tpname",},
    ];
    // _3=[
    //     {"sheng":data["sheng"], "zcf_name":"sheng",},
    //     {"shi":data["shi"], "zcf_name":"shi",},
    // ];
    _4=[
        {"zcf_rate":data["zcf_rate"], "zcf_name":"zcf_rate",},
        {"beijing":data["beijing"], "zcf_name":"beijing",},
        {"tab":data["tab"], "zcf_name":"tab",},
    ];
    _5=[
        {"cg_bank":data["cg_bank"], "zcf_name":"cg_bank",},
    ];
    _6=[
        {"yewu":data["yewu"], "zcf_name":"yewu",},
        {"xf_type":data["xf_type"], "zcf_name":"xf_type",},
    ];
    _7=[
        {"fans":data["fans"], "zcf_name":"fans",},
        {"lines":data["lines"], "zcf_name":"lines",},
    ];
    _8=[
        {"bind_user":data["bind_user"], "zcf_name":"bind_user",},
    ];
    _9=[
        {"xianshi":data["xianshi"], "zcf_name":"xianshi",},
    ];
    // _10=[
    //     {"fans":data["fans"], "zcf_name":"fans",},
    // ];
    // _11=[
    //     {"lines":data["lines"], "zcf_name":"lines",},
    // ];
    // _12=[
    //     {"bind_uid":data["bind_uid"], "zcf_name":"bind_uid",},
    // ];
    // _13=[
    //     {"xianshi":data["xianshi"], "zcf_name":"xianshi",},
    // ];
    var _data=[_1,_2];
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
            url= relational.url+"?m=Manage&s=getTopicList&is_open=0&start="+star+"&limit="+evSize;
            break;
        case 1:
            url=relational.url+"?m=Manage&s=getTopicList&is_open=1&start="+star+"&limit="+evSize;
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
            url= relational.url+"?m=Manage&s=getTopicList&is_open=0&name="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Manage&s=getTopicList&is_open=1&name="+numeber+"&start="+star+"&limit="+size;
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
//获取银行接口列表
function ajaxGetListSed() {
    $.ajax(
        {
            type: "GET",
            async:false,
            url: relational.url+"?m=Manage&s=newsModuleList",
            success: function (msg) {
                var bank=$(document.body).find("#zcf_new_pop_debitCard [data-base='mid']"),
                    data=msg.data;
                bank.children().remove();
                data.unshift({
                    mid:"",
                    name:"",
                });
                console.log("data",data);
                domOption(data,bank,"mid","name");
            },
        }
    )
}
//获取消费分期分类接口列表
function ajaxGetListSed2() {
    $.ajax(
        {
            type: "GET",
            async:false,
            url: relational.url+"?m=Wd&s=xiaofeiTypeList",
            success: function (msg) {
                var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='xiaofei_type']"),
                    data=msg.data;
                bank.children().remove();
                data.unshift({
                    xiaofei_type:"",
                    desc:"",
                });
                domOption(data,bank,"xiaofei_type","desc");
            },
        }
    )
}
//
function ajaxGetListTid() {
    $.ajax(
        {
            type: "GET",
            async:false,
            url: relational.url+"?m=Wd&s=cgBankList",
            success: function (msg) {
                var div=$("#zcf_cread .setUl_li_offset_div"),
                    data=msg.data;
                data.unshift({
                    cgid:"",
                    bank_name:"全部",
                });
                //console.log("全部");
                domOption(data,div,"cgid","bank_name","p","setUl_li_offset_pc");
                div.find(".setUl_li_offset_pc").mousedown(function () {
                    var e=e||event,
                        _this=this,
                        val=$(_this).attr("data-value"),
                        text=$(_this).text(),
                        par=$(_this).parent(".setUl_li_offset_div"),
                        input=par.prev(".setUl_li_offset_input"),
                        key=input.attr("data-key");
                    console.log(val,"全部");
                    input.val(text);
                    //par.css("display","none");
                    relational.cgid=val;
                    pageChange();
                    ajaxN(relational.star,relational.evSize);
                });
                console.log(div,div.find(".setUl_li_offset_pc"));
            },
        }
    )
}
//制造option
function domOption(data,bank,id,name,option1,class1) {
    var length=data.length,
        i,
        id=id||"id",
        name=name||"name",
        option1=option1||"option";
    for(i=0;i<length;i++){
        var option=$("<"+option1+"></"+option1+">");
        if(class1){option.addClass(class1)};
        option.val(data[i][id]);
        if(option1){option.attr("data-value",data[i][id])}
        option.text(data[i][name]);
        bank.append(option);
    }
    console.log("bank",bank);
}
//获得当前要修改数据的AJAX
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m= Manage&s=getTopicInfo&tpid="+jikID,
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
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Manage&s=addTopic",
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
    console.log("ready");
    //console.log(relational);
    pageChange();
    ajaxN(relational.star,relational.evSize);
    ajaxGetListSed();
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
        if(_this.id=="uploadLogo"||_this.id=="upload"||_this.id=="uploadBC"||_this.id=="uploadLogoLong"||_this.id=="uploadICP"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            var frame= $("#zcf_new_pop_upload");
            if(_this.id=="uploadLogo"){
                relational.type_id="1";
            }else if(_this.id=="upload"){
                relational.type_id="32";
            }else if(_this.id=="uploadBC"){
                relational.type_id="3";
            }else if(_this.id=="uploadLogoLong"){
                relational.type_id="27";
            }else if(_this.id=="uploadICP"){
                relational.type_id="28";
            }
            var obj={
                out_id:relational.uid,
                type_id:relational.type_id,
            };
            frame.data("liId",_this.id);//按钮做判断的依据
            console.log("frame",frame.find(".ul_img"));
            frame.find(".ul_img").children().remove();
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_upload");
            youJin.ajaxShow(obj,youJin.ajaxShowScs);
        }else if(_this.id=="add"||_this.id=="modify"||_this.id=="refreash"){
            setUlLiclick(e,_this);
            // ajaxGetList(false,"1");//这里要执行同步 这里的同步执行先于setUlLiclick中的异步先执行 所以能正确的返回设定值（js单线程原因）
            // ajaxGetListSed();
            // ajaxGetListSed2()
        }
    });
    //功能条启用转换
    $("#zcf_select").change(changIfOpen);
    //修改框的点击事件
    //$("#zcf_new_pop_debitCard .new_pop_tail button").click(newPopButtonClick);
    $(".new_pop_tail button").click(function (e) {
        var e=e||event;
        var _this=this;
        var par=$(_this).parents(".new_pop"),
            id="#"+par.attr("id");
        var val=$.trim($(_this).attr("class"));
        console.log("id",id);
        if(id=="#zcf_new_pop_debitCard"){
            newPopButtonClick(e,_this);
        }else if(id=="#zcf_new_pop_upload"){
            var liId=par.data("liId");
            console.log("liId",liId);
            if(val=="new_pop_tail_button1"){
                // if(liId=="uploadLogo"){
                //
                // }else if(liId=="upload"){
                //
                // }else if(liId=="uploadBC"){
                //
                // }
                var obj={
                    out_id:relational.uid,
                    type_id:relational.type_id,
                };
                var file=par.find(":file")[0];
                var date=new FormData();
                var length=file.files.length,
                    i;
                console.log("file",file.files);
                for(i=1;i<length+1;i++){
                    date.append(("file"+i),file.files[i-1]);
                }
                youJin.ajaxAddImg(date,obj,youJin.ajaxShowScs,"#zcf_new_pop_upload");
            }else {
                hideNewPop("#zcf_new_pop_upload");
                clearPopValue("#zcf_new_pop_upload");
            }
        }else if(id=="#zcf_new_pop_delete"){
            if(val=="new_pop_tail_button1"){
                var obj=par.data("obj");
                youJin.ajaxDelete(obj,youJin.ajaxShowScs)
            }else {
                hideNewPop("#zcf_new_pop_delete");
            }
        }
        //youJin.newPopButtonClick(e,_this,id,ajaxAdd);
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
    //file文件的清空与设置
    $(".new_pop_body_contain_head_button").click(function (e) {
        var e=e||event,
            _this=this;
        console.log("new_pop_body_contain_head_button");
        youJin.appFile(_this);
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
    //传给父窗口
    // postMesToP("ready");
    //信息接收
    // window.addEventListener("message",messageHandle)
    //联动的省级定义地点
    // $("#zcf_new_pop_debitCard [data-base='province']").change(chainChange);
    // //select点击模拟事件
    // $(".setUl .setUl_li_offset_input").focus(function (e) {
    //     var e=e||event,
    //         _this=this;
    //     $(_this).next("div").css("display","block");
    // });
    // $(".setUl .setUl_li_offset_input").blur(function (e) {
    //     clearTimeout( relational.time);
    //     var e=e||event,
    //         _this=this;
    //     relational.time=setTimeout(function () {
    //         $(_this).next("div").css("display","none");
    //     },210);
    //
    // });
    // $(".setUl .setUl_li_offset_p").mousedown(function (e) {
    //     var e=e||event,
    //         _this=this,
    //         val=$(_this).attr("data-value"),
    //         text=$(_this).text(),
    //         par=$(_this).parent(".setUl_li_offset_div"),
    //         input=par.prev(".setUl_li_offset_input"),
    //         key=input.attr("data-key");
    //     input.val(text);
    //     //par.css("display","none");
    //     if(key=="background"){
    //         relational.background=val;
    //         pageChange();
    //         ajaxN(relational.star,relational.evSize);
    //     }else if(key=="bus_model"){
    //         relational.bus_model=val;
    //         pageChange();
    //         ajaxN(relational.star,relational.evSize);
    //     }
    //     //input.text();
    // })
}
