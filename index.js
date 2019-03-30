/**
 * Makes a deep object clone
 * @param obj Object to copy
 * @returns Cloned Object
 */
function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}

var defaultSetOptions = {
    numericPathAsArray: false,
    separator: '.'
};

/**
 * Sets object property given a path
 * @param path Property path separated with separator (default: '.')
 * @param data Data to set
 * @param obj Object for which to set
 * @param options Path parsing options (optional)
 */
function setProp(path, data, obj, options = defaultSetOptions) {
    var pathParts = path.split(options.separator);
    while (pathParts.length > 1) {
        var part = pathParts.shift();
        if (obj[part] === null || obj[part] === undefined) {
            if (options.numericPathAsArray && !isNaN(parseInt(part, 10)))  {
                obj[part] = []
            } else {
                obj[part] = {}
            }
        }
        obj = obj[part]
    }
    obj[pathParts[0]] = data
}

/**
 * Sets object property given a path and returns a copy of the object
 * @param path Property path separated with separator (default: '.')
 * @param data Data to set
 * @param obj Object for which to set
 * @param options Path parsing options (optional)
 * @returns Object with property set
 */
function setPropImmutable(path, data, obj, options = defaultSetOptions) {
    obj = cloneDeep(obj);
    setProp(path, data, obj, options);
    return obj;
}

var defaultGetOptions = {
    separator: '.',
    defaultValue: undefined
};

/**
 * Gets value from object given a path
 * @param path Property path separated with separator (default: '.')
 * @param obj Data from where to get
 * @param options Path parsing options (optional)
 * @returns Data from object or default value if data is not found
 */
function getProp(path, obj, options = defaultGetOptions) {
    var pathParts = path.split(options.separator);
    while (pathParts.length > 0) {
        var part = pathParts.shift();
        if (obj[part] === null || obj[part] === undefined) {
            return options.defaultValue
        }
        obj = obj[part]
    }
    if (obj === null || obj === undefined) return options.defaultValue;
    return obj;
}

/**
 * Map data from input event into object
 * @param e InputEvent
 * @returns Object in format {inputName: inputValue}
 */
function mapInputEventData(e) {
    return {[e.target.name]: e.target.value}
}

module.exports = {
    cloneDeep, setProp, setPropImmutable, getProp, mapInputEventData
};
