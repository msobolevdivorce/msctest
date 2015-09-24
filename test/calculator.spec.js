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


describe('calcservice', function() {

  beforeEach(module('mscApp'));

  var calcservice;

  beforeEach(inject(function(_calculatorService_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    calcservice = _calculatorService_;
  }));

  it('gets age of Majority for ON', function() {
    expect(calcservice.ageOfMajority('ON')).toEqual(18);
  });

  it('tests if there is a child over age of majority', function() {
    expect(calcservice.thereIsChildOverAOM('ON',
      [
        {name: "Pebbles", age: "8 years", livesWith: "Wilma"},
        {name: "Pebbles", age: "28 years", livesWith: "Fred"},
    ])).toBe(true);
  });


});
