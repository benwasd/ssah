export interface NiveauQuestion {
    question: string;
    responses: NiveauResponse[];
}

export interface NiveauResponse {
    response: string;
    followingQuestion?: NiveauQuestion;
    niveau?: number;
}

export const skiRootQuestion: NiveauQuestion = {
    question: "Hat der Teilnehmer bereits ein Ski-Abzeichen der Schweizer Skischule?",
    responses: [
        {
            response: "Ja",
            followingQuestion: {
                question: "Welches Abzeichen wurde als letztes gemacht?",
                responses: [
                    {
                        response: "Kids Village",
                        followingQuestion: {
                            question: "YZ",
                            responses: [
                                {
                                    response: "Kids Village",
                                    niveau: 110
                                },
                                {
                                    response: "Blue Prince/Princess",
                                    niveau: 111
                                },
                                {
                                    response: "Blue King/Queen",
                                    niveau: 112
                                }
                            ]
                        }
                    },
                    {
                        response: "Blue Prince/Princess",
                        niveau: 111
                    },
                    {
                        response: "Blue King/Queen",
                        niveau: 112
                    }
                ]
            }
        },
        {
            response: "Nein",
            followingQuestion: {
                question: "Kann der Teilnehmer bremsen?",
                responses: [
                    {
                        response: "Ja im Pflug",
                        niveau: 110
                    },
                    {
                        response: "Nein",
                        niveau: 100
                    }
                ]
            }
        }
    ]
}

export const snowboardRootQuestion: NiveauQuestion = {
    question: "Hat der Teilnehmer bereits ein Snowboard-Abzeichen der Schweizer Skischule?",
    responses: [
        {
            response: "Ja",
            followingQuestion: {
                question: "Welches Abzeichen wurde als letztes gemacht?",
                responses: [
                    {
                        response: "Kids Village",
                        followingQuestion: {
                            question: "YZ",
                            responses: [
                                {
                                    response: "Kids Village",
                                    niveau: 110
                                },
                                {
                                    response: "Blue Prince/Princess",
                                    niveau: 111
                                },
                                {
                                    response: "Blue King/Queen",
                                    niveau: 112
                                }
                            ]
                        }
                    },
                    {
                        response: "Blue Prince/Princess",
                        niveau: 111
                    },
                    {
                        response: "Blue King/Queen",
                        niveau: 112
                    }
                ]
            }
        },
        {
            response: "Nein",
            followingQuestion: {
                question: "Kann der Teilnehmer bremsen?",
                responses: [
                    {
                        response: "Ja im Pflug",
                        niveau: 110
                    },
                    {
                        response: "Nein",
                        niveau: 100
                    }
                ]
            }
        }
    ]
}

import './assets';
import * as sskv_ski from './assets/sskv_ski.png';
import * as blue_princeprincess_ski from './assets/blue_princeprincess_ski.png';
import * as blue_kingqueen_ski from './assets/blue_kingqueen_ski.png';
import * as blue_star_ski from './assets/blue_star_ski.png';
import * as red_princeprincess_ski from './assets/red_princeprincess_ski.png';
import * as red_kingqueen_ski from './assets/red_kingqueen_ski.png';
import * as red_star_ski from './assets/red_star_ski.png';
import * as black_prince_ski from './assets/black_prince_ski.png';

import * as sskv_sb from './assets/sskv_sb.png';
import * as blue_princeprincess_sb from './assets/blue_princeprincess_sb.png';
import * as blue_kingqueen_sb from './assets/blue_kingqueen_sb.png';
import * as blue_star_sb from './assets/blue_star_sb.png';
import * as red_princeprincess_sb from './assets/red_princeprincess_sb.png';
import * as red_kingqueen_sb from './assets/red_kingqueen_sb.png';
import * as red_star_sb from './assets/red_star_sb.png';

export const leagueBadges = {
    0: { // Discipline.Ski
        100: sskv_ski,
        110: blue_princeprincess_ski,
        111: blue_kingqueen_ski,
        112: blue_star_ski,
        120: red_princeprincess_ski,
        121: red_kingqueen_ski,
        122: red_star_ski,
        130: black_prince_ski
    },
    1: { // Discipline.Snowboard
        101: sskv_sb,
        110: blue_princeprincess_sb,
        111: blue_kingqueen_sb,
        112: blue_star_sb,
        120: red_princeprincess_sb,
        121: red_kingqueen_sb,
        122: red_star_sb
    }
};

// Default: http://localhost:51474
export const baseApiUrl: string = (window as any).ssah.baseUrl;
