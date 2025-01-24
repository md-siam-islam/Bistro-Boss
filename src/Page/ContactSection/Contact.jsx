import React from "react";
import Cover from "../../ShearedSEction/Cover/Cover";
import coverImg from "../../assets/contact/banner.jpg";
import Sheared from "../../ShearedSEction/Sheared";

const Contact = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Cover img={coverImg} title={"Contact us"} />

      <Sheared Subtitle={"Visit us"} title={"OUR LOCATION"} />

      <div className="bg-gray-50 py-16 my-20">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 text-center transition">
            <div className="text-yellow-500 text-4xl mb-4">📞</div>
            <h3 className="font-bold text-lg mb-2">PHONE</h3>
            <p className="text-gray-600">+88 0123 45 67 890</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 text-center transition">
            <div className="text-yellow-500 text-4xl mb-4">📍</div>
            <h3 className="font-bold text-lg mb-2">ADDRESS</h3>
            <p className="text-gray-600">+88 0123 54 67 789</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 text-center transition">
            <div className="text-yellow-500 text-4xl mb-4">⏰</div>
            <h3 className="font-bold text-lg mb-2">WORKING HOURS</h3>
            <p className="text-gray-600">Mon-Fri (08:00 - 23:00)</p>
            <p className="text-gray-600">Sat-Sun (10:00 - 22:30)</p>
          </div>
        </div>

        <Sheared Subtitle={"Send us a Message"} title={"OUR CONTACT FORM"} />

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-10">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
            Contact Form
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone*
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Message*
              </label>
              <textarea
                rows="6"
                placeholder="Write your message here"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </div>
            <div className="col-span-2 flex items-center gap-4">
              <input type="checkbox" id="not-a-robot" className="h-5 w-5" />
              <label
                htmlFor="not-a-robot"
                className="text-gray-700 font-medium"
              >
                I'm not a robot
              </label>
            </div>
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-[#FFA500] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition"
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
