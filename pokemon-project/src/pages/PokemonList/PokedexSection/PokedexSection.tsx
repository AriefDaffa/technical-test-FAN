import { motion, useTransform } from 'framer-motion';
import type { FC } from 'react';
import type { MotionValue } from 'framer-motion';

interface PokedexSectionProps {
  scrollYProgress: MotionValue<number>;
}

const PokedexSection: FC<PokedexSectionProps> = (props) => {
  const { scrollYProgress } = props;

  const rotate = useTransform(scrollYProgress, [0, 0.1], ['-20deg', '0deg']);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 30]);
  const display = useTransform(scrollYProgress, (disp) =>
    disp >= 0.99 ? 'none' : ''
  );

  return (
    <motion.div
      style={{ rotate, scale, display, transformOrigin: '30%' }}
      className="flex flex-row justify-center fixed top-0 bottom-0 my-auto"
    >
      <img
        src={'/assets/image/pokedex.png'}
        alt=""
        className="w-96 self-center"
      />
    </motion.div>
  );
};

export default PokedexSection;
