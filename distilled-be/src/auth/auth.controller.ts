import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { SignInDto } from './dto/sign.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  signUp(@Body() { email, password }: SignInDto) {
    return this.authService.signUp(email, password);
  }

  @Post('signin')
  @ApiOkResponse({ type: AuthEntity })
  signIn(@Body() { email, password }: SignInDto) {
    return this.authService.signIn(email, password);
  }

  @Post('verify-email')
  @ApiOkResponse({ type: AuthEntity })
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
