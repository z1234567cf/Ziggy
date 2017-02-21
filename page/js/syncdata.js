/*
*  用法：
*/
var syncData = function() {
    this._method='get';
    this._url;
    this._DEF = {
        _vid:false,           // 需要解析模版的 textarea 的 id
        _tid:false,   // _tid内模版的内容最终显示数据的地方
        _form:null,        
        _pagesize  : false,  // 如果不是具体的数字，表示不需要分页信息
        _pageindex : 1,
        _pagecount : 1,  
        _order : '',   // 排序字段
        _sortOrder:"desc",
        _pagefooter:'pagefooter',
        _data:null
    };
    this._params = []  ;
    
    this.setMethod = function(method){
        this._method = method;
    } ;
    // 增加一套需要解析的模版对象和相关的设置 [参考 _params]
    this.addTid = function(_par){
        if(typeof _par._tid == 'string' && _par._tid.charAt(0)!='#') _par._tid = '#'+_par._tid;
        if(typeof _par._vid == 'string' && _par._vid.charAt(0)!='#') _par._vid = '#'+_par._vid;
        if(_par._tid && $(_par._tid).length){ 
           if((!_par._vid || $(_par._vid).length == 0) && $(_par._tid).length){ 
                _par._vid = $(_par._tid)[0].previousElementSibling ; // vid 默认就是 tid 所在位置的父节点
                if(!_par._vid) alert('DEBUG:this vid ['+_par._vid +'] cant not get dom object !!');
           }
           // 如果 vid 上有指定 pageid 属性，那么这里将分页显示的位置设置成pageid
           if($(_par._vid).attr('pageid'))_par._pagefooter = $(_par._vid).attr('pageid');
           var _scope    = this;
           if(_par._form!=null){
                $("#"+_par._form).removeAttr('onsubmit').submit(function(e){
                    var _par = _scope._params.length ? _scope._params[0] : _scope._DEF ;
                    _par._data= $(this).serialize();
                    _scope.load(0);
                    return false;
                });   
           }
           applyIf(_par,this._DEF); // 剩余参数用默认值补齐
           this._params.push(_par); _par = null;
        }
    } ;
    // vid 是显示结果的 dom id [为空则默认显示在 tid 所在的 dom]
    // tid 配置脚本等模版信息的存放位置，[ 也是 textarea 的 id 号]  
    this.init = function(url,vid,tid,pagesize,formid){
	    this._url = url; 
        this.addTid(
            (typeof vid=='object' && vid._tid) ? vid: {
            _tid : tid ,
            _vid : vid ,   
            _form: formid,
            _pagesize : pagesize
        }); 
	};
    this.setOrder= function (o){
	    if(this._params.length)this._params[0]._order = o;
	};
     this.setData= function (o){
        if(this._params.length)this._params[0]._data = o;
    };
    this.setSortOrder= function (o){
	    _sortOrder=o;
    };
    
    // 成功得到 json 数据后悔调用的函数
    this._Suncess = function (json) {
        if(!json || typeof json != 'object') return;
        if(typeof this.BEFOREDOJSON   == 'function') this.BEFOREDOJSON(json);  
        else if(typeof i_BEFOREDOJSON == 'function') i_BEFOREDOJSON(json);  // 如果有预处理函数这里调用一下，可以修改 json中的数值
        
        if(this._Suncess_doCMD(json) === false)return ;     // 返回 false 表示要求停止执行后续代码
        if(json.E && json.err) { alert(json.err) ;return;}  // 调试级别错误，显示错误，后面不用做了
        if(this._params.length){
            json.pageindex = this._last.pageIndex;
            json.order     = this._last.order;
            var _pagecount = Math.ceil(json.total?json.total/this._last.pageSize:0);
            if(_pagecount==0) _pagecount = 1;
            json.pagecount = _pagecount;
		    var _nextpage  = this._last.pageIndex+1 > _pagecount ? _pagecount : this._last.pageIndex+1;
            var _prepage   = this._last.pageIndex-1 > 0 ? this._last.pageIndex-1 : 1;
            // 1. 模版处理，分两块， 1. 模版内的变量显示处理， 2. 模版内的分页信息处理
            for(var i=0;i<this._params.length;i++){
                var _par = this._params[i];
                // 这里 _tid 为 textarea 的对象id
                if(_par._tid && $(_par._tid).length>0){
                    this.analytid(json,_par._tid,_par._vid);  // ** 解析指定的模版，执行模版内的脚本输出html到指定的_vid位置
                    
                    if(this._last.pageSize && $("#"+_par._pagefooter).length){ 
                        $a = $("#"+_par._pagefooter).attr("autoFill")
                        if($a==1){//使用模板方式
                            $tpar = _par._pagefooter;
                            if($("#"+_par._pagefooter+"_hidden").length){
                                $tpar = _par._pagefooter+"_hidden";
                            }else{
                                var boarddiv = "<div style='display:none;' id='"+$tpar+"_hidden'></div>"; 
                                $(document.body).append(boarddiv); 
                                $("#"+$tpar+"_hidden").html($("#"+_par._pagefooter).html());
                            }
                            var tjson={ pre:_prepage,
                                        cur:this._last.pageIndex,
                                        next:_nextpage,
                                        last:_pagecount,
                                        total:json.total};
                            var rst = TrimPath.processDOMTemplate($tpar,tjson );
                            $("#"+_par._pagefooter).html(rst);
                        }else{
                            // 有设置分页信息放置的对象，且对象存在，那么显示分页字符串
                            var str = [ '<div class="fenye"><a class="button1" href="#" ',
                                        'onclick="GD._Pload(1);return false;">',
                                        '首&nbsp;页</a>',
                                        '<a class="button1" href="#" ',
                                        'onclick="GD._Pload(',_prepage,');return false;">',
                                        '上一页</a>',                                                                    
                                        '<font><b style="color:#CC3366;">&nbsp;',String(this._last.pageIndex),'</b>',
                                        '/<b>',String(_pagecount),'页</b>/<b>',String(json.total),'条</b>&nbsp;</font>',
                                        '<a href=# class="button1" ',
                                        'onclick="GD._load(',_nextpage,');return false;">下一页</a>',
                                        '<a href=# class="button1" ',
                                        'onclick="GD._load(',_pagecount,');return false;">末&nbsp;页</a>',
                                        json._COULDGO_?' <input type=text value='+String(this._last.pageIndex)+' size=1 id=_GOTEXTFIELD onkeyup="if(event.keyCode==13)GD._load(this.value*1);"/> <a href=# class="button1" onclick="GD._load(_GOTEXTFIELD.value*1);return false;" >Go</a>':'',
                                        '</div>'].join('');
			                      
                            $("#"+_par._pagefooter).html(str);
                        }
                    }
                }
            }
        }
        //  2. 然后按照每一个 key 对应一个 dom 的 id 的方式来处理一遍
        this._Suncess_doid(json); 
        // doSecond 函数只执行一次即可
        if(json._ME &&　json._ME.dfpaypass && json._ME.dfpaypass==1){ // 收掉跳转指令参数则立刻跳转 
            if(document.body.getAttribute('alterdf') == '1'){
                $.dialog.confirm("你的交易密码为默认密码，请确认然后修改交易密码", function(){
                    ___GoURL("/page/ucenter_mmxg.html");
                } );   
            }              
        }
        if(typeof doSecond=='function' && !syncData.havedosecond) { syncData.havedosecond=true;doSecond(json)};
        
        if(DD_roundies && DD_roundies.addRule){
            DD_roundies.addRule('.yuanjiao', '5px', true);  
            setTimeout(function(){
                DD_roundies.addRule('.yuanjiao', '5px', true);  
            },1000);
        }

    };
    // 这里吧 json 中的每一个 key  都去找对应的 dom 对象，如果存在，那么就赋值
    // 
    this._Suncess_doid = SetItemToK_Id,
    // 这里吧 json 中的每一个 key  都去找对应的 dom 对象，如果存在，那么就赋值
    // 
    this._Suncess_doCMD = function (json) {
        if(json.D*1 > 0 ){ 
            alert('您的ip暂时被封，可能您的电脑被他人利用了，请联系客服['+json.D+']');
            return false;
        }
        if(json._GOURL){ // 收掉跳转指令参数则立刻跳转 
            ___GoURL( json._GOURL,json.gomsg ) ;
            return false; // 返回 false 后面就会停止执行
        }
        if(json._ME){ // 收掉跳转指令参数则立刻跳转 
            json._ME.v_newpmnum = json._ME.newpmnum == '0' ? 0 : '<img src="/page/images/tongzhi.gif">';
            apply(this,json._ME);                         
        }
        if(json._IL == 1){    
            document.body.style.visibility = 'visible'; // 有的 body 是hidden的 这样要显示出来      
            $('._login_yes').show();    
            $('#yes_login_info').show();
            $('#no_login_info').hide();  
        }else{
            var _url = document.body.getAttribute('needlogin');
            if(_url=='1'){                                                                  
                ___GoURL((_SITE&&_SITE._loginurl)?_SITE._loginurl:'/login.html',json.gomsg);return false; // 返回 false 那么后面就不执行了
            }else if(typeof _url == 'string' && _url.length > 3){ 
                ___GoURL(_url,json.gomsg); return false; // 返回 false 那么后面就不执行了
            }
            document.body.style.visibility = 'visible'; // 有的 body 是 hidden 的 这样要显示出来
            $('#no_login_info').show();
            $('._login_yes').hide(); 
            $('#yes_login_info').hide();
        }
    },
    this._load = function(_pageindex,_pagesize,_order,_sortOrder,_data,callback){ 
        var _scope    = this;
        var _callback = callback;
        _pageindex = _pageindex*1;
        _pagesize  = _pagesize*1;
        this._last = _pagesize?{
            pageIndex:_pageindex*1,
            pageSize:_pagesize*1,
            sortField:_order,
            sortOrder:_sortOrder,
            data:_data
        }:(this._last?this._last:{});
        this._last.pageIndex = _pageindex;
        $.ajax({
            url:  this._url,
            type: this._method,    // 默认 get
            dataType: "json",
            data: this._last ,
            success: function(json){
                if(_scope&&_scope._Suncess){ 
                    // 这里加这个判断的原因时发现有些时候 _scope 变成 了 window
                    // 可能是因为切换页面导致内存被清理的缘故
                    _scope._Suncess(json);
                    if(typeof _callback =="function"){
                        _callback(json);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
                if(_scope._params && _scope._params.length && _scope._params[0] && typeof _scope._params[0]._vid !='undefined' ) {
                    $(_scope._params[0]._vid).html(jqXHR.responseText + '|' + textStatus);   // 到这里可能是网络问题，也可能是服务器的返回内容无法解析成 json
                }
            }
        }); 
    }   ;
    this._Pload=function(pageindex,callback){
        if(!this._loadnum) this._loadnum = 0; this._loadnum ++;
        var _par = this._params.length ? this._params[0] : this._DEF ;
        this._load(pageindex,_par._pagesize,_par._order,_par._sortOrder,_par._data,callback)  ;        
    };
    this._PTload=function(callback){
        pageindex = $(".fenye #StPageNub").val();
        if(!this._loadnum) this._loadnum = 0; this._loadnum ++;
        var _par = this._params.length ? this._params[0] : this._DEF ;
        this._load(pageindex,_par._pagesize,_par._order,_par._sortOrder,_par._data,callback)  ;        
    };
    
    this.load = function(resver,callback){
        if(!this._loadnum) this._loadnum = 0; this._loadnum ++;
        var _par = this._params.length ? this._params[0] : this._DEF ;
		this._load(_par._pageindex,_par._pagesize,_par._order,_par._sortOrder,_par._data,callback)  ;        
	};
    // 使用指定数据解析一个模版
    this.analytid = function (_json,_tid,_vid){ 
        if(_tid.charAt(0)=='#') _tid = _tid.substr(1);
        if(_vid.charAt(0)!='#') _vid = '#'+_vid;
        var rst = TrimPath.processDOMTemplate(_tid, _json);  // 解析制定的 _tid 中的模版代码
        $(_vid).html(rst.toString());
    } ;
    this.loadJson = function (url,callback){
        var _data = {};
        if(typeof url == 'object' && url.url){ 
            _data = url.data;
            url   = url.url;
        }
        $.ajax({
            url:  url,
            type: "post", // 默认post
            dataType:"json",
            data: _data ,
            success: function (json) { 
                SetJsonValue(json); 
                if( typeof callback == "function")  {
                    callback(json);
                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        }); 
    };
    this.Post = ajaxPost;
}  

// 将一个 form 提交给指定的 url 
// 注： form 为 form 的id 号字符串
function ajaxPost(_url,form,callback,iscallsuncess){   
	$.ajax({
         url:  _url,
		type: 'post', // 默认post  
        data: $('#'+form).serialize(),
        success: function(json){
            if(typeof GD == 'object' && GD._Suncess && iscallsuncess !== false) GD._Suncess(json);
            if(json.err){
                if($('#des'))$('#des').html(json.err);
            } else {
                if($('#des'))$('#des').html('保存成功'); 
            }
            
            if(typeof callback=='function')callback(json);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(typeof callback=='function')callback(false);
        }
    }); 
}
function _SetItemDom(_dom,json,k)
{
    var _front = '';var _back='';var _len=0;
    
    if (_dom.tagName == 'A'){ 
        var _href = decodeURI(_dom.getAttribute('href'));
        while (_href.indexOf('{'+k+'}') > 1){ 
            _len++;
            _href = _href.replace('{'+k+'}',json[k]) ;   
        }     
         
        if(_len){
            _dom.setAttribute('href',_href); 
            _dom.setAttribute('ishaveK',1);
        }                                      
    } else if (_dom.tagName == 'IMG'){ 
        var _src = decodeURI(_dom.getAttribute('src'));  
        if(json[k].substr(0,8)=='https://' ||json[k].substr(0,7)=='http://'){ 
            _src = json[k];   _len++;
        } else {
            while (_src.indexOf('{'+k+'}') >=0){ 
                _src = _src.replace('{'+k+'}',json[k]) ; 
                _len++;
            }
        }
        
        if(_len){
            _dom.setAttribute('src',_src); 
            _dom.setAttribute('ishaveK',1);
        }
    }   
    if(_dom.getAttribute('ishaveK')==1)return;;  // 说明上面的代码以及处理过了，后续不需要再处理
    _back = _dom.getAttribute('kattr') ;         // _back 这个时候是需要高修改的属性的名称
    if(_back ){ // 如果是要设置属性，那么这里替换属性中的数值即可
        _front = _dom.getAttribute('kval') ;
        if(!_front)
        _front = _dom.getAttribute(_back) ; 
        while (_front.indexOf('{'+k+'}') != -1){ 
            _front = _front.replace('{'+k+'}',json[k]) ;  
        } 
        if(_back=='src' && (json[k].substr(0,8)=='https://' ||json[k].substr(0,7)=='http://')) _front = json[k];
        _dom.setAttribute(_back,_front); 
        _dom.setAttribute('ishaveK',1);
    } else {
        if (_dom.tagName == 'SELECT'){
            _dom.value = json[k].toString();
        } else if ((_dom.type === 'text' || _dom.type === 'hidden') && typeof _dom.value === 'string'){
            _dom.value = json[k].toString();
        } else if (_dom.tagName == 'INPUT' && typeof _dom.checked === 'boolean'){
            if(_dom.value == json[k]) _dom.checked = true; else _dom.checked = false;
        } else if(typeof _dom.innerHTML !== 'undefined'){ 
            _front = _dom.getAttribute('front'); // 显示的前缀
            _back  = _dom.getAttribute('back') ; // 显示的后缀
            _len   = _dom.getAttribute('showlen') ; 
            if(!_front)_front='';if(!_back)_back=''; if(!_len)_len=0;_len = _len*1;
            if(_len){
                var _start = _dom.getAttribute('showstart') ;_start = _start*1;if(!_start)_start=0;   // showstart 是截取字符串开始位置
                _dom.innerHTML = _front+json[k].toString().substr(_start,_len)+_back;
            } else {
                var _s = json[k].toString();
                _len = _dom.getAttribute('ooqfw');
                if(_len && _len != '' ){ 
                    _s = moneyStr3(_s,parseInt(_len),'');
                    _len = parseInt(_len.substr(2));
                    if(_len)sprintf("%"+_len+"s", _s );
                } 
                if(_dom.getAttribute('hidvalue') == _s){
                    _dom.innerHTML = '';
                }else{
                    _dom.innerHTML = _front+_s+_back;
                }
            }
        }
    } 
}
function SetItemToK_Id(json,_pre) {
    if(!_pre)_pre='k.';                       
    for(var k in json){ 
        if (json[k] == null) json[k] = '';   
        if (typeof json[k] === 'string' || typeof json[k] === 'number'  ){ 
            var _dom = document.getElementById(_pre+k);   // 如果存在同 key 同名的 dom 对象  getElementById 只能获得第一个
            if(!_dom && json[k].toString().length < 20){
                _dom = document.getElementById(_pre+k+'_'+json[k]);   // 特殊用法用来处理 radio box的情况
            }
            if(!_dom) _dom = document.getElementById('k_'+k);  // 为了兼容老的
            
            if(_dom){ 
                if(_dom.getAttribute('ismore') == '1'){
                    var _d = $("[id='"+_dom.id+"']",document); // 这里针对有多个 id 相同的情况处理一下
                    if(_d.length > 1){
                        //_d.html(json[k].toString());
                        for(var i=1;i<_d.length;i++){
                            _SetItemDom(_d[i],json,k);
                        }
                    }     
                } 
                _SetItemDom(_dom,json,k); 
            } else if(!_dom && !isNaN(json[k]*1)) {
                _dom = document.getElementsByName(k+'[]');   // 这个情况是 checkbox 按位与的情况
                if(_dom){ 
                    for(var i=0;i<_dom.length;i++){ 
                        if(typeof _dom[i].checked === 'boolean'){
                            if(_dom[i].value&json[k]){ 
                                _dom[i].checked = true;
                            } else { 
                                _dom[i].checked = false;
                            }
                        }
                    }
                }
            }
        } else if(json[k] && typeof json[k] === 'object' ){ 
            //** 注意 这里跳过了数组，不去遍历数组能节约大量时间，这里一直是效率的瓶颈 [yzh 2013-10-11]
            if(json[k] instanceof Array){} else  SetItemToK_Id (json[k],_pre+k+'.');   
        }
    }
    
}
function ___GoURL(_url,_msg,_sec){
    if(typeof _sec=='undefined') _sec = 800;
    if(typeof _msg=="undefined") {
        if(typeof window.event != "undefined" && window.event.ctrlKey===true){ 
            window.open(_url);return ;
        }else{
            window.location.href = _url;return ;
        }
    } 
    if(_url === 'LOGIN')_url = (_SITE&&_SITE._loginurl)?_SITE._loginurl:'/login.html' ;
    if(typeof window.event != "undefined" && window.event.ctrlKey===true){ 
        setTimeout(function(){window.open(_url);},_sec) ;
    }else{ 
        setTimeout(function(){window.location.href = _url;},_sec) ;
    }
    document.body.innerHTML  = _msg ? _msg:"正在跳转中..";
    document.body.style.visibility = 'visible';
}


function ___NewOpenURL(_url)
{
    window.open(_url);
}