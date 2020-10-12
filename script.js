
$(document).ready(function () { 
    var random = false;
    // var rowTextArea = $(".textarea");
    // var saveButton = $(".saveBtn");
    var currentDay = $("#currentDay");

    var hour12 = moment().format('h');
    var hour24 = moment().format('H');

    if (random) { 
        hour12 = 1;
        hour24 = 13;
    }
    function displaurrentDate()
    {
        var displayDate = moment().format("dddd") + " , " + moment().format("MMMM Do");
        currentDay.text(displayDate);
    }
   
    displaurrentDate();

    var dailyPlanArr = JSON.parse(localStorage.getItem("planStore")) || new Array(9);
   

    console.log(dailyPlanArr);

    //main continer 
    var container = $(".container");

    
    // function Displayplaning() { 
        for (var hour = 9; hour <= 17; hour++) { 
            var index = hour - 9;
            
            //main row ...
            var rowDiv = $('<div>');
            rowDiv.addClass("row");
            rowDiv.addClass("time-block");
            rowDiv.attr("hourIndex", hour)

            //hour column
            var hourColumn = $("<div>");
            hourColumn.addClass("col-md-1");
            hourColumn.addClass("hour")

            var timeEl = $("<span>");
        

            var hourDisplay = 0;
            var ampm = "";
            if (hour > 12) {
                hourDisplay = hour - 12;
                ampm = "pm";
            } else {
                hourDisplay = hour;
                ampm = "am";
            }
            container.append(rowDiv);
            //daily hour..
            timeEl.text(hourDisplay + " " + ampm);
            rowDiv.append(hourColumn);
            hourColumn.append(timeEl);

            //textarea column..

            var dailyPlan = $("<input>");
            dailyPlan.attr("type", "text");
            dailyPlan.attr("class", "textarea");

            var textColumn = $("<div>");
            textColumn.addClass("col-md-10");
            textColumn.addClass('description')

            dailyPlan.attr("id","input-"+index);
            rowDiv.append(textColumn);
            textColumn.append(dailyPlan);

            dailyPlan.val(dailyPlanArr[index]);

            //save button 
            var buttonColumn = $("<div>");
            buttonColumn.addClass("col-md-1");
            buttonColumn.attr("id", "saveBtn");
            buttonColumn.addClass('saveBtn')

            var saveButton = $("<i>")
            saveButton.attr("class", "far fa-save saveIcon");
            saveButton.attr("save-index", index);

            
            rowDiv.append(buttonColumn);
            buttonColumn.append(saveButton);

           
            console.log(rowDiv + "and hour" + hour);
            colorEffect(textColumn, hour);
        }


    // }// function ends
   
    // Displayplaning();

   function colorEffect(hourRow, hour) { 
        if (random) { 
            console.log("rowcolor", hour24 , hour)
        }
       if (hour < hour24) {
         hourRow.addClass("past");           
       } else if (hour > hour24) { 
           hourRow.addClass("future");
       } else {
           hourRow.addClass("present");
       }

    }
   
    $(document).on('click', 'i', function (event) { 
        event.preventDefault();
        var saveIndex = $(this).attr("save-index");
        console.log(saveIndex);

        var inputId = "#input-" + saveIndex;
        console.log(inputId);
        var $value = $(inputId).val();
        dailyPlanArr[saveIndex] = $value;
        
        console.log($value);

        localStorage.setItem("planStore", JSON.stringify(dailyPlanArr));

    });





















}); // end of the script
