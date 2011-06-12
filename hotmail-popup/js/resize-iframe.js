$(function()
{
  $('#wrapper').resizable({
    handles: 'e, s',
    alsoResize: '#shinshu-u',
    start: function(event, ui)
    {
      // Add frame helpers
      $("iframe").each(function() {
        var offsetWidth = this.offsetWidth, offsetHeight = this.offsetHeight;

        $('<div class="ui-resizable-iframeFix" style="background: #fff;"></div>')
          .css({
            width: offsetWidth+"px", height: offsetHeight+"px",
            position: "absolute", opacity: "0.001", zIndex: 1000
          })
          .css($(this).offset())
          .appendTo("body")
          .data("resizable", { width: offsetWidth, height: offsetHeight });
      });
    },
    resize: function(event, ui)
    {
      var self = $('#wrapper').data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition;

      var delta = {
        height: (self.size.height - os.height) || 0, width: (self.size.width - os.width) || 0,
        top: (self.position.top - op.top) || 0, left: (self.position.left - op.left) || 0
      },

      _alsoResize = function(exp, c) {
        $(exp).each(function() {
          var el = $(this), start = $(this).data("resizable"), style = {}, css = c && c.length ? c : ['width', 'height', 'top', 'left'];

          $.each(css || ['width', 'height', 'top', 'left'], function(i, prop) {
            // iframeより少し大きめに設定することで、iframe上でmouseupしてしまったときにmouseupイベント捕捉できない問題解消
            var sum = (start[prop]||0) + (delta[prop]||0) + 5;
            if (sum && sum >= 0)
              style[prop] = sum || null;
          });

          //Opera fixing relative position
          if (/relative/.test(el.css('position')) && $.browser.opera) {
            self._revertToRelativePosition = true;
            el.css({ position: 'absolute', top: 'auto', left: 'auto' });
          }

          el.css(style);
        });
      };

      _alsoResize('div.ui-resizable-iframeFix', ['width', 'height']);
    },
    stop: function(event, ui)
    {
      // Remove frame helpers
      $("div.ui-resizable-iframeFix")
        .removeData('resizable')
        .each(function() { this.parentNode.removeChild(this); });
    }
  });
});
