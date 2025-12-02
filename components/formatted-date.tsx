function formatDate(date: string | number | Date) {
  let dateToFormat: number | Date = date as Date;

  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    dateToFormat = Date.UTC(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10) - 1,
      Number.parseInt(day, 10)
    );
  } else if (typeof date === "number") {
    dateToFormat = date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(dateToFormat);
}

export function FormattedDate({
  date,
}: {
  date: string | number | Date | undefined;
}) {
  if (!date) return null;
  return <>{formatDate(date)}</>;
}
