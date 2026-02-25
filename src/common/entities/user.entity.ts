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

@Entity('users')
@Index(['tenant_id'])
@Index(['tenant_id', 'role'])
@Index(['tenant_id', 'email'], { unique: true })
@Index(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    tenant_id: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenant_id' })
    tenant: Tenant;

    @Column({ type: 'varchar', length: 190 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash: string;

    @Column({ type: 'varchar', length: 150 })
    full_name: string;

    @Column({ type: 'varchar', length: 20 })
    role: string; // SUPERADMIN|ADMIN|SELLER

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    last_login_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
