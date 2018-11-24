import React from 'react'

export default class Slideshow extends React.Component {

    render() {
        return (
            <div id={this.props.id} className="slideshow carousel slide" data-ride="carousel" data-interval={this.props.interval}>
				
                {!this.props.hideIndicators && (
                    <ol className="carousel-indicators">
                        {this.props.testimonials.map( (item, index) => {
                            return <li data-target={'#'+this.props.id} data-slide-to={index} className={index === 0 && 'active'}></li>
                        })}
                    </ol>
                )}

                <div className="carousel-inner">

                    {this.props.testimonials.sort((a,b) => a.index - b.index).map( (testimonial, index) => {
                        return (
                            <div className={"carousel-item " + (index === 0 && 'active')}>									
                                {testimonial.image && <div className="image" style={ {backgroundImage: 'url(${testimonial.image}'} }>
                                    <img src={testimonial.image} style={{display:"none"}} />
                                </div>}
                                <div className="quote"> {testimonial.quote} </div>
                                <div className="byline"> {testimonial.byline} </div>							
                            </div>
                        )
                    })}						

                </div>

                <a className="carousel-control carousel-control-prev" href={'#'+this.props.id} role="button" data-slide="prev">
                    <span className="carousel-icon carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>

                <a className="carousel-control carousel-control-next" href={'#'+this.props.id} role="button" data-slide="next">
                    <span className="carousel-icon carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>

            </div> 
        )
    }
}