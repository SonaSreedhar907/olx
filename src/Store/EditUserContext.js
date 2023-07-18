import React,{ createContext,useState } from 'react';

export const EditUserContext = createContext(null)


function EditUserData({children}){
    const [userDetails,setUserDetails] = useState(null)
    return(
        <EditUserContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </EditUserContext.Provider>
    )
}


export default EditUserData;