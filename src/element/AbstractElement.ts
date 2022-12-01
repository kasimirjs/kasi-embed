import {KaTemplate} from "../tpl/template";


export interface AbstractElement {

    connected() : Promise<void>;
    disconnected() : Promise<void>;
}
