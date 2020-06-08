gAuthenticator.service("AuthenticateService", function ($http, $q, $location, GOOGLE_VALIDATE_TOKEN_URL, GOOGLE_TASK_API_URL) {

    var d = $q.defer();
    var token = localStorage.token;
    var URL = $location.path();
    var validated = false;

    //Check for callback URL
    if (URL.indexOf("access_token") != -1) {
        localStorage.token = URL.substring(URL.indexOf("=") + 1, URL.indexOf("&amp;"));
        token = localStorage.token;
        console.log("Call in service: {}", token)
    }

    //Validate and parse token
    $http.get(GOOGLE_VALIDATE_TOKEN_URL + token)
        .success(function (result) {
            validated = true;
        }).error(function (error) {
            validated = false;
        });

    //Get Google Tasks
    this.getTasks = function () {
        if (validated) {
            $http.get(GOOGLE_TASK_API_URL + token)
                .success(function (result) {
                    d.resolve(result);
                }).error(function (error) {
                    console.log(error);
                });
            return d.promise;
        }
    }
});