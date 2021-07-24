import classes from './DisplayLink.module.css';

const DisplayLink = (props) => {
    return (
            <a href = {props.url} className = {classes.link} target = "_blank">
                <div className = {classes.container}>
                    {props.title}
                </div>
            </a>
    )
}

export default DisplayLink;