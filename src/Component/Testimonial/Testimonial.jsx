import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'; // Added EffectCoverflow for a visually appealing transition
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

// Swiper styles - ensure these are imported globally or in your main CSS file
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Import EffectCoverflow styles

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Freelance Designer",
    quote: "This platform helped me find consistent work. I've completed over 50 micro jobs in just three months! The support team is also incredibly responsive.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Small Business Owner",
    quote: "Found the perfect developer for my quick project. The quality was exceptional and delivery was lightning fast. A true game-changer for my business.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Marketing Consultant",
    quote: "As both a client and freelancer, this platform delivers value from both perspectives. The intuitive interface makes managing projects a breeze. Highly recommend!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Startup Founder",
    quote: "The micro job model saved us thousands compared to traditional hiring. The talent pool is diverse and highly skilled. Will be using this service regularly.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/71.jpg"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Content Creator",
    quote: "Earning extra income between my main gigs has never been easier. The community here is fantastic, and payments are always on time.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: 6,
    name: "John Doe",
    role: "E-commerce Specialist",
    quote: "Initially skeptical, but this platform quickly proved its worth. Found great talent for niche tasks, which boosted my store's performance significantly.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/90.jpg"
  }
];

const Testimonial = () => {
  return (
    <section
      className="py-16 md:py-24 bg-gray-900 text-gray-100"
      style={{
        background: 'radial-gradient(circle at center, #1a202c, #0d1117 80%)',
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Success Stories</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            What Our <span className="text-blue-400">Thriving Community</span> Says
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Hear directly from the freelancers and clients who have transformed their work and projects through our platform. Their success is our greatest motivation.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 1, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative px-4 sm:px-0" // Add horizontal padding for Swiper's internal elements
        >
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]} // Added EffectCoverflow module
            spaceBetween={30}
            slidesPerView={1}
            loop={true} // Enable infinite loop
            centeredSlides={true} // Center the active slide
            effect="coverflow" // Apply the coverflow effect
            coverflowEffect={{
              rotate: 50, // Rotate angle of slides
              stretch: 0,
              depth: 100, // Depth of slides
              modifier: 1,
              slideShadows: true, // Add shadow to slides
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination', // Link to our custom pagination container
              bulletClass: 'swiper-pagination-bullet !bg-gray-700 !w-3 !h-3 !rounded-full !mx-1 !transition-all !duration-300',
              bulletActiveClass: '!bg-blue-500 !w-8'
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2, // Show a bit of the next slide
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2.2, // Show more slides
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3.2, // Show even more slides
                spaceBetween: 30
              }
            }}
            className="pb-8 md:pb-12" // Reduced bottom padding on Swiper itself
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-8 rounded-2xl shadow-xl h-full flex flex-col border border-gray-700"
                  style={{
                    // Black glassy effect
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px) brightness(1.2)',
                    WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">{testimonial.name}</h3>
                      <p className="text-md text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="mb-5 text-yellow-500 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}
                      />
                    ))}
                  </div>

                  <div className="relative mb-6 flex-grow">
                    <FaQuoteLeft className="text-blue-900 text-5xl absolute -top-4 -left-2 opacity-80" />
                    <p className="text-gray-200 relative z-10 pl-10 text-lg leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Custom Pagination Container - positioned visually below the Swiper */}
        <div className="custom-swiper-pagination flex justify-center mt-8 space-x-2"></div>
      </div>
    </section>
  );
};

export default Testimonial;