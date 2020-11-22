import React, { Component } from "react";
import TutorialDataService from "../services/tutorialServ";
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            price: "",
            contact: "",
            published: false,
            file: null,

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    saveTutorial() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            contact: this.state.contact,
        };

        const imgData = new FormData()
        imgData.append('file', this.state.file)


        var postId = 0;

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    contact: response.data.contact,
                    published: response.data.published,

                    submitted: true
                });
                postId = response.data.id;
                console.log("DOES THIS GET RAN");

            })
            .catch(e => {
                console.log(e);
            });

        TutorialDataService.uploadImg(imgData)
            .then(response => {
                console.log("Response:")
                console.log(response.data);


            }).catch(e =>{
                console.log(e);

        })
    }

    newTutorial() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            price: "",

            submitted: false
        });
    }

    onChangeHandler=event=>{
        this.setState({
            file: event.target.files[0],
            loaded: 0,
        })
    }


    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact"
                                required
                                value={this.state.contact}
                                onChange={this.onChangeContact}
                                name="contact"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Upload File:</label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                onChange={this.onChangeHandler}
                                name="file"
                            />
                        </div>


                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }

}