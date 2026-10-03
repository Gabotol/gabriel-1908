const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

export function currencyFormatter(value: number): string {
  return formatter.format(value)
}
