import React, {useState} from 'react';
import {Paginator} from 'primereact/paginator';
import '../styles/App.css';
import {useSelector} from "react-redux";
import {RootState} from "../main/bll/store";

const Pagination = () => {

    const totalCount = useSelector<RootState, number>(state => state.packs.cardPacksTotalCount)
    const [basicFirst, setBasicFirst] = useState(0)
    const [basicRows, setBasicRows] = useState(10)

    const onBasicPageChange = (event: any) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
    }

    return (
        <div className="paginator-demo">
            <div className="card">
                <Paginator first={basicFirst} rows={basicRows} totalRecords={totalCount} rowsPerPageOptions={[10, 20, 30]} onPageChange={onBasicPageChange}></Paginator>
            </div>
        </div>
    );
};

export default Pagination;