import * as React from "react";
import * as ReactDOM from "react-dom";

import './styling/semantic.less';

import { Hello } from "./components/Hello";
import { RegistrationApiProxy, RegistrationDto, RegistrationParticipantDto, Discipline, CourseType } from "./api";

var registrationApi = new RegistrationApiProxy();

var participant = new RegistrationParticipantDto();
participant.discipline = Discipline.Snowboard;
participant.courseType = CourseType.Group;
participant.name = "Andrina";
participant.niveauId = 200;

var registraion = new RegistrationDto();
registraion.givenname = "Benjamin";
registraion.surname = "Müller";
registraion.residence = "Thun";
registraion.availableTo = new Date
registraion.availableFrom = new Date
registraion.phoneNumber = "+41 2222";
registraion.participants = [
    participant
];

registrationApi.register(registraion);


ReactDOM.render(
    <Hello />,
    document.getElementById("example")
);
