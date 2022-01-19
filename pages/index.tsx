import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

interface ImageData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);

  const fetchData = async () => {
    const data = await axios.get<ImageData[]>(
      `https://api.nasa.gov/planetary/apod?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&count=${10}`
    );
    console.log(data.data);
    setImageData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <section className="flex flex-col h-screen">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </section>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-3 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={imageData[0].hdurl}
                />
              </div>
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-semibold title-font mt-4 text-gray-900 text-lg dark:text-gray-100">
                      {imageData[0].title}
                    </h2>
                    <div className="w-12 h-1 bg-orange-500 rounded mt-2 mb-4"></div>
                    <p className="text-base dark:text-gray-200">
                      {imageData[0].copyright}
                    </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4 dark:text-gray-200">
                    {imageData[0].explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
