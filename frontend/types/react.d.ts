/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react' {
  export interface CSSProperties {
    [key: string]: any;
  }

  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prevState: T) => T)) => void];
  export function useState<T = undefined>(): [T | undefined, (value: T | ((prevState: T | undefined) => T | undefined)) => void];

  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[] | undefined): T;
  export function useRef<T>(initialValue: T): { current: T };
  export function useRef<T = undefined>(): { current: T | undefined };

  export interface ReactNode {
    // This is a simplified version
  }

  export interface FunctionComponent<P = {}> {
    (props: P): ReactNode;
  }

  export interface ComponentType<P = {}> extends FunctionComponent<P> {}

  export const Fragment: ComponentType<{ children?: ReactNode }>;

  export namespace React {
    interface CSSProperties {
      [key: string]: any;
    }
    
    type Dispatch<A> = (value: A) => void;
    type SetStateAction<S> = S | ((prevState: S) => S);
  }
  
  // Export the types directly from the module
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);
}

declare module 'react-dom' {
  export function createRoot(container: Element | DocumentFragment): any;
  export function render(element: any, container: Element | DocumentFragment): void;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare global {
  namespace React {
    interface CSSProperties {
      [key: string]: any;
    }
  }
  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Make React namespace available globally
declare global {
  namespace React {
    interface CSSProperties {
      [key: string]: any;
    }
    
    type Dispatch<A> = (value: A) => void;
    type SetStateAction<S> = S | ((prevState: S) => S);
  }
}