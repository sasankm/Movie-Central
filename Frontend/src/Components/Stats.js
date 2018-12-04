import React, {Component} from 'react';
import Navbar from './Navbar.js';
import {ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


class Stats extends Component{

    constructor(props){
        super(props);

        // this.handleClick1 = this.handleClick1.bind(this);
        // this.handleClick2 = this.handleClick2.bind(this);
        // this.handleClick3 = this.handleClick3.bind(this);

    }

    componentDidMount(){
        // top 10 movies and users
    }

    handleClick1(e){
        console.log("in handle click");
    }

  
    render(){
        const chartConfigs = {
            type: 'column2d',// The chart type
            width: '700', // Width of the chart
            height: '400', // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: { 
                // Chart Configuration 
                "chart": {
                    "caption": "Top 10 Movies based on number of plays",
                    "xAxisName": "Movie",
                    "yAxisName": "Number of times played (in count)",
                    "theme": "fusion",
                },
                // Chart Data
                "data": [{
                    "label": "Venezuela",
                    "value": "90"
                }, {
                    "label": "Saudi",
                    "value": "60"
                }, {
                    "label": "Canada",
                    "value": "80"
                }, {
                    "label": "Iran",
                    "value": "40"
                }, {
                    "label": "Russia",
                    "value": "15"
                }, {
                    "label": "UAE",
                    "value": "00"
                }, {
                    "label": "US",
                    "value": "30"
                }, {
                    "label": "China",
                    "value": "30"
                }]
            }
        };
        return(
            <div>
                <Navbar/>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <h2>Top 10 Movies </h2> 
                             <DropdownButton  bsStyle="primary" bsSize="large" title="Select" id="dropdown-size-large">
                                <MenuItem eventKey="1" onClick={this.handleClick1}>24 hours</MenuItem>
                                <MenuItem eventKey="2" onClick={this.handleClick2}>week</MenuItem>
                                <MenuItem eventKey="3" onClick={this.handleClick3}>month</MenuItem>
                            </DropdownButton>
                            <ReactFC {...chartConfigs} />
                        </div>
                    </div>
                    <hr/>
                    <hr/>
                    <div>
                        <div class="col-lg-4">
                            <h2>Top 10 Users </h2>
                            <DropdownButton  bsStyle="primary" bsSize="large" title="Select" id="dropdown-size-large">
                                <MenuItem eventKey="1">24 hours</MenuItem>
                                <MenuItem eventKey="2">week</MenuItem>
                                <MenuItem eventKey="3">month</MenuItem>
                            </DropdownButton>
                            <ReactFC {...chartConfigs} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;

