import { useState, useEffect } from "react";
import axiosInstance from "../Interceptor/interceptor";

const useQuery = (url,formSubmit,setFormSubmit) => {
  const [data, setData] = useState(null);
  const [queryLoading, setLoading] = useState(true);
  const [queryError, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`${url}`); 
  
      if (!response.data) {
        setError(true);  
        return;
      }
      setData(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchData();
  }, [url,formSubmit]);

  const createProfile = (postUrl, newItem) => {
    return axiosInstance.post(postUrl, newItem);
  };

  const updateProfile = (putUrl, updatedItem) => {
    return axiosInstance.put(putUrl, updatedItem);
  };

  const deleteProfile = (deleteUrl) => {
    return axiosInstance.delete(deleteUrl);
  };

  return {
    data,
    queryLoading,
    queryError,
    setError,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};

export default useQuery;
