function reverseWords(message) {
	// First we reverse all the characters in the entire message
	reverseCharacters(message, 0, message.length - 1);
	// This gives us the right word order
	// but with each word backward

	// Now we'll make the words forward again
	// by reversing each word's characters

	// We hold the index of the *start* of the current word
	// as we look for the *end* of the current word
	let currentWordStartIndex = 0;
	for (let i = 0; i <= message.length; i++) {
		// Found the end of the current word!
		if (i === message.length || message[i] === ' ') {
			// If we haven't exhausted the string our
			// next word's start is one character ahead
			reverseCharacters(message, currentWordStartIndex, i - 1);
			currentWordStartIndex = i + 1;
		}
	}
}

function reverseCharacters(message, leftIndex, rightIndex) {
	// Walk towards the middle, from both sides
	while (leftIndex < rightIndex) {
		// Swap the left char and right char
		const temp = message[leftIndex];
		message[leftIndex] = message[rightIndex];
		message[rightIndex] = temp;
		leftIndex++;
		rightIndex--;
	}
}

//Example
// // input: the eagle has landed
// [ 't', 'h', 'e', ' ', 'e', 'a', 'g', 'l', 'e', ' ',
//   'h', 'a', 's', ' ', 'l', 'a', 'n', 'd', 'e', 'd' ];

// // character-reversed: dednal sah elgae eht
// [ 'd', 'e', 'd', 'n', 'a', 'l', ' ', 's', 'a', 'h', ' ',
//   'e', 'l', 'g', 'a', 'e', ' ', 'e', 'h', 't' ];

// // word-reversed (desired output): landed has eagle the
// [ 'l', 'a', 'n', 'd', 'e', 'd', ' ', 'h', 'a', 's', ' ',
//   'e', 'a', 'g', 'l', 'e', ' ', 't', 'h', 'e' ];

// Tests

let desc = 'one word';
let input = 'vault'.split('');
reverseWords(input);
let actual = input.join('');
let expected = 'vault';
assertEqual(actual, expected, desc);

desc = 'two words';
input = 'thief cake'.split('');
reverseWords(input);
actual = input.join('');
expected = 'cake thief';
assertEqual(actual, expected, desc);

desc = 'three words';
input = 'one another get'.split('');
reverseWords(input);
actual = input.join('');
expected = 'get another one';
assertEqual(actual, expected, desc);

desc = 'multiple words same length';
input = 'rat the ate cat the'.split('');
reverseWords(input);
actual = input.join('');
expected = 'the cat ate the rat';
assertEqual(actual, expected, desc);

desc = 'multiple words different lengths';
input = 'yummy is cake bundt chocolate'.split('');
reverseWords(input);
actual = input.join('');
expected = 'chocolate bundt cake is yummy';
assertEqual(actual, expected, desc);

desc = 'empty string';
input = ''.split('');
reverseWords(input);
actual = input.join('');
expected = '';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
