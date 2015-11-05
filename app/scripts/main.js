(function() {
	var datapath = 'data/data.csv';
	var data = {};
	var colorBlueBar = '#3b4b5d';
	var colorOrangeBar = '#c45e29';

	function populate(event) {
		var key = event.target.value;
		if (key in data) {
			var obj = data[key];
			var ctx;
			var chartData;
			var legend;

			Chart.defaults.global.showTooltips = false;

			// populate US student program
			ctx = document.getElementById('fulbright-us-chart').getContext('2d');
			chartData = {
				labels: ['2013', '2014', '2015'],
				datasets: [
				{
					label: 'Applications',
					fillColor: colorBlueBar,
					data: [obj.fb_apps_2013, obj.fb_apps_2014, obj.fb_apps_2015]
				},
				{
					label: 'Grants',
					fillColor: colorOrangeBar,
					data: [obj.fb_grants_2013, obj.fb_grants_2014, obj.fb_grants_2015]
				}
				]
			};
			legend = new Chart(ctx).Bar(chartData).generateLegend();
			$(legend).insertAfter('#fulbright-us-chart');

			$('#fulbright-adviser-name').text(obj.fpa_name);
			$('#fulbright-adviser-email').text(obj.fpa_email);

			// populate foreign student program
			ctx = document.getElementById('foreign-student-chart').getContext('2d');
			chartData = {
				labels: ['2013', '2014', '2015'],
				datasets: [
				{
					label: 'Foreign Students',
					fillColor: colorBlueBar,
					data: [obj.foreign_students_2013, obj.foreign_students_2014, obj.foreign_students_2015]
				},
				{
					label: 'FLTAs*',
					fillColor: colorOrangeBar,
					data: [obj.foreign_flta_2013, obj.foreign_flta_2014, obj.foreign_flta_2015]
				}
				]
			};
			legend = new Chart(ctx).Bar(chartData).generateLegend();
			$(legend).insertAfter('#foreign-student-chart');

			// populate fulbright scholar program
			ctx = document.getElementById('scholar-program-chart').getContext('2d');
			chartData = {
				labels: ['2013', '2014', '2015'],
				datasets: [
				{
					label: 'Core Visiting',
					fillColor: colorBlueBar,
					data: [obj.scholar_visiting_2013, obj.scholar_visiting_2014, obj.scholar_visiting_2015]
				},
				{
					label: 'Outbound',
					fillColor: colorOrangeBar,
					data: [obj.foreign_flta_2013, obj.foreign_flta_2014, obj.foreign_flta_2015]
				}
				]
			};
			legend = new Chart(ctx).Bar(chartData).generateLegend();
			$(legend).insertAfter('#scholar-program-chart');

			$('#scholar-liason-name').text(obj.scholar_liason_name);
			$('#scholar-liason-title').text(obj.scholar_liason_title);

			// populate gilman
			$('gilman-chart').html('<p>2013: '+obj.gilman_2013+'</p><p>2014: '+obj.gilman_2014+'</p><p>2015: '+obj.gilman_2015+'</p>');
			ctx = document.getElementById('gilman-chart').getContext('2d');
			chartData = {
				labels: ['2012-13', '2013-14', '2014-15'],
				datasets: [
				{
					label: 'Gilman',
					fillColor: colorBlueBar,
					data: [obj.gilman_2013, obj.gilman_2014, obj.gilman_2015]
				}
				]
			};
			new Chart(ctx).Bar(chartData);

			// populate iienetwork and GSA boxes
			$('#check-iien-member').prop('checked', obj.iien_member);
			$('#check-gsa-partner').prop('checked', obj.gsa_partner);

			$('#current-date').text(obj.date);
		}
	}


	Papa.parse(datapath, {
		download: true,
		complete: function(results) {
			results.data.splice(0, 2);  // ditch the first two header rows
			results.data.splice(-1, 1); // trim the last footer row

			var institutions = results.data.map(function(arr) { return arr[0]; });
			results.data.forEach(function(arr) { 
				data[arr[0]] = {
					fb_apps_2013: arr[2],
					fb_grants_2013: arr[3],
					fb_apps_2014: arr[4],
					fb_grants_2014: arr[5],
					fb_apps_2015: arr[6],
					fb_grants_2015: arr[7],
					fpa_name: arr[8],
					fpa_email: arr[9],

					scholar_visiting_2013: arr[10],
					scholar_outbound_2013: arr[11],
					scholar_visiting_2014: arr[12],
					scholar_outbound_2014: arr[13],
					scholar_visiting_2015: arr[14],
					scholar_outbound_2015: arr[15],
					scholar_liason_name: arr[16],
					scholar_liason_title: arr[17],
					scholar_liason_email: undefined,

					foreign_students_2013: arr[18],
					foreign_flta_2013: arr[19],
					foreign_students_2014: arr[20],
					foreign_flta_2014: arr[21],
					foreign_students_2015: arr[22],
					foreign_flta_2015: arr[23],

					gilman_2013: arr[24],
					gilman_2014: arr[25],
					gilman_2015: arr[26],

					gsa_partner: arr[27],
					iien_member: arr[28],

					date: arr[29]
				};
			});

			$('#institution-name').autocomplete({
				source: institutions,
				change: populate,
				// select: populate
				select: function(event, ui) {
					$(event.target).val(ui.item.value);
					populate(event);
				}
			}).change(populate); 
		}
	});

	// TODO: shim heights of .box-ieenetwork and .box-gilman to fill column height on resize
})();