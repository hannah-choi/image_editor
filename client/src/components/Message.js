import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg }) => {
    return (
        <div>
            {msg}
            <button>close</button>
        </div>
    );
};

Message.propTypes = {
    msg: PropTypes.string.isRequired,
};

export default Message;
