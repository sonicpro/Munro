/*global define */
(function (f, define) {
    define("categories", ["cart.data"], f);
})(
    // This function is executed by require.js.
    function () {
        return function categories() {
            var url = "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories";
            return window.cart.kendoDS(url);
        };
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
