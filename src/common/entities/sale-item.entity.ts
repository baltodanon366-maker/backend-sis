import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Sale } from './sale.entity';
import { Product } from './product.entity';

@Entity('sale_items')
@Index(['tenant_id'])
@Index(['tenant_id', 'sale_id'])
@Index(['tenant_id', 'product_id'])
export class SaleItem {
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
    product_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'varchar', length: 180 })
    product_name_snapshot: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    unit_price: number;

    @Column({ type: 'int', default: 1 })
    qty: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    discount: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    tax: number;

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    line_total: number;
}
