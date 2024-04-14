// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
interface IndexSignatureInterface {
  [key: string]: number | string;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.
interface IndexSignatureFunctionAnyArgsInterface {
  [key: string]: (args: any) => void;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.
interface IndexSignatureObjectInterface {
  [key: number]: {
    id: number;
    name: string;
    isActive: boolean;
  };
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface SpecificPropertiesInterface {
  name: string;
  [key: string]: string | number;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface Dog {
  [key: string]: string;
}

interface MyDog extends Dog {
  name: string;
  breed: string;
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).
function checkValues(obj: Dog): boolean {
  for (const key in obj) {
    if (typeof obj[key] !== 'string') {
      return false;
    }
  }
  return true;
}

checkValues({ a: 'A', b: 'B', c: 'C' }); // true
checkValues({ a: 'A', b: 'B', c: 1 }); // false
