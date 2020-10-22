import React, { Component } from 'react'
// import "./components/section/Formplot.css"

export class Formplot extends Component {
    render() {
        return (
            <div className="Body-Formplot">
                <div className="Container-Formplot">
                    <h2>Form Plot</h2>
                    <input
                    type="text"
                    placeholder="Enter Your Name Plot"
                    />
                    <input
                    type="text"
                    placeholder="Enter Your Address"
                    />
                    <input
                    type="text"
                    placeholder="Enter Your City"
                    />
                    <input
                    type="text"
                    placeholder="Enter Your Province"
                    />
                    <input
                    type="text"
                    placeholder="Enter Your Country"
                    />
                    <input
                    type="text"
                    placeholder="Enter Your Zip code"
                    />
                    <button>Submit</button>
                </div>
            </div>
        )
    }
}

export default Formplot
