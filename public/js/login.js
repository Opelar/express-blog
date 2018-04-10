/**
 * base login page script
 * create by opelar
 */
(function($) {
  // var reg = /^1[34578]\d{9}$/;
  $("#login-username, #login-password").focus(function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .removeClass("floating");
  });

  $("#login-btn").click(function() {
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    if (!username || !password) {
      $.toast({
        heading: "错误",
        text: "用户名和密码不能为空",
        icon: "error",
        position: "top-right"
      });
      return false;
    }
    // invoke login
    $.ajax({
      type: "POST",
      url: "/admin/login",
      data: { username: username, password: password },
      dataType: "json",
      success: function(response) {
        if (response.code === "4101") {
          $.toast({
            heading: "error",
            text: response.msg,
            icon: "error",
            position: "top-right"
          });
        }
        if (response.code === "200") {
          location.href = "/admin";
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
})(jQuery);
