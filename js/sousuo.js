$(function() {
$(".ss_btn").click(function() {
if ($.trim($(".ss_txt").val()) == "" || $.trim($(".ss_txt").val()) == "请输入搜索关键字") {
            alert("请输入关键字");
            return false;
        } else {
        window.location.href = "/prosearch.shtml?keyword=" + escape($.trim($(".ss_txt").val()));
        }
    });
    $(".ss_txt").keydown(function(event) {
        if (event.keyCode == 13) {
            $(".ss_btn").click();
            return false;
        }
    });
});
 