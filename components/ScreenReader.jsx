
import { MyContext } from '@/context/MyProvider';
import { useState, useEffect, useContext } from 'react';

const ScreenReader = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const context = useContext(MyContext)
  const { addContext } = context

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    let resultDevice
    const size = window.innerWidth
    if(size < 765){
      resultDevice = {device:"mobile", size:size}
      context.setData({...context, view: 1})
    }else{
      resultDevice = {device:"desktop", size:size}
    }
    addContext("deviceInfo", resultDevice)
  };

  useEffect(() => {
    // Mengatur ukuran awal saat komponen pertama kali dirender
    handleResize();

    // Menambahkan event listener untuk merespons perubahan ukuran layar
    window.addEventListener('resize', handleResize);

    // Membersihkan event listener pada saat komponen di-unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Dependensi kosong agar useEffect hanya berjalan sekali saat komponen pertama kali dirender

  return (
    <div>
    </div>
  );
};

export default ScreenReader;
