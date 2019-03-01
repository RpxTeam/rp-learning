import React from 'react'
import Admin from '../Admin'
import {
    Grid,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Admin heading="Painel de Controle">
                <Grid container spacing={40}>
                    <Grid item sm={6}>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat (g)</TableCell>
                                        <TableCell align="right">Carbs (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow>
                                            <TableCell align="right">dsadsadsa</TableCell>
                                            <TableCell align="right">dasdsdsadas</TableCell>
                                            <TableCell align="right">dasdsadsadsadas</TableCell>
                                            <TableCell align="right">dasdsadas</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item sm={6}>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat (g)</TableCell>
                                        <TableCell align="right">Carbs (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow>
                                            <TableCell align="right">dsadsadsa</TableCell>
                                            <TableCell align="right">dasdsdsadas</TableCell>
                                            <TableCell align="right">dasdsadsadsadas</TableCell>
                                            <TableCell align="right">dasdsadas</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Admin>
        );
    }
}

export default Page;