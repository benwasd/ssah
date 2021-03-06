/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.17.3.0 (NJsonSchema v9.10.46.0 (Newtonsoft.Json v10.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { ApiProxyBase } from "./api-proxy-base";

export class InstructorApiProxy extends ApiProxyBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
    }

    getMyCourse(instructorId: string, courseId: string): Promise<CourseDto> {
        let url_ = this.baseUrl + "/api/Instructor/GetMyCourse?";
        if (instructorId === undefined || instructorId === null)
            throw new Error("The parameter 'instructorId' must be defined and cannot be null.");
        else
            url_ += "instructorId=" + encodeURIComponent("" + instructorId) + "&"; 
        if (courseId === undefined || courseId === null)
            throw new Error("The parameter 'courseId' must be defined and cannot be null.");
        else
            url_ += "courseId=" + encodeURIComponent("" + courseId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processGetMyCourse(_response));
        });
    }

    protected processGetMyCourse(response: Response): Promise<CourseDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? CourseDto.fromJS(resultData200) : new CourseDto();
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CourseDto>(<any>null);
    }

    getMyCourses(instructorId: string, from: Date, to: Date): Promise<CourseDto[]> {
        let url_ = this.baseUrl + "/api/Instructor/GetMyCourses?";
        if (instructorId === undefined || instructorId === null)
            throw new Error("The parameter 'instructorId' must be defined and cannot be null.");
        else
            url_ += "instructorId=" + encodeURIComponent("" + instructorId) + "&"; 
        if (from === undefined || from === null)
            throw new Error("The parameter 'from' must be defined and cannot be null.");
        else
            url_ += "from=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&"; 
        if (to === undefined || to === null)
            throw new Error("The parameter 'to' must be defined and cannot be null.");
        else
            url_ += "to=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processGetMyCourses(_response));
        });
    }

    protected processGetMyCourses(response: Response): Promise<CourseDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(CourseDto.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CourseDto[]>(<any>null);
    }

    closeCourse(instructorId: string, closeCourseDto: CloseCourseDto): Promise<void> {
        let url_ = this.baseUrl + "/api/Instructor/CloseCourse?";
        if (instructorId === undefined || instructorId === null)
            throw new Error("The parameter 'instructorId' must be defined and cannot be null.");
        else
            url_ += "instructorId=" + encodeURIComponent("" + instructorId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(closeCourseDto);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processCloseCourse(_response));
        });
    }

    protected processCloseCourse(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
}

export class RegistrationApiProxy extends ApiProxyBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
    }

    getRegistration(registrationId: string): Promise<RegistrationDto> {
        let url_ = this.baseUrl + "/api/Registration/GetRegistration?";
        if (registrationId === undefined || registrationId === null)
            throw new Error("The parameter 'registrationId' must be defined and cannot be null.");
        else
            url_ += "registrationId=" + encodeURIComponent("" + registrationId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processGetRegistration(_response));
        });
    }

    protected processGetRegistration(response: Response): Promise<RegistrationDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? RegistrationDto.fromJS(resultData200) : new RegistrationDto();
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RegistrationDto>(<any>null);
    }

    getRegistrations(applicantId: string): Promise<RegistrationOverviewDto[]> {
        let url_ = this.baseUrl + "/api/Registration/GetRegistrations?";
        if (applicantId === undefined || applicantId === null)
            throw new Error("The parameter 'applicantId' must be defined and cannot be null.");
        else
            url_ += "applicantId=" + encodeURIComponent("" + applicantId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processGetRegistrations(_response));
        });
    }

    protected processGetRegistrations(response: Response): Promise<RegistrationOverviewDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(RegistrationOverviewDto.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RegistrationOverviewDto[]>(<any>null);
    }

    register(registrationDto: RegistrationDto): Promise<RegistrationResultDto> {
        let url_ = this.baseUrl + "/api/Registration/Register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(registrationDto);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processRegister(_response));
        });
    }

    protected processRegister(response: Response): Promise<RegistrationResultDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? RegistrationResultDto.fromJS(resultData200) : new RegistrationResultDto();
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RegistrationResultDto>(<any>null);
    }

    update(registrationDto: RegistrationDto): Promise<RegistrationResultDto> {
        let url_ = this.baseUrl + "/api/Registration/Update";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(registrationDto);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processUpdate(_response));
        });
    }

    protected processUpdate(response: Response): Promise<RegistrationResultDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? RegistrationResultDto.fromJS(resultData200) : new RegistrationResultDto();
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RegistrationResultDto>(<any>null);
    }

    possibleCourseDatesPerParticipant(registrationId: string): Promise<PossibleCourseDto[]> {
        let url_ = this.baseUrl + "/api/Registration/PossibleCourseDatesPerParticipant?";
        if (registrationId === undefined || registrationId === null)
            throw new Error("The parameter 'registrationId' must be defined and cannot be null.");
        else
            url_ += "registrationId=" + encodeURIComponent("" + registrationId) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processPossibleCourseDatesPerParticipant(_response));
        });
    }

    protected processPossibleCourseDatesPerParticipant(response: Response): Promise<PossibleCourseDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(PossibleCourseDto.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PossibleCourseDto[]>(<any>null);
    }

    commitRegistration(commitRegistrationDto: CommitRegistrationDto): Promise<void> {
        let url_ = this.baseUrl + "/api/Registration/CommitRegistration";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(commitRegistrationDto);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processCommitRegistration(_response));
        });
    }

    protected processCommitRegistration(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
}

