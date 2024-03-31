export function requireNotNull<T>(value: T | null | undefined, errorMessage: string): T {
    if (value == null) {
        throw new Error(errorMessage)
    }

    return value;
}