import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Health',
    description: 'Use this endpoint for checking the health of the API',
  })
  @Get()
  root(): { status: string; uptime: number } {
    return { status: 'ok', uptime: process.uptime() };
  }
}
