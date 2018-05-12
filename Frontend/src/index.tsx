import * as React from "react";
import * as ReactDOM from "react-dom";

import './styling/semantic.less';

import { Hello } from "./components/Hello";
import { RegistrationApiProxy, RegistrationDto } from "./api";

var l = new RegistrationApiProxy();
var y = new RegistrationDto();
y.givenname = "Benjamin";
y.surname = "Müller";
l.register(y);

ReactDOM.render(
    <Hello />,
    document.getElementById("example")
);
