import React from 'react';
import Banner from '../Navbar/Page/Banner/Banner';
import Caregorise from '../Components/Categorise/Caregorise';
import Bisrto from '../Components/Bistro/Bisrto';
import Popularitem from '../Components/Popular/Popularitem';
import Callus from '../Components/Callus/Callus';
import Recomends from '../Components/Recomends/Recomends';
import Featuredsection from '../Components/Featured/Featuredsection';
import Testimonials from '../Components/TEstimonial/Testimonials';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. Full-Width Hero Carousel */}
      <Banner />

      {/* 2. Order By Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Caregorise />
      </div>

      {/* 3. Full-Width Bistro Boss Heritage & Story */}
      <Bisrto />

      {/* 4. Popular Artisanal Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Popularitem />
      </div>

      {/* 5. Full-Width Call Us & VIP Booking Banner */}
      <Callus />

      {/* 6. Chef Recommends */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Recomends />
      </div>

      {/* 7. Full-Width Seasonal Gastronomy Spotlight */}
      <Featuredsection />

      {/* 8. Valued Guest Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;