import {Sequelize} from "sequelize-typescript";
import {InvoiceModel} from "./invoice.model";
import ProductModel from "./product.model";
import Address from "../domain/value-object/address.value-object";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import InvoiceRepository from "./invoice.repository";

const propsAddress = {
    street: "Street 1",
    number: "123",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "12345678",
}

const address = new Address(propsAddress);

const product1 = new Product({
    id: new Id("1"),
    name: "Item 1",
    price: 10,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Item 2",
    price: 20,
});

const items = [product1, product2];

const invoiceProps = {
    id: new Id("1"),
    name: "Client 1",
    document: "123456789",
    address: address,
    items: items,
}

const invoice = new Invoice(invoiceProps);

describe("InvoiceRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a invoice", async () => {

        const repository = new InvoiceRepository();
        const result = await repository.save(invoice);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(invoice.total);
    });

    it("should find a invoice", async () => {
        const repository = new InvoiceRepository();
        await repository.save(invoice);

        const result = await repository.find(invoice.id.id);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(invoice.total);

    });


});