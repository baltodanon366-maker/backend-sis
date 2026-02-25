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
import { User } from './user.entity';

@Entity('sales')
@Index(['tenant_id'])
@Index(['tenant_id', 'seller_user_id'])
@Index(['tenant_id', 'sold_at'])
@Index(['tenant_id', 'sale_number'], { unique: true })
@Index(['tenant_id', 'status'])
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid' })
    seller_user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'seller_user_id' })
    seller: User;

    @Column({ type: 'varchar', length: 40 })
    sale_number: string; // FAC-000123

    @Column({ type: 'varchar', length: 10, default: 'USD' })
    currency: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    subtotal: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    discount_total: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    tax_total: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    total: number;

    @Column({ type: 'varchar', length: 20, default: 'COMPLETED' })
    status: string; // COMPLETED|INVALIDATED

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    sold_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
