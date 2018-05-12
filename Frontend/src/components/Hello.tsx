import * as React from "react";
import { Flag, Button, Grid, Header, List, Segment, Accordion, Icon, Modal, } from 'semantic-ui-react';

export interface HelloProps { }

export class Hello extends React.Component<HelloProps, {}> {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <div>
                <div className="ui attached stackable menu">
                    <div className="ui container">
                        <a className="item">
                            <i className="home icon"></i> Home
                        </a>
                        <a className="item">
                            <i className="grid layout icon"></i> Browse
                        </a>
                        <a className="item">
                            <i className="mail icon"></i> Messages
                        </a>
                        <div className="ui simple dropdown item">
                            More
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <a className="item"><i className="edit icon"></i> Edit Profile</a>
                                <a className="item"><i className="globe icon"></i> Choose Language</a>
                                <a className="item"><i className="settings icon"></i> Account Settings</a>
                            </div>
                        </div>
                        <div className="right item">
                            <div className="ui input">
                                <input type="text" placeholder="Search..."/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui raised segment">
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                </div>
            </div>
        );
    }
}