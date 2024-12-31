import React from "react";
import Cover from "../../ShearedSEction/Cover/Cover";
import coverImg from "../../assets/contact/banner.jpg";
import Sheared from "../../ShearedSEction/Sheared";

const Contact = () => {
  return (
    <div>
      <Cover img={coverImg} title={"Contact us"}></Cover>

      <Sheared Subtitle={"Visit us"} title={"OUR LOCATION"}></Sheared>

      <div className="bg-gray-100 min-h-screen py-10 my-20">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-yellow-500 text-2xl mb-2">📞</div>
            <h3 className="font-semibold text-lg">PHONE</h3>
            <p className="text-gray-600">+88 0123 45 67 890</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-yellow-500 text-2xl mb-2">📍</div>
            <h3 className="font-semibold text-lg">ADDRESS</h3>
            <p className="text-gray-600">+88 0123 54 67 789</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-yellow-500 text-2xl mb-2">⏰</div>
            <h3 className="font-semibold text-lg">WORKING HOURS</h3>
            <p className="text-gray-600">Mon-Fri (08:00 - 23:00)</p>
            <p className="text-gray-600">Sat-Sun (10:00 - 22:30)</p>
          </div>
        </div>


        <Sheared Subtitle={"Send us a Message"} title={"our Contact from"}></Sheared>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Contact Form
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-gray-600 mb-1">Name*</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600 mb-1">Email*</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600 mb-1">Phone*</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 mb-1">Message*</label>
              <textarea
                rows="5"
                placeholder="Write your message here"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </div>
            <div className="col-span-2 flex items-center gap-4">
              <input type="checkbox" id="not-a-robot" />
              <label htmlFor="not-a-robot" className="text-gray-600">
                I'm not a robot
              </label>
            </div>
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
