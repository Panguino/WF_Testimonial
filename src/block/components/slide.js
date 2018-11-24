import React from 'react'
const { PlainText } = wp.editor
import { Draggable } from 'react-beautiful-dnd'

export default class Slide extends React.Component {

    render() {
        return (
            <Draggable draggableId={"testimonial_"+this.props.index} index={this.props.index}>
                {(provided) => (
                    <div className="testimonial-editor-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="row">
                            <div className="move col"><span class="grippy"></span></div>
                            <div className="image-upload col">Image</div>
                            <div className="quote-text col">
                                <PlainText
                                    className="quote-text-input"
                                    placeholder="Testimonial Text"
                                    value={this.props.quote}    
                                    onChange={this.props.onQuoteChange}                        
                                />
                            </div>
                            <div className="byline-text col">
                                <PlainText
                                    className="byline-text-input"
                                    placeholder="Byline Text"
                                    value={this.props.byline}
                                    onChange={this.props.onBylineChange}                        
                                />
                            </div>
                            <div className="delete col"><button onClick={this.props.onDelete}>Delete</button></div>
                        </div>
                    </div>
                )}                
            </Draggable>
        )
    }
}