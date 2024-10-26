import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-center text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
          Welcome to{" "}
          <span className="text-green-600 font-semibold">BookNest</span>, your
          go-to destination for buying and selling pre-loved books. Our platform
          connects book enthusiasts, making it easy to find new reads and pass
          along treasured books to others. Whether you're searching for a rare
          find or looking to declutter your shelf, BookNest is here to support
          your literary journey. Join our community and discover the joy of
          sharing books today!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
