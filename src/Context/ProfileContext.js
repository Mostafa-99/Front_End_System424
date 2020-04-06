import React, {createContext, Component} from 'react'

export const ProfileContext= createContext();

class ProfileContextProvider extends Component {
    
    state={
        userType:'artist'
    }
    

    render(){
        return(

            <ProfileContext.Provider value={{...this.state}}>
                {this.props.children}
            </ProfileContext.Provider>
        ); 

        
    }

}

export default ProfileContextProvider;