function rndRadixBuilder(radix: number): () => string {
  return () => Math.floor(radix * Math.random()).toString(radix);
}

export function picoid(format: string = 'xxxx-xxxx'): string {
  return format.replace(/x/g, rndRadixBuilder(36));
}
