const express = require('express');
const router = express.Router();
const mysql = require('./../mysql.js');

var productList = [
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
];

router.use( function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get("/", (req, res, next) => {
    res.render('traktor', {title: "Traktor", Products: productList});
});

router.get("/login", (req, res, next) => {
    res.render('login', {title: "Traktor-login", Products: productList});
});

module.exports = router;