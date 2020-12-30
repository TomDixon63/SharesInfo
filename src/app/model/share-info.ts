// share basic information
export class ShareInfo {
    constructor(
        public symbol: string,
        public name: string,
        public type: string,
        public region: string,
        public currency: string,
        public matchScore: string 
    ){}
}