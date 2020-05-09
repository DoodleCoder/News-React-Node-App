import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SmallCard from './SmallCard';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from "@emotion/core";
import { Row } from 'react-bootstrap';

const SearchPage = (props) => {

    const [loading, setLoading] = useState(true);

    // console.log(useLocation());
    var q = useLocation().search;
    var url = 'https://hw8-node-backend.wl.r.appspot.com/' + useLocation().pathname + q;

    const [d, setData] = useState({});
    const [data] = useState([]);
    // console.log(url);

    useEffect(() => {
        async function fetchData() {
            props.hideFn();
            props.hideFavPage();
            props.setSearch(q.split('=')[1]);
            setLoading(true);
            const res = await fetch(url);
            res
                .json()
                .then(res => {
                    setData({content: res.data});
                    // console.log('incoming data is:', res);
                    setLoading(false);
                });
        }
        fetchData();

        return function resetSearchbar() {
            // console.log('will remove query from search bar now!');
            // props.clearSearch();
        }
      }, [q]);
    
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
                </div> 
                : 
                <>
                    <SmallCard data={d.content} del={false} defaultMessage="No Search Results" message="Results: "/> 
                </> 
            }
        </>
    )
};


export default SearchPage;