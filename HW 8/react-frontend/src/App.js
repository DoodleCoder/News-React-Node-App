import React from 'react';
import './App.css';
import ReactTooltip from 'react-tooltip'
import { Route, Switch as SwitchRoute} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {FaBookmark, FaRegBookmark }  from 'react-icons/fa';
import { NavLink, Link, Redirect } from 'react-router-dom';
import Switch from "react-switch";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import HorizontalCard from './HorizontalCard';
import ArticlePage from './ArticlePage';
import SearchPage from './SearchPage';
import FavoritePage from './FavoritePage';
import SearchBar from './SearchBar';
import { bool } from 'prop-types';

class App extends React.Component {
    constructor(props) {
        super(props);
        var flag = true;
        if(localStorage.getItem('sliderVal')) {
            flag = Boolean(localStorage.getItem('sliderVal'));
        }
        this.state = {
            showSwitch: true,
            isFav: false,
            width: window.innerWidth,
            inputValue: '',
            smallScreen: window.matchMedia('(max-width: 900px)').matches,
            sliderVal: flag,
        };
        // localStorage.setItem('sliderVal',this.state.sliderVal);
        this.handleChange = this.handleChange.bind(this);
        this.hideSwitch = this.hideSwitch.bind(this);
        this.unhideSwitch = this.unhideSwitch.bind(this);
        this.setSearch = this.setSearch.bind(this);

        // // console.log('from constructor, sliderVal is ', this.state.sliderVal);
    }

    handleChange(s) {
        // console.log(sliderVal, this.state.sliderVal);
        this.setState({ sliderVal: s });
        // console.log(sliderVal, this.state.sliderVal);
        // console.log('from handleChange, state sliderVal is ', this.state.sliderVal);

        localStorage.setItem('sliderVal',(s ? 'true' : 'false'));
    }

    hideSwitch = () => {
        // // console.log('in hideSwitch fn');
        this.setState({showSwitch: false});
    }

    unhideSwitch = () => {
        // // console.log('in unhideSwitch fn');
        this.setState({showSwitch: true});
    }

    showFavPage = () => {
        this.setState({isFav: true});
    }

    hideFavPage = () => {
        this.setState({isFav: false});
    }
 
    setSearch(s) {
        // console.log('will clear search query here!');
        this.setState({inputValue: s});
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
        if(this.state.width > 900) this.setState({smallScreen: false}); else this.setState({smallScreen: true}); 
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUpdate(prevProps, prevState) {
        window.addEventListener('resize', this.updateDimensions);
        if(prevState.sliderVal !== this.state.sliderVal) {
            localStorage.setItem('sliderVal',this.state.sliderVal);
        }
    }

    render() {
        return(
            <>
                <Router>
                    <Navbar collapseOnSelect expand="lg" style={{ backgroundImage: 'linear-gradient(to right, #162949 , #4c6cb7)' }} >
                            <div id="searchbox" style={{ minWidth: '220px' }}>
                                <SearchBar value={this.state.sliderVal} serachVal={this.state.inputValue} />
                            </div>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />                            
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavLink activeClassName="active" className="inactive" exact={true} to='/' >Home</NavLink>
                                    <NavLink activeClassName="active" className="inactive" to='/world' >World</NavLink>
                                    <NavLink activeClassName="active" className="inactive" to='/politics' >Politics</NavLink>
                                    <NavLink activeClassName="active" className="inactive" to='/business' >Business</NavLink>
                                    <NavLink activeClassName="active" className="inactive" to='/technology' >Technology</NavLink>
                                    <NavLink activeClassName="active" className="inactive" to='/sports' >Sports</NavLink>
                                </Nav>          
                                <Nav>
                                    <Nav.Link as={Link} style={{ color: 'white' }} data-tip data-for="favorite-bar" to='/favorite' > 
                                        {this.state.isFav ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />} 
                                    </Nav.Link>
                                    {
                                        this.state.smallScreen ? <></> :
                                        <ReactTooltip id='favorite-bar' place="bottom" effect='solid'>
                                            <span>BookMark</span>
                                        </ReactTooltip>
                                    }
                                    { this.state.showSwitch ? <span id="slider" className="sliderClass" ref={this.myRef}>
                                        <span style={{ verticalAlign: 'super' }}>NYTimes</span>
                                        {(this.state.smallScreen ? <br></br> : null)}
                                        <span style={{ display: 'inline-block' }}>
                                            <label>
                                                <Switch onChange={this.handleChange} checkedIcon={false} uncheckedIcon={false} onColor="#4696ec" offColor="#dddddd" checked={this.state.sliderVal} />
                                            </label>
                                        </span>
                                        {(this.state.smallScreen ? <br></br> : null)}
                                        <span style={{ verticalAlign: 'super' }}>Guardian</span>
                                    </span> : <> </> }
                                </Nav>
                            </Navbar.Collapse>
                    </Navbar>
                    <SwitchRoute>
                        <Route key="home" path="/" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="home" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch}  hideFavPage={this.hideFavPage}/>} />    
                        <Route key="world" path="/world" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="world" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch}  hideFavPage={this.hideFavPage}/>} />  
                        <Route key="business" path="/business" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="business" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch} hideFavPage={this.hideFavPage} />} />    
                        <Route key="politics" path="/politics" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="politics" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch} hideFavPage={this.hideFavPage}/>} />    
                        <Route key="technology" path="/technology" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="technology" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch} hideFavPage={this.hideFavPage}/>} />    
                        <Route key="sports" path="/sports" exact render={() => <HorizontalCard setSearch={this.setSearch}  page="sports" smallScreen={this.state.smallScreen} sliderVal={this.state.sliderVal} hideFn={this.hideSwitch} unhideFn={this.unhideSwitch} hideFavPage={this.hideFavPage}/>} />                             
                        <Route key="article" path="/article"  render={() => <ArticlePage setSearch={this.setSearch}  hideFn={this.hideSwitch} hideFavPage={this.hideFavPage}  /> } />
                        <Route key="search" path="/search"  render={() => <SearchPage hideFn={this.hideSwitch} hideFavPage={this.hideFavPage} setSearch={this.setSearch}/> } />
                        <Route key="favorite" path="/favorite"  render={() => <FavoritePage setSearch={this.setSearch}  hideFn={this.hideSwitch} showFavPage={this.showFavPage}/> } />
                    </SwitchRoute>
                </Router>
            </>
        );
    }
}

export default App;