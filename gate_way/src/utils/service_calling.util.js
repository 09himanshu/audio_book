import fetch from 'node-fetch';

async function call_api (url, headers = null ,method = null,body = null) {

    let methods_options = {};
    if(headers) {
        methods_options['headers'] = headers;
    }

    if(method) {
        methods_options['methods'] = method;
    }

    if(body) {
        methods_options.body = JSON.stringify(body);
    }

    console.log(methods_options);
    try {
        const response = await fetch(url, methods_options);
        const data = response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {call_api}