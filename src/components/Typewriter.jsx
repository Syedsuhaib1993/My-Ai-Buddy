import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) return;

    setDisplayed(''); // Reset for new input
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval); // Cleanup
  }, [text, speed]);

  return (
    <div className="md:text-4xl text-2xl mt-2 bg-clip-text text-transparent text-center p-1 bg-gradient-to-r from-green-500 to-blue-500">
      {displayed}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default Typewriter;