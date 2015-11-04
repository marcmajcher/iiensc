(function() {
	var datapath = '/data/data.csv';
	var data = {};

	function populate(event) {
		var key = event.target.value;
		if (key in data) {
			console.log(event.target.value);
			console.log(data[event.target.value]);
		}
	}

	Papa.parse(datapath, {
		download: true,
		complete: function(results) {
			results.data.splice(0, 2);  // ditch the first two header rows
			results.data.splice(-1, 1); // trim the last footer row

			var schools = results.data.map(function(arr) { return arr[0]; });
			results.data.forEach(function(arr) { data[arr[0]] = arr.slice(1); });

			$('#institution-name').autocomplete({
				source: schools,
				change: populate,
				select: populate
			});

		}
	});
})();