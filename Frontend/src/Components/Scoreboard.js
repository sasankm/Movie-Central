import React, {Component} from 'react';
import Navbar from './Navbar.js';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import classnames from 'classnames';
Charts(FusionCharts);

class Scoreboard extends Component{

    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab:'1'
        }
    }

    componentDidMount(){
        //get top movies and highly rated movies 
    }

    toggle(tab) {
	    if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
	    }
	}

    render(){
        let chartConfigs = {
            type: 'column2d',// The chart type
            width: '700', // Width of the chart
            height: '400', // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: { 
                // Chart Configuration 
                "chart": {
                    "caption": "Top 10 Most Popular Movies",
                    "xAxisName": "Movie",
                    "yAxisName": "Number of times played (in count)",
                    "theme": "candy",
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
                <Navbar/><br/><br/><br/>
                <div class="container">
                    <div class="row"><div class="col-sm-1"></div>
                        <div class="col-sm-7">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                        Most Popular Movies
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                        Most Highly Rated Movies 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                <ReactFC {...chartConfigs} />
                                </TabPane>
                                <TabPane tabId="2">
                                <ReactFC {...chartConfigs} />
                                </TabPane>
                            </TabContent>
                        </div><div class="col-sm-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scoreboard;