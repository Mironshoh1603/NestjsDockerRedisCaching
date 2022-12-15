import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () => await redisStore({
        // Store-specific configuration:
        socket: {
          host: 'localhost',
          port: 6379,
        }
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}