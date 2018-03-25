$(".card-info").mouseover(function () {
    $(this).css("background-color","#ffffff");
    $(this).find("img").css({"width":"50px","height":"50px"});
    $(this).find(".card-info-title").hide();
    $(this).find(".card-info-content p").css("-webkit-line-clamp","7");
})
$(".card-info").mouseout(function () {
    $(this).css("background-color","#d4d6dc");
    $(this).find("img").css({"width":"100px","height":"100px"});
    $(this).find(".card-info-title").show();
    $(this).find(".card-info-content p").css("-webkit-line-clamp","3");
})
$(".middle-content-img img").mouseover(function () {
    $(this).css("width"," 10px")
})