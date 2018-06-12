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
    question: "Kann der/die Teilnehmer(in) bremsen?",
    responses: [
        {
            response: "Nein",
            followingQuestion: {
                question: "Kann er/sie mit angezogenen Skier laufen und aufsteigen?",
                responses: [
                    {
                        response: "Ja",
                        niveau: 110
                    },
                    {
                        response: "Nein",
                        niveau: 100
                    }
                ]
            }
        },
        {
            response: "Ja, im Stemmbogen",
            followingQuestion: {
                question: "Kann er/sie, alleine auf den Bügel, die Bergstation des Skilifts erreichen?",
                responses: [
                    {
                        response: "Ja",
                        niveau: 111
                    },
                    {
                        response: "Nein",
                        niveau: 110
                    }
                ]
            }
        },
        {
            response: "Ja, auch seitwärts gerutscht",
            niveau: 112
        }
    ]
}

export const snowboardRootQuestion: NiveauQuestion = {
    question: "Kann der/die Teilnehmer(in) mit dem Snowboard walzern?",
    responses: [
        {
            response: "Nein",
            followingQuestion: {
                question: "War er/sie schon einmal im Snowpark?",
                responses: [
                    {
                        response: "Nein",
                        niveau: 110
                    },
                    {
                        response: "Ja",
                        niveau: 112
                    }
                ]
            }
        },
        {
            response: "Ja, wie ein(e) König/Königin",
            niveau: 112
        }
    ]
}

export const languages = ["Schweizerdeutsch", "Deutsch", "Französisch", "Italienisch", "Englisch", "Russisch"];
export const courseTypes = ["Gruppenkurs"];

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
        100: sskv_sb,
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
