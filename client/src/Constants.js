// Ensure the file name and import statement are consistent with the correct naming convention

import { useCallback, useState } from "react";

// Correct implementation of the custom hook
export const useConstants = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleIsAdmin = useCallback(() => {
        setIsAdmin(!isAdmin);
    }, []);

    return {
        isAdmin,
        toggleIsAdmin
    };
};
