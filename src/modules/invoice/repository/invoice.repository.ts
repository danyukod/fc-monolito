import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/entity/invoice.entity";
import {InvoiceModel} from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address.value-object";
import Product from "../domain/entity/product.entity";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
    async save(invoice: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })),
            total: invoice.total,
        },{
            include: [{model: ProductModel}]
        });

        return new Invoice({
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            items: invoice.items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        })
    }

    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: {id: id},
            include: ["items"],
        });

        if (!invoiceModel) {
            throw new Error("Invoice not found!");
        }

        return new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address({
                street: invoiceModel.street,
                number: invoiceModel.number,
                complement: invoiceModel.complement,
                city: invoiceModel.city,
                state: invoiceModel.state,
                zipCode: invoiceModel.zipCode,
            }),
            items: invoiceModel.items.map(item => (new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            }))),
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt,
        })
    }

}