import React, { useEffect, useState } from "react";

export default function Message({ msg }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!msg.msg) {
            setShow(false);
            return;
        }
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [msg.id]);

    if (!show) {
        return null;
    }

    return <div className={`message`}>{msg.msg}</div>;
}
