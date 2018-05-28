import * as React from 'react';
import { Image } from 'semantic-ui-react';

import { Discipline } from '../../api';
import './NiveauVisualizer.less';

import './../../assets';
import * as skiSvg from './../../assets/discipline-ski.svg';
import * as snowboardSvg from './../../assets/discipline-snowboard.svg';
import * as kidsVillagePng from './../../assets/snowly.png';
import * as chroneKingQueenSvg from './../../assets/crone-kingqueen.svg';
import * as chronePrincePrincessSvg from './../../assets/crone-princeprincess.svg';
import * as starSvg from './../../assets/star.svg';

export interface NiveauVisualizerProps {
    discipline?: Discipline;
    niveauId?: number;
    onClick?: () => void;
}

export class NiveauVisualizer extends React.Component<NiveauVisualizerProps> {
    render() {
        let disciplineIcon;
        let niveauIcon;
        let leagueClassName;

        if (this.props.discipline === Discipline.Ski) {
            disciplineIcon = skiSvg;
        } 
        else if(this.props.discipline === Discipline.Snowboard) {
            disciplineIcon = snowboardSvg;
        }

        if (this.props.niveauId && 100 <= this.props.niveauId) {
            if (this.props.niveauId <= 109) {
                leagueClassName = 'kids-village';
            }
            else if (this.props.niveauId <= 119) {
                leagueClassName = 'blue-league';
            }
            else if (this.props.niveauId <= 129) {
                leagueClassName = 'red-league';
            }
            else if (this.props.niveauId <= 139) {
                leagueClassName = 'black-league';
            }

            switch (this.props.niveauId) {
                case 100:
                    niveauIcon = kidsVillagePng;
                    break;
                case 110:
                case 120:
                case 130:
                    niveauIcon = chronePrincePrincessSvg;
                    break;
                case 111:
                case 121:
                case 131:
                    niveauIcon = chroneKingQueenSvg;
                    break;
                case 112:
                case 122:
                case 132:
                    niveauIcon = starSvg;
                    break;
            }
        }

        let classes = ['niveau', 'visualizer', leagueClassName];
        if (this.props.onClick) {
            classes = classes.concat('clickable-on-mobile');
        }

        return (<>
            <div className={classes.join(' ')} onClick={() => this.props.onClick && this.props.onClick()}>
                {!disciplineIcon && !niveauIcon && <div className='caption'>Stufe wählen</div>}
                <div className='discipline'>
                    {disciplineIcon && <Image src={disciplineIcon} />}
                </div>
                <div className={'niveau'}>
                    {niveauIcon && <Image src={niveauIcon} />}
                </div>
            </div>
        </>);
    }
}
