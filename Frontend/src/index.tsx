import * as React from "react";
import * as ReactDOM from "react-dom";

import './styling/semantic.less';

import { Hello } from "./components/Hello";

ReactDOM.render(
    <div>
        <Hello />
    </div>,
    document.getElementById("example")
);