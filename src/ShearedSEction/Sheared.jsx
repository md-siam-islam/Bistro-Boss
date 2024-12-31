import React from 'react';

const Sheared = ({Subtitle,title}) => {
    return (
        <div className='text-center my-10'>
            <p className='text-[#D99904] font-semibold text-xl my-3'>-----{Subtitle}-----</p>
            <h1 className='font-bold text-2xl border-y-2 py-4 md:text-4xl uppercase'>{title}</h1>
        </div>
    );
};

export default Sheared;