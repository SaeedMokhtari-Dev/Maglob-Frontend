export default class GetSettingRequest
{
    constructor(
        public pageSize: number,
        public pageIndex: number,
        public CompanyId?: number
    ) {
    }
}
