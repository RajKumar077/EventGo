import React from "react";

export function ErrorMsg(props) {
    if (!props.valid) {
        return(
            <div className='error-msg'>{props.message}</div>
    )
    }
    return null;
}
