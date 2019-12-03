import React from 'react';
import {Form, Card, Button, Row, Col} from 'react-bootstrap';
import {DEV_URL} from '../../../src/config';
import  Rating from '../common/rating';

export default class Reviews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            description:null,
            reviews:[],
            reviewCheck:null
        }
    }
    componentDidMount(){
        let product_id = this.props.location.pathname.toString().substring(8, 12);
        fetch(`${DEV_URL}/product/${product_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
              },
        })
        .then(response => response.json())
        .then(data =>this.setState({ data: data[0] }));
          //Reviews
        fetch(`${DEV_URL}/reviews/${product_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
              },
        })
        .then(response => response.json())
        .then(data =>{this.setState({ reviews: data })});
        //Email and
        let review_data ={
            product_id: this.props.location.pathname.toString().substring(8, 12),
            email: sessionStorage.getItem('email'),
        }
        fetch(`${DEV_URL}/reviewscheck`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
            },
            body: JSON.stringify(review_data)
        }).then(response => response.json())
          .then(d => {this.setState({ reviewCheck: d.status});console.log(d)});
    }
    handleReview = () => {
        let data = {
            product_id: this.props.location.pathname.toString().substring(8, 12),
            rating: sessionStorage.getItem('rating'),
            email: sessionStorage.getItem('email'),
            description : this.state.description,
            date_created: new Date(),
            date_updated: new Date()
        }
        this.setState(prevState=>({
            reviews:[...prevState.reviews,data],
            reviewCheck:true
        }));
        fetch(`${DEV_URL}/reviews`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
         .then(d => {
            console.log(d);
        }).then(error=>console.log(error));
    }
    render(){
        return(
            <div style={{marginTop:'20px'}}>
                <Row style={{paddingTop:'10px'}}>
                    <Col md={1}>
                        <img src={this.state.data && this.state.data.image_url} height="80" width="80"/>
                    </Col>
                    <Col md={10}>
                        <h5>{this.state.data && this.state.data.product_name}</h5>
                        <ul className="list-inline">
                            <li className='text-muted'>{this.state.data && this.state.data.location}</li>
                            <li className='text-muted'>Duration: {this.state.data && this.state.data.rented_for}</li>
                        </ul>
                    </Col>
                </Row>
              {this.state.reviewCheck==false && <Card>
              <Card.Body>
                <h5 style={{paddingBottom:'5px'}}>Rate</h5>
               <Rating />
               <h5>Review Product</h5>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="3" onChange={e=>this.setState({description: e.target.value})}/>
                    </Form.Group>
                    <Button variant="danger" className='pull-right' onClick={this.handleReview}>Submit</Button>
                </Form>
               </Card.Body>
               </Card>
              }
               <div style={{paddingTop:'10px'}}>
               {this.state.reviews &&
                    this.state.reviews.map((d,i)=>
                <Card key={i} style={{marginBottom:'10px'}}>
                    <Rating key={i} rating={d.rating} disabled='true'/>
                    <Card.Body>
                    <ul className='list-inline'>
                        <li className='text-muted'>CasaOne Verified User&nbsp;<small>({d.email})</small></li>
                        <li className='text-muted pull-right'>{new Date(d.date_created).toDateString()}</li>
                    </ul>
                    {d.description}
                    </Card.Body>
                </Card>
                )}
                </div>
            </div>
        );
    }
}