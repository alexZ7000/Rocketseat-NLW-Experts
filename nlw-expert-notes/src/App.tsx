import logo from "./assets/Logo.svg";
import {Cards} from "./components/cards.tsx";

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
                    <div className={"rounded-md bg-slate-700 p-5 space-y-3"}>
                        <span className={"text-sm font-medium text-slate-200"}>
                            Adicionar nota
                        </span>
                        <p className={"text-sm leading-6 text-slate-400"}>
                            Grave uma nota em áudio que será convertida para
                            texto automaticamente.
                        </p>
                    </div>

                    <Cards
                        span={"Há 2 dias"}
                        p={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur eius fuga id, " +
                            "magnam magni natus nihil non odio officia praesentium quae recusandae repudiandae sed " +
                            "tenetur vel voluptate voluptatem? Veniam."}
                    />
                    <Cards
                        span={"Há 4 dias"}
                        p={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur eius fuga id, " +
                            "magnam magni natus nihil non odio officia praesentium quae recusandae repudiandae sed " +
                            "tenetur vel voluptate voluptatem? Veniam."}
                    />
                    <Cards
                        span={"Há 7 dias"}
                        p={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur eius fuga id, " +
                            "magnam magni natus nihil non odio officia praesentium quae recusandae repudiandae sed " +
                            "tenetur vel voluptate voluptatem? Veniam."}
                    />
                </div>
            </div>
        </>
    );
};
