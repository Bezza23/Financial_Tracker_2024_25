"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(dto) {
        const hash = await argon.hash(dto.password);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                role: dto.role || 'USER',
            },
        });
    }
    async findAllUsers() {
        return this.prisma.user.findMany();
    }
    async findUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async updateUser(id, dto) {
        const hash = dto.password ? await argon.hash(dto.password) : undefined;
        return this.prisma.user.update({
            where: { id },
            data: {
                email: dto.email,
                hash,
                role: dto.role,
            },
        });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async createBudget(userId, dto) {
        return this.prisma.budget.create({
            data: {
                userId,
                category: dto.category,
                amount: dto.amount,
            },
        });
    }
    async getBudgetsByUserId(userId) {
        return this.prisma.budget.findMany({
            where: { userId },
        });
    }
    async updateBudget(userId, budgetId, dto) {
        const budget = await this.prisma.budget.findUnique({
            where: { id: budgetId },
        });
        if (!budget || budget.userId !== userId) {
            throw new common_1.ForbiddenException('Access to this budget is denied');
        }
        return this.prisma.budget.update({
            where: { id: budgetId },
            data: {
                ...dto,
            },
        });
    }
    async deleteBudget(userId, budgetId) {
        const budget = await this.prisma.budget.findUnique({
            where: { id: budgetId },
        });
        if (!budget || budget.userId !== userId) {
            throw new common_1.ForbiddenException('Access to this budget is denied');
        }
        return this.prisma.budget.delete({
            where: { id: budgetId },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map