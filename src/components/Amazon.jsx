// import React, { useState } from "react";
// // import "./App.css";

// const AWS = require("aws-sdk");
// const amazonPaapi = require("amazon-pa-api50");

// const commonParameters = {
//   AccessKey: "AKIAI3L5F5IIMRWCIXJQ",
//   SecretKey: "i34IhJYMoCk3cHmVdMOReSoF0lyNB",
//   PartnerTag: "anandstore10-21",
// };

// const api = amazonPaapi.PAAPIClient(commonParameters);

// function Amazon() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [products, setProducts] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const params = {
//         Keywords: searchQuery,
//         SearchIndex: "All",
//         ItemCount: 10,
//       };

//       // Create a signed request using the amazon-pa-api50 library
//       const request = await api.searchItems(params);

//       // Make the request using fetch
//       const response = await fetch(request.url, {
//         method: request.method,
//         headers: request.headers,
//         body: request.body,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.ItemsResult && data.ItemsResult.Items) {
//           setProducts(data.ItemsResult.Items);
//         }
//       } else {
//         console.error("Error searching for products:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error searching for products:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Amazon Affiliate Product Search</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.ASIN}>
//             <h2>{product.ItemInfo.Title.DisplayValue}</h2>
//             <p>
//               {product.ItemInfo.ByLineInfo
//                 ? product.ItemInfo.ByLineInfo.Contributors[0].Name
//                 : "Unknown Author"}
//             </p>
//             <img
//               src={product.Images.Primary.Large.URL}
//               alt={product.ItemInfo.Title.DisplayValue}
//             />
//             <p>Price: {product.OfferSummary.LowestPrice.FormattedPrice}</p>
//             <a
//               href={product.DetailPageURL}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               View on Amazon
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Amazon;

import React, { useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

function Amazon() {
  useEffect(() => {
    // Define your Amazon API credentials
    const accessKey = "AKIAI3L5F5IIMRWCIXJQ";
    const secretKey = "i34IhJYMoCk3cHmVdMOReSoF0lyNB";
    const associateTag = "anandstore10-21";
    const endpoint = "webservices.amazon.com"; // Amazon PA API endpoint

    // Define the request parameters
    const params = {
      Service: "AWSECommerceService",
      Operation: "ItemSearch",
      ResponseGroup: "Images,ItemAttributes,Offers",
      SearchIndex: "Electronics",
      Sort: "salesrank",
      AssociateTag: associateTag,
      Keywords: "best sellers",
    };

    // Create a timestamp for the request
    const timestamp = new Date().toISOString();

    // Generate a signature for the request
    const signature = CryptoJS.HmacSHA256(
      `${timestamp}\n${endpoint}\n/ onca/xml\n${Object.keys(params)
        .sort()
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&")}`,
      secretKey
    ).toString(CryptoJS.enc.Base64);

    // Include the signature in the request headers
    const headers = {
      "Content-Type": "text/xml",
      "x-amz-date": timestamp,
      "x-amz-credential": `${accessKey}/${new Date()
        .toISOString()
        .slice(0, 10)}/us-east-1/ecs/aws4_request`,
      "x-amz-signature": signature,
    };

    // Make the API request
    axios
      .get(`https://${endpoint}/onca/xml`, {
        params: params,
        headers: headers,
      })
      .then((response) => {
        // Handle the API response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* Add your component content here */}
      <h1>working</h1>
    </div>
  );
}

export default Amazon;
