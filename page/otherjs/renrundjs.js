(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.renrundjs = function(options) {
        var elements = this;
        
       this.each(function() {
            var self = this;
            var $self = $(self);
            var intDiff = 0;
            var timeformate='%H时%M分%S秒';
            /* If no src attribute given use data:uri. */
            if ($self.attr("lefttime") === undefined || $self.attr("lefttime") === false) {
                return;
            }
            if ($self.attr("fstr") !== undefined) {
                timeformate=$self.attr("fstr");
            }
            intDiff =$self.attr("lefttime");
            if ($self.attr("run") !== undefined || $self.attr("run") === true) {
                return;
            }
            if(intDiff>0){
                $self.attr("run",true);   
            }
            var ihand=window.setInterval(function(){
                var day=0,
                    hour=0,
                    minute=0,
                    second=0;//时间默认值        
                if(intDiff > 0){
                    day = Math.floor(intDiff / (60 * 60 * 24));
                    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }else{
                    window.clearInterval(ihand);
                    $self.html(options.s);
                    return;   
                }
                dayF    =  day;
                hourF   =  hour;
                minuteF =  minute;
                secondF =  second;
                if (day  <= 9) dayF = '0' + hour;
                if (hour  <= 9) hourF = '0' + hour;
                if (minute <= 9) minuteF = '0' + minute;
                if (second <= 9) secondF = '0' + second;
                $self.html(timeformate.format({D:dayF,d:day,H:hourF,h:hour,M:minuteF,m:minute,S:secondF,s:second}));
                intDiff--;
                }, 1000);
            });
    };
})(jQuery, window, document);


(function($, window, document, undefined) {
    var $window = $(window);
    $.fn.renrunjd = function(options) {
        var elements = this;
        this.each(function() {
            var self = this;
            var $self = $(self);
            var intDiff = 0;
            var starjd =0
            var jd_mode='bg';
            var oldDiff;
            var obj="";
            if ($self.attr("jd_mode") === undefined) {
                return;
            }
            if ($self.attr("jd_to") !== undefined) {
                oldDiff =$self.attr("jd_to")*1;
            }
            
            
            if ($self.attr("start") !== undefined) {
                intDiff =$self.attr("start")*1;
                starjd  =intDiff;
            }
            if ($self.attr("scale_obj") !== undefined) {
                obj =$self.attr("scale_obj");
            }
            
            if ($self.attr("run") !== undefined || $self.attr("run") === true) {
                return;
            }
            
            $self.attr("run",true);   
            if(starjd==oldDiff)//不需要执行
                return;
            var ihand=window.setInterval(function(){
                if(starjd<oldDiff){
                    intDiff=intDiff+3;
                    if(intDiff>oldDiff)
                        intDiff=oldDiff;
                }   
                else{
                    intDiff=intDiff-3;
                    if(intDiff<oldDiff)
                        intDiff=oldDiff;
                }
                    
                perdy   = (Math.abs(starjd-intDiff)*100/Math.abs(starjd)).toFixed(1)+"%"
                if((starjd<0 && intDiff>=oldDiff) || (starjd>0 && intDiff<=oldDiff)){
                     window.clearInterval(ihand);
                     $self.css("background-position",oldDiff+"px");
                     if(obj=="")
                        $self.siblings("._scale").text(perdy);
                     else
                        $(obj).text(perdy);
                     
                }else{
                    $self.css("background-position",intDiff+"px");
                    if(obj=="")
                        $self.siblings("._scale").text(perdy);
                    else
                        $(obj).text(perdy);
                }
                }, 40);
            });
    };
})(jQuery, window, document);
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("(%" + key + ")", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}