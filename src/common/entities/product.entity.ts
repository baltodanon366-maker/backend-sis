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

@Entity('products')
@Index(['tenant_id'])
@Index(['tenant_id', 'sku'], { unique: true })
@Index(['tenant_id', 'name'])
@Index(['tenant_id', 'is_active'])
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'varchar', length: 80, nullable: true })
    sku: string;

    @Column({ type: 'varchar', length: 180 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 30, default: 'unit' })
    unit: string; // unit|kg|lb|m|etc

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    price: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    cost: number;

    @Column({ type: 'int', default: 0 })
    reorder_level: number;

    @Column({ type: 'boolean', default: false })
    track_expiry: boolean;

    @Column({ type: 'date', nullable: true })
    expiry_date: Date;

    @Column({ type: 'int', default: 0 })
    stock_on_hand: number;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
