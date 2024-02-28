export function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
}


export function getTimeDate(timestamp){
  const Hours = new Date(timestamp).getHours().toString().padStart(2, '0')
  const Minute = new Date(timestamp).getMinutes().toString().padStart(2, '0')
  const date = `${Hours}:${Minute}`
  
  return date
}

export const getValue = value => {
  let epochTime = value; // Nilai epoch time yang ingin digunakan sebagai default value
  let date = new Date(epochTime); // Membuat objek Date berdasarkan epoch time
  let year = date.getFullYear(); // Mendapatkan tahun
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (diubah menjadi string dan ditambahkan leading zero jika perlu)
  let day = date.getDate().toString().padStart(2, '0'); // Mendapatkan hari (diubah menjadi string dan ditambahkan leading zero jika perlu)
  let formattedDate = `${day}/${month}/${year}`; // Menggabungkan tahun, bulan, dan hari dalam format yyyy-mm-dd
  // console.log(formattedDate);
  return formattedDate
}

export function getLocaleTimeDate(timestamp){
  const time = new Date(timestamp)
  const hari = time.toLocaleDateString("id-ID", {weekday:"long"})
  const tanggal = time.getDate()
  const bulan = time.toLocaleDateString("id-ID", {month:"long"})
  const tahun = time.getFullYear()

  return `${hari}, ${tanggal} ${bulan} ${tahun}`
}

export function getTimeAgo(timestamp) {
  const date = new Date(timestamp).getTime();
  const now = new Date().getTime();

  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return 'Baru saja';
  } else if (hours < 1) {
    return `${minutes} menit yang lalu`;
  } else if (hours < 24) {
    return getTimeDate(timestamp);
  } else if (days < 30) {
    return getValue(timestamp);
  } else if (months < 12) {
    return `${months} bulan yang lalu`;
  } else {
    return `${years} tahun yang lalu`;
  }
}

export function getIdMenu(list, id){
  let result = null
  list.forEach(parent => {
    result = parent.menus.find(res => res.id == id)
  });

  return result
}