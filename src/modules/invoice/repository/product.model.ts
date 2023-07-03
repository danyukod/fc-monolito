import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {InvoiceModel} from "./invoice.model";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    id: string

    @BelongsTo(() => InvoiceModel, {foreignKey: "invoice_id"})
    invoice: InvoiceModel

    @Column({allowNull: false})
    name: string

    @Column({allowNull: false})
    price: number

    @Column({allowNull: false, field: "created_at"})
    createdAt: Date

    @Column({allowNull: false, field: "updated_at"})
    updatedAt: Date

}