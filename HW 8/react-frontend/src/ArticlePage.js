import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { FaBookmark, FaRegBookmark, FaAngleDown, FaAngleUp }  from 'react-icons/fa';
import Accordion from 'react-bootstrap/Accordion'
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";
import ReactTooltip from 'react-tooltip'
import { toast, ToastContainer, Zoom } from 'react-toastify';
import Comments from './Comments';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import { Element, animateScroll as scroll, scroller } from 'react-scroll';
import "react-toastify/dist/ReactToastify.css";


const processDate = (date) => {
    var temp = date.split('-');
    var month = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }
    return temp[2] + ' ' + month[temp[1]] + ' ' + temp[0];
}

const ArticlePage = (props) => {
    // console.log(useLocation());
    var qid = useLocation().search;
    var url = 'https://hw8-node-backend.wl.r.appspot.com/' + useLocation().pathname + qid;
    var id = qid.split('=')[1];

    const para = useRef();
    const para1 = useRef();
    const para2 = useRef();

    const [d, setData] = useState({});
    // console.log(url);

    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    function setSave() { 
        // console.log('in setSave with id: ' + id);   
        if(localStorage.getItem(id)) {
            setIsSaved(true);
            // console.log('isSaved: T');
        } else {
            setIsSaved(false);
            // console.log('isSaved: F')
        }
    }

    useEffect(() => {
        async function fetchData() {
            props.hideFn();
            props.hideFavPage();
            props.setSearch('');
            setLoading(true);
            const res = await fetch(url);
            res
                .json()
                .then(res => {
                    setData(res.data);
                    setShowLess(false);
                    setShowMore(res.data.showMoreButton);
                    setLoading(false);
                });
        }
        fetchData();
        setSave();
        return function close() {
        }
    }, []);
    
    // function scroll(para) {
    //     console.log(para);
    //     // para.current.scrollIntoView({behavior: 'smooth'})
    // }

    function showDetails() {
        // console.log('1');
        // para2.current.scrollIntoView({behavior: 'smooth'});
        scroller.scrollTo('p2', {
            smooth: true,
            duration: 1500,
            delay: 100,

        })
        setShowLess(true);
        setShowMore(false);
    }

    function hideDetails() {
        // console.log('2');
        // para1.current.scrollIntoView({behavior: 'smooth'});
        scroll.scrollToTop({
            smooth: true,
            duration: 1500,
            delay: 100,
        });
        setShowLess(false);
        setShowMore(true);
    }

    function saveArticle(title) {
        //setstate of saved
        var s = '';
        // console.log('in saveArticle ');
        if(localStorage.getItem(id)) {
            localStorage.removeItem(id);
            s = 'Removing - ' + title;
            setIsSaved(false);
        } else {
            localStorage.setItem(id, JSON.stringify(d));
            s = 'Saving  ' + title;
            setIsSaved(true);
        }
        // alert(s);
        //show toast
        toast(s, { 
            autoClose: 1500,
            closeOnClick: true,
            position: "top-center"
            
        });

        // console.log(localStorage.getItem(d.id));
    }

    const override = css`
        margin-top: 20%;
        margin-left: 50%;
    `; 
    return (
            <>
                {loading ?
                    <div className="sweet-loading">
                        <BounceLoader
                        size={30}
                        css={override}
                        color={"#123abc"}
                        loading={loading}
                        />
                    <p style={{ marginLeft: '49.25%' }}>Loading</p>                        
                    </div> : 
                    <>
                    {/* <ToastContainer /> */}
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        transition={Zoom}
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    <Accordion defaultActiveKey="0">
                        <Card style={{ margin: '2%', boxShadow: '4px 4px 10px 10px #dddddd' }}>
                            <Card.Body style={{ padding: '1%', margin: '1%' }}>
                                <Row style={{ margin:'0' }}>
                                    <h3 style={{ textAlign: 'left' }}><b><i>{d.title}</i></b></h3>
                                </Row>
                                <br></br>
                                <Row style={{ margin: '0% 1.5%' }}>
                                    <Col lg={4} md={4} sm={4} xs={4}>
                                        <p style={{ fontSize: '15px',float: "left" }}><i>{d.date}</i></p>                        
                                    </Col>
                                    <Col lg={7} md={7} sm={6} xs={6}>
                                        <span style={{ float:"right" }}>    
                                            <a data-tip data-for="facebook">
                                            <FacebookShareButton url={d.url} hashtag="#CSCI_571_NewsApp">
                                                <FacebookIcon size={40} round={true} />
                                            </FacebookShareButton>
                                            </a>
                                            <ReactTooltip id='facebook' effect='solid'>
                                                <span>Facebook</span>
                                            </ReactTooltip>
        
                                            <a data-tip data-for="twitter">
                                            <TwitterShareButton url={d.url} hashtags={["CSCI_571_NewsApp"]}>
                                                <TwitterIcon size={40} round={true} />
                                            </TwitterShareButton>
                                            </a>
                                            <ReactTooltip id='twitter'  effect='solid'>
                                                <span>Twitter</span>
                                            </ReactTooltip>
        
                                            <a data-tip data-for="email">
                                            <EmailShareButton url={d.url} subject="#CSCI_571_NewsApp">
                                                <EmailIcon size={40} round={true} />
                                            </EmailShareButton>
                                            </a>
                                            <ReactTooltip id='email' effect='solid'>
                                                <span>Email</span>
                                            </ReactTooltip>
                                        </span>  
                                    </Col>
                                    <Col lg={1} md={1} sm={2} xs={2}>
                                        <span id="bookmark" style={{ float: "right" }} onClick={() => saveArticle(d.title)}>
                                            <a data-tip data-for="bookmark" style={{ color: '#b41f46' }}> 
                                                    {isSaved ? <FaBookmark size={25} /> : <FaRegBookmark size={25} />}
                                            </a>
                                            <ReactTooltip id='bookmark' effect='solid'>
                                                <span>Bookmark</span>
                                            </ReactTooltip>
                                        </span>
                                    </Col>
                                </Row>
                                <br />
                                <Card.Img src={d.image} />
                                <br />
                                <br />
                                <Element name="p1">
                                    <p style={{ textAlign: 'justify', fontSize: '16px' }} ref={para1} >{d.part1}</p>
                                </Element>
                                {showMore?<Accordion.Toggle onClick={() => {showDetails(); }} style={{ float: 'right', background: 'none', border: 'none' }} eventKey="1"> <FaAngleDown /> </Accordion.Toggle>:<></>}
                                <Accordion.Collapse eventKey="1">
                                    <p style={{ textAlign: 'justify', fontSize: '16px' }} ref={para2} >{d.part2}</p>
                                </Accordion.Collapse>
                                {showLess?<Accordion.Toggle onClick={() => {hideDetails(); }} style={{ float: 'right', background: 'none', border: 'none' }} eventKey="1"> <FaAngleUp /> </Accordion.Toggle>:<></>}
                                <Element name="p2">
                                    <p></p>
                                    {/* <p style={{ textAlign: 'justify', fontSize: '16px' }} ref={para2} >{d.part2}</p> */}
                                </Element>
                            </Card.Body>
                        </Card>
                    </Accordion>
                    <Comments id={id}/>  
                </>
                }
            </>
    )
};


export default ArticlePage;