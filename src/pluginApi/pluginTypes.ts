
/**
 * After a plugin was registered, we create a PluginFactory to store and create instances of the loaded Plugin
 */
export interface IPluginFactory<TPlugin extends IPlugin> {
    getInstance(id: string): TPlugin
    dispose(): void
}

/**
 * Describes an actual instance of a Plugin
 */
export interface IPlugin {
}

/**
 * The plugin that is registered to the Dashboard
 */
export interface IPluginModule {
    TYPE_INFO: ITypeInfo
}


export interface ITypeInfo {
    type: string // The name of the type - must be unique
    author?: string // The creator of the plugin
    version?: string // The version of the plugin, use semantic versioning (e.g. 1.4.2)
    name?: string // The user friendly name of the Plugin
    description?: string // A user friendly description that explains the Plugin
    dependencies?: string[] // A list of URL's to load external scripts from. Some scripts like jQuery will be available by default in future
    settings?: ISetting[] // A list of settings that can be changed by the user when the Plugin is initialized
}

export interface ISetting {
    id: string // Technical id, used to receive the value later
    name: string // User friendly string to describe the value
    type: string // Defines how the setting is rendered, validated and interpreted
    description?: string // User friendly description with detail information about the value
    defaultValue?: any // The default value that is preset when a new Plugin is configured, currently must be a string
    required?: boolean // true when the setting is required
}