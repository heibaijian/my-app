import * as React from 'react';
import {useEffect} from 'react';
import Container from '@mui/material/Container';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Layout from '../layout/Layout';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArtifactMeta from "../layout/ArtifactMeta";
import {useQuery} from "react-query";
import {fetchBuildResult} from "../request/BuildResult";
import {fetchBuildRoll} from "../request/BuildRoll";
import BasicInfo from "../layout/BasicInfo";
import {useParams} from "react-router-dom";
import axios from "axios";
import ResponsiveAppBar from "../layout/Header";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function GetPipelineId() {
    // const params = useParams();
    // const pipeline_build_id = params.pipeline_build_id === undefined ? "none" : params.pipeline_build_id;
    const params = window.location.href;
    const pipeline_build_id=params.split('result/')[1];
    console.log("1:"+pipeline_build_id);
    return pipeline_build_id;
}


class BuildResPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            pipeline_build_id: -1
        }
        let pipeline_build_id = GetPipelineId();
        axios.get(`http://127.0.0.1:8080/build/request-result?pipeline_build_id=${pipeline_build_id}`).then((response) => {
            let data = response.data.data;
            this.setState({
                data: data,
                pipeline_build_id: pipeline_build_id
            });
        });

    }


    // 组件渲染后调用
    componentDidMount() {
        let timer = setInterval(function () {
            let data = this.state.data;
            axios.get(`http://127.0.0.1:8080/build/request-result?pipeline_build_id=${this.state.pipeline_build_id}`).then((response) => {
                data = response.data.data;
                this.setState({
                    data: data
                });
                console.log(this.state.data.status);
                if (this.state.data.status != "Processing") {
                    clearInterval(timer);
                }

            });

        }.bind(this), 300);
    }

    render() {
        return (
            <>
                <ResponsiveAppBar></ResponsiveAppBar>
                <Layout>
                    <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
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
                    <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={10}>
                            <Grid item xs={7} md={7} lg={7}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <BasicInfo requestBuild={this.state.data}></BasicInfo>
                                </Paper>
                            </Grid>
                            {/* Recent ArtifactMeta */}
                            <Grid item xs={5} md={5} lg={5}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <ArtifactMeta artifactMeta={this.state.data.artifact_meta}></ArtifactMeta>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                </Layout>
            </>
        );
    }
}

export default BuildResPage;
