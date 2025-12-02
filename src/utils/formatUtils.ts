export function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('uk-UA');
}

export function formatPrice(amount: number, currency: string) {
  const usdToUah = 41.5; // в майбутньому можна отримувати з API
  if (currency === 'usd') {
    const uahAmount = Math.round(amount * usdToUah);
    const formatted = uahAmount.toLocaleString('uk-UA');
    return `${formatted} грн.`;
  }
  const formatted = amount.toLocaleString('uk-UA');
  return `${formatted} ${currency}`;
}