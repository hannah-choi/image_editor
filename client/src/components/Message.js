import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Message = ({ msg }) => {
    const msgRef = useRef(null);

    useEffect(() => {
        if (msg) {
            msgRef.current.classList.add("visible");
            setTimeout(() => {
                msgRef.current.classList.remove("visible");
            }, 3000);
        }
    }, [msg]);

    return (
        <div ref={msgRef} className="message">
            {msg}
        </div>
    );
};

// Message.propTypes = {
//     msg: PropTypes.string.isRequired,
// };

export default Message;
