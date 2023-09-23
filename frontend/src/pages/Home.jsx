import React from "react";
import Product from "../components/Product";
import {BiSearch} from "react-icons/bi"
import { productData, responsive } from "../data/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-primaryColor to-yellow-75 w-screen h-screen relative p-12">
        <div className="">
          <div className="container">
            <div className="flex justify-between">
              <div className="relative">
                <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">
                  Your favorite dishes, right at your door
                </h1>
                <form action="" className="w-full mt-12">
                  <div className="relative flex p-4 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                    <input
                      placeholder="Your favorite food"
                      className="w-full p-4 rounded-full"
                      type="text"
                    />
                    <button
                      type="button"
                      title="Start buying"
                      className="flex items-center justify-between ml-auto py-3 px-6 rounded-full border-black text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-yellow-5 active:from-yellow-400 focus:from-yellow-75 md:px-12"
                    >
                      <span className="hidden text-yellow900 font-semibold md:block">
                        Search
                      </span>
                      <BiSearch className=""/>
                    </button>
                  </div>
                </form>
                <p className="mt-8 text-gray-700 lg:w-10/12">
                  Sit amet consectetur adipisicing elit.{" "}
                  <a href="#" className="text-yellow-700">
                    connection
                  </a>{" "}
                  tenetur nihil quaerat suscipit, sunt dignissimos.
                </p>
              </div>
              <div className="">
                <img
                  src="https://tailus.io/sources/blocks/food-delivery/preview/images/food.webp"
                  className="relative"
                  alt="food illustration"
                  loading="lazy"
                  width="450"
                  height="450"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative p-28">
        <Carousel
          showDots={true}
          responsive={responsive}
          arrows={true}
          renderArrowsWhenDisabled={false}
        >
          {productData.map((product) => (
            <Product
              name={product.name}
              url={product.imageurl}
              price={product.price}
              description={product.description}
            />
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default Home;
