import React from "react";
import styled from "styled-components";

const ToneButtonImg = styled.div`
    background-image: linear-gradient(black, black), url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-blend-mode: saturation;

    /* Setup the fixed dimensions */
    position: relative;
    width: 100%;
    height: ${props => (props.size.height / props.size.width) * 98}px;

    &::before {
        background-color: ${props => props.highlight};
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        mix-blend-mode: darken;
        position: absolute;
    }

    &::after {
        background-color: ${props => props.shadow};
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        mix-blend-mode: lighten;
        position: absolute;
    }
`;

export default ToneButtonImg;
