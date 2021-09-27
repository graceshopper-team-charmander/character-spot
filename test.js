let test = new Map();

test.set('name', 'some|values');
test.set('stuff', 'otherthings');


console.log(Array.from(test));

let test2 = {
  name: 'something',
  stuff: 'other'
}

console.log(Array.from(test2));
