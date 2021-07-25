import classes from './Column.module.css';
import Link from './Link';
import {Droppable} from 'react-beautiful-dnd';


const Column = (props) => {
    return (
        <>
            <Droppable droppableId = {props.columnId}>
                {(provided) => (
                    <div className = {classes.Column} {...provided.droppableProps}  ref = {provided.innerRef}>
                        {props.order.map((linkId, idx) => {
                            const link = props.links[linkId];
                            return (
                                    <Link url = {link.url} title = {link.title} views = {link.views} key = {linkId} index = {idx} 
                                    dId = {linkId} disabled = {props.disabled}/>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    )
}

export default Column;