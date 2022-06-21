import * as React from 'react';
import Container from '@mui/material/Container';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Layout from '../layout/Layout';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {useQuery} from "react-query";
import {fetchBuildParam} from "../request/BuildParam";


const BuildPage = (pipeline_id) => {
    pipeline_id = 1
    const [build, setBuild] = React.useState(0);
    const [cancel, setCancel] = React.useState(0)
    const handleBuild = () => {
        setBuild(1);
    };
    const handleCancel = () => {
        setCancel(1)
    }

    const buildParam = useQuery(
        ["build", "params-available-for-pipeline", pipeline_id],
        () =>
            fetchBuildParam({
                pipeline_id: pipeline_id
            }),
        {
            onSuccess: (data) => {
                console.log(data)
            },
            keepPreviousData: true,
            staleTime: 5000,
        }
    );
    if (buildParam.isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (buildParam.isError) {
        return (
            <div>
                <p>error: {buildParam.error}</p>
            </div>
        );
    }
    const buildParamRes = buildParam.data[0];
    let componentList = [];
    let branchList = [];
    const version = buildParamRes.version;
    let arch = [];
    let artifactType = []
    let versionFlag = false;
    if (buildParamRes.build_type == "hotfix-build" || pipeline_id == 1) {
        componentList = [
            {label: 'tidb'},
            {label: 'tikv'},
        ];
        branchList = [
            {label: 'release-5.2'},
            {label: 'release-5.3'},
            {label: 'release-5.4'},
            {label: 'release-6.1'},
        ];
        arch = [
            {label: 'linux-amd64'},
            {label: 'linux-arm64'},
        ];
        artifactType = [
            {label: 'community image'},
            {label: 'enterprise image'},
        ];

    } else if (buildParamRes.build_type == "rc-build" || buildParamRes.build_type == "ga-build") {
        componentList = [
            {label: buildParamRes.component}
        ];
        branchList = [
            {label: 'release-5.2'},
            {label: 'release-5.3'},
            {label: 'release-5.4'},
            {label: 'release-6.1'},
        ];
        arch = [
            {label: buildParamRes.arch}
        ];
        artifactType = [
            {label: buildParamRes.artifact_type}
        ];
    } else {
        componentList = [
            {label: buildParamRes.component}
        ];
        branchList = [
            {label: buildParamRes.branch}
        ];
        arch = [
            {label: buildParamRes.arch}
        ];
        artifactType = [
            {label: buildParamRes.artifact_type}
        ];
        versionFlag = true;
    }
    console.log(buildParamRes)
    console.log(buildParamRes.build_type + buildParamRes.tab)

    return (
        <Layout>
            <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <td><font face="Comic Sans MS"> Build Config</font></td>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{width: "100%"}}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}></Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Container>
            <Container maxWidth="xxl" sx={{mt: 4, mb: 4}}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        width: "100%"
                    }}

                >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '50ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                disabled
                                id="outlined-required"
                                label="Build Type"
                                defaultValue={buildParamRes.build_type + "/" + buildParamRes.tab}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={componentList}
                                sx={{width: 300}}
                                disablePortal={true}
                                defaultValue={componentList[0]}
                                renderInput={(params) => <TextField {...params} label="Component"/>}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={artifactType}
                                sx={{width: 300}}
                                defaultValue={artifactType[0]}
                                renderInput={(params) => <TextField {...params} label="Artifact Type"/>}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={branchList}
                                sx={{width: 300}}
                                defaultValue={branchList[0]}
                                renderInput={(params) => <TextField {...params} label="Branch"/>}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Version"
                                disabled={versionFlag}
                                defaultValue={version}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="combo-box-demo"
                                options={arch}
                                defaultValue={arch[0]}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Arch"/>}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleBuild}
                                sx={{mt: 3, ml: 1}}
                                endIcon={<SendIcon/>}
                            >
                                Build
                            </Button>
                        </div>

                    </Box>
                </Paper>
                {/*</Grid>*/}
                {/*</Grid>*/}
            </Container>

        </Layout>
    )
};

const branchList = [
    {label: 'release-5.1'},
    {label: 'release-5.2'},
]

export default BuildPage;
