let i = 1;
setInterval(() => {
  console.log(i++);
  if (i === 5) process.exit();
}, 1000);
