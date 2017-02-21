/**
 * Created by Administrator on 2016/11/4.
 */
$(document).ready(readyHandle);
function readyHandle() {
    var main={
        "user":[   //大板块//
            {   //小版块//
                "name":"用户管理",
                "contain": [
                    { //小版块分区//
                        "name":"新增平台",
                        "indexAso":"1",
                        "url":"list/addplatform.html",
                    },
                    {
                        "name":"平台列表",
                        "indexAso":"2",
                        "url":"list/platform.html",
                    },
                    {
                        "name":"数据展现",
                        "indexAso":"3",
                        "url":"list/dataShow.html",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"4",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"5",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"6",
                        "url":"3",
                    }
                ]
            }
        ],
        "plate":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
        "check":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
        "uCoin":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
        "ad":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
        "bigDate":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
        "management":[   //大板块//
            {   //小版块//
                "name":"用户管理2",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"7",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"8",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"9",
                        "url":"3",
                    }
                ]
            },
            {    //小版块//
                "name":"地区查询3",
                "contain": [
                    {
                        "name":"地区查询",
                        "indexAso":"10",
                        "url":"1",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"11",
                        "url":"2",
                    },
                    {
                        "name":"地区查询",
                        "indexAso":"12",
                        "url":"3",
                    }
                ]
            }
        ],
    }
    //点击头部主要内容产生相应的导航栏//
    var _a=$("#head .head_left a");
    _a.click(clickHandle);
    function clickHandle() {
        var _name=$(this).attr("date-name");
        var m_length=main[_name].length;


    var _li=$("#navbar .navbar_head>li");
        _li.each(function (i) {
            if(i==0){
                return true;
            }else{
                $(this).remove();
            }
        });
        //创建并添加元素//
        for (var i=0;i<m_length;i++){
            var c_span=document.createElement('span'),
                c_li=document.createElement('li');
                $(c_li).append(c_span);
                c_span.innerText=main[_name][i]["name"];

            if(main[_name][i]["contain"]){
                var c_length=main[_name][i]["contain"].length;
                var c_contain=main[_name][i]["contain"];
                var c_ul=document.createElement("ul");
               $(c_ul).addClass("navbar_content");
                for(var j=0;j<c_length;j++){
                    var c_ul_li=document.createElement('li');
                    c_ul_li["name"]=c_contain[j]["name"];
                    c_ul_li.innerText= c_ul_li["name"];
                    c_ul_li["url"]=c_contain[j]["url"];
                    c_ul_li["indexAso"]=c_contain[j]["indexAso"];
                    $(c_ul).append(c_ul_li);
                }
                $(c_li).append(c_ul);
            }
            $("#navbar .navbar_head").append(c_li);
        }
        // $(".navbar_content li")下的this与c_ul_li是否是同个对象的实验//
        $(".navbar_content li").click(function () {
            var url=this["url"],indexAso=this["indexAso"],name=this["name"],div_existence=false,span_existence=false,divFather= $("#contain .shell"),spanFather=$("#contain .tab_bar");
            //变背景色
            $(".navbar_head .navbar_content li").css("backgroundColor","");
            $(this).css("backgroundColor","red");
            //做标记,有就是true
            divFather.children('iframe').each(function () {
                if(this["indexAso"]==indexAso){
                    div_existence=true;
                    this.style.display="block";
                }else{
                    this.style.display="none";
                }
            });
            spanFather.children("span").each(function () {
               if(this["indexAso"]==indexAso){
                   span_existence=true;
               }
            });
            //做标记有就是true
            //没有就建造
            if(!div_existence){
                var _div=document.createElement('iframe');
                console.log("ifrane"+_div);
                _div.indexAso=indexAso;
                _div.src=url;
                $(_div).css({"width":"100%","height":"1500px"});
                //$(_div).load(url);
                divFather.append(_div);
            }

            if(!span_existence){
                var _span=document.createElement('span');
                _span.indexAso=indexAso;
                _span.url=url;
                _span.innerText=name;
                spanFather.append(_span);
            }
            //单元素添加事件
            if(_span){
                $(_span).click(changeBgcolor);
                $(_span).dblclick(remove);
            }
            //右侧tab_bar的点击事件
            function changeBgcolor() {
                console.log(1);
                var _this=this;
                divFather.children('iframe').each(function () {
                    if(this["indexAso"]==_this["indexAso"]){
                        this.style.display="block";
                        $(_this).parent(".tab_bar").children().css("backgroundColor","");
                        $(_this).css("backgroundColor","white");
                    }else{
                        this.style.display="none";
                    }
                });
            }
            function remove() {
                var _this=this;
                $(this).remove();
                divFather.children('iframe').each(function () {
                    if(this["indexAso"]==_this["indexAso"]){
                        $(this).remove();
                    }
                })
            }
        });
        //创建的li元素下面添加点击出现事件 //
        $("#navbar .navbar_head li span").on("click",function () {
           $(this).parent().find("ul").toggle();
        })

    }




}