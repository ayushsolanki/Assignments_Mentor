/*factory for the http call to the server*/
myapp.factory('factoryName', function($http) {


    var factory = {};

    /*function for the http call */
    factory.httpCall = function(Url, Method, Data) {
        /*return the success and error to the caller */
        return $http({
            url: Url,
            method: Method,
            data: angular.toJson(Data),
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/JSON'
            }
        })


    };

    /*returning the factory object */
    return factory;

});