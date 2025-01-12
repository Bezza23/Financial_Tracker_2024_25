import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
export declare class AdminController {
    private userService;
    constructor(userService: UserService);
    getAdminDashboard(): string;
    createUser(dto: CreateUserDto): Promise<any>;
    getAllUsers(): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
