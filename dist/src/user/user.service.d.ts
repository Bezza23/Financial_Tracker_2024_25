import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateBudgetDto } from '../transaction/dto/create-budget.dto';
import { UpdateBudgetDto } from '../transaction/dto/update-budget.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto): Promise<any>;
    findAllUsers(): Promise<any>;
    findUserById(id: number): Promise<any>;
    updateUser(id: number, dto: CreateUserDto): Promise<any>;
    deleteUser(id: number): Promise<any>;
    createBudget(userId: number, dto: CreateBudgetDto): Promise<any>;
    getBudgetsByUserId(userId: number): Promise<any>;
    updateBudget(userId: number, budgetId: number, dto: UpdateBudgetDto): Promise<any>;
    deleteBudget(userId: number, budgetId: number): Promise<any>;
}
