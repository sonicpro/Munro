/*global define */
(function (f, define) {
    define("categories", ["cart.data"], f);
})(
    // This function is executed by require.js.
    function () {
        var url = "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories",
            //filter = {
            //    field: "CategoryID",
            //    operator: "eq",
            //    value: 1
            //},
            dataSource = window.cart.kendoDS(url);
        dataSource.bind("change", function () {
            window.cart.categories = this.view().toJSON();
        });
        dataSource.read();
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
