var Currency = require('./transfer');
var canadianDollar = 0.91;
var currency = new Currency(canadianDollar);
console.log(currency.canadianToUS(50));
console.log(currency.USToCanadian(30));