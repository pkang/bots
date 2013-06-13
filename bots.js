var barWidth = 3;
var options = {
    barWidth: barWidth,
    ipScale: 1,
    reqScale: 0.014,
    maxHeight: 1500,
    maxWidth: dataset.length * barWidth
};

(function(options) {
     var barWidth = options.barWidth;
     var ipScale = options.ipScale;
     var reqScale = options.reqScale;
     var maxHeight = options.maxHeight;
     var maxWidth = options.maxWidth;

    function graphit(options) {
        var className = options['className'];
        var heightFunc = options['heightFunc'];
        var color = options['color'];
        var scale = options['scale'] || 1;
        var opacity = options['opacity'] || 1;

        function mouseOver(d) {
            d3.select(this).style("fill", "yellow");
            $('.message').addClass('show').text("requests: " + d[0] + ", IPs: " + d[1] + ", total requests: " + d[0]*d[1]);
        }

        function mouseOut(d) {
            d3.select(this).style("fill", color);
            $('.message').removeClass('show');
        }

        d3.select('svg').selectAll(className)
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", className)
            .attr("width", "4")
            .attr("y", function(d) {
                return maxHeight - heightFunc(d);
            })
            .attr("x", function(d, i) {
                return i*barWidth;
            })
            .attr("height", heightFunc)
            .style("fill", color)
            .style("fill-opacity", opacity)
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);
    }

    $(function() {
        $('.annotation').text(annotation);

        d3.select("body")
            .append("svg")
            .attr("width", maxWidth)
            .attr("height", maxHeight)
            .style("background-color", "lightgray");

        graphit({
            className: 'ip',
            color: 'teal',
            heightFunc: function(d) {
                return d[1] * ipScale;
            },
            opacity: 1,
            scale: ipScale
        });

        graphit({
            className: 'total-requests',
            color: 'gray',
            heightFunc: function(d) {
                return d[0]*d[1] * reqScale;
            },
            opacity: 0.8,
            scale: reqScale
        });


    });

})(options);