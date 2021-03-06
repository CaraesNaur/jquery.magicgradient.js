/*
 * MagicGradient: a jQuery plugin to apply vertical gradients to text
 * version 0.1.0
 *
 * By Marty Vance
 * 27 July 2009
 *
 * License: GNU GPL v2: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * 
 */

(function($){
    $.fn.extend({
        magicGradient: function(options) {
            return this.each(function() {
                if(!options.gradient) {
                    return this;
                }
                var targetEl = $(this);
                targetEl.css('position','relative');
                targetEl.find('#textwrap > span.magicGradient').remove();
                var targetContent = targetEl.contents();
                var fade = options.gradient;

                var numColors = fade.length;
                var targetHeight = targetEl.height();
                var targetWidth = targetEl.width();
                var stripeHeight = targetHeight / numColors;

                for(var i = 0; i < numColors; i++){
                    var stripe = $('<span></span>');
                    stripe.addClass('magicGradient');
                    stripe.append(targetContent.clone());

                    var st = i * stripeHeight;
                    var sb = (i + 1) * stripeHeight;

                    stripe.css('clip', 'rect(' + st + 'px ' + targetWidth + 'px ' + sb + 'px 0px)');
                    try {
                        stripe.css('color', fade[i]);
                    } catch (e) {
                        continue;
                    }
                    stripe.css('z-index', targetEl.css('z-index') + i + 1);
                    stripe.css('position', 'absolute');
                    stripe.css('top', targetEl.css('padding-top'));
                    if(!jQuery.support.leadingWhitespace) {
                        stripe.css('left', 0);
                    } else {
                        stripe.css('left', targetEl.css('padding-left'));
                    }
                    stripe.css('right', targetEl.css('padding-right'));
                    stripe.css('bottom', targetEl.css('padding-bottom'));
                    targetEl.append(stripe);
                }
            });
        }
    });
})(jQuery);

