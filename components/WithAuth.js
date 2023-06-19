import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        // cek kondisi
        const getAuth = JSON.parse(localStorage.getItem("auth"))

        if(getAuth){
          if(getAuth.email == "admin@gnusa.id" && getAuth.password == "Gnusa123"){
            setAuth("authenticated")
          }else{
            setAuth("logout")
            router.push("/")
          }
        }else{
          setAuth("logout")
          router.push("/")
        }
    }, []);

    if(auth){
      return (
        <WrappedComponent {...props} />
      );
    }else{
      return <Loading />
    }
  };
};

export default WithAuth;