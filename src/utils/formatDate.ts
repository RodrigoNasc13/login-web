export function formatLocalTime(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
