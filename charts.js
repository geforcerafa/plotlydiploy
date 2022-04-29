function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

////////////////////////////////////

function init2() {
  var data= d3.select("#bubble2");
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] 
  }];
  Plotly.newPlot("#bubble2", data);
};

init2();

function init2() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] 
  }];
  // Plotly.newPlot("plot2", data);



var trace = { 
  x: [0.5, 1, 3, 4.5, 5, 8, 9.5, 9.8, 10, 15],
  y:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  type: 'bar',
  orientation: 'h'
  };

  var barData = [trace];

  // 9. Create the layout for the bar chart. 
  var barLayout = {
    title: " Top 10 Bacterial Cultures Found"
  };
   
    
  // 10. Use Plotly to plot the data with the layout. 
  
          Plotly.newPlot("bar", barData, barLayout);

};

var gaugeData = [
  {
   type: "indicator",
   mode: "gauge+number",
   value: 2,
   title: { text: "Scrubs per Week", font: { size: 24 } },
   gauge: {
     axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
     bar: { color: "black" },
     bgcolor: "white",
     borderwidth: 2,
     bordercolor: "black",
     steps: [
       { range: [0, 2], color: "red" },
       { range: [2, 4], color: "orange" },
       { range: [4, 6], color: "yellow" },
       { range: [6, 8], color: "limegreen" },
       { range: [8, 10], color: "darkgreen" }
     ],
   }       
  }
 ];
 
 // 5. Create the layout for the gauge chart.
 var gaugeLayout = { 
  

     title: 'Belly Botton Washing Frequency',
     showlegend: false,

 };

 // 6. Use Plotly to plot the gauge data and layout.
 
 Plotly.newPlot("gauge", gaugeData, gaugeLayout );

init2();       

function init4(){
var trace1 = {
  x: [1, 1,2, 1.5, 2, 2.5, 3, 3.5, 4],
  y: [10, 11, 10, 11, 11, , 12, 13, 14],
  mode: 'markers',
  marker: {
    color: ['rgb(93, 164, 214)', 'rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(255, 144, 14)',
      'rgb(44, 160, 101)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 65, 54)'],
    size: [40,20, 60, 80, 100, 200, 80, 150]
  }
};
var data = [trace1];

var layout = {
  title: 'Bacteria Cultures Per Sample',
  showlegend: false,
  xaxis: {title: "OTU ID"}
  };


Plotly.newPlot("bubble", data, layout);
};
init4();

function init3() {

   var traceBubble = {
      x: [1, 2, 3, 4, 5],
      y:[1, 2, 4, 8, 16],
      text: [1],
      mode: 'markers',
      marker: {
        color: [red],
         
      }   
    };
     
      var bubbleData = [traceBubble
      ];

      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {

          title: 'Bacteria Cultures Per Sample',
          showlegend: false,
          xaxis: {title: "OTU ID"}
        }; 

      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);          
    };
      init3(); 

/////////////////////////////////////////////////7
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 

    var samplesArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.

    var resultArray2 = samplesArray.filter(sampleObj => sampleObj.id == sample);
            
    //  5. Create a variable that holds the first sample in the array.
    var resultSample = resultArray2[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        // ver estructura del json 
    
      var otuIdsVar = resultSample.map( function(otuIds) {return otuIds.otu_ids});
      
      var sampleValuesVar = resultSample.map( function(sampleValues) {return sampleValues.sample_values});

      var otuLabels = resultSample.map( function(sampleValue) {return sampleValue.otu_labels});

// 3. Create a variable that holds the washing frequency.

var metadata = data.metadata;
    // Filter the data for the object with the desired sample number


    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var resultWash = resultArray[0];

    var washFreq = resultWash.map( function(waFreq) {return waFreq.wfreq});

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var sampleValuesSort = sampleValuesVar.sort((a,b) => a - b).reverse();
    var sampleValues = sampleValuesSort.slice(0,11)

    var sortedOtuIdsVar = otuIdsVar.sort((a,b) =>
        a - b).reverse();
    
    var yticks = sortedOtuIdsVar.slice(0,11);

    // 8. Create the trace for the bar chart. 
    var trace = { 
    x: [sampleValues],
    y:[yticks],
    type: 'bar',
    orientation: 'h'
    };

    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: " Top 10 Bacterial Cultures Found"
    };
     
      
    // 10. Use Plotly to plot the data with the layout. 
    
            Plotly.newPlot("bar", barData, barLayout);


  ////// Bubble chart
      // 1. Create the trace for the bubble chart. 
     var traceBubble = {
      x: [yticks],
      y:[sampleValues],
      text: [otuLabels],
      mode: 'markers',
      marker: {
        color: [sampleValues],
        size: [yticks]   
      }   
    };
     
      var bubbleData = [traceBubble
      ];

      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {

          title: 'Bacteria Cultures Per Sample',
          showlegend: false,
          xaxis: {title: "OTU ID"}
        }; 

      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);   
      
     //////// Gauge chart 

     // 4. Create the trace for the gauge chart.
    var gaugeData = [
     {
      type: "indicator",
      mode: "gauge+number",
      value: washFreq,
      title: { text: "Scrubs per Week", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "black",
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellew" },
          { range: [6, 8], color: "limegreen" },
          { range: [8, 10], color: "darkgreen" }
        ],
      }       
     }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     

        title: 'Belly Botton Washing Frequency',
        showlegend: false,

    };

    // 6. Use Plotly to plot the gauge data and layout.
    
    Plotly.newPlot("gauge", gaugeData, gaugeLayout );

  });   
 }
