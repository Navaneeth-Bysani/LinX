const UserHeader = (props) => {
    return (
        <div style = {{textAlign:"center"}}>
            <h1>{props.name}</h1>
            <p>{props.bio}</p>
        </div>
    )
}

export default UserHeader;