import React from "react";

import CONST from "./node.const";

import nodeHelper from "./node.helper";

/**
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *     window.alert('Clicked node', nodeId);
 * };
 *
 * const onRightClickNode = function(nodeId) {
 *     window.alert('Right clicked node', nodeId);
 * }
 *
 * const onMouseOverNode = function(nodeId) {
 *     window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *     window.alert('Mouse out node', nodeId);
 * };
 *
 * const generateCustomNode(node) {
 *     return <CustomComponent node={node} />;
 * }
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontColor='black'
 *     fontWeight='normal'
 *     dx=90
 *     label='label text'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     svg='assets/my-svg.svg'
 *     type='square'
 *     viewGenerator={generateCustomNode}
 *     className='node'
 *     onClickNode={onClickNode}
 *     onRightClickNode={onRightClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
export default class Node extends React.Component {
    /**
     * Handle click on the node.
     * @returns {undefined}
     */
    handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

    /**
     * Handle right click on the node.
     * @param {Object} event - native event.
     * @returns {undefined}
     */
    handleOnRightClickNode = event => this.props.onRightClickNode && this.props.onRightClickNode(event, this.props.id);

    /**
     * Handle mouse over node event.
     * @returns {undefined}
     */
    handleOnMouseOverNode = () => this.props.onMouseOverNode && this.props.onMouseOverNode(this.props.id);

    /**
     * Handle mouse out node event.
     * @returns {undefined}
     */
    handleOnMouseOutNode = () => this.props.onMouseOut && this.props.onMouseOut(this.props.id);

    render() {
        const nodeProps = {
            cursor: this.props.cursor,
            onClick: this.handleOnClickNode,
            onContextMenu: this.handleOnRightClickNode,
            onMouseOut: this.handleOnMouseOutNode,
            onMouseOver: this.handleOnMouseOverNode,
            opacity: this.props.opacity,
        };

        const textProps = {
            dx: this.props.dx || CONST.NODE_LABEL_DX,
            dy: CONST.NODE_LABEL_DY,
            fill: this.props.fontColor,
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight,
            opacity: this.props.opacity,
        };

        const size = this.props.size;

        let gtx = this.props.cx,
            gty = this.props.cy,
            label = null,
            node = null;

        if (this.props.svg || this.props.viewGenerator) {
            const radius = Math.pow(size/Math.PI, 0.5)
            const height = 2 * radius;
            const width = 2 * radius;
            const tx = width / 2;
            const ty = height / 2;
            //these are inconsistent, I want the label to start at the top left corner before moving it so it will be consistent.
            textProps.dx = 0;
            const transform = `translate(${width+5},${radius})`;
            label = (
                <text {...textProps} transform={transform}>
                    {this.props.label}
                </text>
            );

            // By default, if a view generator is set, it takes precedence over any svg image url
            if (this.props.viewGenerator && !this.props.overrideGlobalViewGenerator) {
                let slotProps = {};
                slotProps.d = nodeHelper.buildSvgSymbol(size, this.props.type);
                slotProps.fill = this.props.fill;
                slotProps.stroke = this.props.stroke;
                slotProps.strokeWidth = this.props.strokeWidth;
                slotProps.transform = `translate(${tx}, ${ty})`

                node = (
                    <g>
                        <path {...slotProps} />
                        <svg {...nodeProps} width={width} height={height}>
                            <foreignObject x="0" y="0" width="100%" height="100%">
                                <section style={{ height: height, width: width, backgroundColor: "transparent", transform: `scale(.6)` }}>
                                    {this.props.viewGenerator(this.props)}
                                </section>
                            </foreignObject>
                        </svg>
                    </g>
                );
            } else {
                node = <image {...nodeProps} href={this.props.svg} width={width} height={height} />;
            }

            // svg offset transform regarding svg width/height
            gtx -= tx;
            gty -= ty;
        } else {
            nodeProps.d = nodeHelper.buildSvgSymbol(size, this.props.type);
            nodeProps.fill = this.props.fill;
            nodeProps.stroke = this.props.stroke;
            nodeProps.strokeWidth = this.props.strokeWidth;

            label = <text {...textProps}>{this.props.label}</text>;
            node = <path {...nodeProps} />;
        }

        const gProps = {
            className: this.props.className,
            cx: this.props.cx,
            cy: this.props.cy,
            id: this.props.id,
            transform: `translate(${gtx},${gty})`,
        };

        return (
            <g {...gProps}>
                {node}
                {this.props.renderLabel && label}
            </g>
        );
    }
}
