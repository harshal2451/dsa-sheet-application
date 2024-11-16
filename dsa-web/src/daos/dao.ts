export interface DAO<T> {
    create(item: T): Promise<T>;
    findByUsername?(username: string): Promise<T | null>
    findById?(id: number): Promise<T | null>;
    findAll?(): Promise<T[]>;
    update?(id: number, item: Partial<T>): Promise<boolean>;
    delete?(id: number): Promise<boolean>;
    deleteUserProblem?(userId: number, problemId: number): Promise<boolean>
}

export interface PaginationResponse {
    totalPages: number,
    page: number,
    pageSize: number,
    topics: any
}