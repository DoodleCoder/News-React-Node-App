import React from 'react';
import Card from 'react-bootstrap/Card';
import CardSection from './CardSection';
import { FaShareAlt, FaTrash } from 'react-icons/fa';
import ModalComponent from './ModalComponent';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from 'react-bootstrap';

const process = (s) => {
    var res = '';
    if(s.length > 57) {
        s = s.slice(0, 57);
        s = s.split(' ');
        for(var i=0; i<s.length-2; i++) {
            res += s[i] + ' ';
        }
        res += '...';
    } else {
        res = s;
    }
    return res;
}

const SmallCard = (props) => {
    var datacards = props.data.map(function(item,i) {
        return (
            <Col key={"k"+item.id} lg={3} md={12} sm={12} xs={12}>
                <Link to={'/article/' + item.server + '?id='+item.id}>
                    <Card style={{ boxShadow: '1px 1px 1px 1px #bbbbbb',  padding: '0%', float: 'left', margin: ' 2% 0%' }}>
                        <Card.Body style={{ color: '#000000' }}>
                            <Row style={{ margin: '0' }}>
                                <Card.Title style={{ textAlign: 'left' }}>
                                    <span style={{ float: 'left' }}>
                                        <b><i>{process(item.title)}</i></b> 
                                        <span > 
                                            <ModalComponent showServer={true} server={item.server} text={item.title} link={item.url}>
                                                <FaShareAlt />
                                            </ModalComponent>
                                        {props.del ? 
                                            <FaTrash onClick={(e) => {e.preventDefault(); props.delFn(item.id, item.title);}}/>
                                            : 
                                            <></>
                                        }
                                        </span>
                                    </span>
                                </Card.Title>
                            </Row>
                            <br></br>
                            <Row style={{ margin: '0' }}>
                                <Card.Img variant="top" src={item.image} style={{ width: '100%' }} />                        
                            </Row>
                            <br></br>
                                <Row style={{ margin: '0' }}>
                                    <Col lg={4} md={4} sm={4} xs={4} style={{ padding: '0px' }}>    
                                        <span><i>{item.date}</i></span>
                                    </Col>
                                    <Col lg={8} md={8} sm={8} xs={8} style={{ padding: '0px' }}>        
                                        <div style={{ padding: '0', margin: '0px', textAlign: 'end' }}>     
                                            <CardSection value={item.section} style={{ marginRight: '1.5%' }} />
                                            {props.del ? <CardSection value={(item.server == '1' ? 'guardian' : 'nytimes')}/> : <></>}
                                        </div>
                                    </Col>
                                </Row>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        )
    });
    return (props.data.length ? 
        <>
            <h2  key={"1"} style={{textAlign: "left", margin: '2%'}}>{props.message}</h2>
            <Row  key={"11"} style={{ padding: '0%', margin: '0' }}>{datacards}</Row> 
        </>
        : 
        <h3  key={"111"} style={{ textAlign: 'center', margin: '2%' }}>{props.defaultMessage}</h3>);    
};

export default SmallCard;