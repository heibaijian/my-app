import * as React from 'react';
import {useState} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useQuery} from "react-query";
import {fetchList} from "../request/BuildList";
import {FRONTHOST} from "../utils";

const columns: GridColDef[] = [
        {
            field: "id",
            hide: true,
            valueGetter: (params) => params.row.pipeline_build_id,
        },
        {
            field: 'pipeline_build_id',
            headerName: 'ID',
            width: 70,
            valueGetter: (params) => params.row.pipeline_build_id,
            renderCell: function (params) {
                return <p>
                    <a target="_blank"
                       href={`${FRONTHOST}/build/result/${params.row.pipeline_build_id}`}>{params.row.pipeline_build_id}</a>
                </p>
            }

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

const rows = [
    {
        id: 1,
        pipeline_build_id: 1,
        status: 'success',
        begin_time: '2022-06-01 13:00:00',
        end_time: '2022-06-01 14:00:00',
        start_by: 'lvhongmeng',
        component: 'TiDB',
        arch: 'linux-amd64',
        artifact_type: 'community image',
        branch: 'release-6.1',
        version: 'v6.1.0',
        artifact_meta: 'binary path',
        trace_log: "http://cd.pingcap.net"
    },
    {
        id: 2,
        pipeline_build_id: 2,
        status: 'success',
        begin_time: '2022-06-01 13:00:00',
        end_time: '2022-06-01 14:00:00',
        start_by: 'lvhongmeng',
        component: 'TiDB',
        arch: 'linux-amd64',
        artifact_type: 'community image',
        branch: 'release-6.1',
        version: 'v6.1.0',
        artifact_meta: 'binary path',
        trace_log: "http://cd.pingcap.net"
    },

];


export default function DataGrid4List(tipipelineId) {
    const id = parseInt(tipipelineId.tipipelineId.toString());
    console.log("id:" + id)
    // const [rowCount, setRowCount] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    // const currentPage=1;
    const rowsPerPage = 20;
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
                // setRowCount(data.length);
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
    const r8 = listQuery.data.map((v) => {
            return {...v, id: v.pipeline_build_id}
        }
    )
    console.log(r8)
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={r8}
                columns={columns}
                pageSize={rowsPerPage}
                onPageChange={(page, details) => {
                    setCurrentPage(page);
                }}
                disableSelectionOnClick
                showCellRightBorder = {true}
                showColumnRightBorder = {false}

            />
        </div>
    );

}
