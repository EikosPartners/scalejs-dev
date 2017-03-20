const timeout = 100; // simulate server response time
const colors = [
    {
        value: 0,
        text: 'Red'
    },
    {
        value: 1,
        text: 'Orange'
    },
    {
        value: 2,
        text: 'Yellow'
    },
    {
        value: 3,
        text: 'Green'
    },
    {
        value: 4,
        text: 'Blue'
    },
    {
        value: 5,
        text: 'Purple'
    }
];

const things = [
    {
        color: 0,
        text: 'Apples'
    },
    {
        color: 0,
        text: 'Fire Trucks'
    },
    {
        color: 1,
        text: 'Oranges'
    },
    {
        color: 4,
        text: 'Sky'
    },
    {
        color: 4,
        text: 'Oceans'
    },
    {
        color: 4,
        text: 'BlueBerry'
    }
];

var formData = null;

// request can either be a string (url), or an object with request.url, and/or request.options
// request.options can specify the options.type (GET/POST/ect), and options.data to send in request.
function _ajax(request, callback) {
    // Extract options and url from request:
    let req = request || baseUri; // Default for request when falsy

    const isRequestString = (typeof req === 'string' || req instanceof String),
        // use request.options if exists, otherwise use {}
        options = (!isRequestString && req.options) || {},
        type = (options.type || 'GET').toUpperCase(),
        data = req.data || req.data;

    let url = (isRequestString ? req : req.url || '/') + (req.uri || '');

    // Check if we're in the testing suite.
    if (window.location.port === '9004' || window.location.protocol === 'file:') {
        url = 'http://localhost:3000' + url;
    }

    // Create request:
    req = new XMLHttpRequest();

    req.withCredentials = true;

    req.onreadystatechange = function () {
        // Check to make sure request is completed, otherwise ignore:
        if (this.readyState === XMLHttpRequest.DONE) {
            let response = this.response;
            if (this.status === 200) {
                // Request was successful, now parse:
                if (this.getResponseHeader('Content-Type').includes('application/json')) {
                    try {
                        response = JSON.parse(response);
                    } catch (error) {
                        // Failed to parse, error:
                        return callback({
                            error: error,
                            status: this.status,
                            message: response
                        });
                    }
                }

                callback(undefined, response);
            } else {
                // Request errored in some way, return error:
                callback({
                    error: this.statusText,
                    status: this.status,
                    message: response
                });
            }
        }
    };

    // Open and send request:
    req.open(type, url, true);

    // Set options:
    if (type !== 'GET') { req.setRequestHeader('Content-Type', 'application/json'); }

    req.send(type !== 'GET' && JSON.stringify(data));
}

function mockAjax(request, callback) {
    setTimeout(() => {
        switch (request.uri) {
            case 'colors':
                callback(null, { Status: 'Success', data: colors });
                break;
            case 'things':
                callback(null, { Status: 'Success', data: things });
                break;
            case 'form':
                if (request.options && request.options.type === 'POST') {
                    formData = request.data;
                    callback(null, { Status: 'Success', data: formData });
                } else {
                    callback(null, { Status: 'Success', data: formData });
                }
                break;
            default:
                _ajax(request, (error, data) => {
                    callback(error, data);
                });
        }
    }, timeout);
}
export default {
    ajax: mockAjax
};