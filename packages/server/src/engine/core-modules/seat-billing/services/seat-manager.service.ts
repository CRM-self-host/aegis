import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceSubscription } from '../entities/workspace-subscription.entity';

@Injectable()
export class SeatManagerService {
  constructor(
    @InjectRepository(WorkspaceSubscription)
    private readonly repo: Repository<WorkspaceSubscription>,
  ) {}

  async canAddMember(workspaceId: string, currentMemberCount: number): Promise<boolean> {
    const sub = await this.repo.findOneBy({ workspaceId });
    if (!sub) return currentMemberCount < 1; // Default to free tier
    return currentMemberCount < sub.seatsPurchased;
  }
}