export class EntityDto {
    id: string;
    rowVersion: string;

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.rowVersion = data["rowVersion"];
        }
    }

    static fromJS(data: any): EntityDto {
        data = typeof data === 'object' ? data : {};
        let result = new EntityDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["rowVersion"] = this.rowVersion;
        return data; 
    }
}

export class CourseDto extends EntityDto {
    courseStatus: CourseStatus;
    courseType: CourseType;
    discipline: Discipline;
    niveauId: number;
    startDate: Date;
    actualCourseStart: Date;
    coursePeriods: Period[];
    participants: CourseParticipantDto[];
    lastModificationDate: Date;

    init(data?: any) {
        super.init(data);
        if (data) {
            this.courseStatus = data["courseStatus"];
            this.courseType = data["courseType"];
            this.discipline = data["discipline"];
            this.niveauId = data["niveauId"];
            this.startDate = data["startDate"] ? new Date(data["startDate"].toString()) : <any>undefined;
            this.actualCourseStart = data["actualCourseStart"] ? new Date(data["actualCourseStart"].toString()) : <any>undefined;
            if (data["coursePeriods"] && data["coursePeriods"].constructor === Array) {
                this.coursePeriods = [];
                for (let item of data["coursePeriods"])
                    this.coursePeriods.push(Period.fromJS(item));
            }
            if (data["participants"] && data["participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["participants"])
                    this.participants.push(CourseParticipantDto.fromJS(item));
            }
            this.lastModificationDate = data["lastModificationDate"] ? new Date(data["lastModificationDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["courseStatus"] = this.courseStatus;
        data["courseType"] = this.courseType;
        data["discipline"] = this.discipline;
        data["niveauId"] = this.niveauId;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["actualCourseStart"] = this.actualCourseStart ? this.actualCourseStart.toISOString() : <any>undefined;
        if (this.coursePeriods && this.coursePeriods.constructor === Array) {
            data["coursePeriods"] = [];
            for (let item of this.coursePeriods)
                data["coursePeriods"].push(item.toJSON());
        }
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJSON());
        }
        data["lastModificationDate"] = this.lastModificationDate ? this.lastModificationDate.toISOString() : <any>undefined;
        super.toJSON(data);
        return data; 
    }
}

export enum CourseStatus {
    Potential = 0, 
    Proposal = 1, 
    Committed = 2, 
    Closed = 3, 
}

export enum CourseType {
    Group = 0, 
}

export enum Discipline {
    Ski = 0, 
    Snowboard = 1, 
}

export class Period {
    start: Date;
    duration: string;
    end: Date;

    init(data?: any) {
        if (data) {
            this.start = data["start"] ? new Date(data["start"].toString()) : <any>undefined;
            this.duration = data["duration"];
            this.end = data["end"] ? new Date(data["end"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): Period {
        data = typeof data === 'object' ? data : {};
        let result = new Period();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["start"] = this.start ? this.start.toISOString() : <any>undefined;
        data["duration"] = this.duration;
        data["end"] = this.end ? this.end.toISOString() : <any>undefined;
        return data; 
    }
}

export class CourseParticipantDto extends EntityDto {
    name: string;
    language: Language;
    ageGroup: number;
    residence: string;
    phoneNumber: string;

    init(data?: any) {
        super.init(data);
        if (data) {
            this.name = data["name"];
            this.language = data["language"];
            this.ageGroup = data["ageGroup"];
            this.residence = data["residence"];
            this.phoneNumber = data["phoneNumber"];
        }
    }

    static fromJS(data: any): CourseParticipantDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseParticipantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["language"] = this.language;
        data["ageGroup"] = this.ageGroup;
        data["residence"] = this.residence;
        data["phoneNumber"] = this.phoneNumber;
        super.toJSON(data);
        return data; 
    }
}

export enum Language {
    SwissGerman = 0, 
    German = 1, 
    French = 2, 
    Italian = 3, 
    English = 4, 
    Russian = 5, 
}

export class CloseCourseDto extends EntityDto {
    participants: CourseParticipantFeedbackDto[];

    init(data?: any) {
        super.init(data);
        if (data) {
            if (data["participants"] && data["participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["participants"])
                    this.participants.push(CourseParticipantFeedbackDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CloseCourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new CloseCourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJSON());
        }
        super.toJSON(data);
        return data; 
    }
}

export class CourseParticipantFeedbackDto extends EntityDto {
    passed: boolean;

    init(data?: any) {
        super.init(data);
        if (data) {
            this.passed = data["passed"];
        }
    }

    static fromJS(data: any): CourseParticipantFeedbackDto {
        data = typeof data === 'object' ? data : {};
        let result = new CourseParticipantFeedbackDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["passed"] = this.passed;
        super.toJSON(data);
        return data; 
    }
}

export class RegistrationDto {
    registrationId?: string | undefined;
    applicantId?: string | undefined;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    availableFrom: Date;
    availableTo: Date;
    status: RegistrationStatus;
    participants: RegistrationParticipantDto[];

    init(data?: any) {
        if (data) {
            this.registrationId = data["registrationId"];
            this.applicantId = data["applicantId"];
            this.surname = data["surname"];
            this.givenname = data["givenname"];
            this.residence = data["residence"];
            this.phoneNumber = data["phoneNumber"];
            this.availableFrom = data["availableFrom"] ? new Date(data["availableFrom"].toString()) : <any>undefined;
            this.availableTo = data["availableTo"] ? new Date(data["availableTo"].toString()) : <any>undefined;
            this.status = data["status"];
            if (data["participants"] && data["participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["participants"])
                    this.participants.push(RegistrationParticipantDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RegistrationDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegistrationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["registrationId"] = this.registrationId;
        data["applicantId"] = this.applicantId;
        data["surname"] = this.surname;
        data["givenname"] = this.givenname;
        data["residence"] = this.residence;
        data["phoneNumber"] = this.phoneNumber;
        data["availableFrom"] = this.availableFrom ? this.availableFrom.toISOString() : <any>undefined;
        data["availableTo"] = this.availableTo ? this.availableTo.toISOString() : <any>undefined;
        data["status"] = this.status;
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJSON());
        }
        return data; 
    }
}

export enum RegistrationStatus {
    Registration = 0, 
    CourseSelection = 1, 
    Commitment = 2, 
    Committed = 3, 
}

export class RegistrationParticipantDto extends EntityDto {
    name: string;
    courseType: CourseType;
    discipline: Discipline;
    niveauId: number;
    language?: Language | undefined;
    ageGroup?: number | undefined;
    committedCoursePeriods: Period[];

    init(data?: any) {
        super.init(data);
        if (data) {
            this.name = data["name"];
            this.courseType = data["courseType"];
            this.discipline = data["discipline"];
            this.niveauId = data["niveauId"];
            this.language = data["language"];
            this.ageGroup = data["ageGroup"];
            if (data["committedCoursePeriods"] && data["committedCoursePeriods"].constructor === Array) {
                this.committedCoursePeriods = [];
                for (let item of data["committedCoursePeriods"])
                    this.committedCoursePeriods.push(Period.fromJS(item));
            }
        }
    }

    static fromJS(data: any): RegistrationParticipantDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegistrationParticipantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["courseType"] = this.courseType;
        data["discipline"] = this.discipline;
        data["niveauId"] = this.niveauId;
        data["language"] = this.language;
        data["ageGroup"] = this.ageGroup;
        if (this.committedCoursePeriods && this.committedCoursePeriods.constructor === Array) {
            data["committedCoursePeriods"] = [];
            for (let item of this.committedCoursePeriods)
                data["committedCoursePeriods"].push(item.toJSON());
        }
        super.toJSON(data);
        return data; 
    }
}

export class RegistrationOverviewDto {
    registrationId: string;
    availableFrom: Date;
    availableTo: Date;
    status: RegistrationStatus;
    participantNames: string;

    init(data?: any) {
        if (data) {
            this.registrationId = data["registrationId"];
            this.availableFrom = data["availableFrom"] ? new Date(data["availableFrom"].toString()) : <any>undefined;
            this.availableTo = data["availableTo"] ? new Date(data["availableTo"].toString()) : <any>undefined;
            this.status = data["status"];
            this.participantNames = data["participantNames"];
        }
    }

    static fromJS(data: any): RegistrationOverviewDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegistrationOverviewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["registrationId"] = this.registrationId;
        data["availableFrom"] = this.availableFrom ? this.availableFrom.toISOString() : <any>undefined;
        data["availableTo"] = this.availableTo ? this.availableTo.toISOString() : <any>undefined;
        data["status"] = this.status;
        data["participantNames"] = this.participantNames;
        return data; 
    }
}

export class RegistrationResultDto {
    applicantId: string;
    registrationId: string;

    init(data?: any) {
        if (data) {
            this.applicantId = data["applicantId"];
            this.registrationId = data["registrationId"];
        }
    }

    static fromJS(data: any): RegistrationResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RegistrationResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["applicantId"] = this.applicantId;
        data["registrationId"] = this.registrationId;
        return data; 
    }
}

export class PossibleCourseDto {
    registrationParticipantId: string;
    identifier: number;
    startDate: Date;
    coursePeriods: Period[];

    init(data?: any) {
        if (data) {
            this.registrationParticipantId = data["registrationParticipantId"];
            this.identifier = data["identifier"];
            this.startDate = data["startDate"] ? new Date(data["startDate"].toString()) : <any>undefined;
            if (data["coursePeriods"] && data["coursePeriods"].constructor === Array) {
                this.coursePeriods = [];
                for (let item of data["coursePeriods"])
                    this.coursePeriods.push(Period.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PossibleCourseDto {
        data = typeof data === 'object' ? data : {};
        let result = new PossibleCourseDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["registrationParticipantId"] = this.registrationParticipantId;
        data["identifier"] = this.identifier;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        if (this.coursePeriods && this.coursePeriods.constructor === Array) {
            data["coursePeriods"] = [];
            for (let item of this.coursePeriods)
                data["coursePeriods"].push(item.toJSON());
        }
        return data; 
    }
}

export class CommitRegistrationDto {
    registrationId: string;
    payment: string;
    participants: CommitRegistrationParticipantDto[];

    init(data?: any) {
        if (data) {
            this.registrationId = data["registrationId"];
            this.payment = data["payment"];
            if (data["participants"] && data["participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["participants"])
                    this.participants.push(CommitRegistrationParticipantDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CommitRegistrationDto {
        data = typeof data === 'object' ? data : {};
        let result = new CommitRegistrationDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["registrationId"] = this.registrationId;
        data["payment"] = this.payment;
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJSON());
        }
        return data; 
    }
}

export class CommitRegistrationParticipantDto extends EntityDto {
    language: Language;
    ageGroup: number;
    courseIdentifier: number;
    courseStartDate: Date;

    init(data?: any) {
        super.init(data);
        if (data) {
            this.language = data["language"];
            this.ageGroup = data["ageGroup"];
            this.courseIdentifier = data["courseIdentifier"];
            this.courseStartDate = data["courseStartDate"] ? new Date(data["courseStartDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CommitRegistrationParticipantDto {
        data = typeof data === 'object' ? data : {};
        let result = new CommitRegistrationParticipantDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["language"] = this.language;
        data["ageGroup"] = this.ageGroup;
        data["courseIdentifier"] = this.courseIdentifier;
        data["courseStartDate"] = this.courseStartDate ? this.courseStartDate.toISOString() : <any>undefined;
        super.toJSON(data);
        return data; 
    }
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if(result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}