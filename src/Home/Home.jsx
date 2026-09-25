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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Banner />
      <Caregorise />
      <Bisrto />
      <Popularitem />
      <Callus />
      <Recomends />
      <Featuredsection />
      <Testimonials />
    </div>
  );
};

export default Home;