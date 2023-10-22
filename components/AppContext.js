import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

/**
 * AppProvider component manages the state for the application - including information on the profile and user location.
 * @param {Object} props - The properties for the component.
 * @param {ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} - Returns the wrapped child components with the provided context.
 */
export const AppProvider = ({ children }) => {
	const [imageList, setImageList] = useState([]);

	return (
		<AppContext.Provider value={{ 
			imageList,
            setImageList
		}}>
			{children}
		</AppContext.Provider>
	);
};
