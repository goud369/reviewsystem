import React from 'react';
import {Card, Button, Row, Col} from 'react-bootstrap';
import {DEV_URL} from '../../../src/config';

export default class Orders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            avgReviews:[],
            products:[],
            productsReviews:[]
        }
    }
    componentDidMount(){
        //Get Average Rating
        fetch(`${DEV_URL}/reviewavg`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
              },
        })
        .then(response => response.json())
        .then(data => {this.setState({ avgReviews: data });console.log(data)});
    
    //Get Products
         //Get Average Rating
         fetch(`${DEV_URL}/products`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem('auth')}`
              },
        })
        .then(response => response.json())
        .then(data => {this.setState({ products: data });
        let merged = [data, this.state.avgReviews].reduce((a, b) => a.map((c, i) => Object.assign({}, c, b[i])));
        this.setState({
            productsReviews:merged,
        });
        })
    }
    render(){
        return(
            <div style={{marginTop:'15px'}}>
            <h3 style={{paddingBottom:'5px'}}>Your Orders</h3>
                <h5 className="text-muted">Order ID: #CO123434354</h5>
                {this.state.productsReviews && this.state.productsReviews.map((p,i)=>
                    <Card key={i} style={{'margin':'2px' }}>
                    <Card.Body>
                        <Row>
                            <Col md={2}>
                            <Card.Img src={p.image_url} style={{height:100,width:100}}/>
                            </Col>
                            <Col md={10}>
                            <Card.Title>{p.product_name} {p.avgRating && <small onClick={()=>this.props.history.push(`/review/${p.product_id}`)} style={{backgroundColor:'green',color: 'white',padding: '5px',borderRadius: '12px',marginLeft:'10px' }}>{p.avgRating.toFixed(1)}  ★</small>}</Card.Title>
                            <Card.Text>
                               Some quick example text to build on the card title and make up the bulk of
                               the card's content.
                             </Card.Text>
                             <ul className={"pull-left list list-inline"}>
                                <li className={"list-inline-item"}><small className="text-muted">{p.rented_from}</small></li>
                                <li className={"list-inline-item"}><small className="text-muted">{p.location}</small></li>
                                <li className={"list-inline-item"}><small className="text-muted">Duration: {p.rented_for}</small></li>
                                <li className={"list-inline-item"}><small className="text-muted">Price: {p.price}</small></li>
                                <li className={"list-inline-item"}><small className="text-muted">Total: ${p.total}</small></li>
                            </ul>
                             <Button variant="danger" className="float-right" size="sm" onClick={()=>this.props.history.push(`/review/${p.product_id}`)}><i className="fa fa-star" aria-hidden="true"></i>&nbsp;&nbsp;Review & Rate the Product</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                )}
            </div>
        );
    }
}