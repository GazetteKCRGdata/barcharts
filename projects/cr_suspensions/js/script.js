//Assign the JSON variable's name to this variable.
var json_name = suspensions;

//Assign this variable to the name of the field in your JSON that stores the first number you want to chart.
var number_field_one = "pct_suspended_who_were_black";

//If there is a secondary field, uncomment this variable, and assign it to the name of the second field in your JSON.
var number_field_two = "pct_black_students_attending";

var number_field_three = "black_students";
var number_field_four = "all_students";

var number_field_five = "black_suspended";
var number_field_six = "all_suspended";

//Set this variable to the field in your JSON that stores the row names.
var label_field = "school";

//Assign the highest numerical value you want to display on your chart
var top_value = 100;


var mid_value = (top_value / 2);
var upper_mid = (mid_value + (mid_value / 2));
var lower_mid = (mid_value - (mid_value / 2));

$("#chunk1").html(lower_mid);
$("#chunk2").html(mid_value);
$("#chunk3").html(upper_mid);
$("#chunk4").html(top_value);


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


///////////////////////////////////////////////////////////////////

for(var x = 0; x < json_name.length; x++){
	//console.log(json_name[x][number_field_one]);

	var current_bar = buildBar(json_name[x]);
	$(".chart-container").append(current_bar)
}






function buildBar(row){
	var current_value = row[number_field_one];
	var current_value_two = row[number_field_two];
	var width = (current_value * percentage_per_integer);
	var width_two = (current_value_two * percentage_per_integer);
	
	var bar_string = "<h3>" + row[label_field] + "</h3>";

	bar_string += "<table><tr>";
	bar_string += "<td style='width:50%;' class='categories'>Black enrollment</td>";
	bar_string += "<td style='width:25%;' class='categories number'>Black students</td>";
	bar_string += "<td style='width:25%;' class='categories number'>Total students</td>";
	bar_string += "</tr><tr>"
	
	bar_string += "<td>";
	bar_string += "<div class='bar' style='width:" + width_two + "%;'></div>"
	bar_string += "<p class='rightside'>" + row[number_field_two].toFixed(2) + "%</p>";
	bar_string += "</td>"

	bar_string += "<td class='number'>" + row[number_field_three] + "</td>";
	bar_string += "<td class='number'>" + row[number_field_four] + "</td>"

	bar_string += "</tr></table>"
	bar_string += "<table><tr>";
	bar_string += "<td style='width:50%;' class='categories'>Suspension rate</td>";
	bar_string += "<td style='width:25%;' class='categories number'></td>";
	bar_string += "<td style='width:25%;' class='categories number'></td>";
	bar_string += "</tr><tr>"
	
	bar_string += "<td>";
	bar_string += "<div class='bar-two' style='width:" + width + "%;'></div>"
	bar_string += "<p class='rightside'>" + row[number_field_one].toFixed(2) + "%</p>";
	bar_string += "</td>"

	bar_string += "<td class='number'>" + row[number_field_five] + "</td>";
	bar_string += "<td class='number'>" + row[number_field_six] + "</td>"

	bar_string += "</tr></table>"
	return(bar_string);
}