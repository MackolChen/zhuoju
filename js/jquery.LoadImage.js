/*
**************图片预加载插件******************
///作者：没剑(2008-06-23)
///http://regedit.cnblogs.com

///说明：在图片加载前显示一个加载标志，当图片下载完毕后显示图片出来
可对图片进行是否自动缩放功能
此插件使用时可让页面先加载，而图片后加载的方式，
解决了平时使用时要在图片显示出来后才能进行缩放时撑大布局的问题
///参数设置：
scaling     是否等比例自动缩放
width       图片最大高
height      图片最大宽
loadpic     加载中的图片路径


页面用法：
<script src="/js/jquery.LoadImage.js" type="text/javascript"></script>
<script  type="text/javascript">
        $(".table1 image").LoadImage(true, 213, 123, "/UpLoadFile/loading.gif");
      
</script>

*/
jQuery.fn.LoadImage = function(scaling, width, height, loadpic) {
    if (loadpic == null) loadpic = "/UpLoadFile/zanwu.png";
    return this.each(function() {
        var t = $(this);
        var src = $(this).attr("src");
        if (src.toLowerCase().indexOf("zanwu") != -1 || src.toLowerCase().indexOf("loading") != -1)
            return false;

        if (src.length == 0 || src.toLowerCase().indexOf("nopic") != -1) {
            $(this).attr("src", "/UpLoadFile/zanwu.png").removeAttr("height").removeAttr("width").removeAttr("style");
            return true;
        }
        var img = new Image();
        //alert("Loading...")
        img.src = src;
        //自动缩放图片
        var autoScaling = function() {
            if (scaling) {

                if (img.width > 0 && img.height > 0) {
                    if (img.width / img.height >= width / height) {
                        if (img.width > width) {
                            t.width(width);
                            t.height((img.height * width) / img.width);
                        } else {
                            t.width(img.width);
                            t.height(img.height);
                        }
                    }
                    else {
                        if (img.height > height) {
                            t.height(height);
                            t.width((img.width * height) / img.height);
                        } else {
                            t.width(img.width);
                            t.height(img.height);
                        }
                    }
                }
            }
        }
        //处理ff下会自动读取缓存图片
        if (img.complete) {
            //alert("getToCache!");
            autoScaling();

            return;
        }

        if (t.parent().find("img").length > 1) {
            t.parent().find("img:gt(0)").remove();
            t.parent().find().show();
            loadpic = "/UpLoadFile/zanwu.png";
        }

        var loading = $("<img alt=\"加载中...\" name=\"loadings\" title=\"图片加载中...\" src=\"" + loadpic + "\" />");

        t.hide();
        t.after(loading);
        $(img).load(function() {
            autoScaling();
            loading.remove();
            t.attr("src", this.src);
            t.show();
            //alert("finally!")

        });

    });

}

$(function() {
    setTimeout(function() {
        $("img[name=loadings]").attr("src", "/UpLoadFile/zanwu.png").height(19).width(76);
        $(".iehuan").click();
    }, 4000);
})

