export default class GetCertificateRequest
{
    constructor(
        public pageSize: number,
        public pageIndex: number,
        public CompanyId?: number
    ) {
    }
}
