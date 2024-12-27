import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterCustomerDto): Promise<any> {
    const { email, password, ...rest } = registerDto;
    console.log('register password:', password);

    const existingCustomer = await this.customersService.findByEmail(email);
    if (existingCustomer) {
      throw new BadRequestException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await this.customersService.registerCreate({
      email,
      password: hashedPassword,
      ...rest,
    });

    const { password: _, ...result } = customer;
    return result;
  }

  async validateCustomer(loginDto: LoginCustomerDto) {
    const { email, password } = loginDto;

    const customer = await this.customersService.findByEmail(email, {
      include: {
        customerPoints: true,
        tier: true,
        Order: true,
        customerAddress: true,
      },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return customer;
  }

  async login(customer: any): Promise<LoginResponseDto> {
    const payload = {
      email: customer.email,
      sub: customer.id,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged in successfully',
      token,
      customer: {
        id: customer.id,
        email: customer.email,
      },
    };
  }
}
