/**
 * Created by Administrator on 2016/12/27.
 */
relational.label="adid";
// relational.label2="atid";
relational.psid="";
relational.atid="12";
relational.dataTypeID="adid";//删除图像是要取DATA下的什么的类型ID（跟上传图片有关的参数）例如："link_table_id": "wpid",
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    data["zcf_img_url"]=data["img_url"];
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        date_begin:"开始",
        date_end:"结束",
        pname:"平台",
        cname:"公司",
    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"adid":data["adid"], "zcf_name":"adid",},
        {"date_begin":data["date_begin"], "zcf_name":"date_begin",},
        {"date_end":data["date_end"], "zcf_name":"date_end",},
    ];
    // _2=[
    //     {"date_end":data["date_end"], "zcf_name":"date_end",},
    // ];
    _3=[
        {"pname":data["pname"], "zcf_name":"pname",},
        {"cname":data["cname"], "zcf_name":"cname",},
    ];
    _4=[
        {"zcf_img_url":data["zcf_img_url"], "zcf_name":"zcf_img_url",},
    ];
    _5=[
        {"money":data["money"], "zcf_name":"money",},
    ];
    // _6=[
    //     {"url":data["url"], "zcf_name":"url",},
    // ];
    _7=[
        {"click":data["click"], "zcf_name":"click",},
    ];
    _8=[
        {"shangjia":data["shangjia"], "zcf_name":"shangjia",},
    ];
    var _data=[_1,_3,_4,_5,_7,_8];
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
            url= relational.url+"?m=AdManage&s=getListByPsid&is_open=0&start="+star+"&limit="+evSize+"&psid="+relational.psid;
            break;
        case 1:
            url=relational.url+"?m=AdManage&s=getListByPsid&is_open=1&start="+star+"&limit="+evSize+"&psid="+relational.psid;
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
            uid:relational.uid,
        };
        //youJin.postMesToB("third",data);
    });
}
//搜索ajax
function ajaxSearch(star,size,numeber) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=AdManage&s=getListByPsid&is_open=0&name="+numeber+"&start="+star+"&limit="+size+"&psid="+relational.psid;
            break;
        case 1:
            url=relational.url+"?m=AdManage&s=getListByPsid&is_open=1&name="+numeber+"&start="+star+"&limit="+size+"&psid="+relational.psid;
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
                uid:relational.uid,
            };
            //youJin.postMesToB("third",data);
        });
    }
}
// //获取其他接口列表
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
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=AdManage&s=getListInfo&adid="+jikID,
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
    if(id=="#zcf_new_pop_debitCard"&&(relational.switch=="modify")){
        _url=relational.url+"?m=AdManage&s=addList";
        //data[relational.label2]=relational.atid;
        data[relational.label]=relational.uid;
    }else if(id=="#zcf_new_pop_debitCard"&&relational.switch=="add"){
        data["psid"]=relational.psid;
        data["atid"]=relational.atid;
        data["psid"]=relational.psid;
        _url=relational.url+"?m=AdManage&s=addList";
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=Manage&s=linkUidAndCompany";
        data[relational.label2]=relational.uid2;
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
    //ajaxN(relational.star,relational.evSize);
    //页码条点击事件
    containFootButtonEventBind(ajaxN);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框相关
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    //修改框的点击事件
    // $("#zcf_new_pop_debitCard .new_pop_tail button").click(newPopButtonClick);

    //功能条点击相关
    $(".setUl li").click(function (e) {
        var e=e||event;
        var _this=this;
        if(_this.id=="add"){
            // if(!relational.uid){
            //     popplug([{},{content:"请选择操作对象"}]);
            //     return ;
            // }
            relational.switch="add";
            youJin.zcf_setFrameShow(e,_this);
        }
        if(_this.id=="modify"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            relational.switch="modify";
            youJin.zcf_setFrameShow(e,_this);
            ajxaGet(relational.uid);
            //youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_addRelation");
        }
        if(_this.id=="zcf_remove_relation"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_removeRelation");
        }
        if(_this.id=="refreash"){
            refreshZ();
        }
        if(_this.id=="upload"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            var frame= $("#zcf_new_pop_upload");
            var obj={
                zcf_model:"ad",
                adid:relational.uid,
            };
            frame.data("liId",_this.id);//按钮做判断的依据
            frame.find(".ul_img").children().remove();
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_upload");
            youJin.ajaxShow(obj,youJin.ajaxShowScs);
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
        var val=$.trim($(_this).attr("class"));
        if(id=="#zcf_new_pop_upload"){
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
                    zcf_model:"ad",
                    adid:relational.uid,
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
        }else {
            youJin.newPopButtonClick(e,_this,id,ajaxAdd);
        }
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
    //传消息给bro
    // youJin.postMesToB("second");
    //信息接收
    window.addEventListener("message",function (e) {
        var e=e||event;
        var data=JSON.parse(e.data);
        console.log("message",e,data);
        relational.psid=data.uid;
        $("#zcf_mask").remove();
        ajaxN(relational.star,relational.evSize);
    });
    //搜索下拉提示
    var ptid=$("#zcf_new_pop_debitCard [data-base='pname']");
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
