import * as React from 'react';
import Container from '@mui/material/Container';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Layout from './layout/Layout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from "./Deposits";

const style = {
    width: '50%',
    maxWidth: 600,
    bgcolor: 'background.paper',
};
const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const BuildResPage = () => {

    return (
        <Layout>
            <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
                {/*<Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>*/}
                {/*</Paper>*/}
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <td><font face="Comic Sans MS"> Execution Result</font></td>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{width: "100%"}}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}></Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Container>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}} >
                    <Grid container spacing={10}>
                        <Grid item xs={7} md={7} lg={7}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <List sx={style} margin={{
                                    top: 16,
                                    right: 16,
                                    bottom: 0,
                                    left: 24,
                                }} component="nav" aria-label="mailbox folders">
                                    <ListItem divider>
                                        <ListItemText primary="ID" secondary={"1"}/>
                                    </ListItem>
                                    <Divider/>
                                    <ListItem divider>
                                        <ListItemText primary="Build Type" secondary={"Nightly image to QA"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Begin Time" secondary={"2022-06-01 13:00:00"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Begin Time" secondary={"2022-06-01 13:00:00"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Begin Time" secondary={"2022-06-01 13:00:00"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Begin Time" secondary={"2022-06-01 13:00:00"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="End Time" secondary={"-"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Status" secondary={"Processing"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Component" secondary={"All"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Artifact Type" secondary={"All"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Branch" secondary={"Release-6.1"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Arch" secondary={"All"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Version" secondary={"v6.1.0"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Start By" secondary={"lvhongmeng"}/>
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText primary="Trace Log" secondary={
                                            <a href={"https://cd.pingcap.net"}>Trace Log</a>}/>
                                    </ListItem>
                                    {/*<ListItem divider>*/}
                                    {/*    <ListItemText primary="Artifact Meta" secondary={*/}
                                    {/*        <p>component:tidb<br/>*/}
                                    {/*            commit hash: d3e2267107a8277b744357d9f58c8febc29c5d60<br/>*/}
                                    {/*            binary path: http://fileserver.pingcap.net/tidb<br/>*/}
                                    {/*            image path: pingcap / tidb*/}
                                    {/*        </p>}
                                    {/*</ListItem>*/}
                                </List>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={5} md={5} lg={5}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Deposits/>
                            </Paper>
                        </Grid>
                    </Grid>

            </Container>
        </Layout>
    )
};

export default BuildResPage;