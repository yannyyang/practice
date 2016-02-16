
//duquery
(function(w){//定义立即执行函数，传入全局对象window 
    var tagType;
    var printS = [];
    function duquery(id){//定义函数，实现去new的操作

        function Duquery(id){//定义类
            var tagName = id.substr(1,id.length);
            printS = [];
            if(/^#.*/g.test(id)){
                printS.push(document.getElementById(tagName));//id查找
                tagType = true;
            }else if(/^\..*/g.test(id)){
                tagType = false;
                var ids = document.getElementsByClassName(tagName);                
                if(document.getElementsByClassName){
                    for(i=0;i< ids.length;i++){
                        printS.push(ids[i]);
                    } 
                }else{
                    alert("not support getElementsByClassName");
                }
            }
            return this;//返回对象
        };
        Duquery.prototype = {
            html: function(val){//利用原型添加设置html的方法
                for(var i=0; i< printS.length; i++){
                    printS[i].innerHTML=val; 
                }
                return this;//返回对象，执行后可链式操作
            },
            attr: function(key,val){//添加设置属性的方法
                for(var i=0; i< printS.length; i++){
                    printS[i].setAttribute(key,val);
                }
                return this;
            },
            css: function(key,val){//添加设置样式的方法
                for(var i=0; i< printS.length; i++){
                    printS[i].style[key]=val;
                }
                return this;
            },
            on: function(event,fun){            
                for(var i=0; i< printS.length; i++){
                    printS[i].addEventListener(event,fun,false);
                }
                return this;
            },
            empty: function(){//设置empty的方法
                for(var i = 0; i< printS.length;i++){
                   printS[i].innerHTML=""; 
                }
                return this;
            },
            hasClass: function(cls){//设置hasClass方法
                for(var i = 0; i< printS.length;i++){
                    var totalCls = printS[i].className.split(" ");
                    for(var j=0; j< totalCls.length; j++){
                        if(cls==totalCls[j]){
                            return true;
                        }
                    }
                }
            },
            addClass: function(cls){//设置addClass方法
                if(!Duquery.prototype.hasClass(cls)){
                    for(var i = 0; i< printS.length;i++){
                        printS[i].className += " " + cls; 
                    }
                }else{
                    return ;
                }
                return this;
            },
            removeClass: function(cls){//设置removeClass方法
                if(Duquery.prototype.hasClass(cls)){
                    for(var i = 0; i< printS.length;i++){
                        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                        console.log(printS[i].className);
                        printS[i].className= printS[i].className.replace(reg,' ');
                    }
                }else{
                    return ;
                }
                return this;
            },
            append: function(val){//设置removeClass方法
                for(var i = 0; i< printS.length;i++){
                    // console.log(/<[^>]*>/.test(val));
                    // console.log(val.replace(/<[^>]*>(.|\n)*<\/[$>]>/,''));
                    var reg = /<span>(?:(?!<\/span>).)+<\/span>/g;
                    var arr=val.match(reg);
                    console.log(arr);
                    var newText = document.createTextNode(val)
                    // console.log(val.length);
                    printS[i].appendChild( newText );
                }
            },
            insertBefore: function(val){//设置removeClass方法
                for(var i = 0; i< printS.length;i++){
                    var newText = document.createTextNode(val);
                    printS[i].insertBefore( newText, printS[i].childNodes[0] );
                }
            },
            each: function(callback){//添加遍历迭代静态方法
                obj = printS;

                var value,
                    i = 0,
                    length = obj.length,
                    isArray = 0;//isArraylike( obj );

                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                }
                return obj;                

                
            }
        }
        return new Duquery(id);//去new处理，返回实例对象
    };

    
    duquery.wait=function(time,fun){//添加延时静态方法，可通过函数名直接使用
        setTimeout(fun,time);
    };  
    // duquery.each=function(arr,callback){//添加遍历迭代静态方法
    //     for(var key in arr){
    //         callback(key,arr[key]);
    //     };
    // };

    w.$=w.duquery=duquery;//类追加到全局对象自定义属性上，可直接调用

})(window);

$("#onBtn").on("click",function(){
    alert("触发了click事件啦啦啦");
});
$("#htmlBtn").on("click",function(){
    $(".show").html("lalalla");
});
$("#emptyBtn").on("click",function(){
    $(".show").empty();
});
$("#hasClassBtn").on("click",function(){
    var $show=$(".show");
    console.log($show.hasClass("bg01"));
    if($show.hasClass("bg01")){
        console.log("yes it has");
    }else{
        console.log("don't have")
    }
});
$("#addClassBtn").on("click",function(){
    $(".show").addClass("bg01");
});
$("#removeClassBtn").on("click",function(){
    $(".show").removeClass("bg01");
});
$("#appendBtn").on("click",function(){
    $(".show").append("<span>这是一个append实例</span>lalal");
});
$("#insertBeforeBtn").on("click",function(){
    $(".show").insertBefore("<p>ddddddd</p>");
});
$("#eachBtn").on("click",function(){
    // $(".show").insertBefore("<p>ddddddd</p>");
    $(".prag").each(function(){
        console.log("dd");
    });
});
