import NavBar from './NavBar';
import UserProfile from './UserProfile';
import LinkControls from './LinkControls';

const Dashboard = () => {
    document.body.style = "background: rgb(204, 204, 204)"
    return (
        <div>
            <NavBar />
            {window.location.hash.substr(1) === "user" ? <UserProfile/> : null}
            <LinkControls/>
        </div>
    )
}

export default Dashboard;