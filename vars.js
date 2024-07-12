//ниже писать переменные, названия скопировать в {} через запятую
let order = JSON.parse(localStorage.getItem("order")) || {};
let keys = Object.keys(order);
let lastKey = keys[keys.length - 1];

const cafeOne = "Bradford BD1 1PR";
const cafeTwo = "Bradford BD4 7SJ";
const cafeThree = "Bradford BD1 4RN";

export { order, lastKey, cafeOne, cafeTwo, cafeThree };
