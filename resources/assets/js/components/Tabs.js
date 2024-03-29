import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
            <div className="tabs">
                <div className="navtabs">
                    <div className="gridD">
                        <ul>
                            {children.map((child) => {
                                const { label } = child.props;

                                return (
                                    <Tab
                                        activeTab={activeTab}
                                        key={label}
                                        label={label}
                                        onClick={onClickTabItem}
                                    />
                                );
                            })}
                        </ul>
                        <div className="navtabs-bar"></div>
                    </div>
                </div>
                <div className="navtabs-content">
                    <div className="tab-content">
                        {children.map((child) => {
                            if (child.props.label !== activeTab) return undefined;
                            return child.props.children;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;