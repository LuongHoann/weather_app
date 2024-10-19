import { useEffect, useRef, useState } from "react";

export const useDebounce = (fn, delay = 300) => {
    const timerId = useRef(null);
  
    return (...args) => { // Spread args to pass arguments to the debounced function
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
  
      timerId.current = setTimeout(() => {
        fn(...args); // Call the function with arguments
      }, delay);
    };
  };
  