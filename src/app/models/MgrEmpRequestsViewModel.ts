export interface MgrEmpRequestsViewModel
{
    requestId: number;
    requesterId :string;
    requesterName: string;
    leaveType: string;
    from: Date | string;
    to: Date | string;
    availBalance: number;
    reqState: string;

}