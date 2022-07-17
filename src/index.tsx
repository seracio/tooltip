import { pointer, select } from "d3-selection";
import { useEffect, useRef } from "react";

const Tooltip = ({ style }: any) => (
  <div
    className="layout-tooltip"
    style={{
      position: "absolute",
      border: "solid 1px #ccc",
      backgroundColor: "white",
      userSelect: "none",
      fontSize: "0.75em",
      padding: "5px",
      pointerEvents: "none",
      opacity: 0,
      boxShadow: "1px 1px 2px #ccc",
      ...style,
    }}
  />
);

const useTooltip = (
  {
    dx = 10,
    dy = 10,
    enterCb = (el: any) => {},
    leaveCb = (el: any) => {},
  } = {},
  refresh: any[] = []
): [typeof Tooltip, any] => {
  const root = useRef(null);
  useEffect(() => {
    // @ts-ignore
    const rootEl = root.current as HTMLElement;
    const w = rootEl.clientWidth;
    const h = rootEl.clientHeight;
    const container = select(rootEl);
    const tooltip = container.select(".layout-tooltip");
    //let timeout: any = null;
    container
      .selectAll("[data-tooltip]")
      .on("mouseenter", function () {
        // @ts-ignore
        enterCb(this);
      })
      .on("mousemove", function (event) {
        //!!timeout && clearTimeout(timeout);
        // @ts-ignore
        const label = this.getAttribute("data-tooltip");
        const [x, y] = pointer(event, rootEl);
        tooltip
          .html(label)
          .style(
            x < w / 2 ? "left" : "right",
            x < w / 2 ? `${x + dx}px` : `${w - x + dx}px`
          )
          .style(x < w / 2 ? "right" : "left", "")
          .style(
            y < h / 2 ? "top" : "bottom",
            y < h / 2 ? `${y + dy}px` : `${h - y + dy}px`
          )
          .style(y < h / 2 ? "bottom" : "top", "")
          .style("opacity", 1);
      })
      .on("mouseleave", function () {
        // @ts-ignore
        leaveCb(this);
        tooltip.style("opacity", 0);
      });
    //  unmount
    return () => {
      container
        .selectAll("[data-tooltip]")
        .on("mouseenter", null)
        .on("mousemove", null)
        .on("mouseleave", null);
    };
  }, refresh);
  return [Tooltip, root];
};

type AreaParams = {
  refArea: React.RefObject<SVGGElement>;
  display: (d: any) => string;
  displayArea: (d: any) => string;
  dx?: number;
  dy?: number;
};

const useTooltipArea = (
  {
    dx = 10,
    dy = 10,
    refArea,
    display = (d) => "",
    displayArea = (d) => "",
  }: AreaParams,
  refresh = []
): [typeof Tooltip, any] => {
  const root = useRef(null);
  useEffect(() => {
    const rootEl = root.current as any;
    const w = rootEl.clientWidth;
    const h = rootEl.clientHeight;
    const container = select(rootEl);
    const tooltip = container.select(".layout-tooltip");
    select(refArea.current)
      .on("mousemove", function (event) {
        const label = display(pointer(event, refArea.current)) as any;
        const [x, y] = pointer(event, rootEl);
        tooltip
          .html(label)
          .style(
            x < w / 2 ? "left" : "right",
            x < w / 2 ? `${x + dx}px` : `${w - x + dx}px`
          )
          .style(x < w / 2 ? "right" : "left", "")
          .style(
            y < h / 2 ? "top" : "bottom",
            y < h / 2 ? `${y + dy}px` : `${h - y + dy}px`
          )
          .style(y < h / 2 ? "bottom" : "top", "")
          .style("opacity", 1);

        const labelArea = displayArea(pointer(event, refArea.current)) as any;
        select(refArea.current).select(".display-area").remove();
        select(refArea.current)
          .append("g")
          .attr("class", "display-area")
          .html(labelArea);
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
        select(refArea.current).select(".display-area").remove();
      });
    return () => {
      select(refArea.current).on("mousemove", null).on("mouseleave", null);
    };
  }, refresh);
  //
  return [Tooltip, root] as any;
};

export { useTooltip, useTooltipArea };
