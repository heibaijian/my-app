import * as React from 'react';
import Container from '@mui/material/Container';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Layout from './layout/Layout';
import {useNavigate, useParams} from "react-router-dom";
import {fetchPipelines} from "./request/PipelineType";
import {useQuery} from "react-query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataGrid4List from "./layout/GridColumns";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {FRONTHOST} from './utils'
import ResponsiveAppBar from "./layout/Header";
// import {ReactSession} from 'react-client-session';
import storage from "./request/storageUtils";

const ChangeButton = ({pipelineId}) => {
    const navigate = useNavigate();
    return (
        <Button
            variant="contained"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/build/config/${pipelineId}`);
            }}
            sx={{mt: 2, ml: 1}}
            endIcon={<SendIcon/>}
            style={{margin: 10}}
            size="small"

        >
            Build
        </Button>
    );
}

const PipelineTabs = ({buildTypeProp}) => {
    const [tab, setTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue)
    };
    const [build, setBuild] = React.useState(0);
    const handleBuild = (event, newValue) => {
        setBuild(newValue);
        if (storage.getUser() == undefined) {
            alert('please log in!');
        } else {
            let url = FRONTHOST + '/build/config/' + currentVersions[tab].pipeline_id;
            window.open(url); //此处的url是全路径
        }


    };
    console.log("tab:" + tab)
    const buildTypeSelect = buildTypeProp + "-build";
    console.log("buildType:" + buildTypeSelect)

    const pipelineType = useQuery(
        ["build", "pipelines-for-build-type", ...buildTypeSelect],
        () =>
            fetchPipelines({
                build_type: buildTypeSelect
            }),
        {
            onSuccess: (data) => {
                console.log(data)
            },
            keepPreviousData: true,
            staleTime: 5000,
        }
    );
    if (pipelineType.isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (pipelineType.isError) {
        return (
            <div>
                <p>error: {pipelineType.error}</p>
            </div>
        );
    }
    const currentVersions = pipelineType.data;

    if (buildTypeProp == 'dev') {
        return (
            <>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    {currentVersions.map((v) => (
                        <Tab label={v.pipeline_name}></Tab>
                    ))}
                </Tabs>
                <Button
                    variant="contained"
                    onClick={handleBuild}
                    sx={{mt: 2, ml: 1}}
                    endIcon={<SendIcon/>}
                    style={{margin: 10}}
                    size="small"

                >
                    Build
                </Button>
                <DataGrid4List tipipelineId={currentVersions[tab].pipeline_id}></DataGrid4List>

            </>
        );
    } else {
        return (
            <>
                <Tabs value={0} onChange={handleChange} aria-label="basic tabs example">
                    {currentVersions.map((v) => (
                        <Tab label={v.pipeline_name}></Tab>
                    ))}
                </Tabs>
                <Button
                    variant="contained"
                    onClick={handleBuild}
                    sx={{mt: 2, ml: 1}}
                    endIcon={<SendIcon/>}
                    style={{margin: 10}}
                    size="small"

                >
                    Build
                </Button>
                <DataGrid4List tipipelineId={currentVersions[0].pipeline_id}></DataGrid4List>
            </>
        );
    }
};

const ListPage = ({props}) => {
    const params = useParams();
    const selectType = params.type === undefined ? "dev" : params.type;

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Layout>
                <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
                    {/*<Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>*/}
                    {/*</Paper>*/}
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <td><font face="Comic Sans MS"> Build Type</font></td>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{width: "100%"}}>
                                <Box sx={{borderBottom: 1, borderColor: "divider"}}></Box>
                                <PipelineTabs
                                    buildTypeProp={selectType}
                                ></PipelineTabs>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </Layout>
        </>
    )
};

export default ListPage;
