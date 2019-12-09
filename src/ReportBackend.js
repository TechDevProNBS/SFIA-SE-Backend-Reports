console.log('running');

let express = require('express');
let bodyparser = require('body-parser');
let mongodb = require('mongodb')
let mongo = require('mongodb').MongoClient;

let allConfig = require('./config.json');
let profile = allConfig.currentProfile;
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

app.get('/API/getReportList', function (req, res) {
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

app.get('/API/getReportById/:id', function (req, res) {
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

app.post('/API/postReport', function (req, res) {
    data = req.body;
    mongo.connect(url, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        } else {
            db = client.db(dbName)
            db.collection(dbCollection).insertOne(data, function (error, result) {
                if (error) {
                    console.log('Error occurred while inserting record...\n',error);
                }
            });
            console.log("success");
            
            res.send("Success");
            client.close();
        }
    });
});

app.listen(config.node_port_report_backend);