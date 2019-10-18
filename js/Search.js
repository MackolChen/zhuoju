//搜索按钮界面使用
//<script type="text/javascript">
//    $("#btnSearch").toggle(function() { }, function() {
//        if ($.trim($("#txtKeyword").val()).length == 0 || $.trim($("#txtKeyword").val()) == '请输入关键字') {
//            alert("请输入搜索关键字!")
//        } else {
//            window.location.href = "/search.shtml?keyword=" + escape($.trim($("#txtKeyword").val()));
//        }
//    }, function() {
//        $("#btnSearch").click();
//        $("#btnSearch").click();
//    });
//
//    function enterIn(evt) {
//        var evt = evt ? evt : (window.event ? window.event : null); //兼容IE和FF
//        if (evt.keyCode ==13) {
//            $("#btnSearch").click();
//        }
//    }
//
//    $("#txtKeyword").keydown(function(event) {
//        if (event.keyCode == 13) {
//            $("#btnSearch").click();
//        }
//    });
//</script>
//搜索页面使用
//<script src="/js/Search.js" type="text/javascript"></script>
//其他页面使用
//<script src="/js/Search.js" type="text/javascript"></script>
//<script type="text/javascript">
//  $(function(){
//    sel('', 0, '', '');
//  });
//</script>

var keyword = "";
var keywordTT = "";
var keywordCT = "";

$(function() {
    sel(getKeyword("keyword"), 0, getKeyword("keywordTT"), getKeyword("keywordCT")); //?keyword=1&keywordTT=2&keywordCT=3
})

function getKeyword(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function setKeyword(index) {
    keyword = getKeyword("keyword");
    keywordTT = getKeyword("keywordTT");
    keywordCT = getKeyword("keywordCT");
    sel(keyword, index, keywordTT, keywordCT);
}

function sel(keyword, index) {
    sel(keyword, index, "", "");
}

function sel(keyword, index, keywordTT, keywordCT) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/AjaxFile/Search.ashx",
        async: false,
        data: {
            keyword: keyword,
            keywordTT: keywordTT, //标题关键字(可选)
            keywordCT: keywordCT, //内容关键字(可选)
            list: '<li><div class="list_img"><a href="{$Href$}" target="_blank"><img class="imgpro" src="{$SmallImageUrl$}" /><i></i></a></div><div class="list_txt"><p class="list_tit"><a href="{$Href$}" target="_blank" title="{$Title$}">{$Title$}</a></p><p>{$Remark:200$}</p><a href="{$Href$}" target="_blank" class="more">MORE&gt;&gt;</a></div></li>',
            //循环格式 外面一般用<ul class="listShow"></ul>包裹
            page: '<a href="{$PrevLink$}"><img src="/images/s.png" /></a>{$PageNumInfo$}<a href="{$NextLink$}"><img src="/images/x.png" /></a>', 
            //分页格式 外面用<div class="page"></div>包裹
            index: index, //当前页数
            count: 6, //每页显示条数
            item: "product", //搜索表(product news single job message productAndNews)
            way: 2 //搜索方法(1:标题或岗位 2:(标题或岗位)和内容 3:所属分类编号或留言人 4:该分类下的数据条数或该留言人的留言总数)
        },
        success: function(data) {
            if (data.listShow.indexOf("暂无数据") == -1) {
                if (data.counts == null) {
                    $(".list").html(data.listShow);
                    $("#pgServer").html(data.listPage);
                    $(".imgpro").LoadImage(true, 154, 142, "/UpLoadFile/loading.gif");
                    if ($("#pgServer a").length == 1) {
                        $("#pgServer").hide();
                    } else {
                        $(".page a").each(function() {
                            if ($(this).html() == index + 1) {
                                $(this).html("<span>" + $(this).html().replace("<a>", "").replace("</a>", "") + "</span>");
                            }
                        });
                    }
                } else {
                    document.write(data.counts);
                }

            }
            else {
                if (data.counts == null) {
                    $(".list").html("<li>暂无数据<li>");
                    $("#pgServer").hide();
                } else {
                    document.write("0");
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
        }
    });
}

