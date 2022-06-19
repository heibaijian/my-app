import * as React from 'react';
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
import BasicInfo from "../layout/BasicInfo";
import {useParams} from "react-router-dom";

const RequestBuildRes = (pipeline_build_id) => {
    console.log(pipeline_build_id)
    const buildRes = useQuery(
        ["build", "request-result", pipeline_build_id],
        () =>
            fetchBuildResult({
                pipeline_build_id: pipeline_build_id
            }),
        {
            onSuccess: (data) => {
                console.log(data)
            },
            keepPreviousData: true,
            staleTime: 5000,
        }
    );
    if (buildRes.isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (buildRes.isError) {
        return (
            <div>
                <p>error: {buildRes.error}</p>
            </div>
        );
    }
    const buildResData = buildRes.data;
    return buildResData;
}

const BuildResPage = (props) => {
    const params = useParams();
    const pipeline_build_id = params.pipeline_build_id === undefined ? "none" : params.type;
    console.log(pipeline_build_id);
    const requestBuildRes = RequestBuildRes(pipeline_build_id)

    return (
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
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={10}>
                    <Grid item xs={7} md={7} lg={7}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <BasicInfo requestBuild={requestBuildRes}></BasicInfo>
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
                            <ArtifactMeta artifactMeta={requestBuildRes.artifact_meta}></ArtifactMeta>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
};

export default BuildResPage;