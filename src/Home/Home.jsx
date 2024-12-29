import React from 'react';
import Banner from '../Navbar/Page/Banner/Banner';
import Caregorise from '../Components/Categorise/Caregorise';
import Bisrto from '../Components/Bistro/Bisrto';
import Popularitem from '../Components/Popular/Popularitem';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Caregorise></Caregorise>
            <Bisrto></Bisrto>
            <Popularitem></Popularitem>
            
        </div>
    );
};

export default Home;