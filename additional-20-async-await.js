async function canRejectOrReturn() {
  // wait one second
  await new Promise(res => setTimeout(res, 1000));
  // Reject with ~50% probability
  if (Math.random() > 0.5) {
    throw new Error('Sorry, number too big.');
  }
  return 'perfect number';
}

async function foo() {
  try {
    return await canRejectOrReturn();
  } catch (e) {
    return e.toString();
  }
}

// не хватало вызова функции для того, чтобы вывести результаты
foo().then(result => console.log(result));
