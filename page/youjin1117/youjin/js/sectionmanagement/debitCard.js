
relational.label="jjkid";
relational.dataTypeID="bkpid";//删除图像是要取DATA下的什么的类型ID（跟上传图片有关的参数）例如："link_table_id": "wpid",
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        "m_tong_fee": "同行",
        "m_yi_fee": "跨行",
        "online_tong_fee": "同行",
        "online_yi_fee": "跨行",
    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"jjkid":data["jjkid"], "zcf_name":"jjkid",},
        {"bank":data["bank"], "zcf_name":"bank",},
    ];
    _2=[
        {"card":data["card"], "zcf_name":"card",},
    ];
    _3=[
        {"tx_fee":data["tx_fee"], "zcf_name":"tx_fee",}
    ];
    _4=[
        {"m_tong_fee":data["m_tong_fee"], "zcf_name":"m_tong_fee",},
        {"m_yi_fee":data["m_yi_fee"], "zcf_name":"m_yi_fee",},
    ];
    _13=[
        {"online_tong_fee":data["online_tong_fee"], "zcf_name":"online_tong_fee",},
        {"online_yi_fee":data["online_yi_fee"], "zcf_name":"online_yi_fee",},
    ];
    _5=[
        {"udun_fee":data["udun_fee"], "zcf_name":"udun_fee",},
    ];
    _6=[
        {"card_fee":data["card_fee"], "zcf_name":"card_fee",},
    ];
    _7=[
        {"year_fee":data["year_fee"], "zcf_name":"year_fee",},
    ];
    _8=[
        {"manage_fee":data["manage_fee"], "zcf_name":"manage_fee",},
    ];
    _9=[
        {"sms_fee":data["sms_fee"], "zcf_name":"sms_fee",},
    ];
    _10=[
        {"huoqi_apr":data["huoqi_apr"], "zcf_name":"huoqi_apr",},
    ];
    _11=[
        {"dingqi_apr":data["dingqi_apr"], "zcf_name":"dingqi_apr",},
    ];
    // _12=[
    //
    // ];
    var _data=[_1,_2,_3,_4,_13,_5,_6,_7,_8,_9,_10,_11];
    return _data;
}
//ajax取得银行借记卡列表
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Bank&s=getJiejikaList&is_open=0&start="+star+"&limit="+evSize;
            break;
        case 1:
            url=relational.url+"?m=Bank&s=getJiejikaList&start="+star+"&limit="+evSize;
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
//手机搜索ajax
function ajaxSearch(star,size,numeber) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=Bank&s=getJiejikaList&is_open=0&bank="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Bank&s=getJiejikaList&bank="+numeber+"&start="+star+"&limit="+size;
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
// //获取银行列表的AJAX
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
//     var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='bkid']"),
//         data=msg.data;
//     bank.children().remove();
//     domOption(data,bank);
// }
//获取其他接口列表
function ajaxGetList(pid,async) {
    var url=relational.url+"?m=Bank&s=BankList",
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
// //制造option
// function domOption(data,bank) {
//     var length=data.length,
//         i;
//     for(i=0;i<length;i++){
//         var option=$("<option></option>");
//         option.val(data[i]["bkid"]);
//         option.text(data[i]["name"]);
//         bank.append(option);
//     }
// }
//成功回调
function ajaxFirstScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='bkid']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank,"bkid");
}
function ajaxSecondScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='city']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank);
}
//获得当前借记卡得数据的AJAX
// function ajxaGetCardList(jikID) {
//     $.ajax(
//         {
//             type: "GET",
//             url: relational.url+"?m=Bank&s=getJiejikaInfo&jjkid="+jikID,
//             success: ajxaGetCardListScs,
//         }
//     )
// }
// //成功时回调函数
// function ajxaGetCardListScs(msg) {
//     var data=msg["data"];
//     bottonClickSetValue(data);
// }
// //新增银行列表的AJAX
// function ajaxBankListAdd(data) {
//     $.ajax(
//         {
//             type: "POST",
//             url: relational.url+"?m=Bank&s=addJiejika",
//             data:data,
//             success: ajaxBankListAddScs,
//         }
//     )
// }
// //成功回调函数
// function ajaxBankListAddScs(msg) {
//     if(msg.r==1){
//         if(relational.corr=="add"){
//             popplug([{},{content:"添加成功"}]);
//         }else if(relational.corr=="modify"){
//             popplug([{},{content:"修改成功"}]);
//         }
//         hideNewPop();
//         bottonClickClearValue();
//         ajaxN(relational.star,relational.evSize);
//     }
//     if(msg.r==0){
//         var msg1=msg.msg;
//         popplug([{},{content:msg1}]);
//     }
// }

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
            url: relational.url+"?m=Bank&s=getJiejikaInfo&jjkid="+jikID,
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
            url: relational.url+"?m=Bank&s=addJiejika",
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
    console.log("test");
    pageChange();
    ajaxN(relational.star,relational.evSize);
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
        var e=e||event;
        var _this=this;
        if(_this.id=="uploadLogo"||_this.id=="upload"||_this.id=="uploadBC"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            var frame= $("#zcf_new_pop_upload");
            if(_this.id=="uploadLogo"){
                relational.type_id="1";
            }else if(_this.id=="upload"){
                relational.type_id="5";
            }else if(_this.id=="uploadBC"){
                relational.type_id="3";
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
        }else {
            setUlLiclick(e,_this);
            ajaxGetList(false,"1");//这里要执行同步 这里的同步执行先于setUlLiclick中的异步先执行 所以能正确的返回设定值（js单线程原因）
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
    //点击label全选
    youJin.labelSelectAll()

}