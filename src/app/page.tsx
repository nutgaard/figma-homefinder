"use client";
import {useFormStatus, useFormState} from "react-dom";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import login from "@/actions/Login";

export default function AppPage() {
    const [state, action] = useFormState(login, null)
    const { pending } = useFormStatus();

    return (
        <form action={action}>
            <Input label="TeamId" className="mb-2" name="teamId" />
            <Input label="Password" className="mb-2" name="password" />
            <Button disabled={pending}>Login</Button>
            {state?.message && <p className="text-red-600 mt-8">{state?.message}</p>}
        </form>
    );
}