import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
    // desestruturando as propriedades (props)
    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [content, setContent] = useState("");

    const handleShowOnBoarding = () => {
        setShouldShowOnBoarding(false);
    };

    const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        event.target.value === ""
            ? setShouldShowOnBoarding(true)
            : setShouldShowOnBoarding(false);
    };

    const handleSaveNote = (event: FormEvent) => {
        if (content === "") {
            toast.error("Não é possível salvar notas em branco");
            return null;
        }
        event.preventDefault();
        onNoteCreated(content);
        setContent("");
        setShouldShowOnBoarding(true);
        toast.success("Nota salvada com sucesso!");
    };

    const handleStartRecording = () => {
        const isSpeechRecognitionAvailable =
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window;
        if (!isSpeechRecognitionAvailable) {
            alert(
                "Seu navegador não suporta a API de reconhecimento de voz (tente usar um navegador baseado em chrome)"
            );
            toast.error(
                "Seu navegador não suporta a API de reconhecimento de voz"
            );
            return;
        }
        setIsRecording(true);
        setShouldShowOnBoarding(false);
        const speechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        speechRecognition = new speechRecognitionAPI();
        speechRecognition.lang = "pt-br";
        speechRecognition.continuous = true; // enquanto eu não falar explícitamente para ele parar de gravar, ele não vai parar
        speechRecognition.maxAlternatives = 1; // quando ele não entender uma palavra ele vai escolher apenas aquela que tem mais chances de ser
        speechRecognition.interimResults = true; // vai trazer os resultados enquanto eu vou falando
        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce(
                (text, result) => {
                    return text.concat(result[0].transcript);
                },
                ""
            );
            setContent(transcription);
        };
        speechRecognition.onerror = (event) => {
            console.log(event);
        };
        speechRecognition.start();
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setShouldShowOnBoarding(true);
        speechRecognition != null ? speechRecognition.stop() : null;
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger
                className={
                    "rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
                }
            >
                <span className={"text-sm font-medium text-slate-200"}>
                    Adicionar nota
                </span>
                <p className={"text-sm leading-6 text-slate-400"}>
                    Grave uma nota em áudio que será convertida para texto
                    automaticamente.
                </p>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={"inset-0 fixed bg-black/50"} />
                <Dialog.Content
                    className={
                        "fixed overflow-hidden  md:inset-auto inset-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col"
                    }
                >
                    <Dialog.Close
                        className={
                            "absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100"
                        }
                        onClick={() => {
                            setShouldShowOnBoarding(true);
                            setIsRecording(false);
                        }}
                    >
                        <X className={"size-5"} />
                    </Dialog.Close>
                    <form className={"flex-1 flex flex-col"}>
                        <div className={"flex flex-1 flex-col gap-3 p-5"}>
                            <span
                                className={"text-sm font-medium text-slate-200"}
                            >
                                Adicionar Nota
                            </span>
                            {shouldShowOnBoarding ? (
                                <p
                                    className={
                                        "text-sm leading-6 text-slate-400"
                                    }
                                >
                                    Comece{" "}
                                    <button
                                        type={"button"} // temos que colocar o type button para eles não fazerem o submit (pois como ele está em um  form, por padrão o tipo dele é submit)
                                        className={
                                            "font-medium text-lime-400 hover:underline"
                                        }
                                        onClick={handleStartRecording}
                                    >
                                        gravando uma nota
                                    </button>{" "}
                                    em aúdio ou se preferir{" "}
                                    <button
                                        type={"button"}
                                        onClick={handleShowOnBoarding}
                                        className={
                                            "font-medium text-lime-400 hover:underline"
                                        }
                                    >
                                        utilize apenas texto
                                    </button>
                                    .
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    className={
                                        "text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                    }
                                    onChange={handleContentChanged}
                                    value={content}
                                />
                            )}
                        </div>
                        {isRecording ? (
                            <button
                                type={"button"}
                                onClick={handleStopRecording}
                                className={
                                    "w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none hover:text-slate-100"
                                }
                            >
                                <div
                                    className={
                                        "size-3 rounded-full bg-red-500 animate-pulse"
                                    }
                                />
                                Gravando (clique para interromper)
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveNote}
                                type={"button"}
                                className={
                                    "w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none hover:bg-lime-500"
                                }
                            >
                                Salvar nota
                            </button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
