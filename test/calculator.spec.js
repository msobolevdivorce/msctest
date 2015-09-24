// describe("Controllers", function () {
// 	beforeEach(module('mscApp'));
// 	describe("CalculatorController", function () {
// 		var ctrl, $scope;
// 		beforeEach(inject(function ($rootScope, $controller)
// 		{
// 			$scope = $rootScope.$new();
// 			ctrl = $controller('CalculatorController', {
// 				$scope: $scope
// 			});
// 		}));
// 	});
// });


describe('calcservice', function(){

    beforeEach(module('mscApp'));
    
    var calcservice;
	
    beforeEach(inject(function(_calculatorService_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        calcservice = _calculatorService_;
    }));
	
	it('gets age of Majority for ON', function(){
		expect(calcservice.ageOfMajority('ON')).toEqual(18);
	});
	
});
	