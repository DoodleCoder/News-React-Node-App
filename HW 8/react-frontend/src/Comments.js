import React from 'react';
import commentBox from 'commentbox.io';
import qs from 'qs';
 
 
class Comments extends React.Component {
    componentDidMount() {
 
        this.removeCommentBox = commentBox('5703689708765184-proj', {
            className: 'commentbox', // the class of divs to look for
            defaultBoxId: this.props.id + 'commentbox', // the default ID to associate to the div
            tlcParam: 'tlc', // used for identifying links to comments on your page
            createBoxUrl(boxId, pageLocation) {        
                pageLocation.search = ''; // removes query string!
                pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
                return pageLocation.href; // return url string
            }
            // createBoxUrl(boxId,  pageLocation) {
            //     const queryParams = qs.parse(pageLocation.search.replace('?', ''));
            //     const relevantParams = {
            //         'id': queryParams['id']
            //     };
            //     pageLocation.search = qs.stringify(relevantParams); // we will now include "?page_id=5" in the box URL
            //     pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
            //     console.log(pageLocation.href);
            //     return pageLocation.href; // return url string
            // }

        });
    }
 
    componentWillUnmount() {
 
        this.removeCommentBox();
    }
    
    render() {
        
        return (
            <div className="commentbox" />
        );
    }
}

export default Comments;