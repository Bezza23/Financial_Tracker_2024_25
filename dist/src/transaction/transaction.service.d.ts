import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from '../auth/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../auth/dto/update-transaction.dto';
export declare class TransactionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTransactionDto: CreateTransactionDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }[]>;
    findOne(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    } | null>;
    update(id: number, updateTransactionDto: UpdateTransactionDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        userId: number;
        type: string;
        description: string | null;
    }>;
}
