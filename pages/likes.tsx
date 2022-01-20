import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import LikeButton from "../components/UI/LikeButton";
import Lottie from "lottie-react";
import Astronaut from "../public/assets/astronaut.json";
import axios from "axios";
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

const Likes: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);

  const updateLocalStorage = (newLikedImages: string[]) => {
    localStorage.setItem("likedImages", newLikedImages.join(","));
  };

  const getLocalStorage = async (): Promise<string[]> => {
    const rawDates = await localStorage.getItem("likedImages");
    const likedImages = rawDates?.split(",") ?? [];
    setLikedImages(likedImages);
    return likedImages;
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

  const fetchLikedImages = async () => {
    const likedImages = await getLocalStorage();
    const imagesData = [];
    for (const date of likedImages) {
      const data = await axios.get<ImageData>(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}&date=${date}`
      );
      imagesData.push(data.data);
    }
    setImageData(imagesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchLikedImages();
  }, []);

  return (
    <>
      <Head>
        <title>Likes</title>
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
              Please wait while your liked images are loaded.
            </h4>
          </section>
        ) : (
          <section>
            <div className="flex flex-col items-center justify-center mt-5">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Liked Images
              </h2>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-xl">
                Here are the images that you have liked.
              </p>
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
        )}
      </div>
    </>
  );
};

export default Likes;
