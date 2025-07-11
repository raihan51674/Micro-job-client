import React from 'react';
import Hero from '../../Component/Hero/Hero';
import Testimonial from '../../Component/Testimonial/Testimonial';
import HowItWorks from '../../Component/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;