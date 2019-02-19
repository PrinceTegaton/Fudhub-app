var app = angular.module('app', []);

// var apiBase = 'https://fudhubapi.dynamicbra.in/api';
// var apiBase = 'http://localhost:61820/api';
var apiBase = 'http://localhost/fudhub_api/api';

app.controller('IndexCtrl', function ($scope, $http) {

    $scope.cart = [];

    // get categories
    $scope.getCategories = function () {
        $http.get(apiBase + '/category/load')
            .then(function (response) {
                if (response.data.ResponseCode != 1)
                    alert(response.data.ResponseMessage);
                else
                    $scope.categoryList = response.data.Data;
            });
    }

    // get products
    $scope.getProducts = function () {
        $http.get(apiBase + '/product/getall')
            .then(function (response) {
                if (response.data.ResponseCode != 1)
                    alert(response.data.ResponseMessage);
                else
                    $scope.productList = response.data.Data;

                console.log($scope.productList);
            });
    }

    // get products img
    $scope.getProductImg = function (id) {
        var img = '/products-img/' + id + '.jpg';
        // $http.get(img)
        //     .then(function (response) {
        //         console.log(response)
        //     }).error(function () {
        //         alert('no')
        //     });;

        return img;
    }

    // add products to cart
    $scope.addProductToCart = function (id) {
        var p = _.find($scope.productList, ['ID', id]);
        var cartItem = {
            ID: p.ID,
            Title: p.Title,
            Amount: p.Amount,
            Qty: 1, //p.Qty,
            Total: (p.Qty * p.Amount),
        };

        $scope.cart.push(cartItem);
        localStorage.setItem('fh_cart', JSON.stringify($scope.cart));

        // var exist = _.find($scope.cart, ['ID', id]);        
        // if (exist != null || exist != undefined || exist != 'undefined') {
        //     exist.Qty += 1;
        //     $scope.cart.push(exist);
        // } else {
        //     $scope.cart.push(cartItem);
        // }
    }

    // remove products to cart
    $scope.removeCartItem = function (id) {
        if (confirm('Remove product from cart?') == 1){
            _.remove($scope.cart, ['ID', id]);
            localStorage.setItem('fh_cart', JSON.stringify($scope.cart));
        }
    }

    // cancel cart
    $scope.cancelCart = function () {
        if (confirm('Cancel you shopping cart?') == 1){
            $scope.cart = null;
            localStorage.removeItem('fh_cart');
        }
    }

    // checkout
    $scope.checkoutCart = function () {
        var total = _.sumBy($scope.cart, 'Total');
        alert('Your cart total is N' + total);
    }

    var init = function () {
        $scope.getCategories();
        $scope.getProducts();

        // retrieve cart
        var localCart = localStorage.getItem('fh_cart');
        if (localStorage.length > 0) {
            $scope.cart = JSON.parse(localCart);
            var c = localCart.length;
            alert('Welcome back, you have ' + c + ' items in your shopping cart..');
        }
    }

    init();
});