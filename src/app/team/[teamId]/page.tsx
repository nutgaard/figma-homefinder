import {getFilesInProject, getProjectsInTeam} from "@/clients/figma/FigmaClient";
import {isSuccess} from "@/utils/data";
import Image from 'next/image';

type Props = {
    params: {
        teamId: string;
    }
};

export default async function TeamView(props: Props) {
    const projects = await getProjectsInTeam(props.params.teamId);
    if (projects.state === 'failure') return error('Could not load projects');

    const filesLoader = projects.data.projects.map(it => getFilesInProject(it.id));
    const files = (await Promise.all(filesLoader))
        .filter(isSuccess)
        .flatMap(it => it.data.files);


    return (
        <>
        <aside>
            <p>Showing team: {props.params.teamId}</p>
        </aside>

        <div>
            <ul>
                {files.map(file => (
                    <li key={file.key}>
                        <a href={`/team/${props.params.teamId}/project/${file.key}`}>
                            <Image
                                alt={file.name}
                                src={file.thumbnail_url ?? ''}
                                width={200}
                                height={200}
                            />
                            <h2>{file.name}</h2>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

function error(message: string) {
    return (
        <section>
            {message}
        </section>
    );
}