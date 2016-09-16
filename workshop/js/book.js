/*controller for the edit and delete operations for the book */


/*injecting the dependencies to the controller */
myapp.controller('bookEditController', ['$scope', '$location', '$http', 'factoryName', function($scope, $location, $http, factoryName) {

    /*catching the isbn from the url */
    isbn = $location.search();

    /*on load disable the text boxes */
    $scope.isClicked = true;
    
     /*function for enabling the text boxes after clicking the edit button */
    $scope.view = function(newItem) {
        $scope.isClicked = false;
    }

    /** calling the http function to get the details of the book when that isbn is clicked
    *@ param-{isbn,title,author,price,availableOn}*/
    factoryName.httpCall("http://172.27.12.104:3000/book/byisbn", 'POST', isbn)
        .success(function(response) {
            $scope.book = response;
            console.log(response);
        })
        .error(function(error) {
            alert(error);
        });


    /*function for deleting the book*/
    $scope.deleteBook = function(emp) {
        var id = emp.isbn;
        var id1 = {
            "isbn": id
        };
        console.log(id1);
        /*asking for confirmation to delete */
        var r = confirm("Are you sure you want to delete")
        if (r == true) {
            /** Calling the factory for deleting
            *@ param-{isbn}*/
            factoryName.httpCall("http://172.27.12.104:3000/book/remove", 'DELETE', id1)
                .success(function(response) {
                    $scope.value = response;
                    alert($scope.value.message);
                })
                .error(function(error) {
                    alert(error);
                });
        }
    }

    /*function for updating the author */
    $scope.updateBookDetails = function(emp1) {
        
        var avab1 = [];
        /* Taking values from the check box */
        $("input:checkbox[name=type]:checked").each(function() {
           
            avab1.push($(this).val());
        });
        emp1.availableOn = avab1;
        
        /*confirmation for updating the book */
        var r = confirm("Are you sure you want to update")
        if (r == true) {
            /** Calling the factory for updating
            *@ param-{isbn,title,author,price,availableOn}*/
            factoryName.httpCall("http://172.27.12.104:3000/book/update", 'PUT', emp1)
                .success(function(response) {
                    $scope.value = response;
                    alert($scope.value.message);
                })
                .error(function(error) {
                    alert(error);
                });
        }
    }


}]);/* End of the controller */