import NavBar from './NavBar';
import UserProfile from './UserProfile';
import LinkControls from './LinkControls';

const Dashboard = () => {
    document.body.style = "background: rgb(204, 204, 204)"
    return (
        <div>
            <NavBar />
            {/* {window.location.hash.substr(1) === "user" ? <UserProfile/> : null}
            {window.location.hash.substr(1) === "links"  ? <LinkControls/> : null} */}
            {(window.location.pathname.split('/')[2]) === "user" ? <UserProfile/> : null}
            {(window.location.pathname.split('/')[2]) === "links"  ? <LinkControls/> : null}
        </div>
    )
}

export default Dashboard;