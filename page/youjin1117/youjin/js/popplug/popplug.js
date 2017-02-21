/**
 * Created by Administrator on 2016/11/22.
 */
//弹出框插件 依赖JQ
/*
@obj:代表
 */
// var obj=[
//     {//数组的第一个值是关于全局变量设置
//         width:"",//控制插件的宽
//         height:"",//控制插件的高
//         button:false,//控制要不要按钮
//     },
//     {
//         name:"昵称",
//     },
//     {
//         name:"性别",
//         type:"radio",
//         value:["男","女"]
//
//     },
//     {
//         name:"手机号",
//     },
//     {
//         name:"标签",
//     },
// ];
function popplug(obj) {
    var arr=[
        {
            width:"",
            height:"",
            button:false,
        },
        {
            content:"欢迎使用！！",
            hints:true,
        },
    ];
    var _arr=obj||arr;
    var _window=top.document.body;
    var div=$("<div id='popplug' class='popplug_mask'></div>");
    var _div=$("<div  class='popplug_bg'></div>");
    var _div2=$("<div  class='popplug_content'></div>");
    var _div3=$("<div  class='button_group'></div>");
    var _x=$("<div class='popplug_close'>X</div>");
    var button1=$("<button class='popplug_button popplug_button_left' id='popplug_sure'>保存</button>");
    var button2=$("<button class='popplug_button popplug_button_right' id='popplug_cancel'>取消</button>");
    div.append(_div);
    _div.append(_x);
    _div.append(_div2);
    _div3.append(button1);
    _div3.append(button2);
    if(_arr[0]["button"]){
        _div2.append(_div3);
    }
    if(_arr[0]["width"]){
        _div2.css("width",_arr[0]["width"])
    }
    if(_arr[0]["height"]){
        _div2.css("height",_arr[0]["height"])
    }
    $(_window).append(div);
    //单行生成函数
    function dom(_div2,data) {
        if(data["name"]){
            var div=$("<div class='popplug_li'></div>");
            var _left=$("<span class='popplug_li_left'></span>");
            var _right=$("<div class='popplug_li_right'></div>");
            if(data["type"]=="radio"){
                for(var i=0;i<data["value"].length;i++){
                    var input=$("<input class='popplug_li_radio' type='radio' name='popplugradio'>");
                    input.val(i);
                    var label=$("<label class='popplug_li_label'></label>");
                    label.text(data["value"][i]+":");
                    label.append(input);
                    _right.append(label);
                }
            }else if(data["type"]=="checkbox"){

            }else {
                var input=$("<input class='popplug_li_input' type='text'>");
                _right.append(input);
            }
            div.append(_left);
            div.append(_right);
            _div2.append(div);
            _left.text(data["name"]+":");
        }
        if(data["content"]){
            var div=$("<div class='popplug_div'></div>");
            div.text(data["content"]);
            _div2.append(div);
            if(!data["hints"]){
                _div2.css({"display":"table-cell","text-align":"center","vertical-align":"middle","font-size":"16px"});
                div.css({"display":"inline-block","vertical-align":"middle"})
            }
        }
    }
    for(var i=1;i<_arr.length;i++ ){
        dom(_div2,_arr[i]);
    }
    //移除函数
    function remove() {
        div.remove();
    }
    button2.click(remove);
    _x.click(remove);
}