import {
  Controller,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity.js';
import { SignInDto } from './dto/sign.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { MessageEntity } from './entities/message.entity.js';
import { JwtAuthGuard } from './jwt.auth.guard.js';
interface JwtUser {
  id: string;
  // add other fields if needed
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  signUp(@Body() { email, password, userType }: SignInDto) {
    return this.authService.signUp(email, password, userType);
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

  @Post('forgot-password')
  @ApiOkResponse({ type: MessageEntity })
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOkResponse({ type: MessageEntity })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Get('request-verify-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MessageEntity })
  async updatePassword(@Req() req: AuthenticatedRequest) {
    const id: string = req.user.id;
    return this.authService.requestVerifyEmail(id);
  }
}
