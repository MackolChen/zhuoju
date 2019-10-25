$(function() {
    $('#ImageKey').attr('src', '/AjaxFile/ImageCode.aspx?dump=' + Math.random());
    $(".lx_btn").click(function() {
        if ($.trim($("#txt_First_Name").val()).length < 1) {
            alert('姓名不可以为空！');
            $("#txt_First_Name").focus();
            return false;
        }

        if ($.trim($("#txt_First_Name").val()).length > 30) {
            alert('姓名长度为1-30个字符！');
            $("#txt_First_Name").focus();
            return false;
        }



        if ($.trim($("#txt_Email").val()).length < 1) {
            alert('邮箱不可以为空！');
            $("#txt_Email").focus();
            return false;
        }
        if ($.trim($("#txt_Email").val()).length > 0) {
            var testemail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!testemail.test($("#txt_Email").val())) {
                alert("邮箱格式错误！");
                $("#txt_Email").focus();
                return false;
            }

        }
        if ($.trim($("#txt_Email").val()).length > 50) {
            alert('邮箱长度为1-50个字符！');
            $("#txt_Email").focus();
            return false;
        }
        if ($.trim($("#txt_Country").val()).length < 1) {
            alert('联系电话不可以为空！');
            $("#txt_Country").focus();
            return false;
        }

        if ($.trim($("#txt_Country").val()).length > 0) {

            var testtel = /(^[0-9\+\-]{0,20}$)/;
            if (!testtel.test($("#txt_Country").val())) {
                alert("联系电话格式错误！");
                $("#txt_Country").focus();
                return false;
            }
        }


        if ($.trim($("#txt_City").val()).length > 50) {
            alert('城市长度为0-50个字符！');
            $("#txt_City").focus();
            return false;
        }



        if ($.trim($("#txt_Content").val()).length > 500) {
            alert('留言内容长度在0~500字符！');
            $("#txt_Content").focus();
            return false;
        }



        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/index.php",
            data: {
                FullName: $.trim($("#txt_First_Name").val()),
                Tel: $.trim($("#txt_Country").val()),
                Email: $.trim($("#txt_Email").val()),
                Title: $.trim($("#Title").val()),
                WebSiteUrl: $.trim($("#WebSiteUrl").val()),
                Address: $.trim($("#txt_City").val()),
                Content: $.trim($("#txt_Content").val())
            },
            async: false,
            error: function(request) {
                alert("未知错误！");

            },
            success: function(data) {
                alert(data);
                if (data == "在线留言成功!") {
                    window.location.href = "/";

                }
            }
        });





    });

})