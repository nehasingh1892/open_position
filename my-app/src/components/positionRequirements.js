import React from "react";

export default function({title, value}){
        return(
            <tr>
                <td>{title}</td>
                <td>{value}</td>
            </tr>
        );
}