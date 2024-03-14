import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../data/product-data";
import ProductCard from "../components/core/Catalog/ProductCard";
import ProductSlider from "../components/core/Catalog/ProductSlider";
import Featured from "../components/core/Home/Featured";
import { CartPopUp } from "../components/common/CartPopUp";
import { useSelector } from "react-redux";

import { getAllProducts } from "../services/operations/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const totalItems = cart.length;

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
      } catch (error) {
        console.log(error);
        console.log("Could not fetch category");
      }
    })();
  }, []);

  const product = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  return (
    <div>
      <Featured></Featured>

      <div className="relative">
        <div className="p-10 relative mx-auto w-11/12 max-w-maxContent flex flex-col">
          <h3 className="text-primaryColor text-2xl font-black flex justify-center text-center m-8 p-4">
            Popular Items
          </h3>
          <div className="relative">
            <Carousel
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {product}
            </Carousel>
          </div>
        </div>
      </div>
      {totalItems > 0 && <CartPopUp />}
    </div>
  );
};

export default Home;
