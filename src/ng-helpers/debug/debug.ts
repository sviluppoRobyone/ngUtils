
import debugModal from "./debug-modal";
import debugComponents from "./debug-components";
export default function Register(m:ng.IModule){    
    debugComponents(m);
    debugModal(m);
}