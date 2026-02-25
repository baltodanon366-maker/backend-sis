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

@Entity('vouchers')
@Index(['tenant_id'])
@Index(['tenant_id', 'sale_id'])
export class Voucher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid', unique: true })
    sale_id: string;

    @ManyToOne(() => Sale)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Column({ type: 'varchar', length: 60, unique: true })
    voucher_code: string;

    @Column({ type: 'varchar', length: 10, default: 'PDF' })
    format: string; // PDF|HTML

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'jsonb', nullable: true })
    payload: any;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
