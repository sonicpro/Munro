/*global jQuery, define, kendo */
(function (f, define) {
    define("cart.data", ["kendo.data.min", "jquery"], f);
})(
    // This funcition is executed by require.js.
    function () {
        "use strict";
        (function ($) {
            $.extend(window, {
                cart: {
                    kendoDS: function (url, options) {
                        var settings = $.extend({
                            filter: null,
                            observableToUpdate: null
                        }, options || {});
                        return new kendo.data.DataSource({
                            transport: {
                                read: url
                            },
                            type: "odata",
                            serverFiltering: true,
                            filter: settings.filter,
                            observableToUpdate: settings.observableToUpdate
                        });
                    }
                }
            });
        }(jQuery));
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
