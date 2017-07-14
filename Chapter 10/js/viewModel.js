/*global define */
(function (f, define) {
    define(["categories"], f);
})(
    function () {
        return function viewModel(categories, ko) {
            this.categories = categories;
            this.categoryProducts = ko.observable([]);
            this.addButtonText = "Add to cart";
            
            // Kind of private var. Not observed by anyone.
            var filter = {
                field: "CategoryID",
                operator: "eq",
                value: ko.observable(-1)
            };
            this.setFilter = function (category) {
                filter.value(category.CategoryID);
            };

            // Another one private var.
            var productDS = window.cart.kendoDS("http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products", {
                filter: ko.toJS(filter)
            });
            productDS.bind("change", function (e) {
                var that = this;
                this.read();
                that.categoryProducts(productDS.view().toJSON());
            });
            filter.value.subscribe(function () {
                productDS.trigger("change");
            });
        };
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
