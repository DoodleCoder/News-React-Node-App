import React from 'react';
// import { white, black } from 'color-name';
import Badge from 'react-bootstrap/Badge'

class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const colorMap = {
            'business': ['#4696ec', '#ffffff'],
            'world': ['#7c4eff', '#ffffff'],
            'politics': ['#419488', '#ffffff'],
            'technology': ['#cedc39', '#000000'],
            'sports': ['#f6c244', '#000000'],
            'sport': ['#f6c244', '#000000'],
            'guardian': ['#14284a', '#ffffff'],
            'nytimes': ['#dedede', '#000000'],
        };
        
        var c = colorMap[this.props.value] ? colorMap[this.props.value] : ['#6e757c', '#ffffff']; 
        const styles = {
            color: c[1],
            backgroundColor: c[0],
        }

        return(
            <Badge style={ styles }>{this.props.value.toUpperCase()}</Badge>
        )
    }
}

export default CardSection;