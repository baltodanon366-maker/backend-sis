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
import { Sale } from './sale.entity';
import { User } from './user.entity';

@Entity('sales_invalidations')
@Index(['tenant_id'])
@Index(['tenant_id', 'sale_id'])
@Index(['tenant_id', 'invalidated_by_user_id'])
export class SalesInvalidation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid' })
    sale_id: string;

    @ManyToOne(() => Sale)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Column({ type: 'uuid' })
    invalidated_by_user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'invalidated_by_user_id' })
    invalidated_by: User;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'varchar', length: 20, default: 'applied' })
    status: string; // requested|approved|applied

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
