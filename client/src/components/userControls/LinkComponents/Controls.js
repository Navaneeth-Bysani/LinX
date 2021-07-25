import {Button} from 'react-bootstrap';
import classes from './Controls.module.css';

const Controls = () => {
    return (
        <div className = {classes.Container}>
            <Button className = {classes.button}>Edit Order</Button>
            {' '}
            <Button className = {classes.button}>Create</Button>
        </div>
    )
}

export default Controls;