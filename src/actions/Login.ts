"use server"
import 'server-only';
import {redirect} from "next/navigation";
import {requireNotNull} from "@/utils/types";
const actualPassword: string = requireNotNull(process.env.PASSWORD, "Could not find password");

export default async function login(_: unknown, data: FormData) {
    const password = data.get('password');
    if (password !== actualPassword) {
        return {
            message: 'Wrong password'
        }
    }

    const teamId = data.get('teamId');
    redirect(`/team/${teamId}`);
}