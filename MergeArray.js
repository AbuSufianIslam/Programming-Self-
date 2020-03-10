function mergeArrays(myArray, alicesArray) {
	// Combine the sorted arrays into one large sorted array
	let mergedArr = [];
	let i = 0;
	let j = 0;
	let k = 0;
	while (i < myArray.length && j < alicesArray.length) {
		if (myArray[i] <= alicesArray[j]) {
			mergedArr[k] = myArray[i];
			i++;
			k++;
		} else {
			mergedArr[k] = alicesArray[j];
			j++;
			k++;
		}
	}

	while (i < myArray.length) {
		mergedArr[k] = myArray[i];
		i++;
		k++;
	}

	while (j < alicesArray.length) {
		mergedArr[k] = alicesArray[j];
		j++;
		k++;
	}

	return mergedArr;
}

// Tests

let desc = 'both arrays are empty';
let actual = mergeArrays([], []);
let expected = [];
assertDeepEqual(actual, expected, desc);

desc = 'first array is empty';
actual = mergeArrays([], [ 1, 2, 3 ]);
expected = [ 1, 2, 3 ];
assertDeepEqual(actual, expected, desc);

desc = 'second array is empty';
actual = mergeArrays([ 5, 6, 7 ], []);
expected = [ 5, 6, 7 ];
assertDeepEqual(actual, expected, desc);

desc = 'both arrays have some numbers';
actual = mergeArrays([ 2, 4, 6 ], [ 1, 3, 7 ]);
expected = [ 1, 2, 3, 4, 6, 7 ];
assertDeepEqual(actual, expected, desc);

desc = 'arrays are different lengths';
actual = mergeArrays([ 2, 4, 6, 8 ], [ 1, 7 ]);
expected = [ 1, 2, 4, 6, 7, 8 ];
assertDeepEqual(actual, expected, desc);

function assertDeepEqual(a, b, desc) {
	const aStr = JSON.stringify(a);
	const bStr = JSON.stringify(b);
	if (aStr !== bStr) {
		console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
	} else {
		console.log(`${desc} ... PASS`);
	}
}
