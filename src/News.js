import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Pagination, PageItem
} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';



class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            urlToImage: [],
            content: [],
            publish: [],
            currentPage: 1,
            articlesPerPage: 3,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        fetch('http://newsapi.org/v2/top-headlines?country=id&apiKey=b3bee36a7e834ebdb122bcb929787854')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    articles: data.articles,
                    urlToImage: data.urlToImage,
                    content: data.description,
                    publish: data.publishedAt
                })
            });
    }

    render() {
        const { articles, urlToImage, content, publish, currentPage, articlesPerPage } = this.state;

        // Logic for displaying articles
        const indexOfLastTodo = currentPage * articlesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - articlesPerPage;
        const currentarticles = articles.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderarticles = currentarticles.map((item, index) => {
            return (<Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '18px' }}>
                <Col sm={12} md={6}>
                    <Card>
                        <Card.Img variant="top" src={item.urlToImage} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                <p>{item.description}</p>
                            </Card.Text>
                            <Button variant="primary">Read More...</Button>
                        </Card.Body>
                        <Card.Footer>
                            Publish at : {item.publish}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>);
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (

                <Pagination
                    class="pagination-centered" style={{
                        display: 'flex',
                        float: 'none !important',
                        margin: '0 auto',
                    }}>
                    <Pagination.Item
                        style={{
                            justifyContent: 'flexStart',
                            margin: '0 auto',
                        }}
                        key={number}
                        id={number}
                        active={number === pageNumbers}
                        onClick={this.handleClick}
                    >
                        {number}
                    </Pagination.Item>
                </Pagination >
            );
        });

        return (
            <>
                <div class="container">
                    {renderarticles}
                    <Row>
                        <Col sm={12} md={5}>
                            {renderPageNumbers}
                        </Col>
                    </Row>
                </div>
            </>
        );

    }
}
export default News;