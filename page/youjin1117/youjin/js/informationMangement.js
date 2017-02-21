/**
 * Created by Administrator on 2016/11/18.
 */
//数据定义(中间过渡数据)
var relational={
    "star":0,//定义了从那个值开始翻
    "evSize":10,//定义了每页最多显示几个
    "pageIndex":1,//页码数 现在第几页
    "pageCount":"",//页码总数
    "phoneNumberSize":11,//定义了手机的数值长度
    "uid":"",//用户的uid的中间存储地方
    "url":"http://120.24.43.90/",//更换地址
    "ajax":"2"//本页ajax数量
};
//控制DOM的生成形式单行操作
function operate(data) {
    var corespond=correspondObj();
    var _data=dataClassify(data);
    var parent=$(".table tbody"),tr=$("<tr></tr>");
        parent.append(tr);
    var i,length=_data.length;
    for(i=0;i<length;i++){
        var td=$("<td></td>"),ul=$("<ul></ul>"),_li_span=$("<li></li>"),count=0,_li_span2=$("<li></li>"),count2=0;
            td.append(ul);
            for (var j=0;j<_data[i].length;j++){
                var span=$("<span></span>"),li=$("<li></li>"),name=_data[i][j]["name"];
                if(name=="un"||name=="uname"){
                    //var span=$("<span></span>");
                        if(count==0){
                            span.text(_data[i][j][name]+" ");
                        }else{
                            span.text("["+_data[i][j][name]+"]");
                        }
                         _li_span.append(span);
                        count++;
                        if(count==2){
                            ul.append(_li_span);
                        }
                }else if(name=="tjr"){
                        if(_data[i][j][name]){
                            //var li=$("<li></li>");
                            if(corespond[name]){
                                var _span=$("<span></span>");
                                _span.text(corespond[name]+":");
                                li.append(_span);
                            }
                            var span=$("<span></span>");
                            span.text(" "+_data[i][j][name]);
                            li.append(span);
                            ul.append(li)
                        }
                }else{
                    //var li=$("<li></li>");
                        if(corespond[name]){
                            var _span=$("<span></span>");
                            _span.text(corespond[name]+":");
                            li.append(_span);
                        }
                        var span=$("<span></span>");
                        span.text(" "+_data[i][j][name]);
                        li.append(span);
                    ul.append(li)
                };
            // else if(name=="is_auth"||name=="is_company_auth"||name=="is_personal_auth"){
            //         //var span=$("<span></span>");
            //         if(count2!=2){
            //             span.text(_data[i][j][name]+"/");
            //         }else {
            //             span.text(_data[i][j][name]);
            //         }
            //         _li_span2.append(span);
            //         count2++;
            //         if(count2==3){
            //             ul.append(_li_span2);
            //         }
            //     }
            }
        if(i==0){
            var div=$("<div class='table_unchoice'></div>");
            td.append(div);
            // var _str=_data[0][0]["uid"]+"";
            // div.attr("data-src",_str);
        }
        tr.append(td);
    }
}
//数据初步处理过程
function originalDataOperate(data) {
    var _data = data;
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
            "v_tot_tixian_ubi": "提现"
        };
        return _data;
}
//数据归类 为了能够确定排序
function dataClassify(data) {
    var order,user,tel,ucoin,state,active,time,account,label;
    order=[
        {"uid":data["uid"], "name":"uid",}
    ];
    user=[
        {"uname":data["uname"], "name":"uname",},
        {"un":data["un"], "name":"un",},
        {"sex":data["sex"], "name":"sex",},
        {"tjr":data["tjr"], "name":"tjr",},
    ];
    tel=[
        {"mobile":data["mobile"], "name":"mobile",}
    ];
    ucoin=[
        {"balance":data["balance"], "name":"balance",},
        {"v_tot_get_ubi":data["v_tot_get_ubi"], "name":"v_tot_get_ubi",},
        {"v_tot_tixian_ubi":data["v_tot_tixian_ubi"], "name":"v_tot_tixian_ubi",},
    ];
    state=[
        {"status":data["status"], "name":"status",},
        {"fans":data["fans"], "name":"fans",},
        {"counts":data["counts"], "name":"counts",},
    ];
    active=[

    ];
    time=[
        {"time_h":data["time_h"], "name":"time_h",},
        {"last_logintime":data["last_logintime"], "name":"last_logintime",},
        {"sumlogin":data["sumlogin"], "name":"sumlogin",},
    ];
    account=[
        {"zhifubao_name":data["zhifubao_name"], "name":"zhifubao_name",},
        {"zhifubao":data["zhifubao"], "name":"zhifubao",},
    ];
    label=[
        {"tab":data["tab"], "name":"tab",},
    ];
    var _data=[order,user,tel,ucoin,state,active,time,account,label];
    return _data;
}
//ajax取得用户列表
function ajaxN(star,evSize) {
    $.ajax({
        type: "GET",
        url: relational.url+"/?m=UserManage&s=UserList&start="+star+"&limit="+evSize,
        success: successHandle
    });
}
//成功回调
function successHandle(msg) {
    pageCountJudege(msg.count);
    $("#table tbody").children().remove();
    var data=msg.data,length=data.length;
    for(var i=0;i<length;i++){
       var _data=originalDataOperate(data[i]);
        operate(_data);
    }
    $("#table tbody tr").click(trClick);
    console.log(msg);
}
//添加行的点击事件（代表选中与否）并且设置当前UID的值
function trClick() {
    $(".table tbody tr").css("backgroundColor","");
    var bolean=$(this).find("td:first-child div").hasClass("table_choice");
    if(bolean){
        $(this).find("td:first-child div.table_choice").removeClass("table_choice");
        $(this).css("backgroundColor","");
        relational.uid=undefined;
    }else {
        $("#table .table_unchoice").each(function () {
            $(this).removeClass("table_choice");
        });
        $(this).find(".table_unchoice").addClass("table_choice");
        $(this).css("backgroundColor","#d6f2e1");
        var uid= $(this).find("td:first-child li span").text();
        var _uid=$.trim(uid);
        relational.uid=_uid;
    }
}
//刷新功能
function refreshZ() {
    window.location="informationManagement.html";
}
//判断页码总数
function pageCountJudege(count) {
    var count=+count;
    relational.pageCount=Math.ceil(count/relational.evSize);
}
//页数转换并显示页码数字
function pageChange() {
    relational.star=relational.pageIndex*relational.evSize-10;
    $("#pageSelect").val(relational.pageIndex);
}
//页尾点击函数
function containFootClickHandle() {
    if(this.id=="first"){
        relational.pageIndex=1;
        pageChange();
        ajaxN(relational.star,relational.evSize);
    }else if(this.id=="before"){
        if(relational.pageIndex>1){
            relational.pageIndex--;
            pageChange();
            ajaxN(relational.star,relational.evSize);
        }
    }else if(this.id=="after"){
        console.log(11);
        if(relational.pageIndex<relational.pageCount){
            relational.pageIndex++;
            pageChange();
            ajaxN(relational.star,relational.evSize);
        }
    }else if(this.id=="last"){
        relational.pageIndex=relational.pageCount;
        pageChange();
        ajaxN(relational.star,relational.evSize);
    }
}
//页面跳转功能
function pageSelectJump() {
    var val=$("#pageSelect").val()-0;
    if(val>0&&val<=relational.pageCount){
        relational.pageIndex=val;
        pageChange();
        ajaxN(relational.star,relational.evSize);
    }else {
        popplug([{},{content:"请输入正确的数字"}]);
        return false;
        //alert("请输入正确的数字");
    }
}
//手机搜索ajax
function ajaxSearch(numeber) {
    $.ajax({
        type: "GET",
        url: relational.url+"?m=UserManage&s=UserList&mobile="+numeber,
        success: searchHandle,
    });
}
//搜索回调函数
function searchHandle(msg) {
    $("#table tbody").children().remove();
    var data=msg.data,length=data.length;
    for(var i=0;i<length;i++){
        var _data=originalDataOperate(data[i]);
        operate(_data);
    }
    $("#table tbody tr").click(trClick);
}
//图片点击搜索函数
function searchImgClickHandle(){
    var val=$("#search input").val();
    judgeSearchVal(val);
}
//搜索输入值的判定与发送
function judgeSearchVal(val) {
    var val=val;
    if(val.length!=relational.phoneNumberSize){
        popplug([{},{content:"请输入正确的手机号"}]);
        //alert("请输入正确的手机号");
        return false;
    }else if(val.length==relational.phoneNumberSize){
        var numberChange=Number(val);
        if(!isNaN(numberChange)){
            ajaxSearch(val);
        }else {
            popplug([{},{content:"请输入正确的手机号"}]);
            //alert("请输入正确的手机号");
            return false;
        }
    }
    return true;
}
//搜索框聚焦回车
function searchInputFocus() {
    $(window).unbind("keydown");
    $(window).keydown(searchKeydown);
}
//搜索框失去焦点回车
function searchInputBlur() {
    $(window).unbind("keydown");
}
//键盘点击事件
function searchKeydown(e) {
    var val=$("#search input").val();
    var e=e||event;
    if(!val&&e.which==13){
        ajaxN(relational.star,relational.evSize);
    }else if(val&&e.which==13){
            console.log(1121);
            var judge=judgeSearchVal(val);
    }
}
//ajax修改用户信息
function ajaxMdifyUser(data) {
    $.ajax(
        {
            type: "POST",
            url: relational.url+"?m=UserManage&s=updateUserBaseInfo",
            data:data,
            success: modifyUserS,
        }
    )
}
//ajax获取用户的需要修改的信息
function ajaxGetUserMdlist() {

}
//修改成功
function modifyUserS(msg) {
    console.log(msg)
}
//功能条的点击功能
function setUlLiclick() {
    if(!relational.uid){
        popplug([{},{content:"请选择修改对象"}]);
        return false ;
    }
    //功能条的修改功能
    if(this.id=="modify"){
        var arr=[
            {//数组的第一个值是关于全局变量设置
                width:"",//控制插件的宽
                height:"300px",//控制插件的高
                button:true,//控制要不要按钮
            },
            {
                name:"昵称",
            },
            {
                name:"性别",
                type:"radio",
                value:["男","女"]
            },
            {
                name:"手机号",
            },
            {
                name:"标签",
            },
        ];
        var body=top.document.body;
        popplug(arr);
        function popplug_sureClick() {
            //console.log(1234);
            var data={};
            data.uid=relational.uid;
            data.uname=$(body).find(".popplug_li_right :text").eq(0).val();
            data.sex=$(body).find(".popplug_content :checked").val();
            data.mobile=$(body).find(".popplug_li_right :text").eq(1).val();
            data.tab=$(body).find(".popplug_li_right :text").eq(2).val();
            ajaxMdifyUser(data);
            console.log(data);
        }
        $(body).find("#popplug_sure").click(popplug_sureClick);
        //console.log(body);
    }
}
$(document).ready(readyHandle);
function readyHandle() {
    //operate(originalDataOperate(testDate["data"][2]));
    $("#refreash").click(function () {
        refreshZ();
    });
    pageChange();
    ajaxN(relational.star,relational.evSize);
    //console.log(relational);
    //页码条点击事件
    $("#containFoot li").click(containFootClickHandle);
    $("#pageSelectJump").click(pageSelectJump);
    //搜索条图片点击
    $("#search img").click(searchImgClickHandle);
    //搜索框聚焦
    $("#search input").focus(searchInputFocus);
    $("#search input").blur(searchInputBlur);
    $(".setUl li").click(setUlLiclick)
}