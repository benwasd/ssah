/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.17.3.0 (NJsonSchema v9.10.46.0 (Newtonsoft.Json v10.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { ApiProxyBase } from "./api-proxy-base";

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

    getRegistrations(applicantId: string): Promise<RegistrationDto[]> {
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

    protected processGetRegistrations(response: Response): Promise<RegistrationDto[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(RegistrationDto.fromJS(item));
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<RegistrationDto[]>(<any>null);
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

    possibleCourseDatesPerPartipiant(registrationId: string): Promise<PossibleCourseDto[]> {
        let url_ = this.baseUrl + "/api/Registration/PossibleCourseDatesPerPartipiant?";
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
            return this.transformResult(url_, _response, (_response: Response) => this.processPossibleCourseDatesPerPartipiant(_response));
        });
    }

    protected processPossibleCourseDatesPerPartipiant(response: Response): Promise<PossibleCourseDto[]> {
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

export class ValuesApiProxy extends ApiProxyBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
    }

    getAll(): Promise<string[]> {
        let url_ = this.baseUrl + "/api/Values";
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
            return this.transformResult(url_, _response, (_response: Response) => this.processGetAll(_response));
        });
    }

    protected processGetAll(response: Response): Promise<string[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(item);
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string[]>(<any>null);
    }

    post(value: string): Promise<void> {
        let url_ = this.baseUrl + "/api/Values";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(value);

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
            return this.transformResult(url_, _response, (_response: Response) => this.processPost(_response));
        });
    }

    protected processPost(response: Response): Promise<void> {
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

    get(id: number): Promise<string> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
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
            return this.transformResult(url_, _response, (_response: Response) => this.processGet(_response));
        });
    }

    protected processGet(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(<any>null);
    }

    put(id: number, value: string): Promise<void> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(value);

        let options_ = <RequestInit>{
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processPut(_response));
        });
    }

    protected processPut(response: Response): Promise<void> {
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

    delete(id: number): Promise<void> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.transformResult(url_, _response, (_response: Response) => this.processDelete(_response));
        });
    }

    protected processDelete(response: Response): Promise<void> {
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

export class RegistrationDto implements IRegistrationDto {
    registrationId?: string | undefined;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    availableFrom: Date;
    availableTo: Date;
    participants: RegistrationParticipantDto[];

    constructor(data?: IRegistrationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.participants = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.registrationId = data["RegistrationId"];
            this.surname = data["Surname"];
            this.givenname = data["Givenname"];
            this.residence = data["Residence"];
            this.phoneNumber = data["PhoneNumber"];
            this.availableFrom = data["AvailableFrom"] ? new Date(data["AvailableFrom"].toString()) : <any>undefined;
            this.availableTo = data["AvailableTo"] ? new Date(data["AvailableTo"].toString()) : <any>undefined;
            if (data["Participants"] && data["Participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["Participants"])
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
        data["RegistrationId"] = this.registrationId;
        data["Surname"] = this.surname;
        data["Givenname"] = this.givenname;
        data["Residence"] = this.residence;
        data["PhoneNumber"] = this.phoneNumber;
        data["AvailableFrom"] = this.availableFrom ? this.availableFrom.toISOString() : <any>undefined;
        data["AvailableTo"] = this.availableTo ? this.availableTo.toISOString() : <any>undefined;
        if (this.participants && this.participants.constructor === Array) {
            data["Participants"] = [];
            for (let item of this.participants)
                data["Participants"].push(item.toJSON());
        }
        return data; 
    }

    clone(): RegistrationDto {
        const json = this.toJSON();
        let result = new RegistrationDto();
        result.init(json);
        return result;
    }
}

export interface IRegistrationDto {
    registrationId?: string | undefined;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    availableFrom: Date;
    availableTo: Date;
    participants: RegistrationParticipantDto[];
}

export class EntityDto implements IEntityDto {
    id: string;
    rowVersion: string;

    constructor(data?: IEntityDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["Id"];
            this.rowVersion = data["RowVersion"];
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
        data["Id"] = this.id;
        data["RowVersion"] = this.rowVersion;
        return data; 
    }

    clone(): EntityDto {
        const json = this.toJSON();
        let result = new EntityDto();
        result.init(json);
        return result;
    }
}

export interface IEntityDto {
    id: string;
    rowVersion: string;
}

export class RegistrationParticipantDto extends EntityDto implements IRegistrationParticipantDto {
    name: string;
    courseType: CourseType;
    discipline: Discipline;
    niveauId: number;

    constructor(data?: IRegistrationParticipantDto) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.name = data["Name"];
            this.courseType = data["CourseType"];
            this.discipline = data["Discipline"];
            this.niveauId = data["NiveauId"];
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
        data["Name"] = this.name;
        data["CourseType"] = this.courseType;
        data["Discipline"] = this.discipline;
        data["NiveauId"] = this.niveauId;
        super.toJSON(data);
        return data; 
    }

    clone(): RegistrationParticipantDto {
        const json = this.toJSON();
        let result = new RegistrationParticipantDto();
        result.init(json);
        return result;
    }
}

export interface IRegistrationParticipantDto extends IEntityDto {
    name: string;
    courseType: CourseType;
    discipline: Discipline;
    niveauId: number;
}

export enum CourseType {
    Group = 0, 
}

export enum Discipline {
    Ski = 0, 
    Snowboard = 1, 
}

export class RegistrationResultDto implements IRegistrationResultDto {
    applicantId: string;
    registrationId: string;

    constructor(data?: IRegistrationResultDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.applicantId = data["ApplicantId"];
            this.registrationId = data["RegistrationId"];
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
        data["ApplicantId"] = this.applicantId;
        data["RegistrationId"] = this.registrationId;
        return data; 
    }

    clone(): RegistrationResultDto {
        const json = this.toJSON();
        let result = new RegistrationResultDto();
        result.init(json);
        return result;
    }
}

export interface IRegistrationResultDto {
    applicantId: string;
    registrationId: string;
}

export class PossibleCourseDto implements IPossibleCourseDto {
    registrationPartipiantId: string;
    identifier: number;
    startDate: Date;
    coursePeriods: Period[];

    constructor(data?: IPossibleCourseDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.coursePeriods = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.registrationPartipiantId = data["RegistrationPartipiantId"];
            this.identifier = data["Identifier"];
            this.startDate = data["StartDate"] ? new Date(data["StartDate"].toString()) : <any>undefined;
            if (data["CoursePeriods"] && data["CoursePeriods"].constructor === Array) {
                this.coursePeriods = [];
                for (let item of data["CoursePeriods"])
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
        data["RegistrationPartipiantId"] = this.registrationPartipiantId;
        data["Identifier"] = this.identifier;
        data["StartDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        if (this.coursePeriods && this.coursePeriods.constructor === Array) {
            data["CoursePeriods"] = [];
            for (let item of this.coursePeriods)
                data["CoursePeriods"].push(item.toJSON());
        }
        return data; 
    }

    clone(): PossibleCourseDto {
        const json = this.toJSON();
        let result = new PossibleCourseDto();
        result.init(json);
        return result;
    }
}

export interface IPossibleCourseDto {
    registrationPartipiantId: string;
    identifier: number;
    startDate: Date;
    coursePeriods: Period[];
}

export class Period implements IPeriod {
    start: Date;
    duration: string;
    end: Date;

    constructor(data?: IPeriod) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.start = data["Start"] ? new Date(data["Start"].toString()) : <any>undefined;
            this.duration = data["Duration"];
            this.end = data["End"] ? new Date(data["End"].toString()) : <any>undefined;
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
        data["Start"] = this.start ? this.start.toISOString() : <any>undefined;
        data["Duration"] = this.duration;
        data["End"] = this.end ? this.end.toISOString() : <any>undefined;
        return data; 
    }

    clone(): Period {
        const json = this.toJSON();
        let result = new Period();
        result.init(json);
        return result;
    }
}

export interface IPeriod {
    start: Date;
    duration: string;
    end: Date;
}

export class CommitRegistrationDto implements ICommitRegistrationDto {
    registrationId: string;
    payment: string;
    participants: CommitRegistrationParticipantDto[];

    constructor(data?: ICommitRegistrationDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.participants = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.registrationId = data["RegistrationId"];
            this.payment = data["Payment"];
            if (data["Participants"] && data["Participants"].constructor === Array) {
                this.participants = [];
                for (let item of data["Participants"])
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
        data["RegistrationId"] = this.registrationId;
        data["Payment"] = this.payment;
        if (this.participants && this.participants.constructor === Array) {
            data["Participants"] = [];
            for (let item of this.participants)
                data["Participants"].push(item.toJSON());
        }
        return data; 
    }

    clone(): CommitRegistrationDto {
        const json = this.toJSON();
        let result = new CommitRegistrationDto();
        result.init(json);
        return result;
    }
}

export interface ICommitRegistrationDto {
    registrationId: string;
    payment: string;
    participants: CommitRegistrationParticipantDto[];
}

export class CommitRegistrationParticipantDto extends EntityDto implements ICommitRegistrationParticipantDto {
    language: Language;
    ageGroup: number;
    courseIdentifier: number;
    courseStartDate: Date;

    constructor(data?: ICommitRegistrationParticipantDto) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.language = data["Language"];
            this.ageGroup = data["AgeGroup"];
            this.courseIdentifier = data["CourseIdentifier"];
            this.courseStartDate = data["CourseStartDate"] ? new Date(data["CourseStartDate"].toString()) : <any>undefined;
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
        data["Language"] = this.language;
        data["AgeGroup"] = this.ageGroup;
        data["CourseIdentifier"] = this.courseIdentifier;
        data["CourseStartDate"] = this.courseStartDate ? this.courseStartDate.toISOString() : <any>undefined;
        super.toJSON(data);
        return data; 
    }

    clone(): CommitRegistrationParticipantDto {
        const json = this.toJSON();
        let result = new CommitRegistrationParticipantDto();
        result.init(json);
        return result;
    }
}

export interface ICommitRegistrationParticipantDto extends IEntityDto {
    language: Language;
    ageGroup: number;
    courseIdentifier: number;
    courseStartDate: Date;
}

export enum Language {
    SwissGerman = 0, 
    German = 1, 
    French = 2, 
    Italian = 3, 
    English = 4, 
    Russian = 5, 
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