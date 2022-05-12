export function definitionOfDate(date, day = false) {
  return new Date(date)
    .toLocaleString('ru', {
      day: day === true ? 'numeric' : undefined,
      month: 'long',
      year: 'numeric',
    })
    .slice(0, -3);
}

export function lastMonths(array, account, transactions, date) {
  let amountOfProfit = 0;
  let amountOfLoss = 0;
  let symbol;
  transactions
    .filter(
      (transaction) =>
        typeof transaction === 'object' &&
        definitionOfDate(transaction.date) === date
    )
    .forEach((transaction) => {
      transaction.from === account ? (symbol = '-') : (symbol = '+');
      if (symbol === '+') amountOfProfit += transaction.amount;
      else amountOfLoss += transaction.amount;
    });
  return array.push({
    month: date,
    amountOfProfit: amountOfProfit.toFixed(2),
    amountOfLoss: amountOfLoss.toFixed(2),
  });
}
