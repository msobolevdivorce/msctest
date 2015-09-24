
var calculatorService = function($http){
	var calculate = function(model){
		return $http.post('https://api2.divorcemate.com/msc/api/calculator/calculate', model)
		.then(function (response) {
			return response.data;
		})
		.catch(function (message) {
			console.error('Service Erron on calculation', message);
		});
	};

	function sampleInput(){
		return {
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
			children: [{
				name: 'Child 1',
				dob: 'June 5 2010', 
				residence: '1'
			}]
		};
	};

	function defaultInput(){
		return {
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
	};

	function ageOfMajority(province) {
        return ('AB MN ON QC SK PE').indexOf(province) === -1 ? 19 : 18;
    }

    function thereIsChildOverAOM(province, children){

    	var ageOfMajority = ('AB MN ON QC SK PE').indexOf(province) === -1 ? 19 : 18;
    	var thereIsOneChildOverAOM = false;

    	children.forEach(function (v, i) {
                var a = +v.age.replace(" years", "");
                if (a > ageOfMajority) {
                    thereIsOneChildOverAOM = true;
                }
            });
    	return thereIsOneChildOverAOM;

	};

	function stepChildGuess(children, lengthOfMarriage, calculationType){
		var guess = false;
        if (calculationType === 0) {
            children.forEach(function (v, i) {
                var a = +v.age.replace(" years", "");
                if (a > lengthOfMarriage) {
                    guess = true;
                }
            });
        };

        return guess;
	}

	return {
		calculate: calculate,
		sampleinput: sampleInput,
		defaultinput: defaultInput,
		ageOfMajority: ageOfMajority,
		thereIsChildOverAOM: thereIsChildOverAOM,
		stepChildGuess: stepChildGuess
	};

};	

var module = angular.module("msc.calculator");
module.factory('calculatorService', calculatorService);

