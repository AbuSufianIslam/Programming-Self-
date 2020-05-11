// You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

// Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

// For example, given:

//   [1, 7, 3, 4]

// your function would return:

//   [84, 12, 28, 21]

// by calculating:

//   [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]

// Here's the catch: You can't use division in your solution!

// Gotchas
// Does your function work if the input array contains zeroes? Remember—no division.

// We can do this in O(n)O(n) time and O(n)O(n) space!

// We only need to allocate one new array of size nn.

// Breakdown
// A brute force approach would use two loops to multiply the integer at every index by the integer at every nestedIndex, unless index === nestedIndex.

// This would give us a runtime of O(n^2)O(n
// 2
//  ). Can we do better?

// Well, we’re wasting a lot of time doing the same calculations. As an example, let's take:

//   // input array
// [1, 2, 6, 5, 9]

// // array of the products of all integers
// // except the integer at each index:
// [540, 270, 90, 108, 60]  // [2 * 6 * 5 * 9,  1 * 6 * 5 * 9,  1 * 2 * 5 * 9,  1 * 2 * 6 * 9,  1 * 2 * 6 * 5]

// We're doing some of the same multiplications two or three times!

// When we calculate [(2*6*5*9), 1*(6*5*9), 1*2*(5*9), 1*2*6*(9), 1*2*6*5], we're calculating 5*9 three times: at indices 0, 1, and 2.
// Or look at this pattern:

// When we calculate [2*6*5*9, (1)*6*5*9, (1*2)*5*9, (1*2*6)*9, (1*2*6*5)], we have 1 in index 1, and we calculate 1*2 at index 2, 1*2*6 at index 3, and 1*2*6*5 at index 4.

function getProductsOfAllIntsExceptAtIndex(intArray) {
	// Make a list of the products

	if (intArray.length < 2) {
		throw new Error('Getting the product of numbers at other indices requires at least 2 numbers');
	}

	const productsOfAllIntsExceptAtIndex = [];

	// For each integer, we find the product of all the integers
	// before it, storing the total product so far each time
	let productSoFar = 1;
	for (let i = 0; i < intArray.length; i++) {
		productsOfAllIntsExceptAtIndex[i] = productSoFar;
		productSoFar *= intArray[i];
	}

	// For each integer, we find the product of all the integers
	// after it. since each index in products already has the
	// product of all the integers before it, now we're storing
	// the total product of all other integers
	productSoFar = 1;
	for (let j = intArray.length - 1; j >= 0; j--) {
		productsOfAllIntsExceptAtIndex[j] *= productSoFar;
		productSoFar *= intArray[j];
	}

	return productsOfAllIntsExceptAtIndex;
}

// Tests

let desc = 'short array';
let actual = getProductsOfAllIntsExceptAtIndex([ 1, 2, 3 ]);
let expected = [ 6, 3, 2 ];
assertArrayEquals(actual, expected, desc);

(desc = 'longer array'), (actual = getProductsOfAllIntsExceptAtIndex([ 8, 2, 4, 3, 1, 5 ]));
expected = [ 120, 480, 240, 320, 960, 192 ];
assertArrayEquals(actual, expected, desc);

(desc = 'array has one zero'), (actual = getProductsOfAllIntsExceptAtIndex([ 6, 2, 0, 3 ]));
expected = [ 0, 0, 36, 0 ];
assertArrayEquals(actual, expected, desc);

desc = 'array has two zeros';
actual = getProductsOfAllIntsExceptAtIndex([ 4, 0, 9, 1, 0 ]);
expected = [ 0, 0, 0, 0, 0 ];
assertArrayEquals(actual, expected, desc);

desc = 'one negative number';
actual = getProductsOfAllIntsExceptAtIndex([ -3, 8, 4 ]);
expected = [ 32, -12, -24 ];
assertArrayEquals(actual, expected, desc);

desc = 'all negative numbers';
actual = getProductsOfAllIntsExceptAtIndex([ -7, -1, -4, -2 ]);
expected = [ -8, -56, -14, -28 ];
assertArrayEquals(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => getProductsOfAllIntsExceptAtIndex([]);
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => getProductsOfAllIntsExceptAtIndex([ 1 ]);
assertThrowsError(oneNumber, desc);

function assertArrayEquals(a, b, desc) {
	const arrayA = JSON.stringify(a);
	const arrayB = JSON.stringify(b);
	if (arrayA !== arrayB) {
		console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`);
	} else {
		console.log(`${desc} ... PASS`);
	}
}

function assertThrowsError(func, desc) {
	try {
		func();
		console.log(`${desc} ... FAIL`);
	} catch (e) {
		console.log(`${desc} ... PASS`);
	}
}
