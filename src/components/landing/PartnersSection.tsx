"use client";

import { motion } from 'framer-motion';
import { 
  FaGoogle, 
  FaMicrosoft, 
  FaAmazon, 
  FaFacebook, 
  FaSlack, 
  FaApple 
} from 'react-icons/fa';

const partners = [
  { 
    name: 'Google',
    icon: FaGoogle,
    color: 'hover:text-[#4285F4]'
  },
  { 
    name: 'Microsoft',
    icon: FaMicrosoft,
    color: 'hover:text-[#00A4EF]'
  },
  { 
    name: 'Amazon',
    icon: FaAmazon,
    color: 'hover:text-[#FF9900]'
  },
  { 
    name: 'Facebook',
    icon: FaFacebook,
    color: 'hover:text-[#1877F2]'
  },
  { 
    name: 'Slack',
    icon: FaSlack,
    color: 'hover:text-[#E01E5A]'
  },
  { 
    name: 'Apple',
    icon: FaApple,
    color: 'hover:text-[#A2AAAD]'
  }
];

export default function PartnersSection() {
  return (
    <div className="w-full border-t border-border/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-center text-muted-foreground mb-8"
          >
            Trusted by leading companies worldwide
          </motion.p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 place-items-center relative z-20">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  duration: 0.2
                }}
                className="group relative"
              >
                <partner.icon 
                  className={`w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/50 transition-all duration-200 ${partner.color} group-hover:scale-110`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
