import React from "react";
import styled from "styled-components";

const ToneButtonImg = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    /* Setup the fixed dimensions */
    position: relative;
    max-width: 100%;
    max-height: 100%;

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
