import React from 'react';
type ContentType={
    heading:string
    pages:string
}
export const Content = (props:ContentType) => {
    return (
        <div>
          <div>{props.heading}</div>
            <div>{props.pages}</div>
        </div>
    );
};

