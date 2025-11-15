import StatisticsCard from "../../components/StatisticsCard";
import {TotalAirlines, TotalFailSubmissionIcon, TotalPassSubmissionIcon, TotalSubmissionIcon} from "../../icon";
import {useApiUrl, useCustom} from "@refinedev/core";
import {IStatistics} from "./index";


const Dashboard: React.FC = () => {
    const api = useApiUrl()

    const {data: data} = useCustom<IStatistics>({
        url: `${api}/statistics`,
        method: "get",
    })
    
    const responce = data?.data.data

    return (
        <div className={"bg-[#f6f6f6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"}>
            <StatisticsCard label={"Total Submission"} display={String(responce?.totalSubmissions)} icon={<TotalSubmissionIcon />} />
            <StatisticsCard label={"Total Pass Submission"} display={String(responce?.totalPass)} icon={<TotalPassSubmissionIcon />} />
            <StatisticsCard label={"Total Fail Submission"} display={String(responce?.totalFail)} icon={<TotalFailSubmissionIcon />} />
            <StatisticsCard label={"Total Airlines"} display={String(responce?.totalAirlines)} icon={<TotalAirlines />} />
        </div>
    );
};

export default Dashboard;


