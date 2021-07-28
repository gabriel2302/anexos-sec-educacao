import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class ClassroomsTeachersPersons1627060222972
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classrooms_people',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'classroom_id',
            type: 'uuid',
          },
          {
            name: 'person_id',
            type: 'uuid',
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
      'classrooms_people',
      new TableForeignKey({
        name: 'PersonClassroom',
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'classrooms_people',
      new TableForeignKey({
        name: 'ClassroomsClassroom',
        columnNames: ['classroom_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classrooms',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'classrooms_people',
      'ClassroomsClassroom',
    );
    await queryRunner.dropForeignKey('classrooms_people', 'PersonClassroom');
    await queryRunner.dropTable('classrooms_people');
  }
}
