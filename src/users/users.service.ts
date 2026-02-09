import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signup(data: RegisterDto) {

    const existing = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      email: data.email,
      name: data.name,
      password: hashed,
    });

    await this.userRepo.save(user);

    return { message: 'Signup successful' };
  }

  async login(data: LoginDto) {

    const user = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      message: 'Login successfully',
      userId: user.id,
      email: user.email,
    };
  }
}
