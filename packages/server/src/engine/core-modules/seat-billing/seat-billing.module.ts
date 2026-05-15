import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceSubscription } from './entities/workspace-subscription.entity';
import { SeatManagerService } from './services/seat-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceSubscription])],
  providers: [SeatManagerService],
  exports: [SeatManagerService],
})
export class SeatBillingModule {}
