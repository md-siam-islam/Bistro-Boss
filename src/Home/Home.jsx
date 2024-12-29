import React from 'react';
import Banner from '../Navbar/Page/Banner/Banner';
import Caregorise from '../Components/Categorise/Caregorise';
import Bisrto from '../Components/Bistro/Bisrto';
import Popularitem from '../Components/Popular/Popularitem';
import Callus from '../Components/Callus/Callus';
import Recomends from '../Components/Recomends/Recomends';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Caregorise></Caregorise>
            <Bisrto></Bisrto>
            <Popularitem></Popularitem>
            <Callus></Callus>
            <Recomends></Recomends>
            
        </div>
    );
};

export default Home;