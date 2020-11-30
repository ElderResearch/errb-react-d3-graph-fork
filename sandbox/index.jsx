import React from "react";
import ReactDOM from "react-dom";

import Sandbox from "./Sandbox";

const app = document.getElementById("app");

ReactDOM.render(<Sandbox />, app);

import * as d3_force from "d3-force";
import * as d3_scale from "d3-scale";
import * as d3_drag from "d3-drag";
import * as d3_selection from "d3-selection";
var mis = import("./data/lesmis-data-es6.js");

const makeChart = mis => {
    const width = 500;
    const height = 500;
    let color = d => {
        const scale = d3_scale.scaleOrdinal(d3_scale.schemeCategory10);
        return d => scale(d.group);
    };

    let drag = simulation => {
        function dragstarted(event) {
            console.log(event);
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3_drag
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    const links = mis.data.links.map(d => Object.create(d));
    const nodes = mis.data.nodes.map(d => Object.create(d));

    const simulation = d3_force
        .forceSimulation(nodes)
        .force(
            "link",
            d3_force.forceLink(links).id(d => d.id)
        )
        .force("charge", d3_force.forceManyBody())
        .force("center", d3_force.forceCenter(width / 2, height / 2));

    const svg = d3_selection
        .select("#not-app")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", "blue")
        .call(drag(simulation));

    node.append("title").text(d => d.id);

    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x).attr("cy", d => d.y);
    });

    //invalidation.then(() => simulation.stop());

    return svg.node();
};

mis.then(s => {
    makeChart(s);
});
