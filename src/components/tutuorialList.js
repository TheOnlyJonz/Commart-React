import React, { Component } from "react";
import TutorialDataService from "../services/tutorialServ";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.ClearFilter = this.ClearFilter.bind(this);
        this.onChangePriceMin = this.onChangePriceMin.bind(this);
        this.onChangePriceMax = this.onChangePriceMax.bind(this);


        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            priceMin: "",
            priceMax: "",
            img: ""
            // searchDesc: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        this.setState({
            searchTitle: e.target.value
        });
    }

    onChangePriceMin(e) {
        this.setState({
            priceMin: e.target.value
        });
    }
    onChangePriceMax(e) {
        this.setState({
            priceMax: e.target.value
        });
    }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    async setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
        // TutorialDataService.findImg(tutorial.id)
        //     .then(response => {
        //
        //         console.log("1xd")
        //         console.log(response.data[0]);
        //         // var base64Flag = response.data[0].type;
        //         // var imageStr = this.arrayBufferToBase64(response.data[0].data.data);
        //         //
        //         // var b64Response = btoa(response.data[0].data.data);
        //         //
        //         // var outImg;
        //         // outImg = 'image/png;base64,'+ b64Response;
        //         // var outImg =  Buffer.from(response.data[0].data.data,'binary').toString('base64')
        //
        //
        //         this.setState({
        //             img: response.data
        //         } )
        //         console.log("HAHAHAHA")
        //
        //         console.log(this.state.img)
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });

        console.log(tutorial.id)
        // await fetch(`http://localhost:8080/api/tutorials/img?tutorial_id=${tutorial.id}`)
        await fetch(`http://64.225.11.129:8080/api/tutorials/img?tutorial_id=${tutorial.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('haha')
                console.log(data)
                var base64Flag = 'data:image/png;base64,';

                var imageStr = this.arrayBufferToBase64(data[0].data.data);

                this.setState({
                    img: base64Flag + imageStr
                })
         })



        // console.log('adfadf')
        // console.log(this.state.img)
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle, this.state.priceMin, this.state.priceMax)
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    ClearFilter() {
        this.refreshList();
        this.setState({
            searchTitle: "",
            priceMin: "",
            priceMax: ""
        });
    }

    // searchDesc() {
    //     TutorialDataService.findByTitle(this.state.searchTitle)
    //         .then(response => {
    //             this.setState({
    //                 tutorials: response.data
    //             });
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    render() {
        const img = this.state.img;
        return (

            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Keyword"
                            value={this.state.searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        {/*<div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>*/}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min Price"
                            value={this.state.priceMin}
                            onChange={this.onChangePriceMin}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max Price"
                            value={this.state.priceMax}
                            onChange={this.onChangePriceMax}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.ClearFilter}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h4>Commission List</h4>

                    <ul className="list-group">
                        {this.state.tutorials &&
                        this.state.tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === this.state.currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                    </ul>

                    {/*<button*/}
                    {/*    className="m-3 btn btn-sm btn-danger"*/}
                    {/*    onClick={this.removeAllTutorials}*/}
                    {/*>*/}
                    {/*    Remove All*/}
                    {/*</button>*/}
                </div>
                <div className="col-md-6">
                    {this.state.currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {this.state.currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {this.state.currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Price:</strong>
                                </label>{" "}
                                {this.state.currentTutorial.price}
                            </div>
                            <div>
                                <label>
                                    <strong>Contact:</strong>
                                </label>{" "}
                                {this.state.currentTutorial.contact}
                            </div>
                            <div>
                                <img src={img}/>
                            </div>
                            {/*<div>*/}
                            {/*    <label>*/}
                            {/*        <strong>Status:</strong>*/}
                            {/*    </label>{" "}*/}
                            {/*    {this.state.currentTutorial.published ? "Published" : "Pending"}*/}
                            {/*</div>*/}

                            <Link
                                to={"/tutorials/" + this.state.currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Post...</p>
                        </div>
                    )}
                </div>
            </div>
        );    }
}