import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, AuthProvider } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  async createLocalUser(data: {
    email: string;
    name: string;
    passwordHash: string;
  }): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      authProvider: AuthProvider.LOCAL,
    });
    return this.userRepository.save(user);
  }

  async createGoogleUser(data: {
    email: string;
    name: string;
    googleId: string;
  }): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      authProvider: AuthProvider.GOOGLE,
      isVerified: true,
    });
    return this.userRepository.save(user);
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshTokenHash: string | null,
  ): Promise<void> {
    await this.userRepository.update(userId, { refreshTokenHash });
  }
}
