(function() {
	var datapath = '/data/data.csv';
	Papa.parse(datapath, {
		download: true,
		complete: function(results) {
			console.log("CVS parsing complete");
			console.log(results);
		}
	});
})();