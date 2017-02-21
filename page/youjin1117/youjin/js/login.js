/**
 * Created by Administrator on 2017/1/10.
 */
// youJin.ajaxLogin=function (obj) {
//     var url=obj["url"];
//     $.ajax({
//         type: "GET",
//         url: url,
//         success: searchHandle,
//     });
// };
//Password=md5(md5(md5(_pass) + _salt) + _cd);
$(document).ready(function () {
    var flag;
    $("#button").click(function () {
        var user=$("#user").val(),
            password=$("#password").val();
        if(flag==="wrong"){
            alert("请输入正确格式的用户名");
            return;
        }
        $.ajax({
            type: "GET",
            url: "http://120.24.43.90/?m=&s=getcd&username="+user,
            success: function (msg) {
                var msg=msg,
                    cd=msg["cd"],
                    salt=msg["salt"],
                    pass=Ext.MD5(Ext.MD5(Ext.MD5(password)+salt)+cd),
                    data={
                        username:user,
                        password:pass,
                        ismd5:true,
                    };
                    $.ajax({
                        type: "POST",
                        url: "http://120.24.43.90/?m=&s=login_wd",
                        data:data,
                        success: function (msg) {
                            var r=msg.r;
                            if(r==1){
                                window.location="user.html";
                            }else {
                                alert(msg.msg)
                            }
                        },
                    });
            },
        });
    });
    $("#user").bind("input",inputHandle);
    function inputHandle(e) {
        var e=e||event,
            _this=this,
            _val=$(_this).val(),
            myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,//邮箱正则
            mobile= /^\d{11}$/,//手机正则
            val=$.trim(_val);
        if(myreg.test(val)||mobile.test(val)){
            $(_this).addClass("succeed");
            $(_this).removeClass("warn");
            flag="right";
        }else{
            $(_this).addClass("warn");
            $(_this).removeClass("succeed");
            flag="wrong";
        }
    }
});
