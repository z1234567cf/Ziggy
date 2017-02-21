/**
 * Created by Administrator on 2016/12/5.
 */
$(document).ready(function () {
    var left=frames["left"];
    var iframe=$("iframe")[0];
    iframe.src="moneyManage/moneyManage1.html";
    console.log(left,this);
    window.addEventListener("message",function (e) {
        if(e.data=="ready"){
            left.postMessage("1","*")
        }
    });
});