import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';

import * as _ from 'lodash'
import { Cache } from 'cache-manager'

import { BmiCalculateInputDto } from './dto/bmi.input.dto';
import { AppResponseError, AppResponseSuccess, AppResponseType } from './helper/app.response';
import { BmiCalculatorResult, BmiResult } from './interfaces/bmi.result';
import { BMI_CATEGORIES, HEALTH_RISK } from './constants';


@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async calculateBmi(inputData: BmiCalculateInputDto[]): Promise<AppResponseType> {
    try {
      const inputChunks: BmiCalculateInputDto[][] = _.chunk(inputData, Math.ceil(inputData.length/10))
      const promises = inputChunks.map(singleChunk => this.calculateBmiOnArray(singleChunk))

      const results: BmiCalculatorResult[] = await Promise.all<BmiCalculatorResult>(promises)
      const mergedResult: BmiCalculatorResult = {
        Person: _.merge(results.map(singleResult => singleResult.Person)),
        totalOverweight: results.map(singleResult => singleResult.totalOverweight).reduce((a, b) => a + b, 0)
      }
      return AppResponseSuccess('BMI calculated', mergedResult, HttpStatus.OK)
    } catch(e) {
      return AppResponseError(e && e.message ? e.message : 'Error while calculating bmi')
    }
  }

  private async calculateBmiOnArray(inputData: BmiCalculateInputDto[]): Promise<BmiCalculatorResult> {
    const bmiResult: BmiCalculatorResult = {
      Person: [],
      totalOverweight: 0
    }

    for (let i = 0; i < inputData.length; i++) {
      let cacheKey = `bmi_${inputData[i].WeightKg}_${inputData[i].HeightCm}`
      let resultSingle: BmiResult = await this.cacheManager.get(cacheKey)
      if (!resultSingle) {
        let heightM = inputData[i].HeightCm / 100
        let bmi = parseFloat((inputData[i].WeightKg / (heightM*heightM)).toFixed(2))
        let bmiIndex = bmi < 18.4 ? 0 : bmi < 24.9 ? 1 : bmi < 29.9 ? 2 : bmi < 34.9 ? 3 : bmi < 39.9 ? 4 : 5
        resultSingle = {
          ...inputData[i],
          BMI: bmi,
          Category: BMI_CATEGORIES[bmiIndex],
          HealthRisk: HEALTH_RISK[bmiIndex]
        }
        await this.cacheManager.set(cacheKey, resultSingle, {ttl: 1000*3600})
      }
      bmiResult.Person.push(resultSingle)
      if (resultSingle.BMI >= 25) {
        bmiResult.totalOverweight += 1
      }
    }

    return bmiResult
  }
}
