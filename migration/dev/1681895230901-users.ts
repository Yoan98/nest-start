import {MigrationInterface, QueryRunner} from "typeorm";

export class users1681895230901 implements MigrationInterface {
    name = 'users1681895230901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creator\` varchar(255) NOT NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updater\` varchar(255) NOT NULL, \`del_flag\` int NOT NULL DEFAULT '0', \`version\` int NOT NULL, \`user_name\` varchar(255) NOT NULL, \`real_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`gender\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`mobile\` varchar(255) NOT NULL, \`dept_id\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
