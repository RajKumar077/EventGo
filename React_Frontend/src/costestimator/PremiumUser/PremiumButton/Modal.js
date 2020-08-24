import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "js-cookie";



function ModalPremium(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const makePremium = () =>{
        let url = "https://eventgoapi.herokuapp.com/makePremium/makePremium/";
        //let url = "http://localhost:8080/makePremium/makePremium/";

        axios.put(url + props.userID)
            .then(res => {
                Cookies.remove('isPremium')
                Cookies.set("isPremium", 1)
                console.log(res);
                console.log(Cookies.get("isPremium"));
            }).catch(err => {
            console.log(err);
        })
        alert("You are a Premium user now")

    }
    const premiumWrapper =()=>{
        handleClose();
        makePremium();
    }

    return(
        <div>

            <Button variant="primary" onClick={handleShow} type="submit" style={{ backgroundColor: "transparent" }}>
                Premium
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Why get premium?</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <ul>
                        <li>Free add bump every 6 hrs </li>
                        <li>Special add box for easier attraction</li>
                        <li>Post unlimited adds</li>
                        <li>Premium features at only 6 CAD/mo</li>
                    </ul>


                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>premiumWrapper()}>
                        Get premium now
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default ModalPremium;
