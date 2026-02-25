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

@Entity('notifications')
@Index(['tenant_id'])
@Index(['tenant_id', 'user_id'])
@Index(['tenant_id', 'is_read'])
@Index(['tenant_id', 'created_at'])
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid', nullable: true })
    user_id: string; // NULL = broadcast a tenant

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 40 })
    type: string; // stock_low|expiry|sale_invalidated|etc

    @Column({ type: 'varchar', length: 120 })
    title: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'jsonb', nullable: true })
    data: any;

    @Column({ type: 'boolean', default: false })
    is_read: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamptz', nullable: true })
    read_at: Date;
}
