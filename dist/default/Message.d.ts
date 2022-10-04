export interface Message {
    MsgName: string;
}
export declare abstract class BasicMessage<T> implements Message {
    abstract MsgName: string;
}
