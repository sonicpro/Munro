/*global define */
(function (f, define) {
    define(["categories"], f);
})(
    function () {
        return function viewModel(categories, ko) {
            this.categories = categories;
            this.categoryProducts = ko.observableArray([]);
            this.addButtonText = "Add to cart";
            
            // Kind of private var.
            var filter = {
                field: "CategoryID",
                operator: "eq",
                value: ko.observable()
            };
            this.setFilter = function (category) {
                filter.value(category.CategoryID);
            };

            // Another one private var.
            var productDS = window.cart.kendoDS("http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products", {
                filter: ko.toJS(filter),
                observableToUpdate: this.categoryProducts
            });
            productDS.bind("change", function () {
                this.options.observableToUpdate(this.view().toJSON());
            });

            filter.value.subscribe(function (value) { applyCategory.call(productDS, value); });

            function applyCategory(value) {
                this.options.filter.value = value;
                this.read();
            }
        };
    },
    typeof define === "function" && define.amd ? define : function (_, d, f) {
        f();
    });
