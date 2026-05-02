import { Module } from '@nestjs/common';

import { AuditModule } from 'src/engine/core-modules/audit/audit.module';
import { AegisORMModule } from 'src/engine/aegis-orm/aegis-orm.module';
import { UpsertTimelineActivityFromInternalEvent } from 'src/modules/timeline/jobs/upsert-timeline-activity-from-internal-event.job';
import { TimelineActivityModule } from 'src/modules/timeline/timeline-activity.module';

@Module({
  imports: [TimelineActivityModule, AuditModule, AegisORMModule],
  providers: [UpsertTimelineActivityFromInternalEvent],
})
export class TimelineJobModule {}
