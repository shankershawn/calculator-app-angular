var calculatorApp = angular.module("calculatorApp", []);

calculatorApp.controller("calculatorController", function(){
    this.result = 0;
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
        }else{
            this.result = eval(this.input1 + this.operation + this.input2);
        }
    }
});