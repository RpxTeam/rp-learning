import React from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Responsive,
    Segment,
    Step
} from 'semantic-ui-react'
import Footer from '../../../../common/mainFooter'
import Topbar from '../../../../common/topbar'
import Sidebar from '../../../../common/sidebar'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Topbar></Topbar>
                <Sidebar></Sidebar>
                <main className="fadeIn animated">
                    
                </main>
                <Footer/>
            </div>
        );
    }
}

export default Page;