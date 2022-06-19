import List from "@mui/material/List";
import Title from "../Title";
import {ListItem} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


const style = {
    width: '50%',
    maxWidth: 600,
    bgcolor: 'background.paper',
};

export default function getBasicInfo(requestBuild) {
    const requestBuildRes = requestBuild.requestBuild
    return (
        <List sx={style} margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
        }} component="nav" aria-label="mailbox folders">
            <Title>Basic Info</Title>
            <ListItem divider>
                <ListItemText primary="ID" secondary={requestBuildRes.pipeline_id}/>
            </ListItem>
            <Divider/>
            <ListItem divider>
                <ListItemText primary="Build Type" secondary={requestBuildRes.build_type}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Begin Time" secondary={requestBuildRes.begin_time}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="End Time" secondary={requestBuildRes.end_time}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Status" secondary={requestBuildRes.status}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Component" secondary={requestBuildRes.component}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Artifact Type" secondary={requestBuildRes.artifact_type}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Branch" secondary={requestBuildRes.branch}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Arch" secondary={requestBuildRes.arch}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Version" secondary={requestBuildRes.version}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Start By" secondary={requestBuildRes.start_by}/>
            </ListItem>
            <ListItem divider>
                <ListItemText primary="Trace Log" secondary={
                    <a href={requestBuildRes.trace_log}>Trace Log</a>}/>
            </ListItem>
        </List>
    );
}