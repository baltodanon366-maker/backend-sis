import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('subscriptions')
@Index(['tenant_id'])
@Index(['tenant_id', 'status'])
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'varchar', length: 40, default: 'basic' })
    plan: string;

    @Column({ type: 'varchar', length: 20, default: 'active' })
    status: string; // active|past_due|canceled|expired

    @Column({ type: 'date' })
    current_period_start: Date;

    @Column({ type: 'date' })
    current_period_end: Date;

    @Column({ type: 'boolean', default: true })
    auto_renew: boolean;

    @Column({ type: 'varchar', length: 30, nullable: true })
    provider: string; // stripe|paypal|manual

    @Column({ type: 'varchar', length: 120, nullable: true })
    provider_customer_id: string;

    @Column({ type: 'varchar', length: 120, nullable: true })
    provider_subscription_id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
