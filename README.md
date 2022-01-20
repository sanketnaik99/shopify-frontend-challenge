# StarGazer

This website was developed as a part of the Shopify Front End Developer Intern Challenge - Summer 2022.
A live demo of the website is available on [https://stargazer.sanketnaik.dev](https://stargazer.sanketnaik.dev).
This website was developed using the following technologies -

- **Next.js**
- **TypeScript**
- **TailwindCSS**

## Getting Started

To run the application, make sure you have installed Node.js. This website was
developed using `Node v16.9.1`.

### Steps for Running the website

1. Clone the repository.
2. Install the dependencies using the following command -
   ```bash
   yarn install
   # or
   npm install
   ```
3. Run the server using the following command -
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Once the server has started, the website should be available on `http://localhost:3000`.

## Features

The website has various features as follows -

### 1. Like / Unlike Images

You can click on the like button on the bottom right side of an image to like the image.
Your likes are stored in the local storage of your browser and you can view your liked
images anytime by visiting the likes page from the top navbar.
Moreover, your liked images can be accessed even if you leave the page and come back later.

### 2. Loading State

The website displays a loading screen while your Image of the Day and Liked Images are loaded from
Nasa's API. Have a slow internet connection? Sit back and enjoy watching the Astronaut float in space while your content loads.

### 3. Dark Mode

This website features a dark mode which can be toggled easily by clicking on the theme toggle button
in the top-right corner of the navbar. Your theme choice is stored in the browser so
the next time you open the page, the same theme is selected by default.
