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
        $http({
            url: "https://calculator-rest-service.herokuapp.com/v1/calculator/basic",
            method: "POST",
            data: {
                "operand_1": controllerScope.input1,
                "operand_2": controllerScope.input2,
                "operator" : controllerScope.operation
            },
            headers: {"Authorization": "Basic c2hhbmthcnNhbjpjYXJjYXNz", "Content-Type": "application/json"}
        }).then(function(response){
            if(response != undefined){
                if(response.data.message == null){
                    console.log(response.data);
                    controllerScope.result = response.data.result;
                }else{
                    controllerScope.result = "0";
                    controllerScope.errorMessage = response.data.message;
                }
            }
        }, function(response){
            console.log("Service is temporarily unavailable.");
            controllerScope.result = "0";
            controllerScope.errorMessage = "Service is temporarily unavailable.";
        });
    };
}]);