/**
* 基础控制中心
*/
var BaseControl = {
    _siteName:"后台管理",//站点名称
    _maxRequestTime:3,//最大重新请求次数
    _curRequestTime:0,//当前请求次数
    _interval: 20,//时间器间隔毫秒数 用于检测load是否执行
    _isload: false,//是否成功请求了用户是否登录的检验
	_isCheckLogin:false,//是否检测了用户登录状态
    _uid: 0,//用户编号
	_dfpaypass:0,////用户是否修改过支付密码
    _paypassinit: false,//是否进行了支付密码私钥初始化
    _paypasssed: "",//私钥
    _callback: null,//回调方法 用于临时存放ajax传递过来的回调函数
    _j: null,// 用于存放用户登录后的_ME对象
    _winwidth: 300,//弹窗宽度
    _winheight: 200,//弹窗高度
    _loginurl: "/ind/index.html",
    _wxloginurl:"/index_wx.php",//微信内登录跳转地址
    _ucenterurl:"/page/index.html",//用户登录后进入的主页面地址
    _kjsid:12,//快捷支付渠道统一设置 12：宝付,
    _wintype:"lhgdialog",//弹窗类型 （ruidialog 自定义弹窗 | lhgdialog 第三方弹窗 $.dialog 方式
    /**
    * 预加载数据包括板块
    */
    load: function () {
	    var _inThis = this;
        
    },
    /**
    * 获取用户登录凭证
    */
    getLoginCard: function () {
        var _inThis = this;
        //页面加载执行获取用户登录与否的标识
        this.loadJson("/?m=HomeBase&s=def&pageIndex=1", function (json) {
            if (json) {
                _inThis._curRequestTime++;
                if (json.reload) {
                    if(_inThis._curRequestTime > _inThis._maxRequestTime)
                    {
                        console.error("接口报错，重新请求已经超过"+_inThis._maxRequestTime+"次,服务器自动暂停数据请求。")
                        return;
                    }
                    //重新请求数据
                    _inThis.getLoginCard();
                    return;
                }
                if (json._ME && json._ME.uid)
                    _inThis._uid = json._ME.uid * 1;
				if (json._ME && json._ME.dfpaypass)
                    _inThis._dfpaypass = json._ME.dfpaypass * 1;
                _inThis._j = json;
                _inThis._isload = true;

                if ($(document.body).attr("needlogin") == "1" && _inThis._uid == 0) {
                    //未登录
                    window.top.location.href = BaseControl.isWeixin() ? BaseControl._wxloginurl : BaseControl._loginurl;
                    return;
                }
                $(document.body).css("visibility", "visible").fadeIn();
                //切换是否登录板块
                if(json._ME.uid*1 == 0){
					$("#no_login_info").show();
					$("#no_login_banner").show();
				}else {
					if($("#yes_login_info").length > 0){
						_inThis._isCheckLogin = true;
						BaseControl.SetItemToK_Id(json);
						$("#yes_login_info").show();
						$("#yes_login_data").show();
						$("#yes_login_banner").show();
						
					}    
				}
            }
        });
    },
    /**
    * 根据不同设备跳转到不同的登录页面
    */
    gologin:function()
    {
        window.top.location.href = BaseControl.isWeixin() ? BaseControl._wxloginurl : BaseControl._loginurl;
    },
    /**
     * 安全退出系统
     */
    loginout:function()
    {
        $.getScript("/api/t.php?a=logout");
        BaseControl.go(BaseControl._loginurl,1);
    },
    /**
    * 跳转到某个页面
    * @param url(string) 跳转页面链接
    * @param gotime(number) 等待跳转的秒数
    * @param needlogin(bool) 是否需要登录 需要则直接跳转至login.html页面
    */
    go: function (url, gotime, needlogin) {
        if (typeof needlogin != "undefined" && needlogin && this._uid == 0) {
            window.top.location.href = BaseControl.isWeixin() ? BaseControl._wxloginurl : BaseControl._loginurl;
            return;
        }
        if (gotime == undefined || gotime == null)
            gotime = 0;
        if (gotime == 0)
            window.top.location.href = url;
        else
            setTimeout(function () {
                window.top.location.href = url;
            }, gotime * 1000);
    },
    /**
    * 切换tab
    * @param thisObj:object 点击的tab对象
    * @param Num：number 对应tab的序号
    * @param noCls:string 未选中状态的样式表 默认为sta
    * @param yesCls:string 选中状态的样式表 默认为active
    */
    nTabs: function (thisObj, Num,noCls,yesCls) {
        if (thisObj.className == "on") return;
        var tabObj = thisObj.parentNode.id;
        var tabList = document.getElementById(tabObj).getElementsByTagName("li");
        if(!noCls)  noCls = "sta";
        if(!yesCls) yesCls = "active";

        for (i = 0; i < tabList.length; i++) {
            if (Num == 1) {
                $("#imgPage").hide();
            } else {
                $("#imgPage").show();
            }

            if (i == Num) {
                thisObj.className = yesCls;
                document.getElementById(tabObj + "_Content" + i).style.display = "block";
            } else {
                tabList[i].className = noCls;
                document.getElementById(tabObj + "_Content" + i).style.display = "none";
            }
        }
    },
    /**
    * ajax获取json数据 支持回调
    * @param url(string) 接口地址 同时也支持对象传递{url:",data:{}}
    */
    loadJson: function (url,callback) {
        var _data = {}, _type = "post",_async=true;

        if (typeof url == 'object' && url.url) {
            _data = url.data;
            if (url.type)
                _type = url.type;
            url = url.url;
        }
		
        $.ajax({
            url: url,
            type: _type, // 默认post
            dataType: "json",
            data: _data,
            success: function (json) {
                if (typeof callback == "function") {
                    callback(json);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof callback == "function") {
                    callback({ reload: true });//reload：为true表示重新执行数据请求 多见适用于用户是否登录认证
                }
            }
        });
    },
    /**
   * 同步获取数据
   */
    loadJsonNoAsync: function (url, callback) {
        var _data = {}, _type = "post";

        if (typeof url == 'object' && url.url) {
            _data = url.data;
            if (url.type)
                _type = url.type;
            url = url.url;
        }
        $.ajax({
            url: url,
            type: _type, // 默认post
            dataType: "json",
            async: false,//同步机制开启
            data: _data,
            success: function (json) {
                if (typeof callback == "function") {
                    callback(json);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(textStatus);
            }
        });
    },
    /**
     * 将json数据对象根据模板进行数据显示解析
     * @param json:obejct 数据对象
     * @param templateId:string 数据模板ID 兼容已逗号间隔的ID串形如：template1,template2
     * @param showId:string  html显示容器ID 兼容已逗号间隔的ID串形如：show1,show2
     * @param callback:function 回调函数（模板解析完毕后的回调函数 需要对生成的html元素进行后续操作）
     * @param isAppend:bool 是否为数据附加模式（常见于列表分页加载的需求）
     */
    converTemplateToHtml:function(json, templateId, showId,callback,isAppend) {
        if(json && templateId && showId) {
            var templateArr = templateId.split(','),showArr = showId.split(',');
            if(templateArr.length != showArr.length)
            {
                console.error("模板个数与容器个数不对等，请检查!");
                return;
            }
            for(var i = 0;i<templateArr.length;i++) {
                if ($("#" + templateArr[i]).length == 0) {
                    console.error(templateArr[i] + " 的模板不存在");
                    return;
                }
                if ($("#" + showArr[i]).length == 0) {
                    console.error(showArr[i] + " 的容器不存在");
                    return;
                }
                var rst = TrimPath.processDOMTemplate(templateArr[i], json);  // 解析制定的 _tid 中的模版代码
                //是否附加模式
                if (isAppend)
                    $("#" + showArr[i]).append(rst.toString());
                else
                    $("#" + showArr[i]).html(rst.toString());
            }
            if(typeof callback == "function")
                callback();
        }
    },
    /**
     * 普通ajax表单提交
     * @param {Object} form
     * @param {Object} callback
     * @param {String} confirmMsg 提示确认信息
     */
    validateCallback: function (form, callback) {
        var $form = $(form);
        var sdata = $form.serializeArray();
        for (var i in sdata) {
            if (sdata[i].name != undefined && sdata[i].name == 'pwd')
                sdata[i].value = this.encryptPass(sdata[i].value);
        }

        var _submitFn = function () {
            $.ajax({
                type: form.method?form.method:"get",
                url: $form.attr("action"),
                data: sdata,
                dataType: "json",
                cache: false,
                success: callback,
                error: callback
            });
        }
        _submitFn();

        return false;
    },
    /**
    * 获取url参数
    */
    getParam: function (b) {
        var c = document.location.search;
        if (!b) { return c }
        var d = new RegExp("[?&]" + b + "=([^&]+)", "g");
        var g = d.exec(c);
        var a = null;
        if (null != g) {
            try {
                a = decodeURIComponent(decodeURIComponent(g[1]))
            } catch (f) {
                try {
                    a = decodeURIComponent(g[1])
                } catch (f) {
                    a = g[1]
                }
            }
        } return a;
    },
    ///表状态处理函数
    getstats: function (json) {
        var status = json.binfo.status * 1;
        if (status == 3) {
            json.binfo.left_time = '<font color="red">已完成</font';
            json.binfo.show_status = '<a class="btn_detail_bid">还款中</a>';
        } else if (status == 5) {
            json.binfo.show_status = '<a class="btn_detail_bid">用户已取消</a>';
        } else if (status == 4) {
            json.binfo.show_status = '<a class="btn_detail_bid">审核不通过</a>';
        } else if (status == 1) {
            if (json.binfo.lefttime > 0) {
                if ((json.binfo.flag==5 && json.binfo.account==0)|| parseFloat(json.binfo.borrow_account_wait)> 0){
                        if (json._ME.uid > 0)
                        json.binfo.show_status = '<a href="buy.html?id=' + json.binfo.bid + '" class="btn_detail_bid" style="cursor:pointer" id="tenderimg" align="absmiddle">立即投标</a>';
                    else
                        //未登录则至二级跳转到登录页面
                        json.binfo.show_status = '<a href="' + (BaseControl.isWeixin() ? BaseControl._wxloginurl : BaseControl._loginurl) + '" class="btn_detail_bid" style="cursor:pointer" id="tenderimg" align="absmiddle">立即投标</a>';
                } else {
                    json.binfo.show_status = '<a class="btn_detail_bid">待复审</a>';
                }
            } else {
                json.binfo.show_status = '<a class="btn_detail_bid">已过期</a>';
            }
        } else if (status == 7) {
            json.binfo.show_status = '<a class="btn_detail_bid">自动投标中</a>';
        } else if (status == 6) {
            json.binfo.show_status = '<a class="btn_detail_bid">已还完</a>';
        } else if (status == 8) {
            json.binfo.show_status = '<a class="btn_detail_bid">复审处理中</a>';
        } else {
            json.binfo.show_status = '<a class="btn_detail_bid">未复审或已失效</a>';
        }
        return json;
    },
    /**
    * 根据dom对象 数据源和 属性进行内容渲染
    */
    SetItemDom: function (_dom, json, k) {
        //front:前缀  back :后缀  format:是否格式化为千分位 len :显示长度 showstart 是截取字符串开始位置  default:默认填充文字 当数据对象为空时
        var _front = '', _back = '', _format = "0", _len = 0, _default = "";

        if (_dom.tagName == 'A') {
            var _href = decodeURI(_dom.getAttribute('href'));
            while (_href.indexOf('{' + k + '}') > 1) {
                _len++;
                _href = _href.replace('{' + k + '}', json[k]);
            }

            if (_len) {
                _dom.setAttribute('href', _href);
                _dom.setAttribute('ishaveK', 1);
            }
        } else if (_dom.tagName == 'IMG') {
            var _src = decodeURI(_dom.getAttribute('src'));
            if (typeof json[k] == "string" && (json[k].substr(0, 8) == 'https://' || json[k].substr(0, 7) == 'http://')) {
                _src = json[k]; _len++;
            } else {
                while (_src.indexOf('{' + k + '}') >= 0) {
                    _src = _src.replace('{' + k + '}', json[k]);
                    _len++;
                }
            }

            if (_len) {
                _dom.setAttribute('src', _src);
                _dom.setAttribute('ishaveK', 1);
            }
        }
        if (_dom.getAttribute('ishaveK') == 1) return;;  // 说明上面的代码以及处理过了，后续不需要再处理
        _back = _dom.getAttribute('kattr');         // _back 这个时候是需要高修改的属性的名称
        if (_back) { // 如果是要设置属性，那么这里替换属性中的数值即可
            _front = _dom.getAttribute('kval');
            if (!_front)
                _front = _dom.getAttribute(_back);
            while (_front.indexOf('{' + k + '}') != -1) {
                _front = _front.replace('{' + k + '}', json[k]);
            }
            if (_back == 'src' && typeof json[k] == "string" && (json[k].substr(0, 8) == 'https://' || json[k].substr(0, 7) == 'http://')) _front = json[k];
            _dom.setAttribute(_back, _front);
            _dom.setAttribute('ishaveK', 1);
        } else {
            if (_dom.tagName == 'SELECT') {
                _dom.value = json[k].toString();
                 //兼容页面k.a 与k_a的情况
                if(_dom.id.split('.').length == 2)
                {
                    if(document.getElementById(_dom.id.replace(".","_")))
                        document.getElementById(_dom.id.replace(".","_")).value = _dom.value;
                }
            } else if ((_dom.type === 'text' || _dom.type === 'hidden') && typeof _dom.value === 'string') {
                _dom.value = json[k].toString();
                 //兼容页面k.a 与k_a的情况
                if(_dom.id.split('.').length == 2)
                {
                    if(document.getElementById(_dom.id.replace(".","_")))
                        document.getElementById(_dom.id.replace(".","_")).value = _dom.value;
                }
            } else if (_dom.tagName == 'INPUT' && typeof _dom.checked === 'boolean') {
                if (_dom.value == json[k]) _dom.checked = true; else _dom.checked = false;
                //兼容页面k.a 与k_a的情况
                if(_dom.id.split('.').length == 2)
                {
                    if(document.getElementById(_dom.id.replace(".","_")))
                        document.getElementById(_dom.id.replace(".","_")).checked = _dom.checked;
                }
            } else if (typeof _dom.innerHTML !== 'undefined') {
                _front = _dom.getAttribute('front'); // 显示的前缀
                _back = _dom.getAttribute('back'); // 显示的后缀
                _len = _dom.getAttribute('showlen');
                _format = _dom.getAttribute('format');
                _default = _dom.getAttribute("default");
                if (!_front) _front = ''; if (!_back) _back = ''; if (!_default) _default = ''; if (!_format) _format = '0'; if (!_len) _len = 0; _len = _len * 1;
                if (_len) {
                    var _start = _dom.getAttribute('showstart'); _start = _start * 1; if (!_start) _start = 0;   // showstart 是截取字符串开始位置
                    _dom.innerHTML = _front + json[k].toString().substr(_start, _len) + _back;
                    //兼容页面k.a 与k_a的情况
                    if(_dom.id.split('.').length == 2)
                    {
                        if(document.getElementById(_dom.id.replace(".","_")))
                            document.getElementById(_dom.id.replace(".","_")).innerHTML = _dom.innerHTML;
                    }
                } else {
                    var _s = json[k].toString();

                    _len = _dom.getAttribute('ooqfw');
                    if (_len && _len != '' && !isNaN(_len)) {
                        //_s = moneyStr3(_s, parseInt(_len), '');
                        //_len = parseInt(_len.substr(2));
                        //if (_len) sprintf("%" + _len + "s", _s); 
                        if (!isNaN(_s)) {
                            _s = Number(_s).toFixed(Number(_len));
                            if (Number(_len) > 0 && _s.indexOf(".") == -1) _s += ".00";
                        }
                    }
                    if (_format * 1 && !isNaN(_s)) {
                        //需要格式化
                        _s = Number(_s).toLocaleString();
                        if (_s.indexOf(".") == -1) _s += ".00";
                    }

                    //自动填充内容
                    if (_default.length > 0 && (!_s || _s.length == 0)) {
                        _s = _default;
                    }
                    _dom.innerHTML = _front + _s + _back;
                    //兼容页面k.a 与k_a的情况
                    if(_dom.id.split('.').length == 2)
                    {
                        if(document.getElementById(_dom.id.replace(".","_")))
                            document.getElementById(_dom.id.replace(".","_")).innerHTML = _front + _s + _back;
                    }
                }
            }
        }
    },
    /**
    * 根据json数据内每一个层级的数据对象去页面内对应查找ID元素进行赋值
    */
    SetItemToK_Id: function (json, _pre) {
        if (!_pre) _pre = 'k.';
        for (var k in json) {
            if (json[k] == null) json[k] = '';
            if (typeof json[k] === 'string' || typeof json[k] === 'number') {
                var _dom = document.getElementById(_pre + k);   // 如果存在同 key 同名的 dom 对象  getElementById 只能获得第一个
                if (!_dom && json[k].toString().length < 20) {
                    _dom = document.getElementById(_pre + k + '_' + json[k]);   // 特殊用法用来处理 radio box的情况
                }
                if (!_dom) _dom = document.getElementById('k_' + k);  // 为了兼容老的

                if (_dom) {
                    if (_dom.getAttribute('ismore') == '1') {
                        var _d = $("[id='" + _dom.id + "']", document); // 这里针对有多个 id 相同的情况处理一下
                        if (_d.length > 1) {
                            //_d.html(json[k].toString());
                            for (var i = 1; i < _d.length; i++) {
                                this.SetItemDom(_d[i], json, k);
                            }
                        }
                    }
                    this.SetItemDom(_dom, json, k);
                } else if (!_dom && !isNaN(json[k] * 1)) {
                    _dom = document.getElementsByName(k + '[]');   // 这个情况是 checkbox 按位与的情况
                    if (_dom) {
                        for (var i = 0; i < _dom.length; i++) {
                            if (typeof _dom[i].checked === 'boolean') {
                                if (_dom[i].value & json[k]) {
                                    _dom[i].checked = true;
                                } else {
                                    _dom[i].checked = false;
                                }
                            }
                        }
                    }
                }
            } else if (json[k] && typeof json[k] === 'object') {
                //** 注意 这里跳过了数组，不去遍历数组能节约大量时间，这里一直是效率的瓶颈
                if (json[k] instanceof Array) { } else this.SetItemToK_Id(json[k], _pre + k + '.');
            }
        }
    },
    /**
    * 弹窗回调
    */
    exeCallback: function () {
        if (typeof this._callback == "function") {
            this._callback();
        }
    },
    /**
    * 确定回调
    */
    exeOkCallback: function () {
        if (typeof this._okCallback == "function") {
            this._okCallback();
            this.exeCancelCallback();
        }
    },
    /**
    * 取消回调
    */
    exeCancelCallback: function () {
        if (typeof this._cancelCallback == "function") {
            this._cancelCallback();
        }
    },
    /**
    * 检测json数据 正确与否 msg 弹窗提示
    */
    checkJsonTip: function (json) {
        var msg = "";
        if (json.msg)
            msg = json.msg;
        else if (json.gomsg)
            msg = json.gomsg;
        if (msg && msg.length > 0)
            $.dialog.tips(msg,3,"tips.gif");
    },
    /**
    * 弹窗提示
    */
    showWin: function (config) {
        var _width = this._winwidth, _height = this._winheight, _msg = "你没有登录系统，点击这里<a href='" + BaseControl.isWeixin() ? BaseControl._wxloginurl : BaseControl._loginurl + "'>登录</a>系统", _ismask = true, _isclose = true, buttons = null, callback = null, _hidespeed = 0, _isicon = true, _wintype = "alter";
        if (config) {
            if (config.width) _width = config.width;
            if (config.height) _height = config.height;
            if (config.msg) _msg = config.msg;
            if (config.ismask != null && config.ismask != undefined) _ismask = config.ismask;
            if (config.isclose != null && config.isclose != undefined) _isclose = config.isclose;
            if (config.hidespeed != null && config.hidespeed != undefined) _hidespeed = config.hidespeed;
            if (config.isicon != null && config.isicon != undefined) _isicon = config.isicon;
            //弹窗类型(alter、warn、error、success）
            if (config.wintype) _wintype = config.wintype;

            if (config.buttons) buttons = config.buttons;
            if (config.callback) { callback = config.callback; this._callback = callback; }
        }

        //非自定义模式弹窗需要转换
        if(this._wintype == "lhgdialog" && $.dialog)
        {
            var _winpic = "tips.gif" ;
            switch(_wintype)
            {
                case "error":
                    _winpic = "error.gif";
                    break;
                case "success":
                    _winpic = "success.gif";
                    break;
            }
            if(config.buttons == undefined || config.buttons == null || config.buttons.length == 0)
            {
                $.dialog.tips(_msg,_hidespeed,_winpic,function(){
                    if(typeof config.callback == "function")
                        config.callback.call();
                });
            }else
            {
                var okVal = "确定",cancelVal = "取消";
                var okCallback = cancelCallback = null;
                var btn = config.buttons;
                if (btn.ok) {
                    if(btn.ok.text)
                        okVal = btn.ok.text;
                    //确认按钮回调函数
                    if (typeof btn.ok.callback == "function")
                        this._okCallback = btn.ok.callback;
                }
                if (btn.cancel) {
                    if(btn.cancel.text)
                        cancelVal = btn.cancel.text;
                    //确认按钮回调函数
                    if (typeof btn.cancel.callback == "function")
                        this._cancelCallback = btn.cancel.callback;
                    else if (btn.cancel.callback.toString() == "true") {
                        this._cancelCallback = function () {
                           return true;
                        }
                    }
                }

                $.dialog({
                        title:"",
                        max: false,
                        min: false,
                        cancel: _isclose,
                        esc:true,
                        lock: true,
                        background: '#000', /* 背景色 */
                        opacity: 0.5,       /* 透明度 */
                        content: _msg,
                        okVal:okVal,
                        cancelVal:cancelVal,
                        ok:function()
                        {
                            BaseControl.exeOkCallback();
                        },
                        cancel:function(){
                            BaseControl.exeCancelCallback();
                        }
                    });
            }
            return;
        }

        //遮罩层
        if (_ismask) {
            $(".winmask").remove();
            var _maskhtml = '<div class="winmask"></div>';
            $(_maskhtml).appendTo("body");
        }
        //标题名称
        var _wtitle = "提示";
        switch (_wintype) {
            case "warn": _wtitle = "警告"; break;
            case "error": _wtitle = "错误"; break;
            case "success": _wtitle = "成功"; break;
        }

        //弹窗
        $(".win_alter").remove();
        var winArr = ['<div class="win_alter ' + _wintype + '" style="height:' + _height + 'px;width:' + _width + 'px;">'];
        if (_isclose)
            winArr.push('<div class="title">' + _wtitle + '<span onclick="$(\'.winmask,.win_alter\').fadeOut();$(\'.winmask,.win_alter\').remove();BaseControl.exeCallback();" title="关闭">X</span></div>');
        else
            winArr.push('<div class="title">' + _wtitle + '</div>');
        winArr.push('<div class="body">');
        if (_isicon)
            winArr.push('<div class="icon"></div>');
        winArr.push('<div class="msg">' + _msg + '</div>');
        //按钮
        if (config.buttons) {
            var buttonHtml = '';
            var btn = config.buttons;
            if (btn.ok) {
                buttonHtml = '<input class="btn confirm" onclick="BaseControl.exeOkCallback();" type="button" value="' + (btn.ok.text ? btn.ok.text : "确定") + '"/>';
                //确认按钮回调函数
                if (typeof btn.ok.callback == "function")
                    this._okCallback = btn.ok.callback;
            }
            if (btn.cancel) {
                buttonHtml += '<input class="btn" onclick="BaseControl.exeCancelCallback();" type="button" value="' + (btn.cancel.text ? btn.cancel.text : "取消") + '"/>';
                //确认按钮回调函数
                if (typeof btn.cancel.callback == "function")
                    this._cancelCallback = btn.cancel.callback;
                else if (btn.cancel.callback.toString() == "true") {
                    this._cancelCallback = function () {
                        //关闭弹窗用
                        $('.winmask,.win_alter').fadeOut();
                        $('.winmask,.win_alter').remove();
                    }
                }
            }
            winArr.push('<div class="win_btns">' + buttonHtml + '</div>');

        }
        winArr.push('</div><div class="clearfix"></div></div>')
        var _winhtml = winArr.join('');
        $(_winhtml).appendTo("body");
        if (!_isicon)
            $(".win_alter .body").css("padding", "0px").css("min-height", "60px").css("text-align", "center");

        //居中定位
        var _h = $(window).height(), _w = $(window).width();
        //_h = window.screen.height; _w = window.screen.width;
        var _top = (_h - _height) * 1.00 / 2, _left = (_w - _width) * 1.00 / 2;
        //alert(_w);
        //alert(_width);
        //alert(_left);
        if (_top < 0) _top = 0; if (_left < 0) _left = 0;
        $(".win_alter").css("left", _left + "px").css("top", _top + "px");
        $('.winmask,.win_alter').fadeIn();
        //是否自动关闭
        if (_hidespeed * 1 > 0) {
            setTimeout(function () {
                $('.winmask,.win_alter').fadeOut();
                $('.winmask,.win_alter').remove();
                BaseControl.exeCallback();
            }, _hidespeed * 1000);
        }
        var _inThis = this;
        $(window).resize(function () {
            _inThis.rePositionWin();
        });
    },
    /**
    * 显示数据处理提示层
    */
    showLoading: function (msg) {
        if (msg == undefined || msg == null)
            msg = "数据处理中.....";
        $.dialog.tips(msg,600,"loading.gif");
    },
    /**
    * 隐藏数据处理提示层
    * @param hidetime{number} 间隔多长时间隐藏提示框
    */
    hideLoading: function (hidetime) {
        if (hidetime == undefined || hidetime == null)
            hidetime = 0;
        if (hidetime == 0) {
            $.dialog.close();
        } else {
            setTimeout(function () {
                $.dialog.close();
            }, hidetime * 1000);
        }
    },
    /**
    * 重置弹窗位置 当窗体发生大小变更时
    */
    rePositionWin: function () {
        //居中定位
        var _h = $(window).height(), _w = $(window).width(), _top = (_h - $(".win_alter").height()) * 1.00 / 2, _left = (_w - $(".win_alter").width()) * 1.00 / 2;
        if (_top < 0) _top = 0; if (_left < 0) _left = 0;
        $(".win_alter").css("left", _left + "px").css("top", _top + "px");
    },
    /**
    * 判断用是否登录 并融合弹窗提示
    * @param showwin(bool) 是否弹窗 默认为true
    * @param msg(string) 弹窗内容 支持html格式  默认为：你没有登录系统
    */
    checkLogin: function (showwin, msg) {
        if (this._uid * 1 > 0) return true;
        var _showwin = true;
        if (showwin != undefined && _showwin != null)
            _showwin = showwin;
        if (_showwin) {
            this.showWin();
        }
        return false;
    },
    /**
    * 获取支付密码私钥
    */
    initPaypass: function () {
        if (this._paypassinit)
            return;
        var _inThis = this;
        this.loadJson("/?m=User&s=passsed", function (json) {
            if (json.r && json.r == 1) {
                _inThis._paypasssed = json.sedpassed;
                _inThis._paypassinit = true;
            }
        });
    },
    /**
    * 加密密码数据
    * @param pwd(string) 密码
    */
    encryptPass: function (pwd) {
        if (this._paypassinit)
            return Ext.MD5(Ext.MD5(pwd) + this._paypasssed);
        else
            return pwd;
    },
    /**
    * MD5加密
    */
    MD5:function(val)
    {
        return Ext.MD5(val);
    },
    /**
    * 是否是微信
    */
    isWeixin:function()
    {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 显示错误信息
     * * @param errId:string 提示容器编号
     * @param msg:string 提示信息
     * @param hidespeed:number 提示时长（单位秒)
     */
    showErrorMsg:function(errId,msg,hidespeed)
    {
        var _inThis = this;
        if(msg && errId)
        {
            hidespeed = hidespeed?hidespeed*1000:3000;
            $("#"+errId).html(msg);
            $("#"+errId).fadeIn();
            setTimeout(function(){
                $("#"+errId).html("");
                $("#"+errId).fadeOut();
            },hidespeed);
        }
    },
    /**
     * 写入cookies
     * @param key 键
     * @param val 值
     * @param day 存放多少天
     */
    setCookies:function(key,val,day)
    {
        //获取当前日期
        var expiresDate = new Date();
        //设置生存期，一天后过期
        expiresDate.setDate(expiresDate.getDate() + (day?day:1));
        document.cookie = key+"="+val+";expires= " + expiresDate.toGMTString();//标记已经访问了站点
    },
    /**
     * 获取cookies
     * @param key
     */
    getCookies:function(key)
    {
        var search = key + "=";
        var returnvalue = "";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                // 已经存在cookies内
                offset += search.length;
                // set index of beginning of value
                end = document.cookie.indexOf(";", offset);
                // set index of end of cookie value
                if (end == -1)
                    end = document.cookie.length;
                returnvalue = unescape(document.cookie.substring(offset, end));
            }
        }
        return returnvalue;
    },
    /**
     * 删除cookies
     * @param key
     */
    delCookies:function(key)
    {
        //获取当前日期
        var expiresDate = new Date();
        //设置生存期，一天后过期
        expiresDate.setDate(expiresDate.getDate() - 100);
        document.cookie = key+"=;expires= " + expiresDate.toGMTString();//标记已经访问了站点
    },
    /**
     * 时间戳格式化为X天X小时X分X秒 的字符串形式
     * @param sec(long long int) :时间戳
     * @param targetId（string):显示容器id
     * @returns {*}
     */
    timeFormat:function(sec,targetId) {
        var _formatStr = "",_oldSec = sec;
        if (sec <= 0) {
            _formatStr = '已过期';
            document.getElementById(targetId).innerHTML = _formatStr ;
            return;
        }
        var _day = Math.floor(sec / (24 * 3600));
        if (_day)_day = _day + '天'; else _day = '';
        var _hour = Math.floor((sec % (24 * 3600)) / 3600);
        if (_hour)_hour = _hour + '小时'; else _hour = '';
        var _min = Math.floor((sec % 3600) / 60);
        if (_min)_min = _min + '分'; else _min = '';
        var _sec = Math.floor(sec % 60);
        _sec = '<font color=red>' + _sec + '</font>' + '秒';
        _formatStr =  _day + _hour + _min + _sec;
        document.getElementById(targetId).innerHTML = _formatStr ;
        setTimeout(function() {
            BaseControl.timeFormat(--_oldSec, targetId);
        },1000);
    },
    /**
    * 动态加载外部js资源文件
    * @param _scripts:string 外部脚本路径串多个路径用|间隔 形如：a.js|b.js|c.js
    * @param _callback:funciton js文件载入完毕后的回调函数
    */
    loadScript:function(_scripts,_callback)
    {
        if(_scripts)
        {
            var oHead = document.getElementsByTagName('HEAD').item(0); 
            var oScript= document.createElement("script"); 
            oScript.type = "text/javascript";             
            var scriptArr = _scripts.split('|');
            for(var i = 0;i<scriptArr.length;i++)
            {
                if(scriptArr[i])
                {
                    oScript.src = scriptArr[i]; 
                    oHead.appendChild( oScript); 
                }
            }
            if(typeof _callback == "function")
                _callback.call();
        }
    },
    /**
     * 其他插件扩展公用入口
     */
    extendPlugin:function()
    {
        //伪title插件主题
        $.fn.extend({
            showTitle: function() {
                $('<div id="conBox"></div>').appendTo('body');
                var d = $("#conBox");
                this.bind({
                    mouseover: function() {
                        if (!$("#conBox")) {
                            $('<div id="conBox"></div>').appendTo('body');
                        } else {
                            d = $("#conBox");
                        }
                        var of = $(this).offset();
                        var title = $(this).attr("_title");
                        //定义位置 支持html格式的title
                        d.css({
                            top: of.top + $(this).height() + "px",
                            left: $(this).width() / 2 + of.left + "px"
                        }).html($(this).attr("_title"));
                        //显示
                        d.fadeIn();
                    },
                    mouseout: function() {
                        //鼠标一走隐藏
                        d.fadeOut();
                    }
                });
            }
        });
        //调用
        $(".Rtitle").showTitle();

        //加载弹窗插件
        this.loadScript("/ind/js/ruidialog/ruidialog.js");
    },
    /**
    * 伪提示框调用
    */
    weiTitle:function()
    {
        $(".Rtitle").showTitle();
    }
};

/**
* 短暂提示
* @param msg:string 弹窗内容
* @param time:number 显示时长 默认5秒
*/
function ajaxDone(msg,time)
{    
    $.dialog.tips(msg,time?time:5,"tips.gif");
}

//数字类型保留小数
Number.prototype.toIntDec = function (len) {
    if (typeof (len) != "number") len = 2;
    var s = (Math.round(this*Math.pow(10,len+1))/Math.pow(10,len+1))+"";
    if(s.indexOf(".")!=-1){
        var str = s.substring(0,s.indexOf(".") + len+1);
        return str;
    }else{
        return s;
    }
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

$(document).ready(function () {
	 BaseControl.load();
});
