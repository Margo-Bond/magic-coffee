//ниже писать переменные, названия скопировать в {} через запятую
let order = JSON.parse(localStorage.getItem("order")) || {};
let keys = Object.keys(order);
let lastKey = keys[keys.length - 1];
const cafeAddress = order[lastKey].cafe_address;
const coffeeType = order[lastKey].coffee_type;
const cafeOne = "Bradford BD1 1PR";
const cafeTwo = "Bradford BD4 7SJ";
const cafeThree = "Bradford BD1 4RN";

export { order, lastKey, cafeAddress, coffeeType, cafeOne, cafeTwo, cafeThree };
