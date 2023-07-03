import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
}

describe("Generate Invoice Usecase unit test", () => {

    it ("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
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

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);
        expect(result.total).toBe(30);
    });

});