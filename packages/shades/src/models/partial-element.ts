export type PartialElement<T> = Omit<Partial<T>, 'style'> & { style?: Partial<CSSStyleDeclaration> }
