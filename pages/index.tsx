import type { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const fetchData = async () => {
    const data = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    console.log(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};

export default Home;
