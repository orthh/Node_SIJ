let a = {
  b: 1,
  c: 2,
};

let { b } = a;
b = 2;
console.log(a.b);
