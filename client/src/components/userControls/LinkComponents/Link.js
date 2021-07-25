import classes from './Link.module.css';
import {Draggable} from 'react-beautiful-dnd';

const Link = (props) => {
    const component = (provided) => (
        <div className = {classes.Outline} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            ref = {provided.innerRef}>
        <h6>{props.title}</h6>
        <hr/>
        <p>{props.url}</p>
        <b>Views: </b> <p>{props.views}</p>
        </div>
    );
    const enabled = true;
   
    return (
        <Draggable draggableId = {props.dId} index = {props.index} isDragDisabled = {props.disabled}>
            {component}
        </Draggable>    
    )
}

export default Link;