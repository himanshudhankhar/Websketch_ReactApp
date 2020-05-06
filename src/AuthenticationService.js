import Cookies from 'js-cookie'
import JWTDecode from 'jwt-decode'

/* Basically this do nothing now ,
all the authentication  and routing is handled in nodejs 
*/


const getSession = () => {
  
    var session={
        creationTime:new Date().getTime()
    }
    return session
}



export const logOut = () => {
    Cookies.remove(process.env.REACT_APP_sessionToken);
}



export const isAuthenticated = function () {

    var session = getSession();
    console.log('session', session);
    if (session == null) {
        return false;
    }
    if (session.creationTime == null) {
        console.log("creation time not initialised");
        return false;
    }
    var newd = new Date().getTime();
   
    if (  newd - session.creationTime > 1800000) {
        console.log("new session found",  newd, session.creationTime );
        return false;
    } else {
        console.log("New Seesion not found",newd-session.creationTime);
        return true;
    }

}