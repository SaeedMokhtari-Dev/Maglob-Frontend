export default class GetUserRequest
{
    constructor(
        public pageSize: number,
        public pageIndex: number,
        public CompanyId?: number
    ) {
    }
}
