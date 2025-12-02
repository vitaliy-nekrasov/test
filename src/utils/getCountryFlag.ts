export function getCountryFlag(countryId: string): string {
  switch (countryId) {
    case '115':
      return 'https://flagcdn.com/w40/tr.png';
    case '43':
      return 'https://flagcdn.com/w40/eg.png';
    case '34':
      return 'https://flagcdn.com/w40/gr.png';
    default:
      return '';
  }
}