//Assign the JSON variable's name to this variable.
var json_name = student_data;
//Assign the highest numerical value you want to display on your chart
var top_value = 100;

//Assign the number for how much of the width of your chart you want the top value to represent.
var percentage_of_chart = 100;
//This assigns the width of the bar container equal to the width you are wanting the bars to occupy.
$(".chart-container").css("width",percentage_of_chart + "%")

//This variable calculates how much of the percentage of the body of your chart (based on the length restriction you have designated), 
//is taken up by one integer of your top value.
var percentage_per_integer = (100 / top_value);


//select the option for how you want the bar titles and numbers to show up. your choices are (leftside, rightside)
var titles = "leftside";
var numbers = "rightside"

function buildBar(row){
	var bar_string = "<h3>" + row['category'] + "</h3>";
	bar_string += "<p class='description'>" + row['description'] + "</p>";

	// Width of the content within the table
	var width_rows = Math.round( $('.chart-container').width() * .2 ) + 'px';
		var width_bar = Math.round( $('.chart-container').width() * .4 ) + 'px';

	// Set THEAD
	bar_string += "<table><thead><tr>";
	bar_string += "<td style='width:" + width_rows + " ' class='categories'>Race</td>";
	// One less row for IEPs table
	if (row['category'] !== 'IEPs') {
		bar_string += "<td style='width:" + width_rows + " ' class='categories number'>Students</td>";
	}
	bar_string += "<td style='width:" + width_rows + " ' class='categories number'>Percent</td>";
	bar_string += "<td style='width:" + width_bar + " ' class='categories number'></td>";
	bar_string += "</tr><thead>"

	// Set TBODY
	bar_string += '<tbody>';
	_.each(row['data'], function(val, num) {
		// Change color of bars representing African-Americans
		if (val['race'] === 'Black') {
			bar = 'bar-two';
		} else {
			bar = 'bar';
		}

		bar_string += "<td>" + val['race'] + "</td>";
		// One less row for IEPs table
		if (row['category'] !== 'IEPs') {
			if (row['category'] !== 'Graduation Rates') {
				bar_string += "<td class='number'>" + val['total'] + "</td>";
			} else {
				bar_string += "<td class='number'>" + val['total'] + " / ";
				bar_string += val['graduated_eligible'];
				bar_string += " <span class='students-percent'>(" + val['graduated_percent'] + ")</span>";
				bar_string += "</td>";
			}
		}
		bar_string += "<td class='number'>" + val['percent'] + "</td>";
		bar_string += "<td>";
		bar_string += "<div class='" + bar + "' style='width:" + val['percent'] + "%;'></div>"
		bar_string += "</td>"
		bar_string += "</tr>"
	});
	bar_string += '</tbody>';

	return(bar_string);
// Close build bar
}

function loadJSON() {
	$(".chart-container").html('');

	for(var x = 0; x < json_name.length; x++){
		var current_bar = buildBar(json_name[x]);
		$(".chart-container").append(current_bar)
	}
}

$(document).ready(function() {
	loadJSON();

	$("body").mouseleave(function(){
        ga('send', 'event', 'CR racial disparity', 'Chart touched');
    });
});

$(window).resize(function() {
	loadJSON();
});