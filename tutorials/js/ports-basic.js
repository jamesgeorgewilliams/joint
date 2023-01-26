(function() {

    var namespace = joint.shapes;
    var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    new joint.dia.Paper({ 
        el: document.getElementById('paper-basic'),
        width: 650,
        height: 200,
        gridSize: 1,
        model: graph, 
        cellViewNamespace: namespace,
        linkPinning: false, // Prevent link being dropped in blank paper area
        defaultLink: () => new joint.shapes.standard.Link(),
        defaultConnectionPoint: { name: 'boundary' },
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking between ports within one element
            if (cellViewS === cellViewT) return false;
        }
    });

    const port = {
        id: 'custom-port-id'
    };

    var element = new joint.shapes.standard.Rectangle({
        position: { x: 275, y: 50 },
        size: { width: 90, height: 90 },
        attrs: {
            body: {
                fill: '#8ECAE6'
            }
        },
        ports: {
            items: [ port ] // add a port in constructor
        }
    });

    // model.addPort(port); // add a port using Port API

    graph.addCell(element);

    element.portProp('custom-port-id', 'attrs/circle', { r: 8, fill: 'darkslateblue' });

    const portId = element.getPorts()[0].id;

    element.portProp(portId, 'custom', { testAttribute: true });

    console.log(element.portProp(portId, 'custom'));  // {testAttribute: true}

    // element.portProp(portId, 'attrs/circle/fill', 'tomato');
}());
