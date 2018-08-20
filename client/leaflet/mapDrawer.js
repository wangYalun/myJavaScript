function translatePoint(contextMap) {
    return function TranslatePoint(d) {
        console.log(d);
        const point = contextMap.latLngToLayerPoint(new L.LatLng(d[1], d[0]));
        return `translate(${point.x},${point.y})`;
    }
}

function translatePoint2(contextMap) {
    return function TranslatePoint(item) {
        console.log(item);
        const point = contextMap.latLngToLayerPoint(new L.LatLng(item.lng, item.lat));
        return `translate(${point.x},${point.y})`;
    }
}

function projectPoint(contextMap) {
    return function ProjectPoint(x, y) {
        const point = contextMap.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
}

function transBusStationToGeo(geoData, busStations) {
    busStations.forEach(function (item) {
        geoData.features.push({
            "type": "Feature",
            "properties": {
                "id": item.id,
                "name": item.name,
                "status": item.status,
                "type": item.type
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item.lat, item.lng]
            }
        });
    })

    return geoData;
}



var map = L.map('map', {
    center: [22.5274626732038, 114.04924392700197],
    zoom: 14,
    attributionControl: false,
    zoomControl: false
})

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    subdomains: 'abcd',
    minZoom: '0',
    maxZoom: '20',
    ext: 'png'
}).addTo(map);


// 初始化svg, 初始化dom g, 加上class leaflet-zoom-hide
var svg = d3.select(this.map.getPane('overlayPane')).append('svg').attr('id', 'taxiTripSvg');
var g = svg.append('g').attr('class', 'leaflet-zoom-hide');

d3.select("#svg").select("svg").append("image")
    .attr("xlink:href", "https://github.com/favicon.ico")
    .attr("x", 20)
    .attr("y", 20)
    .attr("width", 16)
    .attr("height", 16);

// 坐标系转换
const transform = d3.geo.transform({ point: projectPoint(map) });

const d3path = d3.geo.path().projection(transform);



d3.json('http://localhost:8081/node_api/getBusStation', function (error, res) {
    if (!error) {
        // console.log(res);
        var busStations = res.map(function (item) {
            var lnglat = coordtransform.gcj02towgs84(item.longitude, item.latitude);
            item.lat = lnglat[0];
            item.lng = lnglat[1];
            return item;
        })

        data = transBusStationToGeo(data, busStations);

        console.log(data);



        // 画path路径
        const feature = g.selectAll('path')
            .data(data.features.filter(function (item) { return item.geometry.type === "LineString" }))
            .enter().append('path')
            .attr('class', 'stroke-yellow')

        function refresh() {
            const bounds = d3path.bounds(data);
            const topLeft = bounds[0];
            const bottomRight = bounds[1];
            svg.attr('width', bottomRight[0] - topLeft[0])
                .attr('height', bottomRight[1] - topLeft[1])
                .style('left', `${topLeft[0]}px`)
                .style('top', `${topLeft[1]}px`);
            g.attr('transform', `translate(${-topLeft[0]},${-topLeft[1]})`);

            feature.attr('d', d3path);

            g.selectAll('.point').attr('transform', translatePoint(map))

            g.selectAll('.station').attr('transform', translatePoint2(map))
        }

        g.selectAll('.station').data(busStations).enter().append('rect')
            .attr('style', (item) => {
                return `fill:${item.status === 1 ? 'green' : 'red'}`
            }).attr('width', 10).attr('height', 10).attr('class', 'station');

        g.selectAll('.point').data(points).enter()
            .append('circle').attr('r', 10).attr('class', 'point')


        map.on('viewreset', refresh)
        map.on('zoomend', refresh)

        refresh();
    }

})

