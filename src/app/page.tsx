import CreateShelfForm from "@/components/CreateShelfForm";

export default function Home() {

    return (
        <article className="p-2">
            <h1>Home Page</h1>
            <CreateShelfForm closeModal={null}/>
        </article>
    );
}
