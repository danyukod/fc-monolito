import {Sequelize} from "sequelize-typescript";
import {InvoiceModel} from "../repository/invoice.model";
import ProductModel from "../repository/product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
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

    it("should create an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            document: "123456789",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 20,
                }
            ]
        };

        await facade.generate(input);

        const invoice = await facade.find({id: "1"});

        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.address.street).toBe(input.street);
        expect(invoice.address.number).toBe(input.number);
        expect(invoice.address.complement).toBe(input.complement);
        expect(invoice.address.city).toBe(input.city);
        expect(invoice.address.state).toBe(input.state);
        expect(invoice.address.zipCode).toBe(input.zipCode);
        expect(invoice.items.length).toBe(2);
        expect(invoice.items[0].name).toBe(input.items[0].name);
        expect(invoice.items[0].price).toBe(input.items[0].price);
        expect(invoice.items[1].name).toBe(input.items[1].name);
        expect(invoice.items[1].price).toBe(input.items[1].price);
        expect(invoice.total).toBe(30);

    });


});