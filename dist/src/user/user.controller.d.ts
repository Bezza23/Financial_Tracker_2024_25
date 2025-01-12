import { User } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateBudgetDto } from '../transaction/dto/create-budget.dto';
import { UpdateBudgetDto } from '../transaction/dto/update-budget.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): User;
    createUser(dto: CreateUserDto): Promise<any>;
    findAllUsers(): Promise<any>;
    findUserById(id: string): Promise<any>;
    updateUser(id: string, dto: CreateUserDto): Promise<any>;
    deleteUser(id: string): Promise<any>;
    createBudget(user: User, dto: CreateBudgetDto): Promise<any>;
    getBudgets(user: User): Promise<any>;
    updateBudget(user: User, budgetId: string, dto: UpdateBudgetDto): Promise<any>;
    deleteBudget(user: User, budgetId: string): Promise<any>;
}
