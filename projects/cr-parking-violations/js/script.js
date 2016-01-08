function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Add commas to numbers over 1000
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

var hash = window.location.hash.replace('#','');

// Set first TH
var th_hash = "<th>" + toTitleCase(hash) + "</th>"
$('.table thead tr').prepend(th_hash);

// Loop through each object
for (var i = 0; i < data[hash].length; i++) {
	var current = data[hash][i];

	// Create a TR for each object in data
	var tr_html = '<tr>';
	
	// Name
	tr_html += '<td class="';
	tr_html += current['value'].replace(/ /g,'');
	tr_html += '">';
	
	if (hash === 'streets') {
		tr_html += '<div class="box" style="background-color:';
		
		if (current['value'] === 'Second Street') {
			tr_html += '#e41a1c';
		} else if (current['value'] === 'Second Avenue') {
			tr_html += '#377eb8';
		} else if (current['value'] === 'Third Avenue') {
			tr_html += '#4daf4a';
		} else if (current['value'] === 'Third Avenue Bridge') {
			tr_html += '#ff7f00';
		} else if (current['value'] === 'Third Street') {
			tr_html += '#f781bf';
		}

		tr_html += '"></div>';
	}

	tr_html += '<div class="text">';
	tr_html += current['value'] + "</div>";
	tr_html += '</td>';

	// Number of tickets
	tr_html += '<td>' + commaSeparateNumber(current['tickets']) + '</td>';

	// Bar chart
	if (hash !== 'plates') {
		tr_html += '<td>';
		tr_html += '<span class="bar-container">';
		tr_html += '<span class="bar" style="width:' + current['percent'] + '%"></span>';
		tr_html += '<span class="bar-text">';
		tr_html += current['percent'] + '%';
		tr_html += '</span>';
		tr_html += '</span>';
		tr_html += '</td>';
	} else {
		tr_html += '<td class="number">';
		tr_html += '$' + commaSeparateNumber(current['amount']);
		tr_html += '</td>';
	}
	
	tr_html += '</tr>';

	// Append TR to DOM
	$('.table tbody').append(tr_html)

// Close for loop
}

$(document).ready(function() {
	if (hash === 'streets') {
		// Show div with map
		$('#street-map-container').show();
		
		// Create map
		L.mapbox.accessToken = 'pk.eyJ1IjoiY3Nlc3NpZzg2IiwiYSI6ImNpajM4eTQycjAwNG51eGtuaGhpZXhqNnYifQ.S6Am6BfQAkpIKKaZnyKpog';

		var map = L.mapbox.map('map', 'mapbox.light')
	    .setView([41.97788,-91.665623],14)

		var myLayer = L.mapbox.featureLayer().addTo(map);
		myLayer.setGeoJSON(geojson);

		// Mouse over
		myLayer.on('mouseover', function(e) {
			var title = e.layer['feature']['properties']['title'].replace(/ /g,'');

			$('.' + title).parent().css({
				'background-color':'#EEE'
			});

		});
		
		// Mouse out
		myLayer.on('mouseout', function(e) {
			var title = e.layer['feature']['properties']['title'].replace(/ /g,'');

			$('.' + title).parent().css({
				'background-color':'#FFF'
			});
		});

		$('.table thead th:nth-child(3)').css({
			'width': '25%'
		});
	} else if (hash === 'plates') {
		$('.table thead th:nth-of-type(3)').text('Amount');
		$('.table thead th:nth-child(3)').css({
			'width': '30%'
		});
	}
// Close doc ready
});