import Invoice from "../../domain/entity/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address.value-object";
import Product from "../../domain/entity/product.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

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


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
}

describe("Find Invoice Usecase unit test", () => {

    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUsecase(repository);

        const input = {
            id: "1",
        }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe("Client 1");
        expect(result.document).toBe("123456789");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("123");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("12345678");
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
        expect(result.total).toBe(30);

    });

});