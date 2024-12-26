const buttonVariants = {
    hover: {
      scale: 1.1, // Slightly enlarge the button
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Add a shadow effect
      transition: {
        duration: 0.2, // Duration of the animation
        ease: 'easeInOut', // Easing for smooth animation
      },
    },
    tap: {
      scale: 0.95, // Slightly shrink the button when clicked
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Reduce shadow intensity
      transition: {
        duration: 0.1, // Quicker animation on tap
      },
    },
  };
  
  export default buttonVariants;
  