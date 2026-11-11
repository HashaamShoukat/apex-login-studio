// APEX 26.2: Universal Theme fires apexwindowresized when the title bar changes size, and opening the side menu
// below --js-mq-lg narrows it - the menu closed again at once on phones. Skip that event while the menu is open
// and the window kept its width (nothing has to be laid out again then; the next real resize goes through as before).
// An existing hook for the event is kept and still called; "navFix" stops a second copy stacking up.
(function ($) {
    var special = $.event.special, old = special.apexwindowresized || {},
        large = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--js-mq-lg")) || 1200,
        width = window.innerWidth;
    if (old.navFix) { return; }
    special.apexwindowresized = $.extend({}, old, {
        navFix: true,
        trigger: function () {
            if (window.innerWidth === width && width < large && document.body.classList.contains("js-navExpanded")) {
                return false;
            }
            width = window.innerWidth;
            return old.trigger && old.trigger.apply(this, arguments);
        }
    });
})(apex.jQuery);
