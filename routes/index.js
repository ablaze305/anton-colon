var express     = require('express');
var router      = express.Router();
var sm          = require('sitemap');

var environment = process.env.ENV;

// Handle robots.txt based on environment
router.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  if (environment === 'staging'){
    res.send("# Staging\nUser-agent: *\nDisallow: /");
  } else if (environment === 'production') {
    res.send("# Production\nUser-agent: *\nAllow: /");
  } else {
    res.send("# Local\nUser-agent: *\nDisallow: /");
  }
});

// Handle sitemap.xml
var sitemap = sm.createSitemap ({
  hostname: 'http://www.antoncolon.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '/',  changefreq: 'monthly', priority: 0.7 }
  ]
});

router.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send( xml );
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Home',
    page: 'home'
  });
});

module.exports = router;
