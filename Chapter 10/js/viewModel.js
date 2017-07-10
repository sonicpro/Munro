/*global define */
(function (f, define) {
    define(["categories"], f);
})(
    function () {
        return function viewModel(categories) {
            this.categories = categories;
        };
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
