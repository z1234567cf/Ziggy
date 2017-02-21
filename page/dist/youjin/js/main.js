/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(readyHandle);
var YJ_main={};
function headMclick() {
    $(this).css({"backgroundColor":"white","border-radius":"3px","color":'#2380f4'});
    console.log(this);
}
function readyHandle() {
    $(".headM>li").click(headMclick);
    $("#main").trigger("click");
}
