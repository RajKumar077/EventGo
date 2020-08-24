import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

class Bump extends Component{

    bumpEvent=()=>{
        let url = "https://eventgoapi.herokuapp.com/bumpTimeStamp/bumpTimeStamp";
        //let url = "http://localhost:3000/bumpTimeStamp/bumpTimeStamp";
        axios.post(url )
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
        //     this.props.isPremium?
        //     <Button variant="primary" onClick={this.bumpEvent}>
        //         Bump Event
        //     </Button>:null
            null
         )
    }
}

export default Bump
