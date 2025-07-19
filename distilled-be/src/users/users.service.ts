import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        userType: createUserDto.userType,
        activated: false,
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      where: { deletedAt: null },
    });
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
