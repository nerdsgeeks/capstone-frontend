import { useEffect, useState } from "react";

const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState(
    "https://cleanops.wmdd4950.com/cleanopsapi",
  );
  // const [baseUrl, setBaseUrl] = useState("http://10.0.2.2:5000");
  //const [baseUrl, setBaseUrl] = useState("http://192.168.1.69:5000");
  // const [baseUrl, setBaseUrl] = useState("http://10.128.199.59:5000");
  // const [baseUrl, setBaseUrl] = useState("http://10.128.227.14:5000");
  // useEffect(() => {
  //   const url = "http://10.2.126.67:5000"; // Default for development
  //   setBaseUrl(url);
  // }, []);

  return baseUrl;
};

export default useBaseUrl;
