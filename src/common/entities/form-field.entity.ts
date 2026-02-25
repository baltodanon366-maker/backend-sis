import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { Form } from './form.entity';

@Entity('form_fields')
@Index(['tenant_id'])
@Index(['tenant_id', 'form_id'])
@Index(['tenant_id', 'form_id', 'field_key'], { unique: true })
export class FormField {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'uuid' })
    form_id: string;

    @ManyToOne(() => Form)
    @JoinColumn({ name: 'form_id' })
    form: Form;

    @Column({ type: 'varchar', length: 80 })
    field_key: string; // ej: "customer_phone"

    @Column({ type: 'varchar', length: 120 })
    label: string;

    @Column({ type: 'varchar', length: 30 })
    type: string; // text|number|date|select|boolean

    @Column({ type: 'boolean', default: false })
    required: boolean;

    @Column({ type: 'int', default: 0 })
    sort_order: number;

    @Column({ type: 'jsonb', nullable: true })
    options: any; // para select: {items:[...]}

    @Column({ type: 'jsonb', nullable: true })
    validations: any; // min/max/regex, etc.

    @Column({ type: 'boolean', default: true })
    is_active: boolean;
}
