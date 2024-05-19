// ======================
// Declaration
// ======================

// 1 =====================================================================================================================

interface INote {
  name: string;
  content: string;
  createdAt?: Date;
  editedAt?: Date;
  status?: 'active' | 'done';
}

interface IConfirmationNote extends INote {
  isEditable: boolean;
}
type NoteType = INote | IConfirmationNote;

class Note<T extends NoteType> {
  public notes: T[];

  public get allNotes(): T[] {
    return this.notes;
  }

  public get numberOfNotes(): number {
    return this.notes.length;
  }

  public get numberOfActiveNotes(): number {
    return this.notes.filter(note => note.status === 'active').length;
  }

  public set setStatusDone(note: T) {
    note.status = 'done';
  }

  public set addNote(note: T) {
    note.createdAt = new Date();
    note.status = 'active';
    this.notes.push(note);
  }

  public set removeNote(note: T) {
    this.notes = this.notes.filter(n => n !== note);
  }

  constructor(notes: T[] = []) {
    this.notes = notes;
  }

  public getNoteByIdentifier(identifier: string): T | undefined {
    return this.notes.find(note => note.name === identifier || note.content === identifier);
  }

  public editNote(note: T extends IConfirmationNote ? IConfirmationNote : INote, newNote: INote): void {
    // ConfirmationNote logic
    if (note.status === 'done') {
      throw new Error('Note is already done');
    } else if ('isEditable' in note && note.isEditable === false) {
      throw new Error('Note does not allow editing');
    }
    note.name = newNote.name;
    note.content = newNote.content;
    note.editedAt = new Date();
  }
}

// 2 =====================================================================================================================

class SearchNote<T extends NoteType> extends Note<NoteType> {
  constructor(notes: T[] = []) {
    super(notes);
  }

  searchByName(name: string): T | undefined {
    return this.notes.find(note => note.name === name) as T | undefined;
  }

  searchByContent(content: string): T | undefined {
    return this.notes.find(note => note.content.includes(content)) as T | undefined;
  }
}

// 3 =====================================================================================================================

class SortNote<T extends NoteType> extends Note<NoteType> {
  constructor(notes: INote[] = []) {
    super(notes);
  }

  sortByStatus(status: T['status']): T[] {
    return this.notes.sort((a, b) => (a.status === status ? -1 : 1)) as T[];
  }

  sortByCreatedAt(sortType: 'ascending' | 'descending'): T[] {
    return this.notes.sort((a, b) => {
      if (sortType === 'ascending') {
        return (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0);
      } else {
        return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
      }
    }) as T[];
  }
}

// ======================
// Execution
// ======================

// 1 =====================================================================================================================

const confirmationNotesList: IConfirmationNote[] = [];
const notesList: INote[] = [];

const note = new Note<INote>(notesList);

note.addNote = {
  name: `name1`,
  content: `content1`,
};
note.addNote = {
  name: `name2`,
  content: `content2`,
  isEditable: false, // Error: Property 'isEditable' is missing
};

const confirmationNote = new Note<IConfirmationNote>(confirmationNotesList);

confirmationNote.addNote = {
  name: `name1`,
  content: `content1`,
  isEditable: true,
};
confirmationNote.addNote = {
  name: `name2`,
  content: `content2`,
  isEditable: false,
};

confirmationNote.editNote(confirmationNote.notes[1], { name: 'new name', content: 'new content' }); // Error: Note does not allow editing
confirmationNote.getNoteByIdentifier('name1');
confirmationNote.setStatusDone = confirmationNote.notes[1];
confirmationNote.allNotes;
confirmationNote.numberOfNotes;
confirmationNote.numberOfActiveNotes;
confirmationNote.removeNote = confirmationNote.notes[0];

// 2 =====================================================================================================================

const searchNote = new SearchNote<IConfirmationNote>(confirmationNotesList);
console.log(searchNote.searchByName('name1'));
console.log(searchNote.searchByContent('new'));

// 3 =====================================================================================================================

const sortNote = new SortNote<IConfirmationNote>(confirmationNotesList);
console.log(sortNote.sortByStatus('done'));
console.log(sortNote.sortByCreatedAt('ascending'));
