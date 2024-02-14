import logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/newNoteCard.tsx";
import { NoteCard } from "./components/noteCard.tsx";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface Note {
    id: string;
    date: Date;
    content: string;
}

export const App = () => {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem("notes");
        if (notesOnStorage) {
            return JSON.parse(notesOnStorage);
        } else {
            return [];
        }
    });

    const onNoteCreated = (content: string) => {
        const newNote = {
            id: crypto.randomUUID(), //método que gera id's universalmente únicos que jamais se repetirão
            date: new Date(),
            content
        };
        const notesArray = [newNote, ...notes];
        setNotes(notesArray); //... == spread Operator
        localStorage.setItem("notes", JSON.stringify(notesArray));
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);
    };

    const onNoteDeleted = (id: string) => {
        const notesArray = notes.filter((note) => {
            return note.id != id;
        });
        setNotes(notesArray);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        toast.success("Nota apagada com sucesso");
    };

    const filteredNotes =
        search != ""
            ? notes.filter((note) =>
                  note.content.toLowerCase().includes(search.toLowerCase())
              ) //colocando ambos os textos em lower case para não ser case sensitive
            : notes;

    //Você não deve colocar console.log() fora das funções handle, pois a sempre que o react for atualizado ele vai rodar todas essas funções, o certo é colocar o console.log() dentro das funções handle

    return (
        <div className={"mx-auto my-12 max-w-6xl space-y-6 p-5"}>
            <img src={logo} alt={"NLW Expert"}></img>
            <form className={"w-full"}>
                <input
                    type={"text"}
                    placeholder={"Busque em suas notas..."}
                    className={
                        "bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
                    }
                    onChange={handleSearch}
                />
            </form>
            <div className={"h-px bg-slate-700"}></div>
            <div
                className={
                    "grid auto-rows-[250px] md:grid-cols2 sm:grid-cols-1 lg:grid-cols-3 gap-6"
                }
            >
                <NewNoteCard onNoteCreated={onNoteCreated} />
                {filteredNotes.map((note) => {
                    return (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onNoteDeleted={onNoteDeleted}
                        />
                    );
                })}
            </div>
        </div>
    );
};
