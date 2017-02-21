/**
 * Created by Administrator on 2016/12/1.
 */
$(document).ready(readyHandle);
var a="firstIframe";
function readyHandle() {
    parent.postMessage("first","*");
}