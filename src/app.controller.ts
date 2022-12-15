import { Controller,CACHE_MANAGER, Get,UseInterceptors,CacheInterceptor,CacheTTL,CacheKey } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { getCats, getDogs } from './utills';
import {Cache} from "cache-manager"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager:Cache) {

  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey("all-dogs")
  @Get("dogs")
  getDogs() {
    return getDogs()
  }


  @Get("cats")
  async getCats() {
    const cachedCats = await this.cacheManager.get(
      "all-cats"
    );
    if (cachedCats) return cachedCats;
const cats = await getCats();
    this.cacheManager.set("all-cats", cats,{ttl:10} as any);
return cats;
  }
}
