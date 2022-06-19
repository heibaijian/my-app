import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import Tab from "@mui/material/Tab";

function preventDefault(event) {
  event.preventDefault();
}

export default function ArtifactMeta(artifactMeta) {
    const meta=artifactMeta.artifactMeta;
  return (
    <React.Fragment>
      <Title >Artifact Meta</Title>
      <Typography component="p">
          {/*<p>component:tidb<br/>*/}
          {/*    commit hash: d3e2267107a8277b744357d9f58c8febc29c5d60<br/>*/}
          {/*    binary path: http://fileserver.pingcap.net/tidb<br/>*/}
          {/*    image path: pingcap / tidb*/}
          {/*</p>*/}
          <p>{meta}</p>
      </Typography>
      {/*<Typography color="text.secondary" sx={{ flex: 1 }}>*/}
      {/*  on 15 March, 2019*/}
      {/*</Typography>*/}
      {/*<div>*/}
      {/*  <Link color="primary" href="#" onClick={preventDefault}>*/}
      {/*    View balance*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </React.Fragment>
  );
}
