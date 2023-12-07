import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  // This is similar to JS Objects
  type Note = {
    title : Text;
    content : Text;
  };

  // We're List.List<Note> means the list contains Note objects.
  // List.nil<Note>() means the list is empty of Note (setting it as an empty list).
  // stable makes it permanent to store notes as if you have a database
  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    // notes += notes pushes a newNote to notes List.
    notes := List.push(newNote, notes);

    Debug.print(debug_show (notes));
  };

  // Returns an array of Note
  public query func readNotes() : async [Note] {
    // Convert array into list.
    return List.toArray(notes);
  };

  // id is the index that needs to be deleted.
  public func removeNote(id : Nat) {
    // Take / Drop / Append
    let listFront = List.take(notes, id);
    let listBack = List.drop(notes, id + 1);
    notes := List.append(listFront, listBack);
  };
};
