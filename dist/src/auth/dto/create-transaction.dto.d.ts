export declare class CreateTransactionDto {
    amount: number;
    type: string;
    description?: string;
    constructor(amount: number, type: string, description?: string);
}
