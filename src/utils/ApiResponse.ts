export class ApiResponse {
    constructor(
        public statusCode: number,
        public data: any,
        public message: string = 'Success',
        public success: boolean = statusCode < 400
    ) { }
}
