/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import {connect} from 'react-redux'
import {reset} from "redux-form";
import * as ModalIds from '../modal/modalDialogIds'
import * as Modal from '../modal/modalDialog'
import {PropTypes as Prop}  from "react";


const PluginsTopNavItem = (props) => {
    return <li className="slds-context-bar__item">
        <a href="javascript:void(0);"  onClick={() => props.showPluginsDialog()} className="slds-context-bar__label-action" title="Menu Item 1">
            <span className="slds-truncate">Plugins</span>
        </a>
    </li>
};

PluginsTopNavItem.propTypes = {
    showPluginsDialog: Prop.func.isRequired
};


export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            showPluginsDialog: () => {
                dispatch(Modal.showModal(ModalIds.PLUGINS))
            }
        }
    }
)(PluginsTopNavItem);
