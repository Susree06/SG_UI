export class WorkFlowDashboardDto
{
    accountId!: number;
    accounts!:string;
    year! : string;
    month! : string;
    location! :string;
    bdmApprover! : string;
    bdmStatus! : string;
    dmApprover! : string;
    dmStatus! : string;
    salesHeadApprover! : string;
    salesHeadStatus! :string;
    councilApprover! : string;
    councilStatus! : string;
}

export class YearsDto
{
    years! :number;
}

export class MonthsDto
{
    months! :number;
}