import { motion } from "framer-motion";
import saludandoImg from "../assets/saludando.png";
import corriendoImg from "../assets/corriendo.png";
import saludando2Img from "../assets/saludando2.png";

interface MascotProps {
  expression?: 'happy' | 'excited' | 'thinking' | 'waving' | 'saludando' | 'corriendo' | 'saludando2';
  size?: 'sm' | 'md' | 'lg';
}

export function Mascot({ expression = 'happy', size = 'md' }: MascotProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const expressions = {
    happy: '🦉',
    excited: '🤗',
    thinking: '🤔',
    waving: '👋',
    saludando: <img src={saludandoImg} alt="Saludando" className="w-full h-full object-contain" />,
    corriendo: <img src={corriendoImg} alt="Corriendo" className="w-full h-full object-contain" />,
    saludando2: <img src={saludando2Img} alt="Saludando 2" className="w-full h-full object-contain" />
  };

  const animations = {
    happy: { rotate: [0, -5, 5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    excited: { scale: [1, 1.1, 1], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } },
    thinking: { rotate: [0, -10, 10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    waving: { rotate: [0, 20, -20, 0], transition: { duration: 0.5, repeat: 3, ease: "easeInOut" } },
    saludando: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
    corriendo: { x: [0, 10, -10, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 rounded-full shadow-lg`}
      animate={animations[expression]}
    >
      <span className="select-none text-5xl">
        {expressions[expression]}
      </span>
    </motion.div>
  );
}