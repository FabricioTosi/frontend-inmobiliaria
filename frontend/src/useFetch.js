import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    err: null,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
   
      
      if (Array.isArray(responseData)) {
        setState({
          data: responseData,
          isLoading: false,
          err: null,
        });
      } else {
        setState({
          data: null, 
          isLoading: false,
          err: "Data is not an array",
         
        }); 
      }
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        err: err,
      });
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  const { data, isLoading, err } = state;


  return { data, isLoading, err };
  
};
