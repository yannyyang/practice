
$("#emptyBtn").bind("click",function(){
	$(".show").empty();
});
$("#appendBtn").on("click",function(){
    $(".show").append("<span>这是一个append实例</span>");
});
$("#insertBeforeBtn").on("click",function(){
    $(".show p").insertBefore(".show span");
});