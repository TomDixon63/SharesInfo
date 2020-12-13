// share basic information
export class ShareInfo {
    constructor(
        public symbol: string,
        public name: string,
        public type: string,
        public region: string,
        public marketOpen: string,
        public marketClose: string,
        public timezone: string,
        public currency: string,
        public matchScore: string 
    ){}
}