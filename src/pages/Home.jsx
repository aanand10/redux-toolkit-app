import React, { useEffect } from "react";
import Products from "../components/Products";
import Amazon from "../components/amazon";
// import axios from "axios";

// const apiKey = "AKIAI3L5F5IIMRWCIXJQ"; // Replace with your actual API key
// const associateTag = "anandstore10-21"; // Replace with your actual Associate Tag

// const searchAmazonProducts = async (query) => {
//   try {
//     const response = await axios.get(
//       "https://webservices.amazon.com/paapi5/searchItems",
//       {
//         params: {
//           Keywords: query,
//           PartnerTag: associateTag,
//           PartnerType: "Associates",
//         },
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": apiKey,
//         },
//       }
//     );

//     // Process the API response here
//     console.log(response.data);
//   } catch (error) {
//     // Handle API request errors here
//     console.error(error);
//   }
// };

const Home = () => {
  // useEffect(() => {
  //   // Call the function with a search query when the component mounts
  //   searchAmazonProducts("Electronics");
  // }, []);

  return (
    <>
      <h1>Welcome to the Redux toolkit store</h1>
      <Products />
      <Amazon />
    </>
  );
};

export default Home;
