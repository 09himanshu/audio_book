import express from 'express';
import bodyParser from 'body-parser';


main();

async function main() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    start(app,env);
}

async function start(app, env) {
    try {
        app.listen(app.port, () => {
            console.log(`===========>>>>>>>>>> Server Started on port ${env.port}<<<<<<<=========`);
        })
    } catch (err) {
        throw new Error(err)
    }
}