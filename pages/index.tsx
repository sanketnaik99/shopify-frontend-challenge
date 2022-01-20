import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import Astronaut from "../public/assets/astronaut.json";
import LikeButton from "../components/UI/LikeButton";
import Head from "next/head";

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
  const [imageOfTheDay, setImageOfTheDay] = useState<ImageData>({
    copyright: "",
    date: "",
    explanation: "",
    hdurl: "",
    media_type: "",
    service_version: "",
    title: "",
    url: "",
  });
  const [likedImages, setLikedImages] = useState<string[]>([]);

  const updateLocalStorage = (newLikedImages: string[]) => {
    localStorage.setItem("likedImages", newLikedImages.join(","));
  };

  const getLocalStorage = async () => {
    const rawDates = await localStorage.getItem("likedImages");
    const likedImages = rawDates?.split(",") ?? [];
    console.log(likedImages);
    setLikedImages(likedImages);
  };

  const likeImage = async (imageDate: string) => {
    if (likedImages.indexOf(imageDate) == -1) {
      setLikedImages([...likedImages, imageDate]);
      updateLocalStorage([...likedImages, imageDate]);
    } else {
      let likedImagesCpy = likedImages.filter((date) => date !== imageDate);
      setLikedImages(likedImagesCpy);
      updateLocalStorage(likedImagesCpy);
    }
  };

  const fetchData = async () => {
    const otherImages = await axios.get<ImageData[]>(
      `https://api.nasa.gov/planetary/apod?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&count=${10}`
    );
    const iotd = await axios.get<ImageData>(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    console.log(otherImages.data);
    setImageData(otherImages.data);
    setImageOfTheDay(iotd.data);
    setLoading(false);
  };

  useEffect(() => {
    getLocalStorage();
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>StarGazer</title>
      </Head>
      <div>
        {isLoading ? (
          // Loader that is displayed while the image is loading.
          <section className="flex flex-col h-screen justify-center items-center">
            <Lottie
              animationData={Astronaut}
              loop={true}
              width={100}
              height={100}
              className="w-96 h-96"
            />
            <h2 className="text-gray-900 dark:text-gray-100 font-bold text-3xl">
              Loading...
            </h2>
            <h4 className="text-gray-600 dark:text-gray-300 font-medium text-xl">
              Please wait while your image of the day loads.
            </h4>
          </section>
        ) : (
          <>
            <section className="text-gray-600 body-font">
              <div className="flex flex-row justify-center">
                <h1 className="text-4xl font-black pb-5 text-gray-900 dark:text-gray-100">
                  Image of the Day
                </h1>
              </div>
              <div className="container px-5 py-3 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        alt="content"
                        className="object-cover object-center h-full w-full"
                        src={imageOfTheDay.hdurl}
                      />
                      <LikeButton
                        imageDate={imageOfTheDay.date}
                        likedImages={likedImages}
                        likeImage={(imageDate: string) => likeImage(imageDate)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-10">
                    <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                      <div className="flex flex-col items-center text-center justify-center">
                        <h2 className="font-semibold title-font mt-4 text-gray-900 text-lg dark:text-gray-100">
                          {imageOfTheDay.title}
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
            <section>
              <div className="flex flex-row justify-center mt-20">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Other Images
                </h2>
              </div>
              <div className="mt-8 mb-8 px-4 md:px-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                {imageData.map((image) => (
                  <div
                    key={image.date}
                    className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-600"
                  >
                    <div className="relative">
                      <img
                        src={image.hdurl}
                        alt={image.title}
                        className="mx-auto"
                      />
                      <LikeButton
                        imageDate={image.date}
                        likedImages={likedImages}
                        likeImage={(imageDate: string) => likeImage(imageDate)}
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="text-center font-semibold title-font mt-4 text-gray-900 text-xl dark:text-gray-100">
                          {image.title}
                        </h3>
                        <div className="mx-auto w-24 h-1 bg-orange-500 rounded mt-2 mb-4"></div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-600">
                        {image.copyright}
                      </h4>
                      <p className="text-base font-semibold text-gray-300 mb-4">
                        {image.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
