import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeInputDto,
    FindInvoiceFacadeOutputDto,
    GenerateInvoiceFacadeInputDto,
    GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.interface";

export interface UsecaseProps {
    generateUsecase: GenerateInvoiceUseCase;
    findUsecase: FindInvoiceUsecase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUsecase: GenerateInvoiceUseCase;
    private _findUsecase: FindInvoiceUsecase;

    constructor(usecaseProps: UsecaseProps) {
        this._generateUsecase = usecaseProps.generateUsecase;
        this._findUsecase = usecaseProps.findUsecase;
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        const result = await this._findUsecase.execute(input);

        return {
            id: result.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode
            },
            items: result.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: result.total,
            createdAt: result.createdAt
        }
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {

        const props = {
            id: input.id,
            name: input.name,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: input.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            })
        }

        const result = await this._generateUsecase.execute(props);

        return {
            id: result.id,
            name: result.name,
            document: result.document,
            street: result.street,
            number: result.number,
            complement: result.complement,
            city: result.city,
            state: result.state,
            zipCode: result.zipCode,
            items: result.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: result.total
        }
    }

}