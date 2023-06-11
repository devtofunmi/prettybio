import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAOS = () => {
  AOS.init({
    // Configure AOS options here
    duration: 800, // Duration of animation
    easing: 'ease', // Easing function
    once: true, // Animation only once on scroll
    // Add more options as needed
  });
};