export function formatLocalTime(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'short',
  }).format(date);
}
