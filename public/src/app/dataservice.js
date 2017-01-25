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
                if (request.options.type === 'POST') {
                    formData = request.data;
                    callback(null, { Status: 'Success', data: formData });
                } else {
                    callback(null, { Status: 'Success', data: formData });
                }
                break;
            default:
                callback({ Status: 'Error', message: 'Error' });
        }
    }, timeout);
}
export default {
    ajax: mockAjax
};