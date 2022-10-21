import React from 'react';
import cl from "../../styles/PackFilter.module.scss"
import SelectButt from "../../utils/SelectButton";
import SliderFilter from "../../utils/SliderFilter";
import SearchInput from "../../utils/SearchInput";

const PackFilter: React.FC = () => {

    return (
        <div className={cl.filterWrapper}>
            <div className={cl.searchBlock}>
                <div className={cl.searchTitle}>Search</div>
                <SearchInput/>
            </div>
            <div className={cl.filterBlock}>
                <div className={cl.searchTitle}>
                    Show pack cards
                </div>
                <div className={cl.filterBtn}>
                    <SelectButt/>
                </div>
            </div>
            <div className={cl.rangeBlock}>
                <div className={cl.searchTitle}>
                    Number of cards
                </div>
                <SliderFilter/>
            </div>
        </div>
    );
};

export default PackFilter;