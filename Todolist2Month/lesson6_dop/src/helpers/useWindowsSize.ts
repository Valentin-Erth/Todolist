import {useEffect, useState} from "react";

export function useWindowsSize(){
    const [windowSize, setWindowSize] = useState(0);
    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
