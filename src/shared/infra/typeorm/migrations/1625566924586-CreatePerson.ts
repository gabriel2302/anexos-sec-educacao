import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePerson1625566924586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'role',
            type: 'varchar',
            default: 'user',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'enrollment',
            type: 'varchar',
          },
          {
            name: 'office',
            type: 'varchar',
          },
          {
            name: 'occupation',
            type: 'varchar',
          },
          {
            name: 'functional_situation',
            type: 'varchar',
          },
          {
            name: 'institution_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'InstitutionPerson',
        columnNames: ['institution_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'institutions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('persons', 'InstitutionPerson');
    await queryRunner.dropTable('persons');
  }
}
