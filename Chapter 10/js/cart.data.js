// JavaScript source code
(function (f, define) {
    define("cart.data", ["kendo.data", "jquery"], f);
})(
    // This funcition is executed by require.js.
    function () {
        "use strict";
        $.extend(window, {
            cart: {
                kendoDS: function (url, options) {
                    var settings = $.extend({
                        filter: null
                    }, options || {});
                    return new kendo.data.DataSource({
                        transport: {
                            read: url
                        },
                        type: "odata",
                        serverFiltering: true,
                        filter: settings.filter
                    });
                }
            }
        });
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
