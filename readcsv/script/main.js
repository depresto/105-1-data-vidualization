function drawChart(width = 500, height = 500){
	var content = d3.select(".content");
	var svg = content.append("svg").attr("width", width).attr("height", height).attr("id", "chart");

	var width 	= svg.attr("width");
	var height 	= svg.attr("height");

	var STOCK 	= "2330.TW";
	var URL 	= "https://chartapi.finance.yahoo.com/instrument/1.0/"+STOCK+"/chartdata;type=quote;range=2d/json";

	d3.request(URL)
	.mimeType("text/plain")
	.response(function(xhr) {  
		response = xhr.responseText.split('finance_charts_json_callback(')[1].split(')')[0];
		return JSON.parse(response).series; 
	})
	.get(function(error, data) {
	if (error)
		console.error(error);

	console.log(data);

	var max  = d3.max(data,function(dat){return dat.close;});
	var min  = d3.min(data,function(dat){return dat.close;});
	console.log(max- min);
	var len  = data.length;
	var line = d3.line()
				.x(function(dat,i)	{return i*(width/len);})
				.y(function(dat)	{return height - (dat.close - min) * (height/(max-min));});

	svg.append("path").data([data]).attr("d", line);
	});
}