/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as FreeboardDatasource from './freeboardDatasource'
import * as PluginCache from './pluginCache'

function mapSettings(settings) {
    return settings.map(setting => {
        return {
            id: setting["name"],
            name: setting["display_name"],
            description: setting["description"],
            type: setting["type"],
            defaultValue: setting["default_value"],
            required: setting["required"]
        }
    })
}

const freeboardPluginApi = {

    /**
     * Method to register a DatasourcePlugin as you would with the IoT-Dashboard API
     * But supporting the Freeboard syntax
     * @param plugin A Freeboard Datasource Plugin.
     * See: https://freeboard.github.io/freeboard/docs/plugin_example.html
     */
    loadDatasourcePlugin(plugin) {
        console.log("Loading freeboard Plugin: ", plugin);

        const typeName = plugin["type_name"];
        const displayName = plugin["display_name"];
        const description = plugin["description"];
        const externalScripts = plugin["external_scripts"];
        const settings = plugin["settings"];
        const newInstance = plugin["newInstance"];

        const TYPE_INFO = {
            type: typeName,
            name: displayName,
            description: description,
            dependencies: externalScripts,
            settings: mapSettings(settings)
        };

        const dsPlugin = {
            TYPE_INFO,
            Datasource: FreeboardDatasource.create(newInstance, TYPE_INFO)
        };

        PluginCache.registerDatasourcePlugin(dsPlugin.TYPE_INFO, dsPlugin.Datasource);
    }


};

window.freeboard = freeboardPluginApi;

export default freeboardPluginApi;
