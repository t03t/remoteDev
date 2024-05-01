// ARRAYS 

// const numbers = [10, 100, 500, 1000]
// push
// numbers.push(400);
// console.log(numbers);

// forEach
// numbers.forEach(function(nr) {
//     console.log(nr + 10);
// });

// map
// const newNumbers = numbers.map(function(nr) {
//     return nr * 2;
// });
// console.log(newNumbers);

// some
// const result = numbers.some(function(number) {
//     return number > 200;
// })
// console.log(result);

//find
// const result = numbers.find(number => {
//     return number > 800;
// });
// console.log(result);

//filter
// const newArray = numbers.filter(number => {
//     return number > 100;
// });
// console.log(newArray);

// OBJECTS

// const user = {
//     name: 'John',
//     age: 45
// }
// user.name = 'Emily';
// console.log(user);

// CALLBACK function = throwway function
// function doSomething() {

// }

// throwaway function
// [5, 9, 3].some(function() {

// });

// Method : Function that you call on something no array function
// const arr = [5, 9, 13]
// const obj = {
//     name: 'John',
//     age: 4,
//     hobbies: ['play'],
//     calculateAge: function() {
//         return 30 + this.hobbies.length;
//     }
// }
// console.log(obj.calculateAge())

// Default Parameters
// const calculate = (sq = 100) => {
//     return 50 + sq;
// }
// const result = calculate();
// console.log(result);

// Destructuring 
// const user = {
//     name: 'Khadija',
//     age: 24
// }
// const {age, name} = user;
// console.log(age);
// console.log(name); // Why is name deprecated?

// SPREAD
const arr1 = [0, 1, 4];
const arr2 = [40, 30, 56];
console.log(...arr1, ...arr2);