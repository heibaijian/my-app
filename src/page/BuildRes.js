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

const RequestBuildRoll = (pipeline_build_id) => {
    console.log(pipeline_build_id)
    const buildRoll = useQuery(
        ["build", "request-rotation", pipeline_build_id],
        () =>
            fetchBuildRoll({
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
    if (buildRoll.isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (buildRoll.isError) {
        return (
            <div>
                <p>error: {buildRoll.error}</p>
            </div>
        );
    }
    const buildResData = buildRoll.data;
    return buildResData;
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function IntervalExp(pipeline_build_id) {
    const [data, setData] = React.useState('');
    useEffect(() => {
        const timer = setInterval(() => {
            axios.get(`http://127.0.0.1:8080/build/request-rotation?pipeline_build_id=${pipeline_build_id}`).then((response) => {
                setData(response.data.data.status);
                console.log("res:" + data);
            });
        }, 10);
        console.log("更新了", data);
        sleep(5000);
        if (data == 'Finished') {
            // return () => {
            //     clearInterval(timer);
            // };
        }

    }, [data]);


}

const BuildResPage = (props) => {
    const params = useParams();
    const pipeline_build_id = params.pipeline_build_id === undefined ? "none" : params.pipeline_build_id;
    // let i = 1
    // while (RequestBuildRoll(pipeline_build_id).status !== 'Finished' && i < 5) {
    //     //wait 5 min
    //     sleep(1000 * 60 * 5);
    //     console.log("wait 5 min");
    //     i = i + 1;
    //
    // }
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     console.log(RequestBuildRes(pipeline_build_id));
    //     setData(1);
    // }, []);
    // const [data, setData] = useState({});
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8080/build/request-rotation?pipeline_build_id=${pipeline_build_id}`).then((response) => {
    //         setData(response.data.data);
    //         console.log("res"+response.data);
    //     });
    // }, {});
    // console.log("data:" + data);
    IntervalExp(pipeline_build_id);
    const requestBuildRes = RequestBuildRes(pipeline_build_id)
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
        </>
    )
};

export default BuildResPage;
