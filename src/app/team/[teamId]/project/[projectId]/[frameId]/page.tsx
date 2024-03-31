import {getFileComponents, getImagesInFile} from "@/clients/figma/FigmaClient";
import {Node, FrameNode, RectangleNode, Paint, ImagePaint, VectorNode, SolidPaint} from "@figma/rest-api-spec";
import css from './page.module.css';
import {getImageProps} from "next/image";
import Link from "next/link";
import {CSSProperties} from "react";

type Props = {
    params: {
        teamId: string;
        projectId: string;
        frameId: string;
    }
};

function isFrame(node: Node): node is FrameNode {
    return node.type === 'FRAME';
}
function isRectangle(node: Node): node is RectangleNode {
    return node.type === 'RECTANGLE';
}
function isVector(node: Node): node is VectorNode {
    return node.type === 'VECTOR';
}
function isImage(paint: Paint): paint is ImagePaint {
    return paint.type === 'IMAGE';
}
function isColor(paint: Paint): paint is SolidPaint {
    return paint.type === 'SOLID';
}
function createColorStyle(paint?: SolidPaint): CSSProperties {
    if (!paint) return {};

    const {r, g, b, a} = paint.color;


    return {
        '--color': `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a * (paint.opacity ?? 1.0)})`
    } as any
}

export default async function ProjectView(props: Props) {
    const [images, components] = await Promise.all([
        getImagesInFile(props.params.projectId),
        getFileComponents(props.params.projectId)
    ]);

    if (images.state === 'failure' || components.state === 'failure') {
        return (
            <div>Det skjedde noe feil; {images.state} - {components.state}</div>
        );
    }

    const frames = components.data.document.children
        .flatMap(it => it.children)
        .filter(isFrame);

    const frame: FrameNode | undefined = frames
        .find(it => it.id === decodeURIComponent(props.params.frameId));

    if (frame == null) {
        return (
            <div>Kunne ikke finne frame</div>
        );
    }

    const backgroundImage: ImagePaint | undefined = frame.children
        .filter(isRectangle)
        .find(it => {
            return it.fills.find(isImage) != null;
        })
        ?.fills?.find(isImage);

    if (backgroundImage == null) {
        return (
            <div>Kunne ikke finne bakgrunn</div>
        );
    }

    const image = getImageProps({
        src: images.data.meta.images[backgroundImage.imageRef] ?? '',
        width: 2000,
        height: 1000,
        alt: ''
    });

    const vectors = frame.children
        .filter(isVector)
        .map((vector) => {
            const fillPath = vector.fillGeometry?.find(it => it.path)?.path;
            const colorStyle = createColorStyle(vector.fills.find(isColor));
            const strokePath = vector.strokeGeometry?.find(it => it.path)?.path;

            const [[a, c, e], [b, d, f]] = vector.relativeTransform ?? [[], []];

            const mask = (
                <g transform={`matrix(${a} ${b} ${c} ${d} ${e} ${f})`}>
                    <path d={fillPath} style={colorStyle} className={css.overlay}></path>
                    {/*<path d={strokePath} stroke="black"></path>*/}
                </g>
            );

            if (vector.transitionNodeID) {
                return (
                    <Link key={vector.id} href={`/team/${props.params.teamId}/project/${props.params.projectId}/${vector.transitionNodeID}`}>
                        {mask}
                    </Link>
                );
            }
            return mask;
        });


    return (
        <>
            <p>
                <Link href={`/team/${props.params.teamId}`}>{props.params.teamId}</Link>
                {' - '}
                <Link href={`/team/${props.params.teamId}/project/${props.params.projectId}`}>{props.params.projectId}</Link>
            </p>
            <svg width="1000" height="500" viewBox="0 0 2000 1000">
                <image href={image.props.src} width="2000" height="1000" />
                {vectors}
            </svg>
        </>
    );
}