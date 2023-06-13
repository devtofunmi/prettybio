import React from "react";


const LinkLoadingSpinner = () => {
    
  return (
    <div className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="md:w-[100px] md:h-[100px] w-[50px] h-[50px]  animate-spin"
      >
        <circle cx="24" cy="4" r="4" fill="#d4d7d9" />
        <circle cx="12.19" cy="7.86" r="3.7" fill="#d4d7d9" />
        <circle cx="5.02" cy="17.68" r="3.4" fill="#d4d7d9" />
        <circle cx="5.02" cy="30.32" r="3.1" fill="#d4d7d9" />
        <circle cx="12.19" cy="40.14" r="2.8" fill="#d4d7d9" />
        <circle cx="24" cy="44" r="2.5" fill="#d4d7d9" />
        <circle cx="35.81" cy="40.14" r="2.2" fill="#d4d7d9" />
        <circle cx="42.98" cy="30.32" r="1.9" fill="#d4d7d9" />
        <circle cx="42.98" cy="17.68" r="1.6" fill="#d4d7d9" />
        <circle cx="35.81" cy="7.86" r="1.3" fill="#d4d7d9" />
      </svg>
    </div>
  );
};


export default LinkLoadingSpinner;