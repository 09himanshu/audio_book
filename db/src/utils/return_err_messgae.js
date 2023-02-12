
const errorMessage = async (err) => {
    return {status: false, message: 'failure'.toUpperCase(), data: `Internal server error occur ${err.message}`}
}

const successMessage = async (data) => {
    return {status: true, message: 'success'.toUpperCase(), data: data};
}

export {errorMessage, successMessage}