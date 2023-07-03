import InvoiceFacade from "../facade/invoice.facade";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceRepository from "../repository/invoice.repository";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUseCase(repository);
        const findUsecase = new FindInvoiceUsecase(repository);
        const facade = new InvoiceFacade({
            generateUsecase: generateUsecase,
            findUsecase: findUsecase,
        });

        return facade;
    }
}