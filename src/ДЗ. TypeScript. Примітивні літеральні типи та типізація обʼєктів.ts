class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: string[] = [];
  _lecturers: (string | number)[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): typeof this._areas {
    return this._areas;
  }

  get lecturers(): typeof this._lecturers {
    return this._lecturers;
  }

  addArea(area: string): void {
    this._areas.push(area);
  }

  removeArea(area: string): void {
    this._areas = this._areas.filter(a => a !== area);
  }

  addLecturer(lecturer: string | number): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: string | number): void {
    this._lecturers = this._lecturers.filter(l => l !== lecturer);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: number[] = [];
  _name: string;

  get levels(): typeof this._levels {
    return this._levels;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: number): void {
    this._levels.push(level);
  }

  removeLevel(level: number): void {
    this._levels = this._levels.filter(l => l !== level);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods
  _groups: string[] = [];
  _name: string;
  _description: string;

  get groups(): typeof this._groups {
    return this._groups;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: string): void {
    this._groups.push(group);
  }

  removeGroup(group: string): void {
    this._groups = this._groups.filter(g => g !== group);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: string;
  _status: boolean;
  _directionName: string;
  _levelName: string;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  get students(): typeof this._students {
    return this._students;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  constructor(directionName: string, levelName: string, area: string, status: boolean) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._area = area;
    this._status = status;
  }

  showPerformance(): typeof this._students {
    const sortedStudents = this._students.toSorted(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(s => s !== student);
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [workName: string]: number } = {}; // workName: mark
  _visits: { [lesson: string]: boolean } = {}; // lesson: present

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade(gradeInfo: { workName: string; mark: number }) {
    this._grades[gradeInfo.workName] = gradeInfo.mark;
  }

  set visit(visitInfo: { lesson: string; present: boolean }) {
    this._visits[visitInfo.lesson] = visitInfo.present;
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (Object.values(this._visits).filter(present => present).length / Object.keys(this._visits).length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
