import { User } from 'src/user/user.interface';
export declare class AdminService {
    private users;
    getAllUsers(): User[];
    addUser(userData: Omit<User, 'id'>): User;
    updateUser(id: number, userData: Partial<Omit<User, 'id'>>): User;
    deleteUser(id: number): User;
}
