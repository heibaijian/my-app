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
import Typography from '@mui/material/Typography';


const BuildPage = (props) => {
    const [build, setBuild] = React.useState(0);
    const [cancel, setCancel] = React.useState(0)
    const handleBuild = () => {
        setBuild(1);
    };
    const handleCancel = () => {
        setCancel(1)
    }

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
                        <div >
                            <TextField
                                required
                                id="outlined-required"
                                label="Build Type"
                                defaultValue="Hello World"
                            />
                        </div>
                        <div>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Component"
                                defaultValue="Hello World"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Artifactory Type"
                                defaultValue="Hello World"
                            />
                        </div>
                        <div>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={branchList}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Branch"/>}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Version"
                                defaultValue="Hello World"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Arch"
                                defaultValue="Hello World"
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleBuild}
                                sx={{mt: 3, ml: 1}}
                                endIcon={<SendIcon />}
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
