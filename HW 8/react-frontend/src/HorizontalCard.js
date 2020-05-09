import React from 'react';
import Card from 'react-bootstrap/Card';
import CardSection from './CardSection';
import {FaShareAlt} from 'react-icons/fa';
import ModalComponent from './ModalComponent';
import { Link } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class HorizontalCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: [],
            loading: true,
        }
        this.getData();
        props.unhideFn();
        props.hideFavPage();
        props.setSearch('');
    }

    getData() {
        this.setState({loading: true})      
            var url = 'https://hw8-node-backend.wl.r.appspot.com/' + this.props.page + (this.props.sliderVal ? '/1' : '/0');
            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({data: data.data, loading: false});
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.page !== this.props.page) {
            this.getData();
        }
        
        if(prevProps.sliderVal !== this.props.sliderVal) {
            this.getData();    
        }

    }

    showDescSmall(s) {
        var str = '';
        if(s.length > 100) {
            s = s.slice(0,100);
            str = s + '...';
        }
        else
            str = s;
        return str;
    }

    showDescBig(s) {
        var str = '';
        if(s.length > 420) {
            s = s.slice(0,420);
            s = s.split(' ');
            for(var i=0; i<s.length-3; i++) 
                str += s[i] + ' ';
            str = str.slice(0, str.length) + '...';
        }
        else
            str = s;
        return str;
    }

    render() {
        var datacards = this.state.data ? this.state.data.map((item,i) => {            
            var d = item.date;
            d = d.split('T')[0];
            return (
                <>
                <Link key={item.id} to={'/article/' + item.server + '?id='+item.id} style={{ textDecoration: 'none' }} > 
                    <Card style={{ margin: '2% 1%', boxShadow: '2px 2px 2px 2px #bbbbbb' }}>
                        <Card.Body style={{ color: '#000000', padding: '0.75rem' }}>
                            <Row style={{ margin:'0' }}>
                            <Col lg={3} md={12} sm={12} xs={12} >
                                <div className="horizontalCardImg" style={{ border: '7px solid #eeeeee', borderRadius: '8px' }}>
                                    <img src={item.image} style={{ width: "100%", objectFit: 'cover' }} />
                                </div>
                            </Col>
                            <Col lg={9} md={12} sm={12} xs={12}>
                            <div style={{ textAlign: 'left' }}>
                                <Card.Title style={{ textDecoration: 'none' }} >
                                    <b style={{ textDecoration: 'none' }}><i>{item.title}</i></b> 
                                    <span> 
                                        <ModalComponent showServer={false} server={item.server} text={item.title} link={item.url}>
                                            <FaShareAlt />
                                        </ModalComponent>
                                    </span>    
                                </Card.Title>
                                <Card.Text>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            {(this.props.smallScreen) ?  this.showDescSmall(item.desc) : this.showDescBig(item.desc)}
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'left'}}>
                                            <span><i>{d}</i></span>                                            
                                        </Col>
                                        <Col lg={6} md={6} sm={6} xs={6} style={{ textAlign: 'right'}}>
                                            <CardSection value={item.section} />
                                        </Col>
                                    </Row>
                                    <br></br>
                                </Card.Text>
                            </div>
                            </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Link>
                </>
            )
        }) : <></>;
        const override = css`
            margin-top: 20%;
            margin-left: 50%;
        `; 
        return (
            <div style={{ margin: '1%' }}> 
                { this.state.loading ? 
                    <div className="sweet-loading">
                        <BounceLoader
                        size={30}
                        css={override}
                        color={"#123abc"}
                        loading={this.state.loading}
                        />
                        <p style={{ marginLeft: '49.25%' }}>Loading</p>
                    </div> : datacards} 
            </div>
        );
    }
}


export default HorizontalCard;