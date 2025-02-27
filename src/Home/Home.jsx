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
        <div className='w-11/12 mx-auto'>
            <Banner></Banner>
            <Caregorise></Caregorise>
            <Bisrto></Bisrto>
            <Popularitem></Popularitem>
            <Callus></Callus>
            <Recomends></Recomends>
            <Featuredsection></Featuredsection>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;