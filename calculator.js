var calculatorApp = angular.module("calculatorApp", []);

calculatorApp.controller("calculatorController", function(){
    this.result = 0;
    this.chooseOperation = function(button){
        console.log("inside chooseOperation");
        this.operation = button;
        this.clearErrorMessage();
    }

    this.clearErrorMessage = function(){
        this.errorMessage = "";
    }

    this.reset = function(){
        this.input1 = "";
        this.input2 = "";
        this.operation = "";
        this.result = "0";
    }

    this.operate = function(){
        if(undefined == this.input1 || undefined == this.input2 || "" == this.input1 || "" == this.input2){
            this.errorMessage = "Please enter the inputs!";
            return false;
        }
        if(isNaN(this.input1) || isNaN(this.input2)){
            this.errorMessage = "Please enter only numbers!";
            return false;
        }
        if(this.operation == "+"){
            this.result = Number(this.input1) + Number(this.input2);
        }else if(this.operation == "-"){
            this.result = Number(this.input1) - Number(this.input2);
        }else if(this.operation == "*"){
            this.result = Number(this.input1) * Number(this.input2);
        }else if(this.operation == "/"){
            if(Number(this.input2) == 0){
                console.log("Error! Division by Zero!");
                this.errorMessage = "You cannot divide by zero!";
            }else{
                this.result = Number(this.input1) / Number(this.input2);
            }
        }else{
            this.errorMessage = "Please enter an operand!";
        }
    }
});