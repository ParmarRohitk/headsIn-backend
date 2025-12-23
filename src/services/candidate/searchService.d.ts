import { SearchFilters } from '../../types/candidate.types';
export declare class SearchService {
    initiateSearch(userId: number, queryText: string, filters: SearchFilters): Promise<{
        searchId: any;
    }>;
    private processSearchStages;
    private updateStageStatus;
    getSearchStatus(searchId: number): Promise<{
        status: any;
        stages: any[];
    }>;
    getSearchResults(searchId: number, page?: number, limit?: number): Promise<{
        candidates: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
//# sourceMappingURL=searchService.d.ts.map