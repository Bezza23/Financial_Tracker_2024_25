import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from '../auth/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../auth/dto/update-transaction.dto';
import { User } from '@prisma/client';
export declare class TransactionController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionService);
    create(createTransactionDto: CreateTransactionDto, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
    findAll(user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }[]>;
    findOne(id: number, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    } | null>;
    update(id: number, updateTransactionDto: UpdateTransactionDto, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
    remove(id: number, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
}
