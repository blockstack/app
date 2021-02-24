/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AuthOptions } from "@stacks/connect/types/auth";
export namespace Components {
    interface ConnectModal {
        "authOptions": AuthOptions;
    }
}
declare global {
    interface HTMLConnectModalElement extends Components.ConnectModal, HTMLStencilElement {
    }
    var HTMLConnectModalElement: {
        prototype: HTMLConnectModalElement;
        new (): HTMLConnectModalElement;
    };
    interface HTMLElementTagNameMap {
        "connect-modal": HTMLConnectModalElement;
    }
}
declare namespace LocalJSX {
    interface ConnectModal {
        "authOptions"?: AuthOptions;
        "onHandleCloseModal"?: (event: CustomEvent<any>) => void;
        "onHandleSignIn"?: (event: CustomEvent<any>) => void;
        "onHandleSignUp"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "connect-modal": ConnectModal;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "connect-modal": LocalJSX.ConnectModal & JSXBase.HTMLAttributes<HTMLConnectModalElement>;
        }
    }
}
