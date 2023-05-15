import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        // cek kondisi
        setAuth(true)
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