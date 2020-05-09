import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import _ from "lodash";

// const SearchBar = (props) => {
//     var results = [];    
//     var q = useLocation();
//     const [value, setValue] = useState(null);
//     console.log(q, q.search.split('=')[1]);
//     useEffect(() => {
//         if(q.pathname === "/search/0" || q.pathname === "/search/1") {
//             if(q.search.length) {
//                 setValue({label:q.search.split('=')[1], url: ''});
//             }
//             else {
//                 setValue(null);
//                 console.log('/search/ found, query not found');
//             }
//         }
//         else {
//             setValue(null);
//             console.log('/search/ not found');        
//         }
//     }, []);
   

//     function handleChange(newValue) {
//         setValue(newValue.label);
//         props.history.push('/search/' + (props.value ? '1' : '0') +'?query=' + newValue.label);
//     }
    
//     return(
//         <AsyncSelect 
//             loadOptions={_.debounce(loadOptions, 1000, {leading: true, trailing: true})}
//             cacheOptions
//             placeholder="Enter keyword .."
//             // options={}
//             // defaultValue={value}
//             onChange={handleChange}
//             value={value}
//             />
//     )
// }



class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
        this.results = [];
        this.getOptions = this.getOptions.bind(this);
    }

    getOptions(inputValue: String) {
        return fetch('https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=en-US&q='+inputValue, {
                headers: {
                    'Ocp-Apim-Subscription-Key': 'b6923da274684b4a875e987b6a61e8a3'
                }
            }).then(res => res.json())
            .then(data => {
                try{
                    const resultsRaw = data.suggestionGroups[0].searchSuggestions;
                    this.results = [];
                    this.results = resultsRaw.map(result => ({ label: result.displayText, url: result.displayText }));
                } catch(e) {
                    console.log(e);
                }
                return this.results;
            });
    };

    componentDidUpdate(prevProps, prevState) {
        if(!window.location.pathname.includes("search")) {
            if(prevState && prevState.value != null) {
                this.setState({value: null});
            }
        }
    }

    render() {
        console.log(this.state,'searchbar page')
        return <AsyncSelect 
                    loadOptions = {_.debounce(this.getOptions, 1000, {leading: true, trailing: true})}
                    value={this.state.value}
                    placeholder="Enter keyword .." 
                    onChange={(inputValue) => { this.setState({value:inputValue}); this.props.history.push('/search/' + (this.props.value ? '1' : '0') +'?query=' + inputValue.label ) }}
                />
    }

}

export default withRouter(SearchBar);