import logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/newNoteCard.tsx";
import { NoteCard } from "./components/noteCard.tsx";

export const App = () => {
    return (
        <>
            <div className={"mx-auto my-12 max-w-6xl space-y-6"}>
                <img src={logo} alt={"NLW Expert"}></img>
                <form className={"w-full"}>
                    <input
                        type={"text"}
                        placeholder={"Busque em suas notas..."}
                        className={
                            "bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
                        }
                    />
                </form>
                <div className={"h-px bg-slate-700"}></div>
                <div className={"grid auto-rows-[250px] grid-cols-3 gap-6"}>
                    <NewNoteCard />
                    <NoteCard
                        note={{
                            date: new Date(),
                            content:
                                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur eius fuga id, " +
                                "magnam magni natus nihil non odio officia praesentium quae recusandae repudiandae sed " +
                                "tenetur vel voluptate voluptatem? Veniam.",
                        }}
                    />
                </div>
            </div>
        </>
    );
};
