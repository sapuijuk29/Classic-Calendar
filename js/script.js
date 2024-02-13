const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// mendapatkan tanggal baru, tahun dan bulan saat ini
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// menyimpan nama lengkap semua bulan dalam array
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // mendapatkan hari pertama setiap bulan
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // mendapatkan tanggal terakhir bulan ini
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // mendapatkan hari terakhir bulan itu
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // mendapatkan tanggal terakhir bulan sebelumnya
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // buat bulan sebelumnya hari-hari terakhir
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // buat semua hari di bulan ini
    // menambahkan kelas aktif ke li jika hari, bulan, dan tahun saat ini cocok
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // membuat li hari pertama bulan depan
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // melewatkan hari senin dan tahun ini sebagai teks tanggal saat ini
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // mendapatkan ikon sebelumnya dan berikutnya
  icon.addEventListener("click", () => {
    // menambahkan acara klik pada kedua ikon
    // jika ikon yang diklik adalah ikon sebelumnya, kurangi bulan ini sebanyak 1, jika tidak, tambahkan 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // jika bulan ini kurang dari 0 atau lebih besar dari 11
      // membuat tanggal baru tahun & bulan ini dan meneruskannya sebagai nilai tanggal
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // memperbarui tahun ini dengan tanggal tahun baru
      currMonth = date.getMonth(); // memperbarui bulan ini dengan bulan tanggal baru
    } else {
      date = new Date(); // meneruskan tanggal saat ini sebagai nilai tanggal
    }
    renderCalendar(); // memanggil fungsi renderCalendar
  });
});