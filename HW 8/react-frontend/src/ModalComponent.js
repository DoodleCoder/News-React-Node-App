import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

const ModalComponent = (props) => {
    const {
    text,
    link
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = (e) => setModal(!modal);

    return (
        <>
            <span onClick={(e) => {
                e.preventDefault();
                toggle(e);
                }}>
                    {props.children}
            </span>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {props.showServer ? <><b>{props.server == '1' ? 'GUARDIAN' : 'NYTIMES'}</b><br /></> : <></>}
                    {text}
                </ModalHeader>
                <ModalBody>
                    <Container style={{ textAlign: "center" }}>
                        Share via
                        <br />
                        <br />
                        <Row className="show-grid">
                            <Col sm={4} sm={4} xs={4}>
                                <FacebookShareButton url={link} hashtag="#CSCI_571_NewsApp">
                                    <FacebookIcon size={40} round={true} />
                                </FacebookShareButton>
                            </Col>
                            <Col sm={4} sm={4} xs={4}>
                                <TwitterShareButton url={link} hashtags={["CSCI_571_NewsApp"]}>
                                    <TwitterIcon size={40} round={true} />
                                </TwitterShareButton>
                                
                            </Col>
                            <Col sm={4} sm={4} xs={4}>
                                <EmailShareButton url={link} subject="#CSCI_571_NewsApp">
                                    <EmailIcon size={40} round={true} />
                                </EmailShareButton>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ModalComponent;