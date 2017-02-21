function loadback(i,page){
    if(page==undefined)
        page=1;
    loadzqdata(i,page);           
}
function loadzqdata(id,_pageindex,_pagesize){
    _pageindex = _pageindex*1;
    if( _pagesize == undefined)
        _pagesize  = 10*1;
    param = _pagesize?{
        pageIndex:_pageindex*1,
        pageSize:_pagesize*1
    }:{
        pageIndex:1,
        pageSize:10
        };
    param.pageIndex = _pageindex;
    _url ="/?m=Tender&s=GetZqList";
    $.ajax({
        url:  _url+"&tp="+id,
        type: "POST",    // 默认 get
        dataType: "json",
        data: param ,
        success: function(json){
            loadsuccess(id,param,json);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }); 
}
function loadsuccess(id,_last,_json){
    switch(id){
        case 1:
            _tid="transfer_out_template"
            _vid="transfer_out_list";
            _pagefooter="transfer_out_pagefooter";
            break;
        case 2:
            _tid="transfer_get_template"
            _vid="transfer_get_list";
            _pagefooter="transfer_get_pagefooter";
            break;
        default:
            return;
    }
    _json.pageindex = _last.pageIndex;
    var _pagecount = Math.ceil(_json.total?_json.total/_last.pageSize:0);
    if(_pagecount==0) _pagecount = 1;
    _json.pagecount = _pagecount;
    var _nextpage  = _last.pageIndex+1 > _pagecount ? _pagecount : _last.pageIndex+1;
    var _prepage   = _last.pageIndex-1 > 0 ? _last.pageIndex-1 : 1;
    var rst = TrimPath.processDOMTemplate(_tid, _json);  // 解析制定的 _tid 中的模版代码
    $("#"+_vid).html(rst.toString());
    var str = [ '<div class="fenye"><a class="button1" href="#" ',
                'onclick="loadback(',id,');return false;">',
                '首&nbsp;页</a>',
                '<a class="button1" href="#" ',
                'onclick="loadback(',id,',',_prepage,');return false;">',
                '上一页</a>',                                                                    
                '<font><b style="color:#CC3366;">&nbsp;',String(_last.pageIndex),'</b>',
                '/<b>',String(_pagecount),'页</b>/<b>',String(_json.total),'条</b>&nbsp;</font>',
                '<a href=# class="button1" ',
                'onclick="loadback(',id,',',_nextpage,');return false;">下一页</a>',
                '<a href=# class="button1" ',
                'onclick="loadback(',id,',',_pagecount,');return false;">末&nbsp;页</a>',
                _json._COULDGO_?' <input type=text value='+String(_last.pageIndex)+' size=1 id=_GOTEXTFIELD onkeyup="if(event.keyCode==13)loadback('+id+',this.value*1);"/> <a href=# class="button1" onclick="loadback('+id+',_GOTEXTFIELD.value*1);return false;" >Go</a>':'',
                '</div>'].join('');        
    $("#"+_pagefooter).html(str);    
}
function loadBInfo(bid){
    GD.loadJson("/?m=Tender&s=GetZqInfo&bid="+bid,show_create_transfer);    
}
function loadTinfo(tid){
    GD.loadJson("/?m=Tender&s=GetZqInfo&tid="+tid,show_create_transfer);    
}
function cancelTransfer(tid){
    $.dialog.confirm('确认取消改债权转让吗', function(){
        GD.loadJson("/?m=Tender&s=CancelTransfer&tid="+tid,function(_json){
            ajaxDone(_json);
            loadback(1);
        })  ;
    });   
}
var trans_json;
function show_create_transfer(json){
    trans_json  = json;
    if(json.r==1){
        if(GD.uid){
            var tprice      = (json.info.capital-json.info.min).toIntDec(2);
            var minprice    = (json.info.capital-json.info.max).toIntDec(2);
            var _qujian = '金额区间【'+tprice+'~'+minprice+'】。';
            if(tprice == minprice)_qujian = "按目前政策规定为：￥"+minprice;
            $.dialog({
                title:"债权转让信息",
                fixed: true,
                resize: false,
                lock: true,
                max: false,            
                min:false,
                parent: parent || null,
                content: [
                   '<table cellspacing="0" cellpadding="0" class="TB_account_zq"><tr>',
                   '<td><b>借款标题：</b></td><td><div title="',json.info.title,'" class="td_zq">',
                   '<a href="/ind/bidinfo.html?id=',json.info.bid,'">',json.info.title,'</a></div></td>',
                   '<td><b>利　　率：</b></td><td>',json.info.b_apr,'%</td>',
                   '<td><b>待收日期：</b></td><td>',json.info.rtime,'</td>',
                   '</tr>',
                   '<tr>',
                   '<td><b>待收本利：</b></td><td>￥',json.info.account,'</td>',
                   '<td><b>待收本金：</b></td><td>￥',json.info.capital,'</td>',
                   '<td><b>待收利息：</b></td><td>￥',json.info.interest,'</td>',
                   '</tr>',
                   '<tr>',
                   '<td><b>剩余期数：</b></td><td>',json.info.pcount,'</td>',
                   '<td><b>手续费用：</b></td><td>￥',json.info.fee,'</td>',
                   '<td><b>转让折价：</b></td><td>￥<span id="trans_lost">',(json.info.min),'</td>',
                   '</tr>',
                   '<tr>',
                   '<td class="td_zq2"><b>转让密码：</b></td><td class="td_zq2"><input class=u_text_zq   size=19 type="password" id="trans_pwd" name="transferpd"></td>',
                   '<td class="td_zq2" colspan="4" style="text-align:left"> 可以为空. 如果设置了密码,承接人必须有密码才能承接,1小时内有效。</td>',
                   '</tr>',
                   '<tr>',
                   '<td class="td_zq2"><b>转让价格：</b></td><td class="td_zq2"><input class=u_text_zq   size=19 type="text" id="trans_price" name="price" value="',
                   tprice,'" onblur="dotranscalc();"></td>',
                   '<td class="td_zq2" colspan="4" style="text-align:left"> ',_qujian,'</td>',
                   '</tr>',
                   '<tr>',
                   '<td class="td_zq2"><b>最终到手：</b></td><td class="td_zq2" style="text-align:left">￥<span id="trans_get_price">',(tprice-json.info.fee).toIntDec(2),
                   '</td>',
                   '<td class="td_zq2" colspan="4" style="text-align:left"> 最终到手 = 转让价格 - 网站手续费</td>',
                   '</tr>',
                   '</table>',
                ].join(''),
                init: function(){
                },
                okVal:"确认转让",
                ok: function(here){
                    check_transfer(json);
                },
                cancel: true
            });
        }else{
            $.dialog.alert("您还没有登录");
        }
    }else{
        if(json._GOURL){ // 收掉跳转指令参数则立刻跳转 
            ___GoURL( json._GOURL,json.gomsg ) ;
            return false; // 返回 false 后面就会停止执行
        }
         $.dialog.alert(json.msg);   
    }
}
function dotranscalc(price){
    if(!trans_json || !trans_json.info)
        return false;
    var price = $("#trans_price").val();
    var p1= (trans_json.info.capital-trans_json.info.min).toIntDec(2)
    if(price>p1)
    {
         $.dialog.alert("转让价格过大,不能大于"+p1);
         return false;
         
    }
    var p2= (trans_json.info.capital-trans_json.info.max).toIntDec(2)
    if(price<p2)
    {
         $.dialog.alert("转让价格过小,不能小于"+p2);
         return false;
    }
    $("#trans_get_price").html((price-trans_json.info.fee).toIntDec(2));
    $("#trans_lost").html((trans_json.info.capital-price).toIntDec(2));
    
}
function submitTransfer(tid){
    GD.loadJson("/?m=Tender&s=GetSavedTinfo&tid="+tid,show_transfer);    
}
function show_transfer(json){
    if(json.r==1){
        if(GD.uid){
            if(typeof str =='undefined' && json._ME && json._ME.dfpaypass && json._ME.dfpaypass==1){
                $.dialog.confirm("你的交易密码为默认密码，请确认然后修改交易密码", function(){
                            __redirect("/page/ucenter_mmxg.html");
                        },function(){
                            show_tender(true);
                        } );
                return ;             
            } 
            pwhtml='';
            var transdec    = (json.info.capital-json.info.price).toIntDec(2);
            if(json.info.ispassword)
                pwhtml=['<tr>',
                   '<td class="td_zq2"><b>转让密码：</b></td><td class="td_zq2"><input class=u_text_zq   size=19 type="password" id="trans_pwd" name="trans_pwd"></td>',
                   '<td class="td_zq2" colspan="4" style="text-align:left"> 　【请输入出让人设置的出让密码】</td>',
                   '</tr>'].join('');
            $.dialog({
                title:"债权转让信息",
                fixed: true,
                resize: false,
                lock: true,
                max: false,            
                min:false,
                parent: parent || null,
                content: [
                   '<table cellspacing="0" cellpadding="0" class="TB_account_zq"><tr>',
                   '<td><b>借款标题：</b></td><td><div title="',json.info.title,'" class="td_zq">',
                   '<a href="/ind/bidinfo.html?id=',json.info.bid,'">',json.info.title,'</a></div></td>',
                   '<td><b>利　　率：</b></td><td>',json.info.b_apr,'%</td>',
                   '<td><b>剩余期数：</b></td><td>',json.info.pcount,'期</td>',
                   '</tr>',
                   '<tr>',
                   '<td><b>待收日期：</b></td><td>',json.info.rtime,'</td>',
                   '<td><b>待收总额：</b></td><td>￥',json.info.account,'</td>',
                   '<td><b>待收利息：</b></td><td>￥',json.info.interest,'</td>',
                 
                   '</tr>',
                   '<tr>',
                   '<td><b>待收本金：</b></td><td style="font-weight:bold">￥',json.info.capital,'</td>',
                   '<td><b>转让价格：</b></td><td style="font-weight:bold">￥',json.info.price,'</td>',
                   '<td><b>转让折价：</b></td><td style="font-weight:bold">￥',transdec,'</td>',
                   '</tr>',
                   pwhtml,
                   '<tr>',
                   '<td class="td_zq2"><b>交易密码：</b></td><td class="td_zq2"><input class=u_text_zq size=19 type="password" name="paypass" id="paypass" value="" /></td>',
                   '<td class="td_zq2" colspan="4" style="text-align:left"> 　【您在投标或提现时的交易密码】</td>',
                   '</tr>',
                   '</table>',
                ].join(''),
                init: function(){
                },
                okVal:"确认承接",
                ok: function(here){
                    submit_transfer(json);
                },
                cancel: true
            });
        }else{
            $.dialog.alert("您还没有登录");
        }
    }else{
        if(json._GOURL){ // 收掉跳转指令参数则立刻跳转 
            ___GoURL( json._GOURL,json.gomsg ) ;
            return false; // 返回 false 后面就会停止执行
        }
         $.dialog.alert(json.msg);   
    }
}
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
function submit_transfer(json){
    if(json._ME.uid==json.info.uid){
        $.dialog.alert("你不能承接自己发布的债权转让");
        return;
    }
    var pwd        = $("#trans_pwd").val();
    var paypass    = SaltPassword($("#paypass").val());
    param={ 
           tid:json.info.tid,
           pwd:paypass
           }; 
    if(json.info.ispassword)
        param['trasnpwd']=pwd;
     $.ajax({
        url:  "/?m=Tender&s=submitTransfer",
        type: "POST",    // 默认 get
        dataType: "json",
        data: param ,
        success: function(json){
            ajaxDone(json);
            if(json.r==1)
                GD.load(0);
        },
        error: ajaxError
    });
       
}
function check_transfer(json){
    var pwd         = $("#trans_pwd").val();
    var trans_price    = $("#trans_price").val();
    param={bid:json.info.bid,
           tid:json.info.tid,
           passwd:pwd,
           trans_price:trans_price,
           repayid:json.info.repayid
           }; 
     $.ajax({
        url:  "/?m=Tender&s=SaveCreateTransfer",
        type: "POST",    // 默认 get
        dataType: "json",
        data: param ,
        success: function(json){
            ajaxDone(json);
            if(json.r==1)
                GD.load(0);
        },
        error: ajaxError
    });   
}