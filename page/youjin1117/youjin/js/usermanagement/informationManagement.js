/**
 * Created by Administrator on 2017/1/9.
 */

relational.label="uid";
relational.time_start="";
relational.time_end="";
relational.time_type="reg";
//relational.dataTypeID="jpid";//删除图像是要取DATA下的什么的类型ID（跟上传图片有关的参数）例如："link_table_id": "wpid",
//数据初始化
function dataInitialPart() {
    relational.star=0;
    relational.pageIndex=1;
}
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
    _data["zcf_uid"]=_data["uid"];
    for (var item in _data) {
        if (item == "sex") {
            if (_data[item] == 0) {
                _data[item] = "男";
            } else {
                _data[item] = "女";
            }
        } else if (item == "is_auth") {
            if (_data[item] == 0) {
                _data[item] = "普通";
            } else if (_data[item] == 1) {
                _data[item] = "实习";
            } else if (_data[item] == 2) {
                _data[item] = "正式";
            }
        } else if (item == "is_personal_auth") {
            if (_data[item] == 0) {
                _data[item] = "未认证";
            } else if (_data[item] == 1) {
                _data[item] = "已申请(实习)";
            } else if (_data[item] == 2) {
                _data[item] = "正式认证";
            }
        } else if (item == "is_company_auth") {
            if (_data[item] == 0) {
                _data[item] = "未认证";
            } else if (_data[item] == 1) {
                _data[item] = "已申请";
            } else if (_data[item] == 2) {
                _data[item] = "认证成功";
            }else if(_data[item] == 3){
                _data[item] = "认证失败";
            }
        }
        // else if(item=="time_h"){
        //     if(_data[item]){
        //         var arr=_data[item].split(" ");
        //         _data[item]=arr[0];
        //     }
        // }
    }
    return _data;
}
//对应前缀对象
function correspondObj () {
    var _data={
        "uid":undefined,
        "un":undefined,
        "uname":undefined,
        "tjr": "推荐",
        "mobile": undefined,
        "status":undefined,
        "is_auth": undefined,
        "is_personal_auth": undefined,
        "is_company_auth": undefined,
        "counts": "关注",
        "fans": "粉丝",
        "sex": undefined,
        "time_h": "注册时间",
        "zhifubao": "支付宝",
        "zhifubao_name": "姓名",
        "tab": undefined,
        "last_logintime": "最后登录",
        "sumlogin": "累计登录",
        "balance": "余额",
        "v_tot_get_ubi": "累计",
        "v_tot_tixian_ubi": "提现",
        "wx":"微信",
        "wb":"微博",
        "qq":"QQ",
        "pinglun":"点评",
        "top":"头条",
        "news":"动态",
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
    var order,user,tel,ucoin,state,active,time,account,label;
    order=[
        {"uid":data["uid"], "zcf_name":"uid",},
        {"zcf_uid":data["zcf_uid"], "zcf_name":"zcf_uid",}
    ];
    user=[
        {"uname":data["uname"], "zcf_name":"uname",},
        {"un":data["un"], "zcf_name":"un",},
        {"sex":data["sex"], "zcf_name":"sex",},
        {"tjr":data["tjr"], "zcf_name":"tjr",},
    ];
    tel=[
        {"mobile":data["mobile"], "zcf_name":"mobile",}
    ];
    ucoin=[
        {"balance":data["balance"], "zcf_name":"balance",},
        {"v_tot_get_ubi":data["v_tot_get_ubi"], "zcf_name":"v_tot_get_ubi",},
        {"v_tot_tixian_ubi":data["v_tot_tixian_ubi"], "zcf_name":"v_tot_tixian_ubi",},
    ];
    state=[
        {"status":data["status"], "zcf_name":"status",},
        {"fans":data["fans"], "zcf_name":"fans",},
        {"counts":data["counts"], "zcf_name":"counts",},
    ];
    active=[
        {"pinglun":data["pinglun"], "zcf_name":"pinglun",},
        {"top":data["top"], "zcf_name":"top",},
        {"news":data["news"], "zcf_name":"news",},
    ];
    time=[
        {"time_h":data["time_h"], "zcf_name":"time_h",},
        {"last_logintime":data["last_logintime"], "zcf_name":"last_logintime",},
        {"sumlogin":data["sumlogin"], "zcf_name":"sumlogin",},
    ];
    account=[
        {"wx":data["wx"], "zcf_name":"wx",},
        {"wb":data["wb"], "zcf_name":"wb",},
        {"qq":data["qq"], "zcf_name":"qq",},
    ];
    label=[
        {"tab":data["tab"], "zcf_name":"tab",},
    ];
    if(!data["tjr"]){
        user.length=3;
    }
    var _data=[order,user,tel,ucoin,state,active,time,account,label];
    return _data;
}

//ajax主体显示的ajax
function ajaxN(star,evSize) {
    var url;
    switch (relational.if_open){
        case 0:
            url= relational.url+"?m=UserManage&s=UserList&is_open=0&start="+star+"&limit="+evSize+
                "&time_type="+relational.time_type+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=UserManage&s=UserList&is_open=1&start="+star+"&limit="+evSize+
                "&time_type="+relational.time_type+
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
            url= relational.url+"?m=UserManage&s=UserList&is_open=0&mobile="+numeber+"&start="+star+"&limit="+size+
                "&time_type="+relational.time_type+
                "&time_start="+relational.time_start+
                "&time_end="+relational.time_end;
            break;
        case 1:
            url=relational.url+"?m=UserManage&s=UserList&is_open=1&mobile="+numeber+"&start="+star+"&limit="+size+
                "&time_type="+relational.time_type+
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
function ajxaGet(jikID,id) {
    var _url;
    if(id=="#zcf_new_pop_debitCard"){
        _url=relational.url+"?m=UserManage&s=getUserInfo&uid="+jikID;
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=UserManage&s=resetPassword";
    }
    if(id=="#zcf_new_pop_removeRelation"){
        _url=relational.url+"?m=UserManage&s=getUserHandle&&uid="+jikID;
    }
    $.ajax(
        {
            type: "GET",
            url: _url,
            success: function (msg) {//这里有个大坑 不能设置第二个参数 没有用 也没有意义 因为这里是定义不是调用 所以设置第二个参数无法赋值 用闭包加立即回调可以使用两个参数但是已经没有意义了
                ajxaGetScs(msg,id);
            },
        }
    )
}
//成功时回调函数
function ajxaGetScs(msg,id) {
    var data=msg["data"];
    console.log("data",data);
    setPopValue(data,id);
}
//新增数据(审核)的AJAX
function ajaxAdd(data,id) {
    var _url;
    if(id=="#zcf_new_pop_debitCard"){
        _url=relational.url+"?m=UserManage&s=updateUserBaseInfo";
        data[relational.label]=relational.uid;
    }
    if(id=="#zcf_new_pop_addRelation"){
        _url=relational.url+"?m=UserManage&s=resetPassword";
        data[relational.label]=relational.uid;
    }
    if(id=="#zcf_new_pop_removeRelation"){
        _url=relational.url+"?m=UserManage&s=updateUserHandle";
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

$(document).ready(readyHandle);
function readyHandle() {
    //设置默认为注册日期
    $("#select").val("reg");
    //数据测试
    console.log("test");
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
        if(_this.id=="modify"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this);
            ajxaGet(relational.uid,"#zcf_new_pop_debitCard")
        }
        if(_this.id=="reset"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_addRelation");
        }
        if(_this.id=="set"){
            if(!relational.uid){
                popplug([{},{content:"请选择操作对象"}]);
                return ;
            }
            youJin.zcf_setFrameShow(e,_this,"#zcf_new_pop_removeRelation");
            ajxaGet(relational.uid,"#zcf_new_pop_removeRelation")
        }
        if(_this.id=="refreash"){
            refreshZ();
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
        console.log("id",id);
        youJin.newPopButtonClick(e,_this,id,ajaxAdd);
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
    youJin.labelSelectAll();
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
        relational.time_type=val;
        pageChange();
        ajaxN(relational.star,relational.evSize);
    })

}