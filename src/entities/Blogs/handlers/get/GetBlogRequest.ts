export default class GetBlogRequest
{
    constructor(
        public pageSize: number,
        public pageIndex: number,
        public CompanyId?: number
    ) {
    }
}
