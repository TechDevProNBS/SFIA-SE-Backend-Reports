console.log('running');

/**
 * Importing required modules.
 * Connecting to a config.json file which has connections and passwords for databases
 * dependent on the profile selected.
 */
let express = require('express');
let bodyparser = require('body-parser');
let mongodb = require('mongodb')
let mongo = require('mongodb').MongoClient;

/**
 * This is where to select the database that is referenced throughout the backend.
 */
let allConfig = require('./config.json');
let profile = process.env.ENVIRON || allConfig.currentProfile;
let config = allConfig[profile];
let database = config.reports_database;

let url = `mongodb+srv://${database.user}:${database.password}@nationwide-ld1bk.azure.mongodb.net/test`;
let app = express();
let cors = require('cors');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

let dbName = database.name;
let dbCollection = database.collection;

/**
 * Get request to return all reports.
 */
app.get('/API/reports/getReportList', function (req, res) {
    mongo.connect(url, function (err, client) {
        if (err) throw err;
        db = client.db(dbName);
        db.collection(dbCollection).find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
        client.close();
    });
});

/**
 * Get request to return all reports that can be ordered by ascending or descending date.
 */
app.get('/API/reports/getReportListByDate/:order', function (req, res) {
    if (req.params.order === "asc") {
        var mysort = { date_created: 1 };
    } else if(req.params.order === "desc"){
        var mysort = { date_created: -1 };
    }
    mongo.connect(url, function (err, client) {
        if (err) throw err;
        db = client.db(dbName);
        db.collection(dbCollection).find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
        client.close();
    });
});

/**
 * Get request to return all reports that belong to a single user.
 */
app.get('/API/reports/getReportById/:id', function (req, res) {
    let data = {
        _id: new mongodb.ObjectID(req.params.id)
    }
    mongo.connect(url, function (err, client) {
        if (err) throw err;
        db = client.db(dbName);
        db.collection(dbCollection).find(data).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
        client.close();
    });
});

/**
 * Post request to create report. Expects JSON for data.
 */
app.post('/API/reports/postReport', function (req, res) {
    data = req.body;
    mongo.connect(url, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        } else {
            db = client.db(dbName)
            db.collection(dbCollection).insertOne(data, function (error, result) {
                if (error) {
                    console.log('Error occurred while inserting record...\n', error);
                }
            });
            console.log("success");

            res.send("Success");
            client.close();
        }
    });
});

/**
 * Port number read from config.json file.
 */
app.listen(config.node_port_report_backend);