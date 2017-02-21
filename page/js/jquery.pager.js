/**
* PC端列表分页插件
* 支持按钮加载  需要和template.js 模板插件结合使用
*/
(function ($) {
    /**
        * 严格模式
        */
    "use strict";

    //扩展jQuery的函数
    $.fn.Pager = function (config) {
        var defaultConfig = {
            ismore:false,//是否开启附加模式
            total: 0,//数据记录总数
            pageSize: 8,//每页显示记录数
            pageCount: 1,//页码总数
            pageIndex: 1,//当前页码
            url: "",//接口地址
            tmpid: "list_template",//模板ID
            showid: "list_container",//容器ID
            pageid: "pageing",//显示分页按钮的容器ID
            pageClick:"getList",//分页翻页点击事件对象层级
            scroll: false,//是否支持滚动加载
            callback: null, //成功的回调函数
            target:null
        };
        //合并config配置
        var _config = $.extend({}, defaultConfig, config);

        //构建内部类
        this.Run = function (config) {
            //判断查询页码是否大于最大页码
            var _maxPageCount = $("#"+config.pageid).attr("data-pagecount");
            if(_maxPageCount && Number(_maxPageCount) < config.pageIndex)
            {
              if($.dialog)
                  $.dialog.tips("查询页码不得大于最大页码数",2,"tips.gif");
              else
                BaseControl.showWin({
                    msg:"查询页码不得大于最大页码数",
                    isclose:false,
                    hidespeed:2
                });
                return;
            }
            var C = this;
            /**
            * 根据数据和模板配置显示数据
            */
            this.show = function (json, templateid, showid) {
                var rst = TrimPath.processDOMTemplate(templateid, json);  // 解析制定的 _tid 中的模版代码
                $("#" + showid).html(rst.toString());
            },
            /**
            * 追加数据
            */
            this.append = function (json, templateid, showid) {
                var rst = TrimPath.processDOMTemplate(templateid, json);  // 解析制定的 _tid 中的模版代码
                $("#" + showid).append(rst.toString());
            },
            /**
            * ajax获取接口数据
            */
            this.get = function () {
                var _inThis = this;
                $.ajax({
                    url: config.url + "&pageIndex=" + config.pageIndex + "&pageSize=" + config.pageSize,
                    type: "get",
                    dataType: "json",
                    success: function (json) {
                        if (json) {
                            _inThis.show(json, config.tmpid, config.showid);
                            //获得总页数
                            config.pageCount = parseInt(json.total / config.pageSize) + (json.total % config.pageSize > 0 ? 1 : 0);
                            config.total = json.total;
                            _inThis.createPage();

                            if (typeof config.callback == "function")
                                config.callback(json);
                        }
                    }, failure: function (err) {

                    }
                });
            },
            /**
            * 获取更多数据动态附加在页面
            */
            this.getMore = function () {
                config.pageIndex++;
                var _inThis = C;
                $("#" + config.pageid).html('<div class="loading">Loading...</div>');
                $.ajax({
                    url: config.url + "&pageIndex=" + config.pageIndex + "&pageSize=" + config.pageSize,
                    type: "get",
                    dataType: "json",
                    success: function (json) {
                        if (json) {
                            _inThis.append(json, config.tmpid, config.showid);
                            //获得总页数
                            config.pageCount = parseInt(json.total / config.pageSize) + (json.total % config.pageSize > 0 ? 1 : 0);
                            config.total = json.total;
                            _inThis.createPage();
                            if (typeof config.callback == "function")
                                config.callback(json);
                        }
                    }, failure: function (err) {
                        _inThis.createPage();
                    }
                });
            },
            /**
            * 创建分页
            */
           this.createPage = function () {
               if (config.total == 0) {
                   $("#" + config.pageid).html('<div class="loading">>_<&nbsp;暂无任何记录</div>');
                   return;
               }
               var html = '';
               //首页 上一页
               html = '<a onclick="'+config.pageClick+'(1,false);" class="box1">首页</a>';
               if(config.pageIndex > 1)
                  html += '<a class="box1"  onclick="'+config.pageClick+'('+(config.pageIndex-1)+',false);">上一页</a>';
                else
                  html += '<a class="box1"  onclick="'+config.pageClick+'(1,false);">上一页</a>';

               //小于6页 全部显示
               if(config.pageIndex <= 6)
               {
                   if(config.pageCount <= 6)
                        for(var i = 1;i<=config.pageCount;i++)
                        {
                            if(i == config.pageIndex)
                                html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1 home">'+i+'</a>';
                            else
                                html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1">'+i+'</a>';
                        }
                   else
                   {
                       //前4个
                       for(var i = 1;i<=6;i++)
                       {
                           if(i == config.pageIndex)
                               html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1 home">'+i+'</a>';
                           else
                               html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1">'+i+'</a>';
                       }
                       html +='<a>...</a>';
                       html +='<a onclick="'+config.pageClick+'('+config.pageCount+',false);" class="box1">'+config.pageCount+'</a>';
                   }
               }else if((config.pageIndex + 3) < config.pageCount)
               {
                    //三个部分
                   //头部
                   html +='<a onclick="'+config.pageClick+'(1,false);" class="box1">1</a>';
                   html +='<a>...</a>';
                   //中部
                    //加载中间5个
                   for(var i = config.pageIndex-2;i<config.pageIndex+2;i++)
                   {
                       if(i == config.pageIndex)
                           html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1 home">'+i+'</a>';
                       else
                           html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1">'+i+'</a>';
                   }
                   //尾部
                   html +='<a>...</a>';
                   html +='<a onclick="'+config.pageClick+'('+config.pageCount+',false);" class="box1">'+config.pageCount+'</a>';
               }else
               {
                   //头部
                   html +='<a onclick="'+config.pageClick+'(1,false);" class="box1">1</a>';
                   html +='<a>...</a>';
                   //尾部 5个
                   for(var i = config.pageCount-4;i<=config.pageCount;i++)
                   {
                       if(i == config.pageIndex)
                           html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1 home">'+i+'</a>';
                       else
                           html +='<a onclick="'+config.pageClick+'('+i+',false);" class="box1">'+i+'</a>';
                   }
               }

               //html += '<a class="box1"  onclick="'+config.pageClick+'('+(config.pageIndex+1)+',false);"><img src="images/fyjt.png"/></a>&nbsp;跳转到&nbsp;<input onkeyup="this.value=this.value.replace(/\\D/g,\'\');" id="txtPageNum" class="tz" />&nbsp;<a onclick="'+config.pageClick+'(document.getElementById(\'txtPageNum\').value,false);" class="box1">GO</a>';

               //下一页 尾页               
               if(config.pageIndex < config.pageCount)
                  html += '<a class="box1" onclick="'+config.pageClick+'('+(config.pageIndex+1)+',false);">下一页</a>';               
                else
                  html += '<a class="box1"  onclick="'+config.pageClick+'('+config.pageCount+',false);">下一页</a>';
                html += '<a onclick="'+config.pageClick+'('+config.pageCount+',false);" class="box1">尾页</a>';

               $("#" + config.pageid).html(html);
               //标记最大页数
               $("#"+config.pageid).attr("data-pagecount",config.pageCount);
           },
            /**
            * 参数初始化以及初始数据获取
            */
            this.init = function () {
                if (config.ismore)
                    this.getMore();
                else
                    this.get();
            };

            this.init();
        };
        var C = this;
        /**
        * 遍历对象进入初始化任务
        * 这里return也是为了保证链式调用  
        * 并且each方法会遍历所有DOM对象，使得我们可以单个处理包装集中的所有DOM对象
        **/
        return this.each(function () {
            _config.target = this;
            C.Run(_config);
        });
    };
})(jQuery);