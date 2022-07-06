import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  const isLoading = useSelector(({ loader }) => loader.isLoading);

  return (
    <>
      <div
        className={`w-screen h-screen bg-grey-50 fixed z-1301 opacity-25 ${
          isLoading ? "visible" : "invisible"
        }`}
      />
      <Triangle
        wrapperClass="fixed top-1/2 right-1/2 z-1301"
        height="100"
        width="100"
        color="grey"
        ariaLabel="loading"
        visible={isLoading}
      />
    </>
  );
};

export default Loader;
