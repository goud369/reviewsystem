import React from 'react';
import './rating.css';

export default class Rating extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rating:'',
            temp_rating:''
        };
    }
    componentDidMount(){
        this.setState({
            rating: this.props.rating || null,
            temp_rating: null
          });
    }
    rate(rating) {
      this.setState({
        rating: rating,
        temp_rating: rating
      });
    }
    star_over(rating) {
      this.state.temp_rating = this.state.rating;
      this.state.rating = rating;
      this.setState({
        rating: this.state.rating,
        temp_rating: this.state.temp_rating
      });
    }
    star_out() {
      this.state.rating = this.state.temp_rating;
      this.setState({ rating: this.state.rating });
      sessionStorage.setItem('rating',this.state.rating);
    }
    render() {
      var stars = [];
      for(var i = 0; i < 5; i++) {
        var klass = 'star-rating__star';
        if (this.state.rating > i && this.state.rating != null) {
          klass += ' is-selected';
        }
        {!this.props.disabled ? stars.push(
            <label
              className={klass}
              onClick={this.rate.bind(this, i)}
              onMouseOver={this.star_over.bind(this, i)}
              onMouseOut={this.star_out.bind(this)}>
              ★
            </label>
          ):(
            stars.push(
                <label
                  className={klass}>
                  ★
                </label>
          )
          );
        }
      }
      return (
        <div className="star-rating"  style={{marginLeft:this.props.rating && '15px',paddingTop:this.props.rating && '10px'}}>
          {stars}
        </div>
      );
    }
  };