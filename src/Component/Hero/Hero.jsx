
import { motion } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"
import videoSrc from "../../assets/hero-slider.mp4"

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover brightness-[0.6]"
          onError={(e) => {
            e.target.style.display = "none"
            e.target.closest("section").style.background = 
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Find Freelancers or Work On-Demand
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.35 }}
            className="mb-8 text-xl text-slate-200 sm:text-2xl"
          >
            Hire experts for small tasks or earn money with your skills
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="mb-10 text-slate-300 sm:text-lg"
          >
            Connect with professionals for quick jobs or offer your services. 
            Simple, fast, and secure transactions for both clients and freelancers.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.65 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#find-work"
                className="inline-flex items-center rounded-md bg-white px-8 py-3 text-lg font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl"
              >
                Hire Talent
                <FiArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.75 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#offer-services"
                className="inline-flex items-center rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
              >
                Offer Services
                <FiArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero