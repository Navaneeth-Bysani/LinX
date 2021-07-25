import {useState} from 'react';
import Column from './LinkComponents/Column';
import {DragDropContext} from 'react-beautiful-dnd';
import Controls from './LinkComponents/Controls';

const LinkControls = () => {
    const [links, setLinks] = useState({
        'link-1' : {title : "Navaneeth", url : "www.xyz.com", views : 5000},
        'link-2' : {title : "Navaneeth 2", url : "www.xyz.com", views : 5000},
        'link-3' : {title : "Navaneeth 3", url : "www.xyz.com", views : 5000},
        'link-4' : {title : "Navaneeth 4", url : "www.xyz.com", views : 5000},
    });

    const Order = [
        ...Object.keys(links)
    ];
    const [order,setOrder] = useState(Order);

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        if(!destination) {
            return;
        }

        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const newLinks = Array.from(order);
        newLinks.splice(source.index, 1);
        newLinks.splice(destination.index, 0, draggableId);

        setOrder(newLinks);
        console.log(order);        
    }

    return (
        <div>
            <Controls />
            <DragDropContext onDragEnd = {onDragEnd}>
                <Column columnId = '1' links = {links} order = {order} disabled = {false}/>
            </DragDropContext>
        </div>
    )
}

export default LinkControls;