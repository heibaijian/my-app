import * as React from 'react';
import Container from '@mui/material/Container';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Layout from './layout/Layout';
import {useParams} from "react-router-dom";
import {fetchPipelines} from "./request/PipelineType";
import {useQuery} from "react-query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataGrid4List from "./layout/GridColumns";


const PipelineTabs = ({buildTypeProp}) => {
    const [tab, setTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue)
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
    if (buildTypeProp == "dev") {
        return (
            <>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    {currentVersions.map((v) => (
                        <Tab label={v.pipeline_name}></Tab>
                    ))}
                </Tabs>
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
                <DataGrid4List tipipelineId={currentVersions[0].pipeline_id}></DataGrid4List>
            </>
        );
    }
};

const ListPage = (props) => {
    const params = useParams();
    const selectType = params.type === undefined ? "dev" : params.type;
    console.log(selectType)


    return (

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

    )
};

export default ListPage;