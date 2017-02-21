/**
 * Created by Administrator on 2016/12/1.
 */
$(document).ready(readyHandle);
function readyHandle() {
    console.log(parent.frames["first"].a);
    parent.postMessage("second","*");
}