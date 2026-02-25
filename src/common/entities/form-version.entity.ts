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
import { Form } from './form.entity';
import { User } from './user.entity';

@Entity('form_versions')
@Index(['tenant_id'])
@Index(['tenant_id', 'form_id'])
@Index(['tenant_id', 'form_id', 'version'], { unique: true })
export class FormVersion {
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

    @Column({ type: 'int' })
    version: number;

    @Column({ type: 'jsonb' })
    schema_snapshot: any;

    @Column({ type: 'uuid', nullable: true })
    created_by_user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by_user_id' })
    created_by: User;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
