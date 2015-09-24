    angular.module('msc.calculator').controller('CalculatorController', function ($http, $state, calculatorService) {

        var self = this;

        function Child(name, dob, residence) {
            var self = this;
            self.dob = dob;
            self.name = name;
            self.residence = residence;
            return self;
        }

        self.calculationTypes = {
            '0': 'Child and Spousal Support',
            '1': 'Child Support Only',
            '2': 'Spousal Support Only'
        };


        self.provinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "SK", "YT"];

        self.cleanInput = function()
        {
            self.input = calculatorService.defaultinput();
       };

        self.input = {};
        self.cleanInput();

        self.results = {};

        

        self.calculate = function () {
        
                calculatorService.calculate(self.input).then(processResults);
        
                function processResults(data){
                    if (data.csTableAmount) {
                        data.csTableAmount = data.csTableAmount.replace(',', '');
                    }
                    
                    data.kidsWithA = 0;
                    data.kidsWithB = 0;
                    data.kidsShared = 0;
                    self.input.children.forEach(function (v, i) {
                        switch (+v.residence) {
                        case 0:
                            data.kidsWithA += 1;
                            break;
                        case 1:
                            data.kidsWithB += 1;
                            break;
                        case 2:
                            data.kidsShared += 1;
                            break;
                        }
                    });

                    data.childOverAgeOfMajority = calculatorService.thereIsChildOverAOM(data.partyAProvince, data.children);

                    data.calculationType = self.input.calculationType;

                    data.stepChildGuess = calculatorService.stepChildGuess(data.children, +data.lengthOfMarriage.replace(" years", ""), +data.calculationType);

                    self.results = data;
                    console.log(data);
                    $state.go('^.result');
                }   
        };
        
        self.addChild = function() {
            self.input.children.push({
                name: 'Child ' + (self.input.children.length+1),
                residence: '1'
            });
        };

        self.removeChild = function (i) {
            self.input.children.splice(i, 1);
        };

        self.loadSampleData = function(){
            self.input = calculatorService.sampleinput();
        };

        self.clearData = function(){
            self.cleanInput();
        };

        // initialize
        // $state.go('calculator.input')
    });