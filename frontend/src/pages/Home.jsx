// import React from "react";
// import Featured from '../components/core/Home/Featured';
// import Slider from "../components/core/Home/Slider";


// const Home = () => {
//   return (
//     <div className="w-full mx-auto items-center justify-center">
//       <Featured></Featured>
      
//       <div className="">
//         <div className="">
//           <h3 className="text-primaryColor text-2xl font-black flex justify-center text-center m-8 p-4">
//             Popular Items
//           </h3>
//           <div className="">
//             <Slider></Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, {useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "../data/product-data";
import Product from "../components/Product/Product";
import Featured from '../components/core/Home/Featured';

import { getAllProducts } from "../services/operations/productApi";


const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
      ;(async () => {
          try {
              const res = await getAllProducts();
              setProducts(res);
          } catch (error) {
              console.log(error);
              console.log("Could not fetch category")
          }
      })()
  }, [])

  const product = products.map((product) => (
    <Product
      key={product._id}
      product={product}
    />
  ));

  return (
    <div>
      <Featured></Featured>
      
      <div className="">
        <div className="p-10 ">
          <h3 className="text-primaryColor text-2xl font-black flex justify-center text-center m-8 p-4">
            Popular Items
          </h3>
          <Carousel
            showDots={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
          >
            {product}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;