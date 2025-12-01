import { cacheLife } from "next/cache";

function calculateVersion() {
  const birthday = new Date(1993, 10, 15);
  const now = new Date();

  let years = now.getFullYear() - birthday.getFullYear();
  let months = now.getMonth() - birthday.getMonth();
  let days = now.getDate() - birthday.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}.${months}.${days}`;
}

export async function AgeVersion() {
  "use cache";
  cacheLife("days");
  return <>{calculateVersion()}</>;
}
