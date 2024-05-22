import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered.
// Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [element, forceRender] = useState(0);
    const divRef = useRef();

    const handleReRender = () => {
        // Update state to force re-render
        let n = parseInt(divRef.current.innerHTML);
        divRef.current.innerHTML = n + 1;
        forceRender(Math.random());

    };

    return (
        <div>
            <h3>This component has rendered <div ref = {divRef}>{0}</div> times.</h3>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};