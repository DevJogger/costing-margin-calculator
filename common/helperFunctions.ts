const showAsMoney = (amount: number | string) => {
  const numberAmount = Number(amount)
  if (isNaN(numberAmount)) {
    return amount
  }
  const result = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(Math.abs(numberAmount))
  return numberAmount < 0 ? `(${result})` : result
}

export { showAsMoney }
