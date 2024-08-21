import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  async getHello() {
    return { a1: process.env.XXX, b1: process.env.CLICK_DATABASE_URL };
  }
}
