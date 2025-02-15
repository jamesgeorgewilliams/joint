import { dia } from 'jointjs';

const Y_BODY = .4;
const Y_LEGS = .7;

export default class Actor extends dia.Element {

    static version = '3.4';

    defaults() {
        return {
            ...super.defaults,
            type: 'Actor',
            size: {
                width: 50,
                height: 100
            },
            attrs: {
                background: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    fill: 'transparent'
                },
                head: {
                    cx: 'calc(0.5*w)',
                    cy: `calc(${Y_BODY / 2}*h)`,
                    r: `calc(${Y_BODY / 2}*h)`,
                    stroke: '#333333',
                    strokeWidth: 2,
                    fill: '#ffffff'
                },
                body: {
                    strokeWidth: 2,
                    stroke: '#333333',
                    d: `M 0 calc(0.5*h) h calc(w) M 0 calc(h) calc(0.5*w) calc(${Y_LEGS}*h) calc(w) calc(h) M calc(0.5*w) calc(${Y_LEGS}*h) V calc(${Y_BODY}*h)`
                },
                label: {
                    text: 'Actor',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    y: 'calc(h+10)',
                    x: 'calc(0.5*w)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: '#333333'
                }
            }
        }
    }

    markup = [{
        tagName: 'rect',
        selector: 'background'
    }, {
        tagName: 'path',
        selector: 'body',
        attributes: {
            'fill': 'none'
        }
    }, {
        tagName: 'circle',
        selector: 'head'
    }, {
        tagName: 'text',
        selector: 'label'
    }];
}
