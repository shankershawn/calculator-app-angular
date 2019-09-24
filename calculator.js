var calculatorModule = angular.module("calculatorApp", []);

calculatorModule.controller("calculatorController", ["calculatorService", function(calculatorService){
        this.result = 0;
        this.operands = ["+", "-", "*", "/"];
        this.chooseOperation = function(button){
            this.operation = button;
            this.clearErrorMessage();
        }

        this.clearErrorMessage = function(){
            this.errorMessage = "";
        }

        this.reset = function(){
            this.input1 = this.input2 = this.operation = this.errorMessage = "";
            this.result = "0";
        }

        this.operate = function(){
            if(undefined == this.input1 || undefined == this.input2 || "" == this.input1 || "" == this.input2){
                this.errorMessage = "Please enter the inputs!";
            }else if(isNaN(this.input1) || isNaN(this.input2)){
                this.errorMessage = "Please enter only numbers!";
            }else if(undefined == this.operation || this.operation == ""){
                this.errorMessage = "Please enter an operand!";
            }else if(this.operation == "/" && Number(this.input2) == 0){
                    this.errorMessage = "You cannot divide by zero!";
            }else {
                this.clearErrorMessage();
                calculatorService.operate(this);
            }
        }
    }]);

calculatorModule.service("calculatorService", ["$http", function($http){
    this.operate = function(controllerScope){
        var serviceUrl = "";
        if(controllerScope.operation == "+"){
            //serviceUrl = "http://calculator-env.akiirbjcaa.us-east-2.elasticbeanstalk.com/v1/calculator/addition";
            serviceUrl = process.env.CALCULATOR_REST_DOMAIN + "/v1/calculator/addition";
        }else if(controllerScope.operation == "-"){
            //serviceUrl = "http://calculator-env.akiirbjcaa.us-east-2.elasticbeanstalk.com/v1/calculator/subtraction";
            serviceUrl = process.env.CALCULATOR_REST_DOMAIN + "/v1/calculator/subtraction";
        }else if(controllerScope.operation == "*"){
            //serviceUrl = "http://calculator-env.akiirbjcaa.us-east-2.elasticbeanstalk.com/v1/calculator/multiplication";
            serviceUrl = process.env.CALCULATOR_REST_DOMAIN + "/v1/calculator/multiplication";
        }else if(controllerScope.operation == "/"){
            //serviceUrl = "http://calculator-env.akiirbjcaa.us-east-2.elasticbeanstalk.com/v1/calculator/division";
            serviceUrl = process.env.CALCULATOR_REST_DOMAIN + "/v1/calculator/division";
        }
        if(serviceUrl != ""){
            $http({
                url: serviceUrl,
                method: "POST",
                data: {
                    "operand_1": controllerScope.input1,
                    "operand_2": controllerScope.input2
                },
                headers: {"Authorization": "Basic c2hhbmthcnNhbjpjYXJjYXNz", "Content-Type": "application/json"}
            }).then(function(response){
                if(response != undefined){
                    console.log(response.data);
                    controllerScope.result = response.data.result;
                }
            }, function(response){
                console.log("Service is temporarily unavailable.");
                controllerScope.result = "0";
                controllerScope.errorMessage = "Service is temporarily unavailable.";
            });
        }else{
            controllerScope.result = "0";
            controllerScope.errorMessage = "Invalid operand found!";
        }
    };
}]);