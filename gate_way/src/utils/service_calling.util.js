import fetch from 'node-fetch';

async function call_api(url, headers = null, method = null, body = null) {
    let call_options = {};

    if (method) {
        call_options["method"] = method;
    }
    if (headers) {
        call_options["headers"] = headers;
    }
    if (body) {
        call_options["body"] = JSON.stringify(body);
    }
    try {
        console.log(`***** ${call_options.method?.toUpperCase() || "GET"} : ${url} *****`)
        console.log(`Request headers: ${JSON.stringify(call_options.headers) || "No headers"}`)
        console.log(`Request body: ${JSON.stringify(call_options.body) || "No body"}`)

        const response = await fetch(url, call_options);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
        console.log(`Error occur at ${err}`);
    }
}

export {call_api}