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

export class RegistrationDto implements IRegistrationDto {
    registrationId?: string | undefined;
    applicantId?: string | undefined;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    preferSimultaneousCourseExecutionForPartipiants: boolean;
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
            this.registrationId = data["registrationId"];
            this.applicantId = data["applicantId"];
            this.surname = data["surname"];
            this.givenname = data["givenname"];
            this.residence = data["residence"];
            this.phoneNumber = data["phoneNumber"];
            this.preferSimultaneousCourseExecutionForPartipiants = data["preferSimultaneousCourseExecutionForPartipiants"];
            this.availableFrom = data["availableFrom"] ? new Date(data["availableFrom"].toString()) : <any>undefined;
            this.availableTo = data["availableTo"] ? new Date(data["availableTo"].toString()) : <any>undefined;
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
        data["preferSimultaneousCourseExecutionForPartipiants"] = this.preferSimultaneousCourseExecutionForPartipiants;
        data["availableFrom"] = this.availableFrom ? this.availableFrom.toISOString() : <any>undefined;
        data["availableTo"] = this.availableTo ? this.availableTo.toISOString() : <any>undefined;
        if (this.participants && this.participants.constructor === Array) {
            data["participants"] = [];
            for (let item of this.participants)
                data["participants"].push(item.toJSON());
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
    applicantId?: string | undefined;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    preferSimultaneousCourseExecutionForPartipiants: boolean;
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
    language?: Language | undefined;
    ageGroup?: number | undefined;

    constructor(data?: IRegistrationParticipantDto) {
        super(data);
    }

    init(data?: any) {
        super.init(data);
        if (data) {
            this.name = data["name"];
            this.courseType = data["courseType"];
            this.discipline = data["discipline"];
            this.niveauId = data["niveauId"];
            this.language = data["language"];
            this.ageGroup = data["ageGroup"];
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
    language?: Language | undefined;
    ageGroup?: number | undefined;
}

export enum CourseType {
    Group = 0, 
}

export enum Discipline {
    Ski = 0, 
    Snowboard = 1, 
}

export enum Language {
    SwissGerman = 0, 
    German = 1, 
    French = 2, 
    Italian = 3, 
    English = 4, 
    Russian = 5, 
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
            this.registrationPartipiantId = data["registrationPartipiantId"];
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
        data["registrationPartipiantId"] = this.registrationPartipiantId;
        data["identifier"] = this.identifier;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        if (this.coursePeriods && this.coursePeriods.constructor === Array) {
            data["coursePeriods"] = [];
            for (let item of this.coursePeriods)
                data["coursePeriods"].push(item.toJSON());
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