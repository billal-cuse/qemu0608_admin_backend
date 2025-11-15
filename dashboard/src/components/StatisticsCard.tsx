import React from 'react';

interface Props {
    label: string;
    display: string;
    icon: React.ReactNode;
}

const StatisticsCard: React.FC<Props> = ({label, display, icon}) => {
    return (
        <div className={"bg-white items-center border-[1px] border-[#002454] rounded-lg p-5 flex justify-between"}>
            <div>
                <p>{label}</p>
                <h1>{display}</h1>
            </div>
            {icon}
        </div>
    );
};

export default StatisticsCard;