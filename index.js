// step 1 - check if map is there or not
// step 2 - create a empty temp array, iterate over the array provided
// step 3 - push the callback function inside the temp array

// arr.map(() => {});
Array.prototype.myMap = function (cb) {
  if (typeof cb !== "function") {
    return `Callback is not provided`;
  }
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};
let mapArray = [1, 2, 3, 4, 5, 6];
let newMapArray = mapArray.myMap((num) => num * 2);
console.log(newMapArray);

// arr.filter((num) => num > 2);
Array.prototype.myFilter = function (cb) {
  if (typeof cb !== "function") {
    return `Callback is not provided`;
  }
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};
let filterArray = [1, 2, 3, 4, 5, 6];
let newFilterArray = filterArray.myFilter((num) => num > 2);
console.log(newFilterArray);

// arr.reduce((acc, curr, i, arr) => acc+curr, 0);
Array.prototype.myReduce = function (cb, initialValue) {
  if (typeof cb !== "function") {
    return `Callback is not provided`;
  }
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1; // If no initial value, start from index 1
  for (let i = startIndex; i < this.length; i++) {
    accumulator = cb(accumulator, this[i], i, this);
  }
  return accumulator;
};
let reduceArray = [1, 2, 3, 4, 5, 6];
let newReduceArray = reduceArray.myReduce((acc, curr) => acc + curr, 0);
console.log(newReduceArray);

// printName.call(myName, "Hello");
function printName(greetings) {
  console.log(`${greetings} my name is ${this.firstname} ${this.lastname}`);
}
const myName = { firstname: "Bob", lastname: "Marley" };
Function.prototype.myCall = function (context, ...args) {
  const sym = Symbol("fn");
  context[sym] = this;
  const result = context[sym](...args);
  delete context[sym];
  return result;
};
printName.myCall(myName, "Hello");

// printCity.apply(myName, "Hello");
function printCity(greetings) {
  console.log(
    `${greetings[0]} my name is ${greetings[1]} and my city is ${this.cityname} and state is ${this.statename}`
  );
}
const myCity = { cityname: "Lucknow", statename: "Uttar Pradesh" };
Function.prototype.myApply = function (context, ...args) {
  const sym = Symbol("fn");
  context[sym] = this;
  const result = context[sym](...args);
  delete context[sym];
  return result;
};
printCity.myApply(myCity, ["Hello", "Anny"]);

// printProfileDetails.bind(, "Hello");
function printProfileDetails(greetings, pun) {
  console.log(
    `${greetings} my email is ${this.email} and username is ${this.username}${pun}`
  );
}
const myProfileDetails = { email: "vishnu@gmail.com", username: "vm_pandey" };
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
const profileDetails = printProfileDetails.myBind(myProfileDetails, "Hello");
profileDetails("!");

function once(fn) {
  let executed = false;
  return function (...args) {
    if (!executed) {
      executed = true;
      return fn.apply(this, args);
    }
  };
}
// Example usageconst sayHello = once((name1, name2) => console.log(`Hello! ${name1} and ${name2}`));
sayHello("Jack", "Oggy"); // Prints: "Hello!"sayHello("Bob"); // Does nothingsayHello("Oggy"); // Does nothing
