import debugService from "./debug-service";
import debugModal from "./debug-modal";
import debugComponents from "./debug-components";
export default function Register(m:ng.IModule){
    
    debugComponents(m);
    debugService(m);
    debugModal(m);

}