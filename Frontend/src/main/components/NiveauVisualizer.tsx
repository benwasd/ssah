import * as React from 'react';
import { Image } from 'semantic-ui-react';

import { Discipline } from '../../api';
import './NiveauVisualizer.less';

import './../../assets';
import * as skiSvg from './../../assets/Discipline-Ski.svg';
import * as snowboardSvg from './../../assets/Discipline-Snowboard.svg';

export interface NiveauVisualizerProps {
    discipline?: Discipline;
    niveauId?: number;
}

export class NiveauVisualizer extends React.Component<NiveauVisualizerProps> {
    render() {
        if (this.props.discipline === Discipline.Ski) {
            return <Image src={skiSvg} className='discipline' />
        } 
        else if(this.props.discipline === Discipline.Snowboard) {
            return <Image src={snowboardSvg} className='discipline' />
        }

        return null;
    }
}
