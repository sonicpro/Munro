/*global define, jQuery */
(function (f, define) {
    define(["categories", "jquery"], f);
})(
    function() {
        return (function($) {
            "use strict";
            return function ViewModel(categories, ko) {
                var self = this,
                    i = 0,
                    len = 0,
                    // Kind of private var.
                    filter = {
                        field: "CategoryID",
                        operator: "eq",
                        value: ko.observable()
                    },
                    // Another one private var.
                    productDS = window.cart.kendoDS("http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products", {
                        filter: ko.toJS(filter)
                    });

                productDS.bind("change", function () {
                    // "this" relates to kendo.data.DataSource in this scope.
                    self.categoryProducts(this.view().toJSON());
                });

                filter.value.subscribe(function (value) { applyCategory.call(productDS, value); });

                function applyCategory(value) {
                    this.options.filter.value = value;
                    this.read();
                }

                this.categories = categories;
                this.categoryProducts = ko.observable();
                this.cartItems = ko.observableArray();
                this.quantities = ko.observable({});                
                this.cartTotal = ko.computed(function () {
                    var total = 0,
                        item;
                    for (i = 0, len = self.cartItems().length; i < len; i++) {
                        item = self.cartItems()[i];
                        total += +item.UnitPrice * self.quantities()[item.ProductID];
                    }
                    return total;
                });
                this.addItem = function () {
                    // "this" points to the productCategory item.
                    var index = $.inArray(this, self.cartItems()),
                        unwrapped = ko.toJS(self.quantities);
                    unwrapped[this.ProductID+[]] = (unwrapped[this.ProductID+[]] || 0) + 1;
                    self.quantities(unwrapped);
                    if (!(~index)) {
                        self.cartItems.push(this);
                    }
                };
                this.removeItem = function () {
                    // Notice push() and remove() methods of ko.obeservableArray().
                    // "this" points to the cart item.
                    var unwrapped = ko.toJS(self.quantities);
                    self.cartItems.remove(this);
                    unwrapped[this.ProductID+[]] = 0;
                    self.quantities(unwrapped);
                };
                this.fadeIn = function (element) {
                    $(element).hide().fadeIn('slow');
                };
                this.fadeOut = function (element) {
                    $(element).slideUp(function () {
                        $(element).remove();
                    });
                };
                this.setFilter = function (category) {
                    filter.value(category.CategoryID);
                };
            };
        }(jQuery));
    },
    typeof define === "function" && define.amd ? define : function (d, f) {
        f();
    });
