import React from "react";
import { ContactUsForm } from "../../ContactPage/ContactUsForm";

export function ContactFormSection() {
  return <div className="mx-auto">
  <h1 className="font-bold text-[40px] flex justify-center">
    Get in Touch
  </h1>
  <p className="mb-10 flex justify-center text-pure-greys-700 font-bold text-[20px]">we'd love to here you,Please fill out this form</p>
  <div>
    <ContactUsForm/>
  </div>
  </div>;
}
