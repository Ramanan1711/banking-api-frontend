import React from 'react';
import { motion } from 'framer-motion';
import buttonVariants from './buttonAnimation';

const AnimatedButton = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      style={styles.button}
    >
      {children}
    </motion.button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default AnimatedButton;
