/*controller for the edit and delete operations for author */

/*injecting the dependencies to the controller */
myapp.controller('authorEditController', ['$scope', '$location', '$http', 'factoryName', function($scope, $location, $http, factoryName) {

    /*catching the name from the url */
    name1 = $location.search();

    /*on load disable the text boxes */
    $scope.isClicked = true;
    
    /*function for enabling the text boxes after clicking the edit button */
    $scope.view = function(newItem) {
        $scope.isClicked = false;
    }

    /** calling the http function to get the details of the author when that author is clicked 
    *@ param-{name}*/
    factoryName.httpCall("http://172.27.12.104:3000/author/byname", 'POST', name1)
        .success(function(response) {
            $scope.emp = response;

        })
        .error(function(error) {
            alert(error);
        });

    
    /*function for deleting the author*/
    
    $scope.deleteAuthor = function(emp2) {
        var id = emp2.empid;
        var id1 = {
            "empid": id
        };
        
        /*asking for confirmation to delete */
        var r = confirm("Are you sure you want to delete?")
        if (r == true) {
            /** Calling the factory for deleting
            *@ param-{empid}*/
            factoryName.httpCall("http://172.27.12.104:3000/author/remove", 'DELETE', id1)
                .success(function(response) {
                    $scope.value = response;
                    alert($scope.value.message);
                })
                .error(function(error) {
                    alert(error);
                });
        }

    }

    /* function for updating the author */
    $scope.updateAuthor = function(emp1) {
        /* confirmation for updating the author */
        var r = confirm("Are you sure you want to update")
        if (r == true) {
        /** Calling the factory for updation
        *@param-{empid,name,emaildid,skills,website,department} */
        factoryName.httpCall("http://172.27.12.104:3000/author/update", 'PUT', emp1)
                .success(function(response) {
                    $scope.value = response;
                    alert($scope.value.message);
                })
                .error(function(error) {
                    alert(error);
                });
        }
    }

}]);/* End of controller */