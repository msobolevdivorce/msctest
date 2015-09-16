    angular.module('calculator').controller('CalculatorController', function ($http, $state, calculateService) {

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

        self.input = {
            calculationType: '0',
            partyAName: "Self",
            partyADOB: null,
            partyAIncome: null,
            partyAProvinceId: null,
            partyBName: "Spouse",
            partyBDOB: null,
            partyBIncome: null,
            partyBProvinceId: null,
            dateOfMarriage: null,
            dateOfSeparation: null,
            children: []
        };

        self.results = {};

        self.sampledata = {
            calculationType: '0',
            partyAName: "Self",
            partyADOB: "July 1 1980",
            partyAIncome: 80000,
            partyAProvinceId: "ON",
            partyBName: "Spouse",
            partyBDOB: "Aug 3 1982",
            partyBIncome: 25000,
            partyBProvinceId: "ON",
            dateOfMarriage: "May 15 2002",
            dateOfSeparation: "Sep 22 2014",
            children: [new Child('Child 1', 'June 5 2010', '1')]
        }

        //self.input = self.sampledata;

        self.calculate = function () {
          

                // data manipulations
                // might want to push this to server/api

                calculateService.calculate(self.input).then(processResults);
                // calculateService.calculate(self.input);

                function processResults(data){
                    if (data.csTableAmount) {
                        data.csTableAmount = data.csTableAmount.replace(',', '');
                    }
                    data.ageOfMajority = ('AB MN ON QC SK PE').indexOf(data.partyAProvince) >= 0 ? 18 : 19;

                    data.kidsWithA = 0
                    data.kidsWithB = 0
                    data.kidsShared = 0
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


                    data.childOverAgeOfMajority = false;
                    data.children.forEach(function (v, i) {
                        var a = +v.age.replace(" years", "");
                        if (a > data.ageOfMajority) {
                            data.childOverAgeOfMajority = true;
                        }
                    });

                    data.calculationType = self.input.calculationType;

                    data.stepChildGuess = false;
                    if (data.calculationType == 0) {
                        var marriageLength = +data.lengthOfMarriage.replace(" years", "");
                        data.children.forEach(function (v, i) {
                            var a = +v.age.replace(" years", "");
                            if (a > marriageLength) {
                                data.stepChildGuess = true;
                            }
                        });
                    }

                    self.results = data;
                    console.log(resp.data);
                    $state.go('^.results');
                }   
        };
        
        self.addChild = function () {
            self.input.children.push(new Child('Child', null, '1'));
        };

        self.removeChild = function (i) {
            self.input.children.splice(i, 1);
        };

        self.loadSampleData = function(){
            self.input = self.sampledata;
        };

        // initialize
        // $state.go('calculator.input')
    });