/**
 * Created by Administrator on 2016/12/14.
 */
relational.label="brid";
relational.dataTypeID="bpid";
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data,
        arr=[],
        i;
    _data["zcf_limit"]=_data["min_limit"]+"-"+_data["max_limit"];
    _data["month_apr"]=_data["month_apr"]+"%";
    arr=_data["fenqi_limit"].split(",");
    for(i=0;i<arr.length;i++){
        arr[i]=arr[i]+"期";
    }
    _data["zcf_fenqi_limit"]=arr.join(".");
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        pname:"平台",
        cname:"分类",
        name:"产品名称",
        zcf_limit:"借款额度",
        month_apr:"月利率",
        give_money_time:"放款时间",
        zcf_fenqi_limit:"分期期限",
    };
    return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var _1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13;
    _1=[
        {"brid":data["brid"], "zcf_name":"brid",},
        {"pname":data["pname"], "zcf_name":"pname",},
        {"cname":data["cname"], "zcf_name":"cname",},
    ];
    _2=[
        {"fenlei":data["fenlei"], "zcf_name":"fenlei",},
    ];
    _3=[
        {"name":data["name"], "zcf_name":"name",},
        {"zcf_limit":data["zcf_limit"], "zcf_name":"zcf_limit",},
        {"month_apr":data["month_apr"], "zcf_name":"month_apr",},
    ];
    _4=[
        {"give_money_time":data["give_money_time"], "zcf_name":"give_money_time",},
        {"zcf_fenqi_limit":data["zcf_fenqi_limit"], "zcf_name":"zcf_fenqi_limit",},
    ];
    // _5=[
    //     {"nums":data["nums"], "zcf_name":"nums",},
    // ];
    // _6=[
    //     {"max_limit":data["max_limit"], "zcf_name":"max_limit",},
    // ];
    // _7=[
    //     {"min_limit":data["min_limit"], "zcf_name":"min_limit",},
    // ];
    // _8=[
    //     {"month_apr":data["month_apr"], "zcf_name":"month_apr",},
    // ];
    // _9=[
    //     {"need":data["need"], "zcf_name":"need",},
    // ];
    _10=[
        {"lines":data["lines"], "zcf_name":"lines",},
    ];
    var _data=[_1,_2,_3,_4,_10];
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
            url= relational.url+"?m=Borrow&s=getBorrowList&is_open=0&start="+star+"&limit="+evSize;
            break;
        case 1:
            url=relational.url+"?m=Borrow&s=getBorrowList&is_open=1&start="+star+"&limit="+evSize;
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
            url= relational.url+"?m=Borrow&s=getBorrowList&is_open=0&name="+numeber+"&start="+star+"&limit="+size;
            break;
        case 1:
            url=relational.url+"?m=Borrow&s=getBorrowList&is_open=1&name="+numeber+"&start="+star+"&limit="+size;
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
    var url=relational.url+"?m=Service&s=getBorrowCateList",
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
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-creat='ceid']"),
        data=msg.data;
    bank.children().remove();
    youJin.domChecked(data,bank);
    //domOption(data,bank);
}
function ajaxSecondScs(msg) {
    var bank=$(top.document.body).find("#zcf_new_pop_debitCard [data-base='city']"),
        data=msg.data;
    bank.children().remove();
    domOption(data,bank);
}
//制造option
function domOption(data,bank) {
    var length=data.length,
        i;
    for(i=0;i<length;i++){
        var option=$("<option></option>");
        option.val(data[i]["ceid"]);
        option.text(data[i]["name"]);
        bank.append(option);
    }
}
//获得当前要修改数据的AJAX
function ajxaGet(jikID) {
    $.ajax(
        {
            type: "GET",
            url: relational.url+"?m=Borrow&s=getBorrowInfo&brid="+jikID,
            success: ajxaGetScs,
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg) {
    var data=msg["data"];
    //ajaxGetList(false,"1");
    setPopValue(data);
}
//新增数据的AJAX
function ajaxAdd(data) {
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=Borrow&s=addBorrow",
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
    //页码条点击事件
    containFootButtonEventBind(ajaxN);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框相关
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    //功能条点击相关
    // $(".setUl li").click(function (e) {
    //     var e=e||event;
    //     var _this=this;
    //     setUlLiclick(e,_this);
    //     ajaxGetList(false,"1");
    // });
    $(".setUl li").click(function (e) {
        var e=e||event;
        var _this=this;
        if(_this.id=="uploadLogo"||_this.id=="upload"||_this.id=="uploadBC"||_this.id=="uploadLogoLong"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            var frame= $("#zcf_new_pop_upload");
            if(_this.id=="uploadLogo"){
                relational.type_id="29";
            }else if(_this.id=="upload"){
                relational.type_id="2";
            }else if(_this.id=="uploadBC"){
                relational.type_id="3";
            }else if(_this.id=="uploadLogoLong"){
                relational.type_id="31";
            }
            var obj={
                out_id:relational.uid,
                type_id:relational.type_id,
            };
            frame.data("liId",_this.id);//按钮做判断的依据
            //console.log("frame",frame.find(".ul_img"));
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
    // $("#zcf_new_pop_debitCard .new_pop_tail button").click(newPopButtonClick);
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
    // $(".new_pop_head_X").click(newPopButtonClick);
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
    // $("#zcf_new_pop_debitCard [data-base='province']").change(chainChange)
}
