import {
    GetFileResponse,
    GetImageFillsResponse,
    GetImagesResponse,
    GetProjectFilesResponse,
    GetTeamProjectsResponse
} from "@figma/rest-api-spec";
import {Data} from "@/utils/data";
import http from "@/utils/http";
import {requireNotNull} from "@/utils/types";

const basepath: string = requireNotNull(process.env.FIGMA_BASE_PATH, "Could not find figma base path");
const apiKey: string = requireNotNull(process.env.FIGMA_API_KEY, "Could not find figma api key");

const options: RequestInit = {
    headers: {
        'X-Figma-Token': apiKey
    },
    next: {
        revalidate: 60
    }
}

export function getProjectsInTeam(teamId: string): Promise<Data<GetTeamProjectsResponse>> {
    return http.get(`${basepath}/v1/teams/${teamId}/projects`, options)
}

export function getFilesInProject(projectId: string): Promise<Data<GetProjectFilesResponse>> {
    return http.get(`${basepath}/v1/projects/${projectId}/files`, options)
}

export function getFileComponents(fileId: string): Promise<Data<GetFileResponse>> {
    return http.get(`${basepath}/v1/files/${fileId}?geometry=paths&plugin_data=shared`, options)
}

export function getImagesInFile(fileId: string): Promise<Data<GetImageFillsResponse>> {
    return http.get(`${basepath}/v1/files/${fileId}/images`, options)
}

export function getImage(fileId: string, ...componentIds: string[]): Promise<Data<GetImagesResponse>> {
    return http.get(`${basepath}/v1/images/${fileId}?ids=${componentIds.join(',')}`, options)
}