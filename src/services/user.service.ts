import { Injectable, Inject } from '@nestjs/common';
import { Users, UserModel } from '../models';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(@Inject(UserRepository)
    private readonly userRepository: UserRepository) {}

    public async findAll(): Promise<UserModel[]> {
        return await this.userRepository.getAll();
    }

    public async findOne(id: number): Promise<Users> {
        return await this.userRepository.getOneById(id);
    }

    public async findOneByVerifyCode(verifyCode: string): Promise<any> {
        return await this.userRepository.getOneByVerifyCode(verifyCode);
    }

    public async addUser(user: UserModel): Promise<UserModel> {
        return await this.userRepository.addUser(user);
    }

    public async findOneByEmail(email: string): Promise<Users> {
        return await this.userRepository.getOneByEmail(email);
    }

    public async updateUser(id: number, user: any): Promise<any> {
        return await this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number): Promise<Users> {
        return await this.userRepository.deleteUser(id);
    }

    public async findOneByToken(userToken: string): Promise<Users> {
        return await this.userRepository.findOneByToken(userToken);
    }

    public async payWithStripe( payload: string) {
        const response = await this.userRepository.payWithStripe(payload);
        return response;
    }
}
