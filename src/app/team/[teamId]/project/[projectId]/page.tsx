import {getFileComponents} from "@/clients/figma/FigmaClient";
import {Node, FrameNode} from "@figma/rest-api-spec";
import {redirect} from "next/navigation";

type Props = {
    params: {
        teamId: string;
        projectId: string;
    }
};

function isFrame(node: Node): node is FrameNode {
    return node.type === 'FRAME';
}

export default async function ProjectView(props: Props) {
    const components = await getFileComponents(props.params.projectId);
    if (components.state === 'failure') {
        return (
            <div>Det skjedde noe feil; {components.state}</div>
        );
    }

    const frame: FrameNode | undefined = components.data.document.children.flatMap(it => it.children).find(isFrame);
    if (frame == null) {
        return (
            <div>Kunne ikke finne frame</div>
        );
    }

    return redirect(`/team/${props.params.teamId}/project/${props.params.projectId}/${frame.id}`);
}