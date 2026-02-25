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
import { Product } from './product.entity';
import { User } from './user.entity';
import { Sale } from './sale.entity';

@Entity('stock_movements')
@Index(['tenant_id'])
@Index(['tenant_id', 'product_id'])
@Index(['tenant_id', 'sale_id'])
@Index(['tenant_id', 'type'])
@Index(['tenant_id', 'created_at'])
export class StockMovement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid' })
    product_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'uuid', nullable: true })
    sale_id: string;

    @ManyToOne(() => Sale)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Column({ type: 'varchar', length: 30 })
    type: string; // IN_PURCHASE|IN_ADJUSTMENT|OUT_SALE|IN_RETURN|OUT_EXPIRE|OUT_ADJUSTMENT

    @Column({ type: 'int' })
    qty_delta: number; // + entra, - sale

    @Column({ type: 'text', nullable: true })
    reason: string;

    @Column({ type: 'jsonb', nullable: true })
    meta: any;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
