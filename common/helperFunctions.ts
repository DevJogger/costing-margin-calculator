const showAsMoney = (amount: number | string) => {
  const numberAmount = Number(amount)
  if (isNaN(numberAmount)) {
    return amount
  }
  const result = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(numberAmount)
  return result
}

export { showAsMoney }
