import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";
import Card from 'react-bootstrap/Card';
import CardSection from './CardSection';
import { FaShareAlt, FaTrash } from 'react-icons/fa';
import ModalComponent from './ModalComponent';
import { Link } from 'react-router-dom';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import  Row from 'react-bootstrap/Row';


const FavoritePage = (props) => {

    const [loading, setLoading] = useState(true);

    const [d, setData] = useState([]);

    function fetchData() {
        props.hideFn();
        props.showFavPage();
        props.setSearch('');
        setLoading(true);
        var a = Object.keys(localStorage);
        var d = [];
        for(var i=0; i<a.length; i++){
            if(a[i] !== 'sliderVal') {                  
                var item = localStorage.getItem(a[i]);
                d.push(JSON.parse(item));
            }
        }
        setData(d);
        // console.log('incoming data is:', d);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
      }, []);
    

    const deleteFn = (id, title) => {
        toast('Removing - ' + title, { 
            autoClose: 1500,
            closeOnClick: true,
            position: "top-center",
            onOpen: () => {
                localStorage.removeItem(id);
                fetchData();
            }
        });
        // console.log(id);
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
                    {/* <h2>Favorites Page</h2> */}
                    <ToastContainer
                        position="top-center"
                        autoClose={500}
                        hideProgressBar
                        transition={Zoom}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    <SmallCard data={d} del={true} delFn={deleteFn} message="Favorites: " defaultMessage="You have no saved articles"/>
                </> 
            }
        </>
    )
};
// 
export default FavoritePage;