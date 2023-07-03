import BaseEntity from "../../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import Address from "../value-object/address.value-object";
import Product from "./product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

type InvoiceProps = {
    id?: Id;
    name: string;
    address: Address;
    items: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    _name: string
    _address: Address
    _items: Product[]

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }
}