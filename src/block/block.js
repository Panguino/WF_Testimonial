import './style.scss'
import './editor.scss'

const { registerBlockType } = wp.blocks
const { BlockControls, InspectorControls } = wp.editor
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Slide from './components/slide'
import Slideshow from './components/slideshow'

class WF_Testimonials {

	title = 'wf-testimonials';
	icon = 'format-quote'; // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category = 'common';

	attributes = {
		interval: {
			type: 'text',
			selector: '.slideshow',
			source: 'attribute',
			attribute: 'data-interval',
			default: 'false'
		},
		hideIndicators: {
			type: 'text',
			default: 'false'
		},
		viewMode: {
			type: 'text',
			default: 'edit',
		},
		testimonials: {
			source: "query",
			default: [{index:0, quote:"", byline:""}],
			selector: ".carousel-inner .carousel",
			query: {
				index: {
					source: "attribute",
					selector: ".quote",
					attribute: "index"
				},
				image: {
					source: "attribute",
					selector: "img",
					attribute: "src"
				},
				quote: {
					source: "text",
					selector: ".quote"
				},
				byline: {
					source: "text",
					selector: ".byline"
				}
			}
		}
	}

	edit = ({ attributes, className, setAttributes, isSelected }) => {

		const { interval, hideIndicators, testimonials, viewMode } = attributes;

		function onChangeInterval(e) {
			setAttributes({ interval: e.target.value });
		}

		function indicatorToggle(e) {
			setAttributes({ hideIndicators: e.target.checked });
		}

		function addTestimonial() {
			setAttributes({ testimonials: [	...testimonials, { index: testimonials.length, quote: "", byline: ""} ]	})
		}

		function removeTestimonial(e, removeIndex) {	
			console.log('remove: ',removeIndex);			
			const newTestimonials = [...testimonials].filter(item => item.index != removeIndex).map(t => {
			  if (t.index > removeIndex) {
				t.index -= 1;
			  }
			  return t;
			});	
			setAttributes({
				testimonials: [...newTestimonials]
			})
		}

		function editMode(){
			setAttributes({ viewMode: 'edit' });
		}

		function previewMode() {
			setAttributes({ viewMode: 'preview' });
		}

		function onDragEnd(result) {

			const {destination, source} = result;

			if (!destination) {
				return
			}

			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return
			}
			
			const reOrderedTestimonials = [...testimonials].filter(item => item.index != source.index).map(t => {
				if (t.index > source.index) {
				  t.index -= 1;
				}
				if (t.index >= destination.index) {
					t.index += 1;
				}
				return t;
			});	
			setAttributes({testimonials: 
				[...reOrderedTestimonials, 
					{ index: destination.index, quote: testimonials[source.index].quote, byline: testimonials[source.index].byline} 
				]
			})

		}

		function editMarkup() {
			return (
				<div className="edit-testimonials">
					<DragDropContext onDragEnd={onDragEnd} >
						<Droppable droppableId={'testimonials_1'} >	
							{(provided) => (
								<div className="testimonial-slides" {...provided.droppableProps} ref={provided.innerRef}>
									{testimonials.sort((a,b) => a.index - b.index).map( (testimonial, index) => {
										return (
											<Slide 
												key={index}
												index={index} 
												onDelete={removeTestimonial.bind(this, null, index)} 
												quote={testimonial.quote}
												onQuoteChange={quote => {
													const newObject = Object.assign({}, testimonial, {
														quote: quote
													});
													setAttributes({
													testimonials: [
														...testimonials.filter(
														item => item.index != testimonial.index
														),
														newObject
													]
													})
												}}
												byline={testimonial.byline}
												onBylineChange={byline => {
													const newObject = Object.assign({}, testimonial, {
														byline: byline
													});
													setAttributes({
													testimonials: [
														...testimonials.filter(
														item => item.index != testimonial.index
														),
														newObject
													]
													})
												}}
											/>
										)
									})}
									{provided.placeholder}
								</div>
							)}	
						</Droppable>	
					</DragDropContext>
					<div className="add-testimonial" onClick={addTestimonial}>+ Add Testimonial</div>					
				</div>
			)
		}

		return (
			<div className={className}>
				<BlockControls>
					<button onClick={editMode}>Edit</button>  
					<button onClick={previewMode}>Preview</button>
				</BlockControls>
				<InspectorControls>
					<div>Interval: <input onChange={onChangeInterval} value={interval} /></div>
					<div><input type="checkbox" checked={hideIndicators} onChange={indicatorToggle} /> Hide indicator pagination</div>
				</InspectorControls>
				{( viewMode === 'preview' && <Slideshow id={className} interval={interval} testimonials={testimonials} hideIndicators={hideIndicators} /> )}	
				{( viewMode === 'edit' && editMarkup() )}	
			</div> 
				
		)
	}

	save = ({ attributes, className }) => {

		const { interval, testimonials, hideIndicators } = attributes;

		return (
			<div className={className}>
				<Slideshow id={className} interval={interval} testimonials={testimonials} hideIndicators={hideIndicators} />
			</div>
		)
	}
}

registerBlockType('wf/testimonials', new WF_Testimonials())