import React from 'react';

interface MobilePreviewProps {
  userLinkName: string;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ userLinkName }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gray-200 border-5 border-gray-700 rounded-2xl overflow-hidden 
        w-[200px] h-[250px] lg:w-[200px] lg:h-[250px] 
        lg:shadow-lg shadow-none ">
        <iframe
          scrolling="no"
          className="w-full h-full"
          src={`https://prettybio.netlify.app/${userLinkName}`}
        />
      </div>
    </div>
  );
};

export default MobilePreview;