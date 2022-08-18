import "./AbstractElement";
import  "../decorators/inject";
import {Inject} from "../decorators/inject";




export abstract class KaModal implements AbstractElement {

    public property : string = "hello";




    abstract __init() : void;
}



