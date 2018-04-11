(function ($) {
  var editor = editormd("editormd", {
    path: "/libs/editor.md/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
    saveHTMLToTextarea: true
  });

  console.log($.toast);

  $("#saveArticle").click(function () {
    var $this = $(this);
    $this.attr("disabled", "disabled");
    var title = $("#title").val();
    var author = $("#author").val();
    var summary = $("#summary").val();
    // var md = editor.getMarkdown(); // 获取 Markdown 源码
    var html = encodeURIComponent(editor.getHTML()); // 获取 Textarea 保存的 HTML 源码
    // var preHtml = editor.getPreviewedHTML(); // 获取预览窗口里的 HTML，在开启 watch 且没有开启 saveHTMLToTextarea 时使用

    if (!title || !author || !html) {
      $.toast({
        heading: "错误",
        text: "标题、作者、内容为必填项",
        icon: "error",
        position: "top-right"
      });
      return false;
    }

    var _data = {
      title: title,
      author: author,
      summary: summary,
      content: html
    }

    $.ajax({
      type: "POST",
      url: "/admin/create",
      data: _data,
      dataType: "json",
      success: function (response) {
        if (response.code === 200 && response.status) {
          $.toast({
            heading: "成功",
            text: "文章保存成功",
            icon: "success",
            position: "top-right"
          });

          $this.removeAttr("disabled");
        } else {
          $this.removeAttr("disabled");
        }
      },
      error: function (err) {
        console.log(err);
        $.toast({
          heading: "未请求成功",
          text: "保存失败",
          icon: "error",
          position: "top-right"
        });

        $this.removeAttr("disabled");
      }
    });

  })

})(jQuery)

