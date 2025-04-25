import React from 'react';

interface MobilePreviewProps {
  userLinkName: string;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ userLinkName }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative bg-[#f5f5f5] w-[300px] h-[500px] md:h-[500px] rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-300">
        <div className="w-fit h-screen overflow-auto scrollbar-hide">
          <iframe
            title="Mobile Preview"
            src={`https://prettybio.netlify.app/${userLinkName}`}
            className="w-[375px] h-[667px] origin-top-left scale-[0.8]"
            style={{ transformOrigin: 'top left', border: 'none' }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default MobilePreview;

