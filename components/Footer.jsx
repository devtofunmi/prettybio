import React from "react";

const Footer = () => {
  return (
    <div>
      <div className=" md:text-4xl text-3xl w-4/5 leading-normal lg:leading-loose m-auto">
        PrettyBio
        <p>
          is a beloved platform among a diverse group of users, including
          artists, writers, musicians, podcasters, YouTubers, gamers,
          developers, hobbyists, and brands.
        </p>
      </div>

      <div className=" mt-20">
        <div className="flex items-center justify-center py-20 ">
          <div className="flex lg:w-2/5 w-11/12 h-20 rounded-full items-center">
            <div className="bg-[#1DA1F2] text-white w-1/4 h-full flex items-center justify-center rounded-tl-full rounded-bl-full">
              <p className="md:text-5xl text-3xl">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  role="img"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title></title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </p>
            </div>
            <div className="bg-white h-full w-9/12 rounded-tr-full rounded-br-full  px-5 flex items-start flex-col justify-center">
              <h1 className="font-semibold text-[18px] md:text-lg lg:text-2xl text-[#1c1c1c]">
                Follow us on Twitter
              </h1>
              {/* <p class="my-1 font-medium text-[#6e6e6e]">
                To stay informed about the latest updates and features from
                PrettyBio, be sure to follow us on Twitter
              </p> */}
              <a
                href="http://twitter.com/codebrea_er"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1c] font-medium md:text-lg text-[15px]"
              >
                Follow @PrettyBio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
