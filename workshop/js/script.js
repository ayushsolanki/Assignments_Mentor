var myapp = angular.module('myApp', ['ngRoute']);

/*routing for the different pages and their controllers*/
myapp.config(function($routeProvider) {
    $routeProvider
        .when("/newBook", {
            templateUrl: "routes/addNewBook.html",
        })

    .when("/", {
        templateUrl: "routes/main.html",
        controller: "bookStore"
    })

    .when("/detailBook", {
        templateUrl: "routes/bookdetails.html",
        controller: "bookEditController"
    })

    .when("/editAuthor", {
        templateUrl: "routes/e.html",
        controller: "authorEditController"
    })


    .when("/newAuthor", {
        templateUrl: "routes/addNewAuthor.html",

    });


});

/*main controller */
myapp.controller('bookStore', function($scope, $http, $location, factoryName) {

    var emp1 = [];
    $scope.isClicked = true;



    /*calling the factory for the http call to the server for book list */
	
    $http.get("http://172.27.12.104:3000/book/list")
        .then(function(response) {
            $scope.employess = response.data;
        });

    /*calling the factory for the http call to the server for author list */
    $http.get("http://172.27.12.104:3000/author/list")
        .then(function(response) {
            $scope.authores = response.data;
        });

   /**function for theinsertion of new author
	*@ param-{empid,name,emaildid,skills,website,department}*/
    $scope.AddAuthor = function(emp3) {
        var avab = '';
        var avab1 = [];
       // var skills = [];
        var i = 0;
        var flag = 0;
        
        /* getting the value from the checkboxes */
        $("input:checkbox[name=type]:checked").each(function() {
           
            avab1.push($(this).val());
        });
        
        
       
        emp3.skills = avab1;
        console.log(emp3);
        
        /* loop for checking if the empid is already present in the database */
        for (i in $scope.authores) {
            if ($scope.authores[i].empid === emp3.empid) {
                alert("Author already present with this empid number");
                flag = 1;
                break;
            }
        }
        /* if empid not present then insert the data */
        if (flag != 1) {
            /* confirmation from the user to insert the data */
            var r = confirm("Are you sure you want to add new Author")
            if (r == true) {
            /* calling the factory for the http post method and insert the data  */ factoryName.httpCall("http://172.27.12.104:3000/author/new", 'POST', emp3)
                    .success(function(response) {

                        $scope.value = response;
                        alert($scope.value.message);

                    })
                    .error(function(error) {

                    });
                

            }
        }
    }/* end of function add author */

    /**function for the insertion of new book
	*@ param-{isbn,title,author,price,availableOn}*/
    $scope.AddEmp = function(emp) {
        var avab = '';
        var avab1 = [];
         /* getting the value from the checkboxes */
        $("input:checkbox[name=type]:checked").each(function() {
             avab1.push($(this).val());
        });
        
       
        var i = 0;
        var flag = 0;
        emp.availableOn = avab1;
        console.log(emp);
         /* loop for checking if the isbn is already present in the database */
        for (i in $scope.employess) {


            if ($scope.employess[i].isbn === emp.isbn) {
                alert("Book already present with this isbn number");
                flag = 1;
                break;
            }

        }
         /* if isbn not present then insert the data */
        if (flag != 1) {
             /* confirmation from the user to insert the data */
            var r = confirm("Are you sure you want to add book")
            if (r == true) {
                /* calling the factory for the http post method and insert the data  */
                factoryName.httpCall("http://172.27.12.104:3000/book/new", 'POST', emp)
                    .success(function(response) {
                        $scope.value = response;
                        alert($scope.value.message);
                    })
                    .error(function(error) {
                        alert(error);
                    });

            }
        }


    }/*end of function AddEmp*/

});/*end of the controller */