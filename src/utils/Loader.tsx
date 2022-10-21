import React from 'react';
import {ProgressBar} from "primereact/progressbar";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.css';

const Loader: React.FC = () => {
    return (
        <div>
            <ProgressBar mode="indeterminate" style={{ height: '6px', color: "teal" }} />
        </div>
    );
};

export default Loader;