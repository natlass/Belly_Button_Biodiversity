

function barchart() {
    
    d3.json("/samples.json").then((importedData) => {
        var data = importedData;
        //console.log(data.samples);

    var hovertext = Object.values(data.samples[0].otu_labels);
    //console.log(hovertext);

    
    var label = Object.values(data.samples[0].otu_ids).sort((a, b) => b - a);
    var sliced = label.slice(0, 10);
    //console.log(sliced);
    var arrayofString = sliced.map(otuID => `OTU ${otuID}`);
    //console.log(arrayofString);

    var value = Object.values(data.samples[0].sample_values);
    //console.log(value);

    var trace0 = [{
      x: value,
      y: arrayofString,
      type: "bar",
      text: hovertext,
      orientation: 'h'
    }];
  
    Plotly.newPlot("bar", trace0);
  })};

barchart();

function bubbly() {
    d3.json("/samples.json").then((importedData) => {
        var data = importedData;
        //console.log(data.samples);

    var id = Object.values(data.samples[0].otu_ids)

    var value = Object.values(data.samples[0].sample_values);
    //console.log(value);

    var hovertext = Object.values(data.samples[0].otu_labels);
    //console.log(hovertext);

    var trace1 = {
        x: id,
        y: value,
        mode: 'markers',
        text: hovertext,
        marker: {
          size: value,
          color: id
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'OTU ID',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', data, layout);
    })};

bubbly(); 

function meta(sample) {
  var metadata = "/metadata/" + sample;
  //console.log(metadata);
  var panel = d3.select("#sample-metadata");
  d3.json(metadata).then(function (data) {
    Object.entries(data).forEach(([key, value]) => {
      panel.append("h5").text(`${key}: ${value}`);
    });
  });
}

// This function is called when a dropdown menu item is selected
function updatePlotly() {

  // Call updatePlotly() when a change takes place to the DOM
  var selection = d3.select("#selDataset");

  d3.json('samples.json').then((data)=>{
    var demoID = data.names;
    demoID.forEach((sampleNames) => {
      selection
        .append('option')
        .text(sampleNames)
        .property('value', sampleNames);
    });

    var firstSample = data[0];
    barchart(firstSample);
    bubbly(firstSample);
    meta(firstSample);
    //console.log(firstSample);
  });
}

function onChange(newSelection) {
  barchart(newSelection);
  bubbly(newSelection);
  meta(newSelection);
}

updatePlotly();