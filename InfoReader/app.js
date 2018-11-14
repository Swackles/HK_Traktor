'use strict';
const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

// Router
app.use('/traktor', require('./routes/traktor.js'));


app.get('/tetris', (req, res, next) => {
    res.render('tetris', {title: "Tetris"});
});

// catch 404
app.use((req, res, next) => {
    res.status(404); res.render('404', {title: "ERROR 404", Products: [
        {
            "name": "MTZ-80 / 82 / 820", "menu": ["Mootori osad", "Toitesüsteem", "Sumbutajad", "Jahutussüsteem", "Õlitussüsteem", "Sidur", "Käigukast", "Jaotuskast", "Kardaanid ja vahetugi"]
        },
        {
            "name": "MTZ-900 / 920 / 950 / 952", "menu": ["Mootori osad", "Toitesüsteem", "Sumbutajad", "Jahutussüsteem", "Õlitussüsteem", "Sidur", "Käigukast", "Jaotuskast", "Esisild"]
        },
        {
            "name": "MTZ-1005 / 1025", "menu": ["Mootori osad", "Toitesüsteem", "Sumbutajad", "Jahutussüsteem", "Õlitussüsteem", "Pneumosüsteem", "Sidur", "Käigukast", "Jaotuskast"]
        },
        {
            "name": "T-40", "menu": [ "Mootori", "Toitesüsteem", "Õlitussüsteem", "Esisild", "Sidur T-40", "Käigukast", "Tagasild", "Pidur", "Elektrisüsteem"]
        },
        {
            "name": "T-25", "menu": [ "Mootori osad", "Õlitussüsteem", "Esisild", "Sidur", "Käigukast", "Tagasilla lõppülekabbe", "Jõuvõtuvõll", "Rippsüsteem", "Hüdropumba ajam"]
        },
        {
            "name": "Põllumajandustehnika", "menu": [ "Kaaruti/2M/7681/PL.", "Kultivaator 3.2M", "Niiduki/1.35m", "Niiduki/1.65/5862", "Niiduki/1.85/8488"]
        },
    ]});
});
// error handlers

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
});

console.log("Sever is now live and listening to port: " +server.address().port);
