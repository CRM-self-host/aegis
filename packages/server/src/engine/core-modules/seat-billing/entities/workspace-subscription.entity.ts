import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('workspace_subscriptions')
export class WorkspaceSubscription {
  @PrimaryColumn()
  workspaceId: string;

  @Column({ default: 1 })
  seatsPurchased: number;

  @Column({ default: 'active' })
  status: 'active' | 'grace_period' | 'suspended';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
