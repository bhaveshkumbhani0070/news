var pool = require('../config/db.js');



exports.agency = function(req, res) {
    var value = req.query.value;
    var field = req.query.field;

    console.log('value', value);
    console.log('field', field);

    pool.connect(function(db) {
        if (db) {
            console.log('connected');
            news = db.collection('news');

            switch (field) {
                case "no":
                    var query = { no: value };
                    break;
                case "author":
                    var query = { author: value };
                    break;
                case "date":
                    var query = { date: new Date(value) }
                    break;
                case "title":
                    var query = { title: value }
                    break;
                default:
                    break;
            }

            console.log('query', query);

            news.find(query).limit(10).toArray(
                function(err, data) {
                    if (!err) {
                        console.log('data', data.length);
                        res.send({ code: 200, status: 'success', message: 'data get', 'data': data });
                        return;
                    } else {
                        console.log('Errr', err);
                        return;
                    }
                });
        } else {
            console.log('Error');
        }
    });
}