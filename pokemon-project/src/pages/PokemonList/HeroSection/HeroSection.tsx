import { motion, useTransform } from 'framer-motion';
import { BsArrowDownCircle } from 'react-icons/bs';
import type { FC } from 'react';
import type { MotionValue } from 'framer-motion';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

const HeroSection: FC<HeroSectionProps> = (props) => {
  const { scrollYProgress } = props;

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <motion.div
      style={{ opacity }}
      className="max-w-screen-lg min-h-screen mx-auto"
    >
      <motion.div
        style={{ scale }}
        className="h-screen flex flex-col py-7 justify-between relative"
      >
        <div className="flex-1">
          <div className="text-sm text-center">
            A Captivating Collection of Extraordinary Creatures!
          </div>
          <div className="text-4xl leading-none font-extrabold text-center md:text-9xl ">
            POKEDEX
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <BsArrowDownCircle size={20} className="self-center animate-bounce" />
          <div className="text-sm text-center">Scroll down</div>
        </div>
      </motion.div>
      <div className="h-screen" />
    </motion.div>
  );
};

export default HeroSection;
