import Nav from "../components/nav/nav";

const WithNav = (Component) => {
    const withNavComponent = (props) => {
        return ( 
            <>
                <Nav />
                <Component {...props}/>
            </>
         );
    }
    return withNavComponent;
}
 
export default WithNav;