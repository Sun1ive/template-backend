import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

/**
 *
 *
 * @export
 * @class Category
 * @extends {BaseEntity}
 */
@Entity()
export class Category extends BaseEntity {
  /**
   *
   *
   * @type {string}
   * @memberof Category
   */
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   *
   *
   * @type {string}
   * @memberof Category
   */
  @Column({ nullable: false, type: 'text' })
  public name: string;

  /**
   *
   *
   * @type {number}
   * @memberof Category
   */
  @Column({ nullable: false, type: 'int', default: 0 })
  public sortIndex: number;
}
