(function foreignObjectPreventDefault() {

    const namespace = joint.shapes;

    const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

    const paper = new joint.dia.Paper({
        el: document.getElementById('paper-foreign-object-prevent-default'),
        model: graph,
        width: 500,
        height: 350,
        async: true,
        frozen: true,
        cellViewNamespace: namespace,
        background: {
            color: '#F7F7F7'
        },
        // guard: (evt) => ['SPAN'].includes(evt.target.tagName)
    });

    paper.on('blank:pointerdown cell:pointerdown', () => {
        document.activeElement.blur();
    });

    const Form = joint.dia.Element.define('example.Form', {
        attrs: {
            foreignObject: {
                width: 'calc(w)',
                height: 'calc(h)'
            }
        }
    }, {
        markup: joint.util.svg/* xml */`
            <foreignObject @selector="foreignObject">
                <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    class="outer"
                >
                    <div class="inner">
                        <form class="form">
                            <input @selector="name" type="text" name="name" autocomplete="off" placeholder="Your diagram name"/>
                            <button>
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>
                </div>
            </foreignObject>
        `
    });

    joint.shapes.example.FormView = joint.dia.ElementView.extend({

        events: {
            'submit form': 'onSubmit'
        },

        onSubmit: function(evt) {
            evt.preventDefault();
            // evt.target.children.name.value = '';
            this.model.attr('name/props/value', '');
        },
    
    });

    const form = new Form();
    form.position(72, 70);
    form.resize(355, 200);
    form.addTo(graph);
 
    paper.unfreeze();
}());
