import React from 'react';

interface MobilePreviewProps {
  userLinkName: string;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ userLinkName }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gray-200 border-5 border-gray-700 rounded-2xl overflow-hidden 
        max-w-[250px] h-[50vh] lg:w-[250px] lg:h-[500px] 
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


  
  
  
  
  