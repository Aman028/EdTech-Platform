import React from "react";
import { HighlightTexts } from "../HomePage/HighlightText";
export function Quote() {
  return (
    <div>
      We are passionate about revolutionizing the way we learn, Our innovative
      platform
      <HighlightTexts text={"combines technology"} />
      <span className="text-brown-500"> expertise</span>, and commonly to create
      an
      <span className="text-brown-500">
        unparalleled educational experience
      </span>
    </div>
  );
}
