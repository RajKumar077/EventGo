import React, { Component } from "react";
// import upload_img from "../images/upload_doc.png";
import { Row, Container, Card, Col, Form, Button } from "react-bootstrap";
import { storage } from "../../Raj/firebase";
import Axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class VerifyId extends Component {
  constructor(props) {
    super(props);
    var isLoggedIn = true;
    const userId = Cookies.get("userId");
    if (userId == null) {
      isLoggedIn = false;
    }

    this.state = {
      isLoggedIn,
      userid: userId,
      files: [],
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      imageError: "",
    };
  }

  handleImgFiles = (e) => {
    if (e.target.files.length > 2) {
      e.preventDefault();
      this.setState({ imageError: "Only 2 images allowed..." });
    } else {
      let reader1 = new FileReader();
      let file1 = e.target.files[0];
      if (
        file1.name.slice(-3) == "jpg" ||
        file1.name.slice(-3) == "png" ||
        file1.name.slice(-4) == "jpeg"
      ) {
        this.state.files.push(file1);
        reader1.onloadend = () => {
          this.setState({
            imagePreviewUrl1: reader1.result,
            imageError: "",
          });
        };
        reader1.readAsDataURL(file1);
      } else {
        this.setState({
          imageError: "Only jpg, jpeg and png formats allowed..",
        });
      }

      if (e.target.files.length > 1) {
        let reader2 = new FileReader();
        let file2 = e.target.files[1];

        if (
          file2.name.slice(-3) == "jpg" ||
          file2.name.slice(-3) == "png" ||
          file2.name.slice(-4) == "jpeg"
        ) {
          this.state.files.push(file2);
          reader2.onloadend = () => {
            this.setState({
              imagePreviewUrl2: reader2.result,
            });
          };
          reader2.readAsDataURL(file2);
        } else {
          this.setState({
            imageError: "Only jpg, jpeg and png formats allowed..",
          });
        }
      }
    }
  };

  onClearImgBtnClick = (e) => {
    e.preventDefault();
    this.setState({
      imageError: "",
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      files: [],
      imageurls: [],
    });
    document.getElementById("Verify_id_File").value = null;
  };

  renderClearImgBtn = (img) => {
    return img != "" && img != null ? (
      <button onClick={this.onClearImgBtnClick}>clear</button>
    ) : null;
  };

  putVerifyId = async (urls) => {
    console.log(urls);
    var urljson = {
      image1: urls[0],
      image2: urls[1],
    };
    await Axios.put(
      "https://eventgoapi.herokuapp.com/verifyid/addid/" + this.state.userid,
      urljson
    )
      .then((res) => {
        if (res.data == true) {
          alert("sucessfully uploaded");
        } else {
          alert("Something went wrong try again!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ImageUpload = () => {
    //event.preventDefault();
    let urls = [];
    let counter = -1;
    // this.setState({ imageurls: [] })
    let { files } = this.state;
    // return new Promise((resolve, reject) =>
    // if (files.length > 0) {
    files.forEach((file, index) => {
      //Upload images to Firebase
      storage
        .ref(`images/${file.name}`)
        .put(file)
        .on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                //get the image URL
                urls.push(url);
                counter = counter + 1;
                if (counter == files.length - 1) {
                  // resolve(urls)
                  //data base url
                  this.putVerifyId(urls);
                }
              });
          }
        );
    });

    // }
    // else {
    //   if (this.state.isUpdate) {
    //     if (this.state.imagePreviewUrl1 != null) {
    //       urls.push(this.state.imagePreviewUrl1)
    //     }
    //     if (this.state.imagePreviewUrl2 != null) {
    //       urls.push(this.state.imagePreviewUrl2)
    //     }
    //     resolve(urls);
    //   }
    //   resolve(urls);
    // }
  };

  renderError = (err) => {
    return err != "" && err != null ? (
      <p style={{ color: "red" }}>{this.state.imageError}</p>
    ) : null;
  };

  renderDragGif = (img1, img2) => {
    return (img1 != "" && img1 != null) ||
      (img2 != "" && img2 != null) ? null : (
      <img
        src={
          "https://css-tricks.com/wp-content/uploads/2015/11/drag-drop-upload-1.gif"
        }
        alt="docupload"
        width="90%"
      />
    );
  };

  renderImgPreview = (img) => {
    return img != "" && img != null ? (
      <img
        className="uploadimg"
        src={img}
        width="50%"
        height="50%"
        border="1"
      />
    ) : null;
  };

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div style={{ backgroundColor: "black" }}>
        <Card style={{ padding: "5rem" }}>
          <Row className="m-3">
            <h1> Identity Verification!!</h1>
          </Row>

          <Row>
            <Col>
              <h2 style={{ color: "black" }}> What to Upload.. </h2>
              <br />
              <p width="90%">
                To Verify your identity, you need to upload any official
                government Document.
                <p>List of valid Id:</p>
                <p>1. Drivers licence</p>
                <p>2. Passport</p>
                <p>3. Health Card</p>
                <p>4. Vehicle Ownership</p>
              </p>
              <p width="90%">
                Other Documents which has your living address proof, Your
                portrait photo with correct name and age can be uploaded.
              </p>

              <p style={{ color: "blue" }}>
                Note : Only Images that too in JPG, JPEG, and PNG formats are
                only allowed. Also there is a limit of 2 Images only (Front and
                Back images of document if needed){" "}
              </p>
              <br />
              <Button variant="primary" onClick={() => this.ImageUpload()}>
                Upload Document
              </Button>
            </Col>
            <Col>
              <Form>
                <Form.Group style={{ textAlign: "center" }}>
                  {this.renderDragGif(
                    this.state.imagePreviewUrl1,
                    this.state.imagePreviewUrl2
                  )}

                  {this.renderImgPreview(this.state.imagePreviewUrl1)}
                  <br />
                  {this.renderImgPreview(this.state.imagePreviewUrl2)}
                  <br />
                  <br />
                  {this.renderClearImgBtn(this.state.imagePreviewUrl1)}
                  {this.renderError(this.state.imageError)}
                  <br />
                  <br />
                  <Form.File
                    id="Verify_id_File"
                    multiple
                    style={{ marginLeft: "12rem" }}
                    onChange={this.handleImgFiles}
                    accept="image/*"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default VerifyId;
