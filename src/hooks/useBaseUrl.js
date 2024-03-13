import { useEffect, useState } from "react";

const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const url ="http://10.2.126.67:5000"; // Default for development
    setBaseUrl(url);
  }, []);

  return baseUrl;
};

export default useBaseUrl;
