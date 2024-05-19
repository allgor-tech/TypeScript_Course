// =====================================================================================================================
// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.
// =====================================================================================================================

interface ClassMethodDecoratorContext {
  readonly kind: 'method';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
  addInitializer(initializer: () => void): void;
}

function isNotMethodType(kind: 'method'): void {
  if (kind !== 'method') throw new Error('Method-only decorator');
}

function DeprecatedMethod(reason: string, replacement?: string) {
  return function <T, A extends unknown[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>
  ): (...args: A) => R {
    isNotMethodType(context.kind);

    function replacementMethod(this: T, ...args: A): R {
      console.warn(`[DEPRECATED] ${String(context.name)} is deprecated. Reason: ${reason}`);

      if (replacement) {
        console.warn(`Please use ${replacement} instead.`);
      }

      return originalMethod.apply(this, args);
    }

    return replacementMethod;
  };
}

class MyClass {
  @maxLengh
  @minLengh
  @email
  public set email(value: string) {
    console.log(`Setting email: ${value}`);
  }

  @DeprecatedMethod('This method is deprecated', 'newMethod')
  public myMethod(): void {
    console.log('Executing myMethod');
  }
}

const obj = new MyClass();

// =====================================================================================================================
// Створіть декоратори MinLength, MaxLength та Email
// =====================================================================================================================

interface ClassSetterDecoratorContext<This = unknown, Value = unknown> {
  readonly kind: 'setter';
  readonly name: string | symbol;
  readonly metadata: DecoratorMetadata;
  readonly static: boolean;
  readonly private: boolean;
  readonly access: {
    has(object: This): boolean;
    set(object: This, value: Value): void;
  };
  addInitializer(initializer: (this: This) => void): void;
}

function isNotSetterType(kind: 'setter'): void {
  if (kind !== 'setter') throw new Error('Setter-only decorator');
}

function minLengh<T>(
  target: (value: string) => void,
  context: ClassSetterDecoratorContext<T, string>
): (value: string) => void {
  isNotSetterType(context.kind);

  function replacementMethod(value: string): void {
    if (value.length < 5) throw new Error("Value can't be less then 5");
    return target.apply(this, [value]);
  }

  return replacementMethod;
}

function maxLengh<T>(
  target: (value: string) => void,
  context: ClassSetterDecoratorContext<T, string>
): (value: string) => void {
  isNotSetterType(context.kind);

  function replacementMethod(value: string): void {
    if (value.length > 10) throw new Error("Value can't be greater then 10");
    return target.apply(this, [value]);
  }

  return replacementMethod;
}

function email<T>(
  target: (value: string) => void,
  context: ClassSetterDecoratorContext<T, string>
): (value: string) => void {
  isNotSetterType(context.kind);

  function replacementMethod(value: string): void {
    if (!value.includes('@')) throw new Error('Invalid email');
    return target.apply(this, [value]);
  }

  return replacementMethod;
}

// =====================================================================================================================
// Execution
// =====================================================================================================================
// ===========
// 1
// ===========
// [DEPRECATED] myMethod is deprecated. Reason: This method is deprecated
// Please use newMethod instead.
// Executing myMethod
obj.myMethod();
// ===========
// 2
// ===========
obj.email = '1'; // Error: Value can't be less then 5
obj.email = '12345678901'; // Error: Value can't be greater then 10
obj.email = '1234567890'; // Error: Invalid email
obj.email = '123456789@'; // Setting email: 123456789@
