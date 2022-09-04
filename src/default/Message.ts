export interface Message {
    MsgName : string;
}

export abstract class BasicMessage<T> implements Message {
    abstract MsgName : string;
}


