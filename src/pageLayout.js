import * as React from "react"
import {Component} from "react"
import * as ReactDOM from "react-dom"
import {PropTypes as Prop}  from "react"
import {connect} from 'react-redux'
import * as Dashboard from './dashboard/dashboard'
import WidgetGrid from "./widgets/widgetGrid.ui"
import $ from "jquery"
import LayoutsNavItem from "./layouts/layouts.ui"
import WidgetConfigDialog from "./widgets/widgetConfigDialog.ui"
import DashboardMenuEntry from "./dashboard/dashboardMenuEntry.ui"
import ImportExportDialog from "./dashboard/importExportDialog.ui"
import DatasourceConfigDialog from "./datasource/datasourceConfigDialog.ui"
import DatasourceNavItem from "./datasource/datasourceNavItem.ui"
import WidgetsNavItem from "./widgets/widgetsNavItem.ui"
import PluginNavItem from './pluginApi/pluginNavItem.ui'
import PluginsDialog from './pluginApi/pluginsDialog.ui'
import * as Persistence from './persistence'

export class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {hover: false};
    }

    onReadOnlyModeKeyPress(e) {
        //console.log("key pressed", event.keyCode);
        var intKey = (window.Event) ? e.which : e.keyCode;
        if (intKey === 27) {
            this.props.setReadOnly(!this.props.isReadOnly);
        }
    }

    componentDidMount() {
        this.onReadOnlyModeKeyPress = this.onReadOnlyModeKeyPress.bind(this);

        ReactDOM.findDOMNode(this)
            .offsetParent
            .addEventListener('keydown', this.onReadOnlyModeKeyPress);
    }

    render() {
        const props = this.props;

        var showMenu = !props.isReadOnly || this.state.hover;

        return <div onKeyUp={(event) => this.onReadOnlyModeKeyPress(event)}>
            <div>
                <WidgetConfigDialog/>
                <ImportExportDialog/>
                <DatasourceConfigDialog/>
                <PluginsDialog/>
            </div>
            <div className="container">
                <div className={showMenu ? "" : "menu-trigger"}
                     onMouseOver={()=> { this.setState({hover:true})}}
                     onMouseEnter={()=> {this.setState({hover:true})}}

                ></div>
                <div className={"ui inverted fixed main menu " + (showMenu ? "topnav--visible" : "topnav--hidden")}
                     onMouseOver={()=> { this.setState({hover:true})}}
                     onMouseLeave={()=> {this.setState({hover:false})}}
                >
                    <div className="ui container">
                        <a href="#" className="header item">
                            {/*<img className="logo" src="assets/images/logo.png"/>*/}
                            Dashboard
                        </a>

                        <DashboardMenuEntry/>
                        <WidgetsNavItem/>
                        <DatasourceNavItem/>
                        <PluginNavItem/>
                        <LayoutsNavItem/>
                        <a className="item" onClick={() => Persistence.clearData()}>
                            <i className="red bomb icon"/>
                            Reset Everything!
                        </a>
                        <a className="item" onClick={() => props.setReadOnly(!props.isReadOnly)}>
                            <i className={ (props.isReadOnly ? "lock" : "unlock alternate")  + " icon"}/> {/*expand*/}
                        </a>

                    </div>

                </div>

                {/* TODO: Use custom classes for everything inside the Grid to make it customizable without breaking semantic-ui */}
                <div className="ui grid">
                    <WidgetGrid/>
                </div>
            </div>
        </div>
    }

}

Layout.propTypes = {
    setReadOnly: Prop.func.isRequired,
    isReadOnly: Prop.bool.isRequired
};

export default connect(
    state => {
        return {
            isReadOnly: state.dashboard.isReadOnly
        };
    },
    dispatch => {
        return {
            setReadOnly: (isReadOnly) => dispatch(Dashboard.setReadOnly(isReadOnly))
        };
    }
)(Layout);