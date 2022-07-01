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
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {url} from "../utils"
import ResponsiveAppBar from "../layout/Header";
import storage from "../request/storageUtils";


async function triggerBuild(paramData) {
    let pipeline_build_id = -1;
    await axios({
        method: "post",
        url: url('build/pipeline-trigger'),
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            pipeline_id: paramData['pipeline_id'],
            component: paramData['Component'],
            branch: paramData['Branch'],
            version: paramData['Version'],
            arch: paramData['Arch'],
            artifact_type: paramData['Artifact Type'],
            triggered_by: storage.getUser() === undefined ? 'Pingcap' : storage.getUser(),
        },
    }).then(function (response) {
        console.log(response.data);
        pipeline_build_id = response.data.data.pipeline_build_id;
    });
    console.log("###########" + pipeline_build_id);
    return pipeline_build_id;
}

function getParams(buildParamRes) {
    let componentList = [];
    let branchList = [];
    const artifactTypeList = buildParamRes[0].artifact_type;
    var newArr = [];
    for (var val in buildParamRes) {
        if (newArr.indexOf(buildParamRes[val].component) === -1) {  //indexOf() 判断数组中有没有字符串值，如果没有则返回 -1
            newArr.push(buildParamRes[val].component);
        }
        branchList[val] = buildParamRes[val].branch
    }
    componentList = newArr
    const buildParamRes4one = buildParamRes[0];
    const versionList = buildParamRes4one.version;
    const archList = buildParamRes4one.arch;

    return {componentList: componentList, branchList: branchList, versionList, archList, artifactTypeList};
}


const SelectField = ({paramList, typeString, paramData}) => {
    const [textState, setTextState] = React.useState();

    const handleChange = (event, newValue) => {
        setTextState(newValue);
        if (typeString != 'Version') {
            paramData[typeString] = newValue;
        } else {
            paramData[typeString] = event.target.value;
        }

        console.log("paramData:" + paramData[newValue])
    };

    if (paramList.length == 1) {
        if (typeString == 'Version' && paramList[0] == 'Enter') {
            return (<>
                    <TextField
                        required
                        id="outlined-required"
                        label={typeString}
                        color="secondary" focused
                        placeholder='Enter Version'
                        value={textState}
                        onChange={handleChange}

                    />
                </>
            );
        } else {
            paramData[typeString] = paramList[0];
            return (
                <>
                    <TextField
                        required
                        disabled
                        id="outlined-required"
                        label={typeString}
                        defaultValue={paramList[0]}
                    />
                </>
            );
        }
    } else {
        return (
            <>
                <Autocomplete
                    required
                    id="combo-box-demo"
                    options={paramList}
                    sx={{width: 300}}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label={typeString}
                            color="secondary" focused
                            placeholder={'Select ' + typeString}

                        />}
                    onChange={handleChange}
                />
            </>);
    }
};
const paramData = {};
const BuildPage = () => {
    const navigate = useNavigate();

    const params = useParams();
    const pipeline_id = params.pipeline_id === undefined ? "none" : params.pipeline_id;
    const [build, setBuild] = React.useState(0);
    const handleChange = (event, newValue) => {
        setBuild(newValue);
        try {
            triggerBuild(paramData).then((res) => {
                console.log("pipeline_build_id:" + res);
                navigate(`/build/result/${res}`);
            });

        } catch (e) {

        }
    };


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
    const buildParamRes = buildParam.data


    //component和branch 存在全局多选，arch 和 包类型 只在hotfix存在多选
    let {componentList, branchList, versionList, archList, artifactTypeList} = getParams(buildParamRes);
    paramData['pipeline_id'] = pipeline_id;
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
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
                                    defaultValue={buildParamRes[0].build_type + "/" + buildParamRes[0].tab}
                                />
                            </div>
                            <div>
                                <SelectField paramList={componentList} typeString={'Component'} paramData={paramData}
                                ></SelectField>
                            </div>
                            <div>
                                <SelectField paramList={branchList} typeString={'Branch'} paramData={paramData}
                                ></SelectField>
                            </div>
                            <div>
                                <SelectField paramList={versionList} typeString={'Version'} paramData={paramData}
                                ></SelectField>
                            </div>
                            <div>
                                <SelectField paramList={archList} typeString={'Arch'}
                                             paramData={paramData}></SelectField>
                            </div>
                            <div>
                                <SelectField paramList={artifactTypeList} typeString={'Artifact Type'}
                                             paramData={paramData}
                                ></SelectField>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleChange}
                                    sx={{mt: 3, ml: 1}}
                                    endIcon={<SendIcon/>}
                                >
                                    Build
                                </Button>
                            </div>

                        </Box>
                    </Paper>
                </Container>
            </Layout>
        </>
    )
};


export default BuildPage;
