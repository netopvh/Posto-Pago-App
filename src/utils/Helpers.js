export function calcPurchases(value) {
  let purchaseTotal = 0.0;
  value.map(purchase => {
    !purchase.pending && !purchase.cancelled
      ? (purchaseTotal += parseFloat(purchase.amount))
      : purchaseTotal;
  });
  return purchaseTotal;
}

export function checkPending(pendings) {
  return pendings.filter(recharge => recharge.pending == 1);
}
