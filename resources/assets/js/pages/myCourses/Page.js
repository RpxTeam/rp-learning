import React from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Segment,
    Card,
    Image
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader heading="My Courses"/>
                <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                    <Header as='h1'>Courses</Header>
                    <Container>
                        <Card.Group>
                            <Card color='red'>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>Curso 1</Card.Header>
                                    <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                    </Card.Meta>
                                    <Card.Description>Descrição do Curso.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        Approve
                                    </Button>
                                    <Button basic color='red'>
                                        Decline
                                    </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default Page;