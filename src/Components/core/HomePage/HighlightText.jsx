import React from "react";
import "../HomePage/styling.css"

export const HighlightText = ({ text }) => {
  return <span className="bg-gradient-to-l from-[#2ecc71] via-[#3498db] via-[#9b59b6] to-[#f39c12]
    text-transparent bg-clip-text font-bold text-6xl coding">
  {" "}
  { text}
  </span>;
};

export const HighlightTexts = ({text}) => {
    return (
      <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
      text-transparent bg-clip-text font-bold'>
          {" "}
          {text}
          {" "}
          
      </span>
    )
  }

  export const HighlightTextss = ({text}) => {
    return (
      <span className='bg-gradient-to-b from-[#4F0A25] via-[#EF476F] to-[#141414] 
      text-transparent bg-clip-text font-bold'>
          {" "}
          {text}
          {" "}
          
      </span>
    )
  }
