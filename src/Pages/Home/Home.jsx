import React from 'react';
import Hero from '../../Component/Hero/Hero';
import Testimonial from '../../Component/Testimonial/Testimonial';
import HowItWorks from '../../Component/HowItWorks/HowItWorks';
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs';
import FAQ from '../../Component/FAQ/FAQ';
import BestWorkers from '../../Component/BestWorkers/BestWorkers';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BestWorkers></BestWorkers>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;