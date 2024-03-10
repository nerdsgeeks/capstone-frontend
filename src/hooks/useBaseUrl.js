import { useEffect, useState } from "react";
// Import environment variables
// import { REACT_APP_BACKEND } from "@env";

const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_BACKEND
        : "http://localhost:5000";
    setBaseUrl(url);
  }, []);

  return baseUrl;
};

export default useBaseUrl;
