/*global define */
(function (f, define) {
    define("viewModel", ["cart.data"], f);
})(
    function () {
        window.cart.ViewModel = function (categories) {
            this.categories = categories;
        };
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
