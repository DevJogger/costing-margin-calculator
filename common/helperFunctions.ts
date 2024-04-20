const showAsMoney = (amount: number | string) => {
  if (isNaN(Number(amount))) {
    return amount
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount))
}

export { showAsMoney }
