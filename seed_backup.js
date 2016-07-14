var db = require("./models");

function seed1(){
	return db.portfolio.findOrCreate({
	  where: {
	    email: 'test1@email.com'
	  }
	}).spread(function(p1, created) {
	  db.security.bulkCreate([
			{symbol:'MSFT', type:'STOCK', shares:100, price:55, value: 'auto', portfolioId: p1.id},
			{symbol:'LNKD', type:'STOCK', shares:100, price:190, value: 'auto', portfolioId: p1.id},
			{symbol:'BAC17F', type:'BOND', shares:100, price:105, value: 'auto', portfolioId: p1.id},
			{symbol:'BABFX', type:'FUND', shares:100, price:15, value: 1000000, portfolioId: p1.id}
		])
	});
}

function seed2(){
	return db.portfolio.findOrCreate({
	  where: {
	    email: 'test2@email.com'
	  }
	}).spread(function(p2, created) {
	  db.security.bulkCreate([
			{symbol:'GOOGL', type:'STOCK', shares:150, price:100, value: 'auto', portfolioId: p2.id},
			{symbol:'T', type:'STOCK', shares:120, price:100, value: 'auto', portfolioId: p2.id},
			{symbol:'AMT21A', type:'BOND', shares:180, price:100, value: 'auto', portfolioId: p2.id},
			{symbol:'FABX', type:'FUND', shares:210, price:100, value: 'auto', portfolioId: p2.id}
		])
	});
}

function seed3(){
	return db.portfolio.findOrCreate({
	  where: {
	    email: 'test3@email.com'
	  }
	}).spread(function(p3, created) {
	  db.security.bulkCreate([
			{symbol:'AMZN', type:'STOCK', shares:50, price:740, value: 'auto', portfolioId: p3.id},
			{symbol:'AAPL', type:'STOCK', shares:100, price:100, value: 'auto', portfolioId: p3.id},
			{symbol:'DOW19', type:'BOND', shares:150, price:100, value: 'auto', portfolioId: p3.id},
			{symbol:'TAGGX', type:'FUND', shares:200, price:20, value: 'auto', portfolioId: p3.id}
		])
	});
}

seed1().then(function(){
	seed2().then(function(){
		seed3()
	})
});