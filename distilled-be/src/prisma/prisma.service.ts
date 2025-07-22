import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/index.js';

@Injectable()
export class PrismaService extends PrismaClient {}
