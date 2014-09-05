//Assign the JSON variable's name to this variable.
var json_name = iaImmShareJSON;

//Assign this variable to the name of the field in your JSON that stores the first number you want to chart.
var number_field_one = "percent";

//If there is a secondary field, uncomment this variable, and assign it to the name of the second field in your JSON.
//var number_field_two = "";

//Set this variable to the field in your JSON that stores the row names.
var label_field = "iaImmShare";

//Assign the highest numerical value you want to display on your chart
var top_value = 6;


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
	var width = (current_value * percentage_per_integer);
	var bar_string = "<tr>";
		if(titles == "rightside" && numbers == "leftside"){
			bar_string += "<td class='leftside'>" + row[number_field_one] + "</td>";
			bar_string += "<td style='width:94%;' >";
			bar_string += "<div class='bar' style='width:" + width + "%;'></div>"
			bar_string += "<p class='rightside'>" +row[label_field] + "</p>";
			bar_string += "</td>";
	}
		else if(titles == "leftside" && numbers == "rightside"){
			bar_string += "<td class='leftside'>" + row[label_field] + "</td>";
			bar_string += "<td style='width:94%;' >";
			bar_string += "<div class='bar' style='width:" + width + "%;'></div>"
			bar_string += "<p class='rightside'>" + row[number_field_one] + "</p>";
			bar_string += "</td>";
	}
	
	bar_string += "</tr>";
	return(bar_string);
}