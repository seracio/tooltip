import * as d3 from 'd3-selection';
import React, { useEffect, useRef } from 'react';

const Tooltip = ({ style }) => (
    <div
        className="layout-tooltip"
        style={{
            position: 'absolute',
            border: 'solid 1px #ccc',
            backgroundColor: 'white',
            userSelect: 'none',
            fontSize: '0.75em',
            padding: '5px',
            pointerEvents: 'none',
            opacity: 0,
            boxShadow: '1px 1px 2px #ccc',
            ...style
        }}
    />
);

function useTooltip({ refresh = [], style = {}, dx = 0, dy = 0 } = {}) {
    const root = useRef(null);
    useEffect(() => {
        // @ts-ignore
        const rootEl = root.current as HTMLElement;
        const w = rootEl.clientWidth;
        const h = rootEl.clientHeight;
        const container = d3.select(rootEl);
        const tooltip = container.select('.layout-tooltip');
        let timeout: any = null;
        container
            .selectAll('[data-tooltip]')
            .on('mouseenter', null)
            .on('mouseenter', function() {
                !!timeout && clearTimeout(timeout);
                // @ts-ignore
                const label = this.getAttribute('data-tooltip');
                const [x, y] = d3.mouse(rootEl);
                tooltip
                    .html(label)

                    .style(
                        x < w / 2 ? 'left' : 'right',
                        x < w / 2 ? `${x + dx}px` : `${w - x + dx}px`
                    )
                    .style(x < w / 2 ? 'right' : 'left', '')
                    .style(
                        y < h / 2 ? 'top' : 'bottom',
                        y < h / 2 ? `${y + dy}px` : `${h - y + dy}px`
                    )
                    .style(y < h / 2 ? 'bottom' : 'top', '')
                    .style('opacity', 1);
            })
            .on('mouseleave', null)
            .on('mouseleave', function() {
                timeout = setTimeout(() => {
                    tooltip.text('').style('opacity', 0);
                }, 150);
            });
    }, refresh);
    return [Tooltip, root];
}

export default useTooltip;