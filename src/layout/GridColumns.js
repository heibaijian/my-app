import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useQuery} from "react-query";
import {fetchList} from "../request/list";

const columns: GridColDef[] = [
        {
            field: "id",
            hide: true,
            valueGetter: (params) => params.row.pipeline_id,
        },
        {
            field: 'pipeline_build_id',
            headerName: 'ID',
            width: 70
        },

        {
            field: 'status',
            headerName: 'Status',
        },


        {
            field: 'begin_time',
            headerName: 'Begin Time',
            width: 170
        },

        {
            field: 'end_time',
            headerName: 'End Time',
            width: 170
        },

        {
            field: 'start_by',
            headerName: 'Start By',
        },

        {
            field: 'component',
            headerName: 'Component',
        },
        {
            field: 'arch',
            headerName: 'Arch',
        },

        {
            field: 'artifact_type',
            headerName: 'Artifact Type',
        },
        {
            field: 'branch',
            headerName: 'Branch',
        },
        {
            field: 'version',
            headerName: 'Version',
        },
        {
            field: 'artifact_meta',
            headerName: 'Artifact Meta',
        },
        {
            field: 'trace_log',
            headerName: 'Trace Log',
            width: 100,
            renderCell: function (params) {
                return <p>
                    <a target="_blank" href={params.row.trace_log}>Trace Log</a>
                </p>
            }
        },
    ]
;

// const rows = [
//     {
//         id: 1,
//         status: 'success',
//         beginTime: '2022-06-01 13:00:00',
//         endTime: '2022-06-01 14:00:00',
//         startBy: 'lvhongmeng',
//         component: 'TiDB',
//         arch: 'linux-amd64',
//         artifactType: 'community image',
//         branch: 'release-6.1',
//         version: 'v6.1.0',
//         artifactMeta: 'binary path',
//         traceLog: "http://cd.pingcap.net"
//     },
//     {
//         id: 2,
//         status: 'success',
//         beginTime: '2022-06-01 13:00:00',
//         endTime: '2022-06-01 14:00:00',
//         startBy: 'lvhongmeng',
//         component: 'TiDB',
//         arch: 'linux-amd64',
//         artifactType: 'community image',
//         branch: 'release-6.1',
//         version: 'v6.1.0',
//         artifactMeta: 'binary path',
//         traceLog: "http://cd.pingcap.net"
//     },
//
// ];


export default function DataGrid4List(tipipelineId) {
    const id = parseInt(tipipelineId.tipipelineId.toString());
    console.log("id:" + id)
    const [rowCount, setRowCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const listQuery = useQuery(
        ["build", "pipeline-list-show", id, currentPage, rowsPerPage],
        () =>
            fetchList({
                pipeline_id: id,
                page: currentPage,
                page_size: rowsPerPage,
            }),
        {
            onSuccess: (data) => {
                console.log(data)
                setRowCount(1);
            },
            keepPreviousData: true,
            staleTime: 5000,
        }
    );
    if (listQuery.isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (listQuery.isError) {
        return (
            <div>
                <p>error: {listQuery.error}</p>
            </div>
        );
    }
    const rows = listQuery.data;
    try {
        const r1 = listQuery.data.map((v) => {
            return {...v,id:v.pipeline_id}}
    )
        console.log(r1)
        return (
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={r1}
                    columns={columns}
                    pageSize={rowsPerPage}
                    paginationMode={"server"}
                    rowCount={rowCount}
                    page={currentPage}
                    // onPageChange={(page, details) => {
                    //     setCurrentPage(page);
                    // }}
                    // onPageSizeChange={(pageSize, details) => {
                    //     setRowsPerPage(pageSize);
                    // }}
                    showCellRightBorder={true}
                    showColumnRightBorder={false}
                    // checkboxSelection
                    // disableSelectionOnClick
                />
            </div>
        );
    }catch (e){
        console.log("error")
    }

}
