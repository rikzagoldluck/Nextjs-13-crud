import moment from "moment-timezone";

export function convertDateTime(dateTime: number) {
  const date = new Date(dateTime * 1000);

  // Mengonfigurasi opsi zona waktu Jakarta

  // Mengonversi tanggal menjadi format yang diinginkan
  const formattedDate = date.toLocaleString("en-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate;
}
export function convertDateTimeMillis(dateTime: string) {
  const date = moment.tz(parseInt(dateTime), "Asia/Jakarta");
  const formattedDate = date.format("DD/MM/YYYY HH:mm:ss");
  return formattedDate;
}

export const unixToInput = (unix: string) => {
  // Membuat objek Date dari UNIX timestamp (dalam milidetik)
  const date = new Date(parseInt(unix));
  // Ubah ke timezone Jakarta
  date.setHours(date.getHours() + 7);
  // Mendapatkan tanggal dan waktu dalam format "YYYY-MM-DDTHH:mm"
  return date.toISOString().slice(0, 16);
};

export const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);
  return date.getTime();
};

// TIMEDIFFEERENCE BETWEEN TWICE UNIX TIME SHOW IN hh:mm:ss
export const timeDifference = (start: number, end: number) => {
  let difference = end - start;
  let hours = Math.floor(difference / 3600);
  let minutes = Math.floor((difference % 3600) / 60);
  let seconds = Math.floor((difference % 3600) % 60);

  return `${hours}:${minutes}:${seconds}`;
};
