import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.usecase.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import Address from "../../domain/value-object/address.value-object";
import Product from "../../domain/entity/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const addressProps = {
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        };

        const address = new Address(addressProps);

        const items = input.items.map(item => {
            return new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            });
        });

        const invoiceProps = {
            name: input.name,
            document: input.document,
            address: address,
            items: items,
        }

        const invoice = new Invoice(invoiceProps);

        await this._invoiceRepository.add(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: invoice.total,
        }

    }
}