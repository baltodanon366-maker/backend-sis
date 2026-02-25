import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { User } from './user.entity';

@Entity('audit_logs')
@Index(['tenant_id'])
@Index(['tenant_id', 'entity'])
@Index(['tenant_id', 'entity_id'])
@Index(['tenant_id', 'created_at'])
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 30 })
    action: string; // CREATE|UPDATE|DELETE|IMPORT|INVALIDATE

    @Column({ type: 'varchar', length: 40 })
    entity: string; // product|user|form|sale|etc

    @Column({ type: 'uuid', nullable: true })
    entity_id: string;

    @Column({ type: 'jsonb', nullable: true })
    before: any;

    @Column({ type: 'jsonb', nullable: true })
    after: any;

    @Column({ type: 'jsonb', nullable: true })
    meta: any;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
