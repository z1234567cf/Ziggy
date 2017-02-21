/**
 * Created by Administrator on 2016/12/1.
 */
$(document).ready(readyHandle);
//当子框架像父框架传输信息时的函数

function readyHandle() {
    //$(window).on("message",messageHandle);
    window.addEventListener("message", (function messageHandleShell() {
        var k=0;
        function messageHandle(e) {
            k++;
            var e=e||event;
            if(e.data==="first"){
                $("iframe").get(1).src="iframeChildren2.html";
            }else if(e.data==="second"){
                $("iframe").get(2).src="iframeChildren3.html";
            }
            console.log(e);
        }
        return messageHandle;
    }()), false);
    $("iframe").get(0).src="iframeChildren1.html";
}