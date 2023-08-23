import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Loading from './Loading';
import AuthRepository from '@/repositories/AuthRepository';
import Swal from 'sweetalert2';
import { MyContext } from '@/context/MyProvider';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const [auth, setAuth] = useState(false)
    const context = useContext(MyContext)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      // cek kondisi
      const getxa = JSON.parse(localStorage.getItem("XA"))
      
      if(getxa){
        if(!auth){
          getStatus(getxa)
        }else{
          setMounted(true)
        }
      }else{
        setAuth("logout")
        setMounted(true)
      }

    }, [auth]);

    const getStatus = async (xa) => {
      const result = await AuthRepository.getStatus({XA:xa, param:"user"})

      if(result.type == "error"){
        localStorage.clear()
        Swal.fire({
          icon:"info",
          title:"Logout",
          text:"Your session has expired",
          timer:1200
        })
        setAuth("logout")
      }else if(result.type == "failed"){
        Swal.fire({
          icon:"warning",
          title:"Maintenance"
        })
        router.push("/")
        setAuth("failed")
      }else{
        setAuth(result)
      }
      setMounted(true)
    }


    if(mounted){
      return (
        <WrappedComponent profileData={auth} {...props} />
      );
    }else{
      return <Loading />
    }
  };
};

export default WithAuth;