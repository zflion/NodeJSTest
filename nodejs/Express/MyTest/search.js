var request = require('superagent');

module.exports = function search(queryStr,fn){
	request
	.get('https://search.api.autodesk.com/qs/v3/search')
	.set('Content-Type','application/json')
	.set('x-ads-client-id','foo')
	.set('x-ads-client-feature-id','foo')
	.set('x-ads-session-id','foo')
	.set('x-ads-anon-session','true')
	.query({pid:'adsk.factory.main',filters:'sourceId.type:asset',query:queryStr})
	.end(function(err,res){	
		if (res && res.body){
			return fn(null,res.body.queryResults,res.body.queryResultCount);		
		}
		fn(new Error('Bad asset search response'));
	});
};