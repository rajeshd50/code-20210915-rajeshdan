import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BmiCalculateInputDto } from './dto/bmi.input.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('calculate-bmi')
  async calculateBmi(@Body(new ParseArrayPipe({ items: BmiCalculateInputDto })) inputData: BmiCalculateInputDto[]) {
    return await this.appService.calculateBmi(inputData);
  }
}
