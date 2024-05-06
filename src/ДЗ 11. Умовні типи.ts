// functions
const f1 = (param: string) => 1;
const f2 = (param: number) => 1;

// 1
type ParamType<T> = T extends (param: string) => infer R ? R : never;

type T1 = ParamType<typeof f1>; // expected number
type T2 = ParamType<typeof f2>; // expected never

// 2
type MyConditionalType<T> = T extends (param: infer P) => infer R ? [R, P] : never;

type T3 = MyConditionalType<typeof f1>; // expected [number, string]
type T4 = MyConditionalType<typeof f2>; // expected never
