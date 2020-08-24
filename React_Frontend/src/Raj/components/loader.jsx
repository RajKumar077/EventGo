//@Author - RajKumar B00849566

import React, { Component } from 'react';

class Loader extends Component {
    state = {  }
    render() { 
        return ( 
            <div> <br />
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            
         );
    }
}
 
export default Loader;